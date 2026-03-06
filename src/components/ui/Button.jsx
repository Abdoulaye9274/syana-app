import { forwardRef } from 'react'

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-gradient-primary text-white hover:shadow-glow-cyan hover:-translate-y-0.5',
        secondary: 'bg-transparent text-text-primary border border-border-primary hover:border-cyan hover:bg-cyan/10',
        ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-card-hover',
        danger: 'bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-button',
        md: 'px-6 py-3 text-base rounded-button',
        lg: 'px-8 py-4 text-lg rounded-button'
    }

    return (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export default Button
