const ProgressBar = ({
    value = 0,
    variant = 'linear',
    size = 'md',
    showLabel = false,
    className = '',
    ...props
}) => {
    const clampedValue = Math.min(Math.max(value, 0), 100)

    if (variant === 'circular') {
        const radius = size === 'sm' ? 20 : size === 'lg' ? 40 : 30
        const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 8 : 6
        const normalizedRadius = radius - strokeWidth / 2
        const circumference = normalizedRadius * 2 * Math.PI
        const strokeDashoffset = circumference - (clampedValue / 100) * circumference

        return (
            <div className={`relative inline-flex items-center justify-center ${className}`}>
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                >
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00D4FF" />
                            <stop offset="100%" stopColor="#A855F7" />
                        </linearGradient>
                    </defs>
                    {/* Background circle */}
                    <circle
                        stroke="rgba(255, 255, 255, 0.05)"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* Progress circle */}
                    <circle
                        stroke="url(#progressGradient)"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="transition-all duration-500 ease-out"
                    />
                </svg>
                {showLabel && (
                    <span className="absolute text-sm font-semibold text-white">
                        {Math.round(clampedValue)}%
                    </span>
                )}
            </div>
        )
    }

    // Linear variant
    const heights = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
    }

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">Progression</span>
                    <span className="text-sm font-semibold text-cyan">{Math.round(clampedValue)}%</span>
                </div>
            )}
            <div className={`w-full bg-white/5 rounded-full overflow-hidden ${heights[size]}`}>
                <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${clampedValue}%` }}
                    {...props}
                />
            </div>
        </div>
    )
}

export default ProgressBar
