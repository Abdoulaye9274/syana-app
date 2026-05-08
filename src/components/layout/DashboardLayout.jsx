import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = ({ children, title, subtitle }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Overlay mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="md:ml-[280px] p-4 md:p-8 min-h-screen">
                <div className="max-w-7xl mx-auto animate-fade-in">
                    <Header
                        title={title}
                        subtitle={subtitle}
                        onMenuToggle={() => setSidebarOpen(prev => !prev)}
                    />
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
