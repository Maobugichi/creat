import './App.css'
import { FeatureGrid } from './components/layout/featured/gridblocks'
import { CardStack } from './components/layout/about/cardStack'
import { FAQ } from './components/layout/faq'
import { Footer } from './components/layout/footer/footer'
import { Hero } from './components/layout/hero'
import { Navbar } from './components/layout/nav'
import { MarqueeSection } from './components/marqsection'
import { Featured } from './components/layout/featured'

function App() {
  return (
    <main className='space-y-14 '>
      <Navbar/>
      <Hero/>
      <CardStack/>
      <MarqueeSection/>
      <Featured/>
      <FAQ/>
      <Footer/>
      
    </main>
  )
}

export default App
