import './App.css'
import { lazy, Suspense } from 'react'
import { Navbar } from './components/layout/nav'
import { Hero } from './components/layout/hero'


const CardStack = lazy(() => import('./components/layout/about/cardStack').then(m => ({ default: m.CardStack })))
const MarqueeSection = lazy(() => import('./components/marqsection').then(m => ({ default: m.MarqueeSection })))
const Featured = lazy(() => import('./components/layout/featured').then(m => ({ default: m.Featured })))
const FAQ = lazy(() => import('./components/layout/faq').then(m => ({ default: m.FAQ })))
const Footer = lazy(() => import('./components/layout/footer/footer').then(m => ({ default: m.Footer })))

function App() {
  return (
    <main className='space-y-14'>
      <Navbar />
      <Hero />
      
      <Suspense fallback={<div className="h-screen" />}>
        <CardStack />
        <MarqueeSection />
        <Featured />
        <FAQ />
        <Footer />
      </Suspense>
    </main>
  )
}

export default App