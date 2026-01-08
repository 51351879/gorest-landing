export default function CTA() {
  return (
    <section 
      id="cta" 
      className="relative min-h-screen flex flex-col items-center justify-end py-32"
      style={{
        backgroundImage: 'url(/cta-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="flex gap-8 items-center justify-center mb-48">
          <div className="w-2 h-2 rounded-full bg-[#93d9a1] green-glow" />
          <div className="w-2 h-2 rounded-full bg-[#93d9a1] green-glow-strong" />
          <div className="w-3 h-3 rounded-full bg-[#93d9a1] green-glow-strong" />
          <div className="w-2 h-2 rounded-full bg-[#93d9a1] green-glow" />
          <div className="w-3 h-3 rounded-full bg-[#93d9a1] green-glow-strong" />
          <div className="w-2 h-2 rounded-full bg-[#93d9a1] green-glow" />
          <div className="w-2 h-2 rounded-full bg-[#93d9a1] green-glow" />
        </div>
        
        <button className="px-16 py-5 text-[#bbf4a2] text-4xl font-['JetBrains_Mono'] hover:opacity-80 transition-opacity">
          Create your world now
        </button>
      </div>
    </section>
  )
}