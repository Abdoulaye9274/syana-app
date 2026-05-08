/**
 * Utilities for input validation
 */

/**
 * Validates an email address
 */
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

/**
 * Validates a password (min 8 characters)
 */
export const validatePassword = (password) => {
    return password && password.length >= 8
}

/**
 * Validates a URL (Notion, Google Drive, etc.)
 */
export const validateUrl = (url) => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

/**
 * Validates if a string is not empty
 */
export const validateRequired = (value) => {
    return value && value.trim().length > 0
}
