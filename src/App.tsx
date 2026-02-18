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
  const [showBelowFold, setShowBelowFold] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const belowFoldTriggerRef = useRef<HTMLDivElement>(null);
  const faqTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ Defer ALL below-fold content until 3 seconds OR user scrolls
    const timer = setTimeout(() => {
      setShowBelowFold(true);
    }, 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowBelowFold(true);
          clearTimeout(timer); // Cancel timer if user scrolls early
        }
      },
      { rootMargin: '400px' }
    );

    if (belowFoldTriggerRef.current) {
      observer.observe(belowFoldTriggerRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // FAQ loads separately when user scrolls near it
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowFAQ(true);
        }
      },
      { rootMargin: '400px' }
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
      
      {/* Trigger for below-fold content */}
      <div ref={belowFoldTriggerRef} className="h-1" aria-hidden="true" />
      
      {showBelowFold && (
        <Suspense fallback={<div className="min-h-screen" />}>
          <CardStack />
          <MarqueeSection />
          <Featured />
        </Suspense>
      )}
      
      {/* Separate trigger for FAQ */}
      <div ref={faqTriggerRef} className="h-1" aria-hidden="true" />
      
      {showFAQ && (
        <Suspense fallback={<div className="min-h-screen" />}>
          <FAQ />
          <Footer />
        </Suspense>
      )}
    </main>
  )
}

export default App