import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Loading, WhatsAppButton } from '@/components/ui'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import RequireAdmin from '@/components/auth/RequireAdmin'
import { ThemeProvider } from '@/context/ThemeContext'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import { Toaster } from 'react-hot-toast'

// Lazy Load Pages for Performance
const DesignSystemDemo = lazy(() => import('./pages/DesignSystemDemo'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ModulesList = lazy(() => import('./pages/modules/ModulesList'))
const ModuleDetail = lazy(() => import('./pages/modules/ModuleDetail'))
const Deliverables = lazy(() => import('./pages/deliverables/Deliverables'))
const Account = lazy(() => import('./pages/account/Account'))
const HomePage = lazy(() => import('./pages/marketing/HomePage'))
const Pricing = lazy(() => import('./pages/marketing/Pricing'))
const SystemPage = lazy(() => import('./pages/marketing/SystemPage'))
const WhySyana = lazy(() => import('./pages/marketing/WhySyana'))
const SupportPage = lazy(() => import('./pages/marketing/SupportPage'))
const FaqPage = lazy(() => import('./pages/marketing/FaqPage'))
const ContactPage = lazy(() => import('./pages/marketing/ContactPage'))
const TestimonialsPage = lazy(() => import('./pages/marketing/TestimonialsPage'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CguPage = lazy(() => import('./pages/legal/CguPage'))
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'))
const LegalNoticePage = lazy(() => import('./pages/legal/LegalNoticePage'))

const PageLoader = () => (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loading size="lg" />
    </div>
)

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* Marketing Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/tarifs" element={<Pricing />} />
                            <Route path="/systeme" element={<SystemPage />} />
                            <Route path="/pourquoi-syana" element={<WhySyana />} />
                            <Route path="/support" element={<SupportPage />} />
                            <Route path="/faq" element={<FaqPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/temoignages" element={<TestimonialsPage />} />
                            <Route path="/cgu" element={<CguPage />} />
                            <Route path="/confidentialite" element={<PrivacyPage />} />
                            <Route path="/mentions-legales" element={<LegalNoticePage />} />

                            {/* Auth Routes */}
                            <Route path="/connexion" element={<Login />} />
                            <Route path="/inscription" element={<Register />} />
                            <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />

                            {/* Protected Routes */}
                            <Route path="/tableau-de-bord" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/modules" element={<ProtectedRoute><ModulesList /></ProtectedRoute>} />
                            <Route path="/modules/:id" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
                            <Route path="/livrables" element={<ProtectedRoute><Deliverables /></ProtectedRoute>} />
                            <Route path="/compte" element={<ProtectedRoute><Account /></ProtectedRoute>} />

                            <Route path="/admin" element={
                                <RequireAdmin>
                                    <AdminDashboard />
                                </RequireAdmin>
                            } />

                            {/* Dev Routes */}
                            <Route path="/design-system" element={<DesignSystemDemo />} />
                        </Routes>
                        <WhatsAppButton />
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                className: 'bg-bg-card text-text-primary border border-border-primary',
                                duration: 4000,
                            }}
                        />
                    </Suspense>
                </ErrorBoundary>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
