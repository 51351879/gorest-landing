import { Zap, Box, Layers } from 'lucide-react'

export default function Features() {
  return (
    <section 
      id="features" 
      className="relative min-h-screen flex flex-col items-center justify-center py-32"
      style={{
        backgroundImage: 'url(/value-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl w-full px-16 space-y-32">
        <div className="flex items-start justify-between">
          <h2 className="text-[80px] leading-tight font-semibold text-white">
            Playable<br />Prototypes.
          </h2>
          <h3 className="text-6xl font-medium text-white mt-16">
            Not just assets.
          </h3>
        </div>

        <div className="flex gap-12 justify-center">
          <div className="glass-morphic flex flex-col gap-10 p-10 max-w-sm">
            <div className="w-16 h-16 rounded-full bg-[#bbf4a2] flex items-center justify-center">
              <Zap size={32} color="#000000" />
            </div>
            <h4 className="text-white text-[28px] font-normal">
              Zero to Playable
            </h4>
            <p className="text-white text-xl leading-relaxed">
              Input a text prompt or a sketch. Get a fully rigged terrain, basic nav-mesh, and grey-box assets in muntes.
            </p>
          </div>

          <div className="glass-morphic flex flex-col gap-10 p-10 max-w-sm">
            <div className="w-16 h-16 rounded-full bg-[#bbf4a2] flex items-center justify-center">
              <Box size={32} color="#000000" />
            </div>
            <h4 className="text-white text-[28px] font-normal">
              Unity Native Export
            </h4>
            <p className="text-white text-xl leading-relaxed">
              We don't just give you an OBJ. We generate a .unity package with organized folders, prefabs, and materials.
            </p>
          </div>

          <div className="glass-morphic flex flex-col gap-10 p-10 max-w-sm">
            <div className="w-16 h-16 rounded-full bg-[#bbf4a2] flex items-center justify-center">
              <Layers size={32} color="#000000" />
            </div>
            <h4 className="text-white text-[28px] font-normal">
              Procedural Worlds
            </h4>
            <p className="text-white text-xl leading-relaxed">
              Need a dungeon layout or a forest maze? Our algorithms handle object placement so you don't have to drag-and-drop trees manually.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}