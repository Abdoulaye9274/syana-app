import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border border-white/10 rounded-card overflow-hidden mb-3">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex items-center justify-between bg-bg-card hover:bg-bg-card-hover transition-colors"
            >
                <span className="font-medium text-white text-left">{title}</span>
                <ChevronDown
                    size={20}
                    className={`text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
            >
                <div className="px-6 py-4 bg-bg-card/50 text-text-secondary">
                    {children}
                </div>
            </div>
        </div>
    )
}

const Accordion = ({ items, allowMultiple = false, defaultOpen = [] }) => {
    const [openItems, setOpenItems] = useState(defaultOpen)

    const handleToggle = (index) => {
        if (allowMultiple) {
            setOpenItems(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            )
        } else {
            setOpenItems(prev =>
                prev.includes(index) ? [] : [index]
            )
        }
    }

    return (
        <div>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    isOpen={openItems.includes(index)}
                    onToggle={() => handleToggle(index)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    )
}

export default Accordion
export { AccordionItem }
