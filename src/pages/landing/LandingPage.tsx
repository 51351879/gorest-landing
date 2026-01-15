import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Process from './sections/Process'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import MatrixSculpture from '../../components/MatrixSculpture'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* 3D 交互背景 - 固定定位，作为 Hero 和 Features 的背景 */}
      <MatrixSculpture 
        fadeOutStart={100}  // 滚动到 100vh (Hero 结束后) 开始淡出
        fadeOutEnd={180}    // 滚动到 180vh (Features 中后期) 完全淡出
        backgroundColor={0x000000}
      />
      
      <Navbar />
      
      {/* Hero 和 Features 区域 - 内容层，位于 3D 背景之上 */}
      <div className="relative z-10">
        <Hero />
        <Features />
      </div>
      
      {/* 3D 背景与 Process 之间的过渡层 */}
      <div 
        className="relative z-10 h-32 -mt-32"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
        }}
      />
      
      <div className="relative z-10 bg-black">
        <Process />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}