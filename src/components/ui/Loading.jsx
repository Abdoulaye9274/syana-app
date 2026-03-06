import { Loader2 } from 'lucide-react'

const Loading = ({ size = 'md', className = '' }) => {
    const sizeMap = {
        sm: 16,
        md: 24,
        lg: 32,
        xl: 48
    }

    const iconSize = sizeMap[size] || 24

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Loader2
                size={iconSize}
                className="animate-spin text-cyan"
            />
        </div>
    )
}

export default Loading
