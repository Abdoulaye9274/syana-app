/**
 * EXEMPLE CLOUD FUNCTIONS IMPLEMENTATION
 * À placer dans: functions/src/index.js
 * 
 * Déploiement: firebase deploy --only functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// ==============================================
// WEBHOOK: Traiter les événements Stripe
// ==============================================

exports.stripeWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    try {
      console.log(`📥 Processing webhook event: ${event.type}`);

      switch (event.type) {
        case 'customer.subscription.created':
          await handleSubscriptionCreated(event.data.object);
          break;

        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event.data.object);
          break;

        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object);
          break;

        case 'invoice.paid':
          await handleInvoicePaid(event.data.object);
          break;

        case 'invoice.payment_failed':
          await handleInvoiceFailed(event.data.object);
          break;

        default:
          console.log(`⚠️ Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// ==============================================
// CLOUD FUNCTION: Créer une session checkout Stripe
// ==============================================

exports.createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const { priceId, successUrl, cancelUrl } = data;
    const userId = context.auth.uid;

    try {
      // 1. Get or create Stripe customer
      const userRef = db.collection('users').doc(userId);
      const userSnap = await userRef.get();
      const userData = userSnap.data();

      let customerId = userData?.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: context.auth.token.email,
          metadata: {
            firebaseId: userId
          }
        });

        customerId = customer.id;
        await userRef.update({
          stripeCustomerId: customerId,
          createdStripeCustomerAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      // 2. Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
          firebaseId: userId
        }
      });

      console.log(`✅ Checkout session created: ${session.id} for user ${userId}`);

      return {
        sessionId: session.id,
        url: session.url
      };
    } catch (error) {
      console.error('❌ Error creating checkout session:', error);
      throw new functions.https.HttpsError(
        'internal',
        error.message
      );
    }
  }
);

// ==============================================
// EVENT HANDLERS
// ==============================================

async function handleSubscriptionCreated(subscription) {
  const { customer, id: subscriptionId, status, items } = subscription;

  const planNickname = items?.data[0]?.price?.nickname || 'unknown';
  const plan = planNickname.toLowerCase(); // "Basic", "Guidée", "Premium" → lowercase

  console.log(`✅ Subscription created: ${subscriptionId} (${plan})`);

  await updateUserSubscription(customer, subscriptionId, status, plan);
}

async function handleSubscriptionUpdated(subscription) {
  const { customer, id: subscriptionId, status, items } = subscription;

  const planNickname = items?.data[0]?.price?.nickname || 'unknown';
  const plan = planNickname.toLowerCase();

  console.log(`✅ Subscription updated: ${subscriptionId} → ${status}`);

  await updateUserSubscription(customer, subscriptionId, status, plan);
}

async function handleSubscriptionDeleted(subscription) {
  const { customer, id: subscriptionId } = subscription;

  console.log(`✅ Subscription deleted: ${subscriptionId}`);

  await updateUserSubscription(customer, subscriptionId, 'canceled', null);
}

async function handleInvoicePaid(invoice) {
  const { customer, subscription: subscriptionId } = invoice;

  console.log(`✅ Invoice paid: ${invoice.id}`);

  // Make sure subscription is marked as active
  await updateUserSubscriptionStatus(customer, 'active');
}

async function handleInvoiceFailed(invoice) {
  const { customer } = invoice;

  console.log(`⚠️ Invoice payment failed: ${invoice.id}`);

  await updateUserSubscriptionStatus(customer, 'unpaid');
}

// ==============================================
// HELPERS
// ==============================================

async function updateUserSubscription(
  customerId,
  subscriptionId,
  stripeStatus,
  plan
) {
  try {
    // Find user by Stripe customer ID
    const snapshot = await db
      .collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.warn(`⚠️ User not found for customer ${customerId}`);
      return;
    }

    const userDoc = snapshot.docs[0];
    const userId = userDoc.id;
    const userRef = db.collection('users').doc(userId);

    // Map Stripe status to app status
    const appStatus = mapStripeStatus(stripeStatus);

    // Update user
    const updateData = {
      subscriptionId,
      subscriptionStatus: appStatus,
      subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    if (plan) {
      updateData.plan = plan;
    }

    await userRef.update(updateData);

    console.log(`✅ Updated user ${userId}: status=${appStatus}, plan=${plan}`);
  } catch (error) {
    console.error('❌ Error updating user subscription:', error);
    throw error;
  }
}

async function updateUserSubscriptionStatus(customerId, status) {
  try {
    const snapshot = await db
      .collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.warn(`⚠️ User not found for customer ${customerId}`);
      return;
    }

    const userDoc = snapshot.docs[0];
    const appStatus = mapStripeStatus(status);

    await userDoc.ref.update({
      subscriptionStatus: appStatus,
      subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`✅ Updated subscription status for user: ${appStatus}`);
  } catch (error) {
    console.error('❌ Error updating subscription status:', error);
    throw error;
  }
}

function mapStripeStatus(stripeStatus) {
  const statusMap = {
    'active': 'active',
    'past_due': 'unpaid',
    'unpaid': 'unpaid',
    'canceled': 'canceled',
    'trialing': 'trialing',
    'incomplete': 'pending',
    'incomplete_expired': 'canceled'
  };

  return statusMap[stripeStatus] || 'unknown';
}

// ==============================================
// ADMIN FUNCTION: Récupérer les stats de revenus
// ==============================================

exports.getRevenueStats = functions.https.onCall(async (data, context) => {
  // Verify admin
  const isAdmin = await verifyAdmin(context.auth?.uid);

  if (!isAdmin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can access revenue stats'
    );
  }

  try {
    const snapshot = await db.collection('users').get();

    const stats = {
      totalActiveSubscriptions: 0,
      totalMRR: 0,
      byPlan: {
        basic: { count: 0, revenue: 0 },
        guidee: { count: 0, revenue: 0 },
        premium: { count: 0, revenue: 0 }
      },
      lastUpdate: new Date().toISOString()
    };

    snapshot.forEach(doc => {
      const user = doc.data();

      if (user.subscriptionStatus === 'active') {
        stats.totalActiveSubscriptions++;

        const plan = user.plan || 'basic';
        const prices = {
          basic: 97,
          guidee: 197,
          premium: 297
        };

        stats.byPlan[plan].count++;
        stats.byPlan[plan].revenue += prices[plan] || 0;
        stats.totalMRR += prices[plan] || 0;
      }
    });

    return stats;
  } catch (error) {
    console.error('❌ Error getting revenue stats:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message
    );
  }
});

// ==============================================
// HELPER: Verify admin
// ==============================================

async function verifyAdmin(uid) {
  if (!uid) return false;

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    return userDoc.data()?.role === 'admin';
  } catch (error) {
    console.error('Error verifying admin:', error);
    return false;
  }
}

console.log('✅ All Stripe webhook functions initialized');
