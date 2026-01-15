import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

interface MatrixSculptureProps {
  /** 当滚动超过这个高度(vh)后开始淡出 */
  fadeOutStart?: number
  /** 完全淡出的高度(vh) */
  fadeOutEnd?: number
  /** 背景颜色 - 需要和网站背景协调 */
  backgroundColor?: number
}

// 配置参数
const CONFIG = {
  // Ground Matrix
  gridSize: 50,
  unitSize: 0.8,
  gap: 0.2,
  pillarHeight: 60,
  maxElevation: 12,
  influenceRadius: 6,
  decaySpeed: 6.0,
  lerpFactor: 0.1,
  color: 0xffffff,
  bgColor: 0x000000, // 默认黑色背景，和网站协调

  // Tree Settings
  treeHeight: 22,
  growthSpeed: 0.5,
  
  // Colors
  trunkColor: 0x5D4037,
  foliageColor: 0x2E7D32,
  
  // Morphology
  trunkRadius: 2.2,
  branchSpread: 1.4
}

export default function MatrixSculpture({ 
  fadeOutStart = 150, 
  fadeOutEnd = 200,
  backgroundColor = 0x000000
}: MatrixSculptureProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const isVisibleRef = useRef(true)
  
  // 地面数据
  const groundMeshRef = useRef<THREE.InstancedMesh | null>(null)
  const currentYRef = useRef<number[]>([])
  const gridDimensionsRef = useRef({ cols: 0, rows: 0 })
  
  // 树木数据
  const trunkMeshRef = useRef<THREE.InstancedMesh | null>(null)
  const foliageMeshRef = useRef<THREE.InstancedMesh | null>(null)
  const trunkInstancesRef = useRef<Array<{id: number, x: number, y: number, z: number, currentScale: number}>>([])
  const foliageInstancesRef = useRef<Array<{id: number, x: number, y: number, z: number, currentScale: number}>>([])
  const treeGrowthProgressRef = useRef(0)
  
  // 鼠标和交互
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000))
  const raycasterRef = useRef(new THREE.Raycaster())
  const raycastPlaneRef = useRef<THREE.Mesh | null>(null)
  const dummyRef = useRef(new THREE.Object3D())

  // 创建地面矩阵
  const createMatrix = useCallback((scene: THREE.Scene) => {
    const totalSize = CONFIG.gridSize
    const step = CONFIG.unitSize + CONFIG.gap
    const gridCols = Math.floor(totalSize * 2)
    const gridRows = Math.floor(totalSize * 2)
    const totalInstances = gridCols * gridRows

    gridDimensionsRef.current = { cols: gridCols, rows: gridRows }

    const geometry = new THREE.BoxGeometry(CONFIG.unitSize, CONFIG.pillarHeight, CONFIG.unitSize)
    geometry.translate(0, -CONFIG.pillarHeight / 2, 0)

    const material = new THREE.MeshPhysicalMaterial({
      color: CONFIG.color,
      roughness: 0.8,
      metalness: 0.1
    })

    const groundMesh = new THREE.InstancedMesh(geometry, material, totalInstances)
    groundMesh.castShadow = true
    groundMesh.receiveShadow = true
    groundMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const dummy = dummyRef.current
    const offset = (gridCols * step) / 2
    const currentY: number[] = []

    for (let i = 0; i < totalInstances; i++) {
      const x = Math.floor(i / gridRows)
      const z = i % gridRows
      const worldX = x * step - offset
      const worldZ = z * step - offset
      const distFromCenter = Math.sqrt(worldX * worldX + worldZ * worldZ)

      if (distFromCenter < 3.8) {
        dummy.position.set(10000, 0, 10000)
      } else {
        dummy.position.set(worldX, 0, worldZ)
      }

      dummy.updateMatrix()
      groundMesh.setMatrixAt(i, dummy.matrix)
      currentY[i] = 0
    }

    currentYRef.current = currentY
    groundMeshRef.current = groundMesh
    scene.add(groundMesh)
  }, [])

  // 创建体素树
  const createVoxelTree = useCallback((scene: THREE.Scene) => {
    const trunkVoxels: Array<{x: number, y: number, z: number}> = []
    const foliageVoxels: Array<{x: number, y: number, z: number}> = []
    const step = CONFIG.unitSize + CONFIG.gap
    const occupied = new Set<string>()

    const addVoxel = (vx: number, vy: number, vz: number, type: 'trunk' | 'foliage') => {
      const x = Math.round(vx / step) * step
      const y = Math.round(vy / step) * step
      const z = Math.round(vz / step) * step

      const key = `${x},${y},${z}`
      if (occupied.has(key) || y < 0) return

      occupied.add(key)
      if (type === 'trunk') trunkVoxels.push({ x, y, z })
      else foliageVoxels.push({ x, y, z })
    }

    // 生成树干
    const trunkHeight = CONFIG.treeHeight * 0.95
    const trunkRadius = CONFIG.trunkRadius

    for (let y = 0; y < trunkHeight; y += step) {
      const progress = y / trunkHeight
      const currentR = trunkRadius * (1 - progress * 0.4) + (progress > 0.8 ? (progress - 0.8) * 3 : 0)

      for (let x = -4; x <= 4; x += step) {
        for (let z = -4; z <= 4; z += step) {
          if (x * x + z * z < currentR * currentR) {
            if (Math.random() > 0.15) addVoxel(x, y, z, 'trunk')
          }
        }
      }
    }

    // 生成树冠
    const spread = CONFIG.branchSpread
    const h = CONFIG.treeHeight

    const clusters = [
      { x: 0, y: h * 1.05, z: 0, r: 9 },
      { x: 6 * spread, y: h * 1.15, z: 6 * spread, r: 5 },
      { x: -6 * spread, y: h * 1.0, z: 5 * spread, r: 6 },
      { x: 5 * spread, y: h * 0.9, z: -6 * spread, r: 7 },
      { x: -5 * spread, y: h * 1.05, z: -5 * spread, r: 6 },
      { x: 9 * spread, y: h * 0.85, z: 0, r: 5 },
      { x: -9 * spread, y: h * 0.9, z: 0, r: 5 },
      { x: 0, y: h * 0.95, z: 9 * spread, r: 5 },
      { x: 0, y: h * 0.9, z: -9 * spread, r: 5 },
    ]

    clusters.forEach(cluster => {
      const rSq = cluster.r * cluster.r
      for (let x = -cluster.r; x <= cluster.r; x += step) {
        for (let y = -cluster.r; y <= cluster.r; y += step) {
          for (let z = -cluster.r; z <= cluster.r; z += step) {
            const distSq = x * x + (y * 1.2) * (y * 1.2) + z * z

            if (distSq < rSq) {
              if (Math.random() > (distSq / rSq) * 0.4) {
                const worldX = cluster.x + x
                const worldZ = cluster.z + z
                const worldY = cluster.y + y

                if (worldX > 2 && worldZ > 2 && worldY < h * 0.95) {
                  if (Math.random() > 0.1) continue
                }

                addVoxel(worldX, worldY, worldZ, 'foliage')
              }
            }
          }
        }
      }
    })

    // 创建 Mesh
    const boxGeo = new THREE.BoxGeometry(CONFIG.unitSize, CONFIG.unitSize, CONFIG.unitSize)
    const dummy = dummyRef.current

    // 树干
    const trunkMat = new THREE.MeshPhysicalMaterial({
      color: CONFIG.trunkColor,
      roughness: 0.9,
      metalness: 0.0
    })
    const trunkMesh = new THREE.InstancedMesh(boxGeo, trunkMat, trunkVoxels.length)
    trunkMesh.castShadow = true
    trunkMesh.receiveShadow = true
    trunkMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const trunkInstances: typeof trunkInstancesRef.current = []
    trunkVoxels.forEach((v, i) => {
      dummy.position.set(v.x, v.y, v.z)
      dummy.scale.set(0, 0, 0)
      dummy.updateMatrix()
      trunkMesh.setMatrixAt(i, dummy.matrix)
      trunkInstances.push({ id: i, x: v.x, y: v.y, z: v.z, currentScale: 0 })
    })

    trunkInstancesRef.current = trunkInstances
    trunkMeshRef.current = trunkMesh
    scene.add(trunkMesh)

    // 树叶
    const foliageMat = new THREE.MeshPhysicalMaterial({
      color: CONFIG.foliageColor,
      roughness: 0.8,
      metalness: 0.0
    })
    const foliageMesh = new THREE.InstancedMesh(boxGeo, foliageMat, foliageVoxels.length)
    foliageMesh.castShadow = true
    foliageMesh.receiveShadow = true
    foliageMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const foliageInstances: typeof foliageInstancesRef.current = []
    foliageVoxels.forEach((v, i) => {
      dummy.position.set(v.x, v.y, v.z)
      dummy.scale.set(0, 0, 0)
      dummy.updateMatrix()
      foliageMesh.setMatrixAt(i, dummy.matrix)
      foliageInstances.push({ id: i, x: v.x, y: v.y, z: v.z, currentScale: 0 })
    })

    foliageInstancesRef.current = foliageInstances
    foliageMeshRef.current = foliageMesh
    scene.add(foliageMesh)
  }, [])

  // 动画树木部分
  const animateTreePart = useCallback((
    mesh: THREE.InstancedMesh,
    instances: Array<{id: number, x: number, y: number, z: number, currentScale: number}>,
    isFoliage: boolean
  ) => {
    const dummy = dummyRef.current
    const treeGrowthProgress = treeGrowthProgressRef.current
    let needsUpdate = false

    instances.forEach(node => {
      const heightOffset = isFoliage ? 2 : 0
      const triggerHeight = node.y + Math.sin(node.x * 0.5) * 2 + heightOffset

      let targetScale = 0
      if (treeGrowthProgress > triggerHeight) {
        const age = treeGrowthProgress - triggerHeight
        targetScale = Math.min(1, age * 0.4)
        if (targetScale > 0.8 && targetScale < 1) {
          targetScale = 1.1 - (1 - targetScale)
        }
        if (age > 2.5) targetScale = 1
      }

      if (Math.abs(node.currentScale - targetScale) > 0.01) {
        node.currentScale += (targetScale - node.currentScale) * 0.1

        dummy.position.set(node.x, node.y, node.z)
        dummy.scale.set(node.currentScale, node.currentScale, node.currentScale)
        dummy.updateMatrix()
        mesh.setMatrixAt(node.id, dummy.matrix)
        needsUpdate = true
      }
    })

    if (needsUpdate) mesh.instanceMatrix.needsUpdate = true
  }, [])

  // 主动画循环
  const animate = useCallback(() => {
    if (!isVisibleRef.current) {
      animationIdRef.current = requestAnimationFrame(animate)
      return
    }

    const groundMesh = groundMeshRef.current
    const trunkMesh = trunkMeshRef.current
    const foliageMesh = foliageMeshRef.current
    const camera = cameraRef.current
    const renderer = rendererRef.current
    const scene = sceneRef.current
    const raycastPlane = raycastPlaneRef.current

    if (!groundMesh || !camera || !renderer || !scene || !raycastPlane) {
      animationIdRef.current = requestAnimationFrame(animate)
      return
    }

    const raycaster = raycasterRef.current
    const mouse = mouseRef.current
    const dummy = dummyRef.current
    const { cols: gridCols, rows: gridRows } = gridDimensionsRef.current
    const step = CONFIG.unitSize + CONFIG.gap
    const offset = (gridCols * step) / 2

    // 地面矩阵交互
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(raycastPlane)
    const intersectPoint = intersects.length > 0 ? intersects[0].point : null

    let needsGroundUpdate = false
    const count = groundMesh.count
    const currentY = currentYRef.current

    for (let idx = 0; idx < count; idx++) {
      const col = Math.floor(idx / gridRows)
      const row = idx % gridRows
      const posX = col * step - offset
      const posZ = row * step - offset

      if (Math.abs(posX) < 3.8 && Math.abs(posZ) < 3.8) continue

      let target = 0
      if (intersectPoint) {
        const dx = posX - intersectPoint.x
        const dz = posZ - intersectPoint.z
        const dist = Math.sqrt(dx * dx + dz * dz)
        if (dist < CONFIG.influenceRadius) {
          const normalizedDist = dist / CONFIG.influenceRadius
          target = Math.exp(-normalizedDist * CONFIG.decaySpeed) * CONFIG.maxElevation
        }
      }

      if (Math.abs(currentY[idx] - target) > 0.001) {
        currentY[idx] += (target - currentY[idx]) * CONFIG.lerpFactor
        dummy.position.set(posX, currentY[idx], posZ)
        dummy.updateMatrix()
        groundMesh.setMatrixAt(idx, dummy.matrix)
        needsGroundUpdate = true
      }
    }

    if (needsGroundUpdate) groundMesh.instanceMatrix.needsUpdate = true

    // 树木生长动画
    if (treeGrowthProgressRef.current < CONFIG.treeHeight + 10) {
      treeGrowthProgressRef.current += CONFIG.growthSpeed
      
      if (trunkMesh) animateTreePart(trunkMesh, trunkInstancesRef.current, false)
      if (foliageMesh) animateTreePart(foliageMesh, foliageInstancesRef.current, true)
    }

    renderer.render(scene, camera)
    animationIdRef.current = requestAnimationFrame(animate)
  }, [animateTreePart])

  // 初始化 Three.js
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    
    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(backgroundColor)
    scene.fog = new THREE.Fog(backgroundColor, 40, 90)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(30, 45, 30)
    camera.lookAt(0, 10, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(50, 80, 50)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.camera.near = 0.5
    dirLight.shadow.camera.far = 200
    const d = 50
    dirLight.shadow.camera.left = -d
    dirLight.shadow.camera.right = d
    dirLight.shadow.camera.top = d
    dirLight.shadow.camera.bottom = -d
    scene.add(dirLight)

    const fillLight = new THREE.DirectionalLight(0xb4c6d6, 0.3)
    fillLight.position.set(-20, 10, -20)
    scene.add(fillLight)

    // 创建场景元素
    createMatrix(scene)
    createVoxelTree(scene)

    // 交互平面（不可见）
    const planeGeometry = new THREE.PlaneGeometry(200, 200)
    const planeMaterial = new THREE.MeshBasicMaterial({ visible: false })
    const raycastPlane = new THREE.Mesh(planeGeometry, planeMaterial)
    raycastPlane.rotation.x = -Math.PI / 2
    scene.add(raycastPlane)
    raycastPlaneRef.current = raycastPlane

    // 开始动画
    animate()

    // Resize 处理
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // 鼠标移动处理 - 全局捕获以支持上层元素
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // 滚动处理 - 控制可见性和透明度
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const fadeStart = vh * (fadeOutStart / 100)
      const fadeEnd = vh * (fadeOutEnd / 100)

      if (scrollY < fadeStart) {
        isVisibleRef.current = true
        container.style.opacity = '1'
      } else if (scrollY >= fadeEnd) {
        isVisibleRef.current = false
        container.style.opacity = '0'
      } else {
        isVisibleRef.current = true
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart)
        container.style.opacity = String(1 - progress)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 初始滚动检查
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      renderer.dispose()
      container.removeChild(renderer.domElement)

      // 清理几何体和材质
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
    }
  }, [backgroundColor, fadeOutStart, fadeOutEnd, createMatrix, createVoxelTree, animate])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 transition-opacity duration-300"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
