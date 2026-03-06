const Badge = ({
    status = 'default',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold'

    const statuses = {
        default: 'bg-bg-card-hover text-text-primary',
        completed: 'bg-green-500/10 text-green-500',
        in_progress: 'bg-cyan/10 text-cyan',
        locked: 'bg-text-secondary/10 text-text-secondary',
        to_rework: 'bg-orange-500/10 text-orange-500',
        pending: 'bg-blue-500/10 text-blue-500',
        validated: 'bg-green-500/10 text-green-500'
    }

    return (
        <span
            className={`${baseStyles} ${statuses[status]} ${className}`}
            {...props}
        >
            {children}
        </span>
    )
}

export default Badge
