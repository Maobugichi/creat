import './App.css'
import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { Navbar } from './components/layout/nav'
import { Hero } from './components/layout/hero'

const CardStack = lazy(() => import('./components/layout/about/cardStack').then(m => ({ default: m.CardStack })))
const MarqueeSection = lazy(() => import('./components/marqsection').then(m => ({ default: m.MarqueeSection })))
const Featured = lazy(() => import('./components/layout/featured').then(m => ({ default: m.Featured })))
const FAQ = lazy(() => import('./components/layout/faq').then(m => ({ default: m.FAQ })))
const Footer = lazy(() => import('./components/layout/footer/footer').then(m => ({ default: m.Footer })))

function App() {
  const [showFAQ, setShowFAQ] = useState(false);
  const faqTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only mount FAQ when user scrolls near it to avoid forced reflows during initial load
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowFAQ(true);
        }
      },
      { rootMargin: '400px' } // Start loading 400px before FAQ enters viewport
    );

    if (faqTriggerRef.current) {
      observer.observe(faqTriggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className='space-y-14'>
      <Navbar />
      <Hero />
      
      <Suspense fallback={<div className="h-screen" />}>
        <CardStack />
        <MarqueeSection />
        <Featured />
        
        {/* Invisible trigger element that activates FAQ loading */}
        <div ref={faqTriggerRef} className="h-1" aria-hidden="true" />
        
        {/* FAQ and Footer only mount when user scrolls near them */}
        {showFAQ && (
          <>
            <FAQ />
            <Footer />
          </>
        )}
      </Suspense>
    </main>
  )
}

export default App