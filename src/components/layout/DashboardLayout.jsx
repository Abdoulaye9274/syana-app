import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-bg-primary">
            <Sidebar />
            <main className="ml-[280px] p-8 min-h-screen">
                <div className="max-w-7xl mx-auto animate-fade-in">
                    <Header title={title} subtitle={subtitle} />
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
