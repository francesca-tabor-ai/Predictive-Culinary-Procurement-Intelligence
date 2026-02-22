import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))
const Docs = lazy(() => import('./pages/Docs'))
const Pricing = lazy(() => import('./pages/Pricing'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))

function PageFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="micro-interaction-loading"
      aria-label="Loading"
    >
      <div className="loading-spinner" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
