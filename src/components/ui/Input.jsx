import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Input = forwardRef(({
    label,
    type = 'text',
    error,
    showToggle = false,
    className = '',
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputType = showToggle ? (showPassword ? 'text' : 'password') : type

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-text-primary mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    type={inputType}
                    className={`
            w-full px-4 py-3 
            bg-bg-card text-text-primary 
            border border-border-primary 
            rounded-button
            placeholder:text-text-secondary
            focus:outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/10
            transition-all duration-300
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
            ${className}
          `}
                    {...props}
                />
                {showToggle && type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

export default Input
