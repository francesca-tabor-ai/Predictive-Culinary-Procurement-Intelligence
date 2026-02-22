export default function Docs() {
  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
      }}
    >
      <h1
        className="animate-fade-in"
        style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-extrabold)',
          marginBottom: 'var(--space-6)',
        }}
      >
        Documentation
      </h1>
      <p
        className="animate-fade-in animate-delay-1"
        style={{
          fontSize: 'var(--font-size-lg)',
          lineHeight: 'var(--line-height-loose)',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
        }}
      >
        API references, integration guides, and best practices for getting the most out of PCI.
      </p>
    </section>
  )
}
