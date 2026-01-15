export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center px-16 pt-32"
      style={{ background: 'transparent' }}
    >
      {/* 顶部渐变遮罩 - 让导航栏更清晰 */}
      <div 
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)'
        }}
      />
      
      <div className="max-w-7xl w-full flex items-center gap-[140px]">
        <div className="flex-1">
          <h1 className="text-[80px] leading-tight font-medium text-white drop-shadow-lg">
            Make Creativity<br />Playable in Sec.
          </h1>
        </div>
        <div className="flex-1 flex flex-col gap-9">
          <p className="text-white text-[28px] leading-snug drop-shadow-md">
            The AI-native engine that turns text, ideas, and sketches into prototypes in minutes.
          </p>
          <button className="w-fit px-8 py-3 text-[#bbf4a2] text-2xl font-['JetBrains_Mono'] hover:opacity-80 transition-opacity pointer-events-auto">
            Join waitlist
          </button>
        </div>
      </div>
    </section>
  )
}