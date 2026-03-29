import { MessageCircle } from 'lucide-react'

const WhatsAppButton = ({
    phoneNumber = "33745047086",
    message = "Bonjour, je souhaite des informations concernant Syana."
}) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
            aria-label="Contacter le support sur WhatsApp"
        >
            <MessageCircle className="w-7 h-7" />

            {/* Tooltip */}
            <span className="absolute right-16 bg-bg-primary text-text-primary px-3 py-1.5 rounded-lg text-sm font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border-primary">
                Besoin d'aide ?
            </span>
        </a>
    )
}

export default WhatsAppButton
