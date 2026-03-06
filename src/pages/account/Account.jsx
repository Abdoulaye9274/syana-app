import { DashboardLayout } from '@/components/layout'
import { Tabs } from '@/components/ui'
import ProfileTab from '@/components/account/ProfileTab'
import SecurityTab from '@/components/account/SecurityTab'
import SubscriptionTab from '@/components/account/SubscriptionTab'
import BillingTab from '@/components/account/BillingTab'

const Account = () => {
    const tabs = [
        { label: 'Profil', content: <ProfileTab /> },
        { label: 'Sécurité', content: <SecurityTab /> },
        { label: 'Abonnement', content: <SubscriptionTab /> },
        { label: 'Facturation', content: <BillingTab /> }
    ]

    return (
        <DashboardLayout
            title="Mon compte"
            subtitle="Gère tes informations personnelles et ton abonnement"
        >
            <div className="max-w-4xl">
                <Tabs tabs={tabs} />
            </div>
        </DashboardLayout>
    )
}

export default Account
