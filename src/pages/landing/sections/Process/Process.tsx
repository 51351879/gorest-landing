export default function Process() {
  return (
    <section id="process" className="relative py-32 px-16">
      <div className="max-w-7xl mx-auto space-y-48">
        {/* Step 1 */}
        <div className="flex items-center gap-24">
          <div className="relative flex-1">
            <div className="relative z-10">
              <img 
                src="/river-path.svg" 
                alt="Sketch visualization" 
                className="w-full h-auto green-glow"
                style={{ filter: 'drop-shadow(0px 0px 10px #bbf4a2)' }}
              />
            </div>
            <div className="absolute top-8 left-8 space-y-6">
              <span className="text-[#bbf4a2] text-base font-['JetBrains_Mono']">
                Polluted river
              </span>
              <span className="absolute top-32 left-72 text-[#bbf4a2] text-base font-['JetBrains_Mono']">
                Walls
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-6xl font-medium text-white leading-tight">
              From Napkin Sketch<br />to Greybox
            </h2>
            <div className="flex gap-5">
              <span className="text-4xl italic font-medium text-white">Step 1</span>
              <p className="text-xl text-[#878787]">
                Upload a photo of your sketch book or use a text description.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-24">
          <div className="flex-1 space-y-8">
            <h2 className="text-6xl font-medium text-white leading-tight">
              Create an<br />interactive world
            </h2>
            <div className="flex gap-5">
              <span className="text-4xl italic font-medium text-white">Step 2</span>
              <p className="text-xl text-[#878787]">
                Our Python pipeline generates 3D geometry (GLB/FBX).
              </p>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="/flow-diagram.svg" 
              alt="Flow diagram" 
              className="w-full h-auto green-glow"
              style={{ filter: 'drop-shadow(0px 0px 10px #bbf4a2)' }}
            />
            <img 
              src="/river-flow.png" 
              alt="Generated geometry" 
              className="absolute -top-16 right-0 w-3/4 h-auto"
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-24">
          <div className="relative flex-1">
            <div className="flex gap-6 items-center justify-center flex-wrap">
              <div className="w-32 h-32 glass-morphic flex items-center justify-center">
                <span className="text-white text-3xl font-bold">.FBX</span>
              </div>
              <div className="w-32 h-32 glass-morphic flex items-center justify-center">
                <span className="text-white text-3xl font-bold">.OBJ</span>
              </div>
              <div className="w-32 h-32 glass-morphic flex items-center justify-center">
                <img src="/unity-icon.png" alt="Unity" className="w-12 h-12" />
              </div>
              <div className="w-32 h-32 glass-morphic flex items-center justify-center">
                <img src="/unreal-icon.png" alt="Unreal" className="w-12 h-12" />
              </div>
              <div className="w-32 h-32 glass-morphic flex items-center justify-center">
                <span className="text-white text-3xl font-bold">.ZIP</span>
              </div>
              <div className="w-32 h-32 glass-morphic flex items-center justify-center green-glow">
                <span className="text-white text-3xl font-bold">.GLB</span>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-6xl font-medium text-white leading-tight">
              And continue<br />expanding ideas
            </h2>
            <div className="flex gap-5">
              <span className="text-4xl italic font-medium text-white">Step 3</span>
              <p className="text-xl text-[#878787]">
                Export directly to Unity with one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}