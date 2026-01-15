import SketchVisual from './SketchVisual'
import FlowVisual from './FlowVisual'

export default function Process() {
  return (
    <section id="process" className="relative py-32 px-16 overflow-visible">
      <div className="max-w-7xl mx-auto space-y-48 overflow-visible">
        {/* Step 1 */}
        <div className="flex items-center gap-24">
          <div className="relative flex-1 overflow-visible">
            <SketchVisual />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight">
              From Napkin Sketch<br />to Greybox
            </h2>
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl lg:text-4xl italic font-medium text-white whitespace-nowrap">Step 1</span>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#878787] leading-relaxed max-w-[360px]">
                Upload a photo of your sketch book or use a text description.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-24">
          <div className="flex-1 space-y-6 mt-60">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight">
              Create an<br />interactive world
            </h2>
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl lg:text-4xl italic font-medium text-white whitespace-nowrap">Step 2</span>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#878787] leading-relaxed max-w-[360px]">
                Our Python pipeline generates 3D geometry (GLB/FBX).
              </p>
            </div>
          </div>
          <div className="flex-1 relative overflow-visible">
            <FlowVisual />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-24 mt-60">
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
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight">
              And continue<br />expanding ideas
            </h2>
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl lg:text-4xl italic font-medium text-white whitespace-nowrap">Step 3</span>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#878787] leading-relaxed max-w-[360px]">
                Export directly to Unity with one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}