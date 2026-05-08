import { useEffect, useRef, useState } from 'react'

/**
 * Détecte quand un élément entre dans le viewport.
 * Déclenche une seule fois (once: true par défaut).
 */
export const useInView = (options = {}) => {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true)
                observer.disconnect()
            }
        }, { threshold: 0.12, ...options })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return [ref, isInView]
}
