import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Process from './sections/Process'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  )
}