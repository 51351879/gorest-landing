export default function FlowVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center"
    style={{
        transform: 'translateX(-65px) translateY(30px) scale(0.8)',        // 整体缩小到 80%
        
      }}
    >
      {/* Container for the visual composition */}
      <div className="relative w-full">
        {/* Base wall image */}
        <img 
          src="/fake walls 2.png" 
          alt="3D geometry visualization" 
          className="w-full h-auto"
          style={{
            transform: 'translateX(-60px) translateY(210px) scale(1.2)',  // X正值向右，Y负值向上
          }}
        />
        
        {/* River transition top - connects to river-path from Step 1 */}
        <img 
          src="/river transition top.png" 
          alt="River transition top" 
          className="absolute pointer-events-none"
          style={{ 
            top: '65%',
            left: '-16%',
            width: '25%',
            height: 'auto',
            transform: 'scale(0.5)',
            zIndex: 20
          }}
        />
        
        {/* Main river flow overlay */}
        <img 
          src="/river-flow.png" 
          alt="Electric river flow" 
          className="absolute pointer-events-none"
          style={{ 
            top: '51%',
            left: '-1.2%',
            width: '100%',
            height: 'auto',
            zIndex: 15
          }}
        />
        
        {/* River transition bottom - connects to bottom of river-flow */}
        <img 
          src="/river transition botm.png" 
          alt="River transition bottom" 
          className="absolute pointer-events-none"
          style={{ 
            bottom: '-70%',
            left: '-0.7%',
            width: '15%',
            height: 'auto',
            transform: 'scale(0.5)',
            zIndex: 20
          }}
        />
      </div>
    </div>
  )
}
