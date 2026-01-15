import FeatureCarousel from './FeatureCarousel'

export default function Features() {
  return (
    <section 
      id="features" 
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-64"
      style={{ background: 'transparent' }}
    >
      {/* 底部渐变遮罩 - 从透明过渡到黑色，用于和下方 Process 区域衔接 */}
      <div 
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
        }}
      />
      <div className="max-w-7xl w-full px-16 space-y-16">
        <div className="flex items-start justify-between">
          <h2 className="text-[80px] leading-tight font-semibold text-white drop-shadow-lg">
            Playable<br />Prototypes.
          </h2>
          <h3 className="text-6xl font-medium text-white mt-16 drop-shadow-lg">
            Not just assets.
          </h3>
        </div>

        {/* 特性轮播组件 */}
        <FeatureCarousel />
      </div>
    </section>
  )
}