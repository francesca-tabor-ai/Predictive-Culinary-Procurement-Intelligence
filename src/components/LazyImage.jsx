import { useState, useEffect, useRef } from 'react'

/**
 * Lazy-loads images with Intersection Observer and fade-in.
 * Use for below-the-fold or non-critical images.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(loading !== 'lazy')
  const ref = useRef(null)

  useEffect(() => {
    if (loading !== 'lazy' || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { rootMargin: '50px' }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [src, loading])

  return (
    <div
      ref={ref}
      className={`lazy-image-wrapper ${isLoaded ? 'lazy-image-loaded' : ''}`}
      style={{ display: 'inline-block' }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={className}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  )
}
