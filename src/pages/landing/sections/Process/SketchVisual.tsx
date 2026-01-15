export default function SketchVisual() {
  return (
    <div className="flex items-center justify-start w-full h-full">
      <div className="relative w-[85%] pr-8">
        {/* Sketch image */}
        <img 
          src="/fake walls.png" 
          alt="Sketch visualization" 
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0px 0px 10px rgba(187, 244, 162, 0.3))',
            transform: 'translateX(30px) translateY(0px) ',  // X正值向右，Y负值向上
           }}
        />
        
        {/* River path - flowing from sketch to Step 2 */}
        <img 
          src="/river-path.svg" 
          alt="River flow path" 
          className="absolute pointer-events-none"
          style={{ 
            top: '48%',      // 垂直位置：负值向上移，正值向下移
            left: '20%',    // 水平位置：负值向左移，正值向右移
            width: '100%',    // 路径宽度：百分比相对于父容器
            height: 'auto',
            transform: 'scale(1.2)',
            // transform: 'scaleX(-1)',  // 取消镜像翻转
            zIndex: 10
          }}
        />
        
        {/* Labels overlay */}
        <div className="absolute inset-0">
          {/* Polluted river label - top left area */}
          <span 
            className="absolute text-[#bbf4a2] text-xs md:text-sm lg:text-base font-['JetBrains_Mono']"
            style={{ 
              top: '5%', 
              left: '40%',
              textShadow: '0 0 10px #bbf4a2'
            }}
          >
            Polluted river
          </span>
          
          {/* Walls label - middle left area */}
          <span 
            className="absolute text-[#FFFFFF] text-xs md:text-sm lg:text-base font-['JetBrains_Mono']"
            style={{ 
              top: '45%', 
              left: '70%',
              textShadow: '0 0 10px #FFFFFF'
            }}
          >
            Walls
          </span>
        </div>
      </div>
    </div>
  )
}
