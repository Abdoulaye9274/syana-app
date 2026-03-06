const Card = ({
    children,
    variant = 'default',
    padding = 'md',
    hover = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'rounded-card transition-all duration-300'

    const variants = {
        default: 'bg-bg-card border border-border-primary',
        gradient: 'bg-gradient-card border-none',
        glass: 'glass',
        bordered: 'bg-bg-card border border-border-primary'
    }

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    }

    const hoverStyles = hover ? 'hover:bg-bg-card-hover hover:border-border-primary cursor-pointer' : ''

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export default Card
