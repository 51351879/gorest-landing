import { useState, useEffect, useCallback } from 'react'
import { Zap, Box, Layers, Play } from 'lucide-react'

interface FeatureItem {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  videoPlaceholder?: string
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: <Zap size={28} color="#000000" />,
    title: 'Zero to Playable',
    description: 'Input a text prompt or a sketch. Get a fully rigged terrain, basic nav-mesh, and grey-box assets in minutes.',
  },
  {
    id: 2,
    icon: <Box size={28} color="#000000" />,
    title: 'Unity Native Export',
    description: "We don't just give you an OBJ. We generate a .unity package with organized folders, prefabs, and materials.",
  },
  {
    id: 3,
    icon: <Layers size={28} color="#000000" />,
    title: 'Procedural Worlds',
    description: "Need a dungeon layout or a forest maze? Our algorithms handle object placement so you don't have to drag-and-drop trees manually.",
  },
]

const DISPLAY_DURATION = 4000 // 每个卡片展示时间（毫秒）
const TRANSITION_DURATION = 800 // 过渡动画时间（毫秒）

export default function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev + 1) % features.length)
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION)
  }, [isTransitioning])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, DISPLAY_DURATION)
    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  // 计算每个卡片的3D位置
  const getCardTransform = (index: number) => {
    const diff = (index - activeIndex + features.length) % features.length
    
    // 三个位置：中央(0)、右侧(1)、左侧(2)
    if (diff === 0) {
      // 当前活跃卡片 - 前景中央
      return {
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        zIndex: 30,
        filter: 'brightness(1)',
        opacity: 1,
      }
    } else if (diff === 1) {
      // 下一个卡片 - 右侧，向内旋转
      return {
        transform: 'translateX(50%) translateZ(-250px) rotateY(-40deg) scale(0.7)',
        zIndex: 20,
        filter: 'brightness(0.35)',
        opacity: 0.8,
      }
    } else {
      // 上一个卡片 - 左侧，向内旋转
      return {
        transform: 'translateX(-50%) translateZ(-250px) rotateY(40deg) scale(0.7)',
        zIndex: 10,
        filter: 'brightness(0.35)',
        opacity: 0.8,
      }
    }
  }

  return (
    <div 
      className="relative w-full py-[clamp(1rem,3vw,2rem)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D 透视轮播容器 - 响应式高度 */}
      <div 
        className="relative flex items-center justify-center"
        style={{
          height: 'clamp(200px, 28vw, 380px)',
          perspective: 'clamp(800px, 80vw, 1400px)',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* 3D 场景 */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {features.map((feature, index) => {
            const cardStyle = getCardTransform(index)
            const isActive = index === activeIndex
            
            return (
              <div
                key={feature.id}
                className="absolute cursor-pointer"
                style={{
                  width: 'clamp(280px, 65vw, 900px)',
                  ...cardStyle,
                  transition: `all ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                onClick={() => {
                  if (index !== activeIndex && !isTransitioning) {
                    setIsTransitioning(true)
                    setActiveIndex(index)
                    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION)
                  }
                }}
              >
                <FeatureCard feature={feature} isActive={isActive} />
              </div>
            )
          })}
        </div>
      </div>

      {/* 指示器 - 响应式间距 */}
      <div className="flex justify-center gap-[clamp(0.5rem,1vw,0.75rem)] mt-[clamp(1.5rem,3vw,2.5rem)]">
        {features.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#bbf4a2]' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            style={{
              height: 'clamp(6px, 0.6vw, 10px)',
              width: index === activeIndex 
                ? 'clamp(24px, 2.5vw, 36px)' 
                : 'clamp(6px, 0.6vw, 10px)',
            }}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setActiveIndex(index)
                setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION)
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  )
}

interface FeatureCardProps {
  feature: FeatureItem
  isActive: boolean
}

function FeatureCard({ feature, isActive }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="feature-card-glass flex overflow-hidden transition-all duration-300"
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: 'clamp(16px, 2vw, 32px)',
        // 前景卡片几乎不透明，背景卡片保持半透明
        background: isActive 
          ? 'rgba(35, 35, 38, 0.95)' 
          : 'rgba(30, 30, 32, 0.5)',
        backdropFilter: isActive ? 'blur(24px)' : 'blur(16px)',
        border: isActive 
          ? `1px solid rgba(187, 244, 162, ${isHovered ? 0.7 : 0.4})` 
          : '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: isActive 
          ? isHovered
            ? '0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 100px rgba(187, 244, 162, 0.25), 0 0 40px rgba(187, 244, 162, 0.15), inset 0 1px 0 rgba(255,255,255,0.15)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 80px rgba(187, 244, 162, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 10px 30px -10px rgba(0, 0, 0, 0.4)',
        transform: isActive && isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* 左侧视频区域 (2/3) */}
      <div 
        className="w-2/3 relative flex items-center justify-center group overflow-hidden"
        style={{
          aspectRatio: '16/9',
          background: isActive 
            ? 'rgba(0, 0, 0, 0.6)' 
            : 'rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* 视频占位符 - 等待后续添加视频 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 渐变背景 */}
          <div 
            className="absolute inset-0"
            style={{
              background: isActive 
                ? `radial-gradient(ellipse at center, rgba(187, 244, 162, 0.08) 0%, transparent 60%),
                   linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)`
                : `radial-gradient(ellipse at center, rgba(187, 244, 162, 0.03) 0%, transparent 60%),
                   linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)`,
            }}
          />
          
          {/* 网格背景效果 */}
          <div 
            className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-10'}`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(187, 244, 162, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(187, 244, 162, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: 'clamp(20px, 3vw, 40px) clamp(20px, 3vw, 40px)',
            }}
          />
          
          {/* 播放按钮占位 - 响应式尺寸 */}
          <div 
            className={`
              rounded-full flex items-center justify-center
              transition-all duration-500
              ${isActive 
                ? 'bg-[#bbf4a2]/25 scale-100 opacity-100' 
                : 'bg-white/5 scale-75 opacity-40'
              }
              group-hover:bg-[#bbf4a2]/35 group-hover:scale-110
            `}
            style={{
              width: 'clamp(48px, 6vw, 80px)',
              height: 'clamp(48px, 6vw, 80px)',
            }}
          >
            <div 
              className={`
                rounded-full flex items-center justify-center
                transition-all duration-300
                ${isActive ? 'bg-[#bbf4a2]' : 'bg-white/20'}
              `}
              style={{
                width: 'clamp(32px, 4.2vw, 56px)',
                height: 'clamp(32px, 4.2vw, 56px)',
              }}
            >
              <Play 
                style={{
                  width: 'clamp(16px, 1.8vw, 24px)',
                  height: 'clamp(16px, 1.8vw, 24px)',
                  marginLeft: 'clamp(2px, 0.2vw, 4px)',
                }}
                color={isActive ? "#000000" : "#ffffff"} 
              />
            </div>
          </div>
          
          {/* 视频占位文字 - 响应式 */}
          <span 
            className={`
              absolute font-mono transition-all duration-300
              ${isActive ? 'text-white/50' : 'text-white/20'}
            `}
            style={{
              bottom: 'clamp(8px, 1vw, 16px)',
              left: 'clamp(8px, 1vw, 16px)',
              fontSize: 'clamp(9px, 0.9vw, 14px)',
            }}
          >
            Demo Video Coming Soon
          </span>
        </div>
        
        {/* 这里可以后续替换为实际的 video 元素 */}
        {/* <video src={feature.videoPlaceholder} ... /> */}
      </div>

      {/* 右侧文字区域 (1/3) - 响应式内边距和间距 */}
      <div 
        className="w-1/3 flex flex-col justify-center"
        style={{
          padding: 'clamp(12px, 2vw, 28px)',
          gap: 'clamp(8px, 1.2vw, 16px)',
        }}
      >
        {/* 图标 - 响应式尺寸 */}
        <div 
          className={`
            rounded-full flex items-center justify-center shrink-0
            transition-all duration-500
            ${isActive ? 'bg-[#bbf4a2]' : 'bg-white/15'}
          `}
          style={{
            width: 'clamp(32px, 3.5vw, 48px)',
            height: 'clamp(32px, 3.5vw, 48px)',
          }}
        >
          <div style={{ 
            transform: `scale(clamp(0.6, 0.07vw + 0.5, 1))`,
            opacity: isActive ? 1 : 0.6 
          }}>
            {feature.icon}
          </div>
        </div>
        
        {/* 标题 - 响应式字体 */}
        <h4 
          className={`
            font-medium leading-tight transition-all duration-300
            ${isActive ? 'text-white' : 'text-white/50'}
          `}
          style={{
            fontSize: 'clamp(14px, 1.5vw, 24px)',
          }}
        >
          {feature.title}
        </h4>
        
        {/* 描述 - 响应式字体 */}
        <p 
          className={`
            leading-relaxed transition-all duration-300
            ${isActive ? 'text-white/85' : 'text-white/35'}
          `}
          style={{
            fontSize: 'clamp(11px, 1vw, 16px)',
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  )
}
