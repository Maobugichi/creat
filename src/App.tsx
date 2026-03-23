import './App.css';
import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Navbar } from './components/layout/nav';
import { Hero } from './components/layout/hero';

const CardStack      = lazy(() => import('./components/layout/about/cardStack').then(m => ({ default: m.CardStack })));
const MarqueeSection = lazy(() => import('./components/marqsection').then(m => ({ default: m.MarqueeSection })));
const Featured       = lazy(() => import('./components/layout/featured').then(m => ({ default: m.Featured })));
const Services       = lazy(() => import('./components/layout/service').then(m => ({ default: m.Services })));
const Work           = lazy(() => import('./components/layout/work').then(m => ({ default: m.Work })));
const Testimonials   = lazy(() => import('./components/layout/testimonial').then(m => ({ default: m.Testimonials })));
const CTABand        = lazy(() => import('./components/layout/ctaBand').then(m => ({ default: m.CTABand })));
const FAQ            = lazy(() => import('./components/layout/faq').then(m => ({ default: m.FAQ })));
const ContactSection = lazy(() => import('./components/layout/contact'));
const Footer         = lazy(() => import('./components/layout/footer/footer').then(m => ({ default: m.Footer })));

function App() {
  const [showGate1, setShowGate1] = useState(false);
  const [showGate2, setShowGate2] = useState(false);
  const [showGate3, setShowGate3] = useState(false);

  const gate1Ref = useRef<HTMLDivElement>(null);
  const gate2Ref = useRef<HTMLDivElement>(null);
  const gate3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowGate1(true), 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowGate1(true);
          clearTimeout(timer);
        }
      },
      { rootMargin: '400px' }
    );

    if (gate1Ref.current) observer.observe(gate1Ref.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setShowGate2(true); },
      { rootMargin: '400px' }
    );

    if (gate2Ref.current) observer.observe(gate2Ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setShowGate3(true); },
      { rootMargin: '400px' }
    );

    if (gate3Ref.current) observer.observe(gate3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="">
      <Navbar />
      <Hero />

      <div ref={gate1Ref} className="h-1" aria-hidden="true" />

      {showGate1 && (
        <Suspense fallback={<div className="min-h-screen" />}>
          <CardStack />
          <MarqueeSection />
          <Featured />
          <Services />
        </Suspense>
      )}

      <div ref={gate2Ref} className="h-1" aria-hidden="true" />

      {showGate2 && (
        <Suspense fallback={<div className="min-h-screen" />}>
          <Work />
          <Testimonials />
          <CTABand />
        </Suspense>
      )}

      <div ref={gate3Ref} className="h-1" aria-hidden="true" />

      {showGate3 && (
        <Suspense fallback={<div className="min-h-screen" />}>
          <FAQ />
          <ContactSection />
          <Footer />
        </Suspense>
      )}
    </main>
  );
}

export default App;