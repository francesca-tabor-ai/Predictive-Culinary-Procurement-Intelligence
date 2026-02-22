import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ChatWidget from './components/ChatWidget'

const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))
const Docs = lazy(() => import('./pages/Docs'))
const Pricing = lazy(() => import('./pages/Pricing'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const ApiDocs = lazy(() => import('./pages/ApiDocs'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const BuildApp = lazy(() => import('./pages/BuildApp'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Status = lazy(() => import('./pages/Status'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/build" element={<BuildApp />} />
            <Route path="/status" element={<Status />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  )
}

export default App
