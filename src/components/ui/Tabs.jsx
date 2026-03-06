import { useState } from 'react'

const Tabs = ({ tabs, defaultTab = 0, onChange, className = '' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab)

    const handleTabClick = (index) => {
        setActiveTab(index)
        if (onChange) onChange(index)
    }

    return (
        <div className={className}>
            {/* Tab Headers */}
            <div className="flex gap-2 border-b border-border-primary mb-6">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`
              px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300
              ${activeTab === index
                                ? 'bg-gradient-primary text-white'
                                : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
                            }
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
                {tabs[activeTab]?.content}
            </div>
        </div>
    )
}

export default Tabs
