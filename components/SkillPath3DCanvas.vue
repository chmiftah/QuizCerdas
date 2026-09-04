<template>
  <div class="relative w-full h-[580px] sm:h-[680px] rounded-[36px] overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 border-4 border-sky-400 shadow-2xl select-none group">
    <!-- WebGL Canvas Container -->
    <div ref="canvasContainer" class="w-full h-full cursor-grab active:cursor-grabbing"></div>

    <!-- Floating Top Control Bar -->
    <div class="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
      <div class="px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-emerald-400/80 text-slate-800 font-heading text-xs sm:text-sm font-black flex items-center gap-2 shadow-xl">
        <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
        <span>🌴 Peta Petualangan 3D • {{ unitTitle }}</span>
      </div>

      <div class="flex items-center gap-2 pointer-events-auto">
        <button 
          @click="toggleAutoRotate"
          class="px-3.5 py-2 bg-white/90 hover:bg-white text-emerald-700 border-2 border-emerald-300 rounded-xl font-heading font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>{{ isAutoRotating ? '⏸️ Jeda Rotasi' : '▶️ Putar Peta' }}</span>
        </button>
        <button 
          @click="resetCamera"
          class="px-3.5 py-2 bg-white/90 hover:bg-white text-sky-700 border-2 border-sky-300 rounded-xl font-heading font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>🔄 Reset Kamera</span>
        </button>
      </div>
    </div>

    <!-- Active Hover Node Tooltip Popover HUD -->
    <Transition name="bounce-popover">
      <div 
        v-if="hoveredNode"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 bg-white/95 backdrop-blur-xl border-4 rounded-3xl text-slate-800 font-heading shadow-2xl z-20 pointer-events-auto cursor-pointer animate-pop flex items-center gap-4 max-w-md w-[92%]"
        :class="hoveredNode.type === 'checkpoint' ? 'border-amber-400' : 'border-emerald-400'"
        @click="onStartNode(hoveredNode)"
      >
        <div 
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg"
          :class="hoveredNode.type === 'checkpoint' ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950' : 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white'"
        >
          {{ hoveredNode.type === 'checkpoint' ? '👑' : (hoveredNode.isCompleted ? '✓' : '⭐') }}
        </div>

        <div class="text-left space-y-1 flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span 
              class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-2xs"
              :class="hoveredNode.type === 'checkpoint' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'"
            >
              {{ hoveredNode.type === 'checkpoint' ? '👑 UJIAN CHECKPOINT 3D' : '🎯 PELAJARAN 3D' }}
            </span>
            <span class="text-[10px] text-amber-600 font-black">+{{ hoveredNode.type === 'checkpoint' ? '50' : '20' }} XP</span>
          </div>

          <h4 class="text-base font-black text-slate-800 truncate">{{ hoveredNode.title }}</h4>
          <p class="text-xs text-slate-600 font-body truncate">
            {{ hoveredNode.isCompleted ? '✅ Pelajaran telah diselesaikan!' : (hoveredNode.isUnlocked ? '🚀 Klik untuk mulai kuis interaktif!' : '🔒 Selesaikan pelajaran sebelumnya') }}
          </p>
        </div>

        <button 
          class="px-4 py-2.5 rounded-xl font-heading font-black text-xs shadow-lg shrink-0 cursor-pointer"
          :class="hoveredNode.type === 'checkpoint' ? 'duo-btn-yellow' : 'duo-btn-green'"
        >
          MULAI
        </button>
      </div>
    </Transition>

    <!-- Bottom Drag Helper Overlay -->
    <div class="absolute bottom-3 left-4 text-xs font-heading font-bold text-slate-700 bg-white/80 px-3.5 py-1.5 rounded-xl backdrop-blur-sm pointer-events-none shadow-xs border border-white">
      💡 Geser kursor untuk memutar peta petualangan 3D • Klik lokasi untuk belajar
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  unit: {
    type: Object,
    required: true
  },
  completedLessons: {
    type: Array as () => string[],
    default: () => []
  },
  completedCheckpoints: {
    type: Array as () => string[],
    default: () => []
  }
})

const emit = defineEmits(['node-click'])

const canvasContainer = ref<HTMLDivElement | null>(null)
const hoveredNode = ref<any | null>(null)
const isAutoRotating = ref(true)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

let islandGroup: THREE.Group
let mascotGroup: THREE.Group
const nodeMeshes: THREE.Mesh[] = []

const mouse = { x: 0, y: 0, isDragging: false, previousMouseX: 0, previousMouseY: 0 }
const raycaster = new THREE.Raycaster()
const mouseVector = new THREE.Vector2()

const unitTitle = ref(props.unit.title || 'Peta Petualangan 3D')

// Generate nodes along a natural serpentine adventure track
const getTrackNodes = () => {
  const nodes: any[] = []
  const lessons = props.unit.lessons || []

  // Natural winding coordinates on island [-3 to +3 X, -4 to +4 Z]
  const coordinates = [
    { x: -2.6, z: -3.8 },
    { x: 2.4, z: -2.0 },
    { x: -2.2, z: 0.2 },
    { x: 2.6, z: 2.2 }
  ]

  lessons.forEach((l: any, idx: number) => {
    const coord = coordinates[idx % coordinates.length] || { x: (idx % 2 === 0 ? -2 : 2), z: idx * 2 - 3 }
    const isCompleted = props.completedLessons.includes(l.id)
    const isUnlocked = idx === 0 || props.completedLessons.includes(lessons[idx - 1]?.id)

    nodes.push({
      id: l.id,
      title: l.title,
      type: 'lesson',
      order: idx + 1,
      position: { x: coord.x, y: 0.65, z: coord.z },
      isCompleted,
      isUnlocked
    })
  })

  // Add Checkpoint Castle Node at the end
  const cpId = props.unit.checkpoint?.id || `checkpoint_${props.unit.id}`
  const cpTitle = props.unit.checkpoint?.title || `Checkpoint Unit ${props.unit.order}`
  const lastZ = nodes.length > 0 ? nodes[nodes.length - 1].position.z + 2.4 : 4.0
  const isCpCompleted = props.completedCheckpoints.includes(cpId)
  const isCpUnlocked = lessons.every((l: any) => props.completedLessons.includes(l.id))

  nodes.push({
    id: cpId,
    title: cpTitle,
    type: 'checkpoint',
    order: nodes.length + 1,
    position: { x: 0, y: 0.65, z: lastZ },
    isCompleted: isCpCompleted,
    isUnlocked: isCpUnlocked
  })

  return nodes
}

const init3D = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  scene = new THREE.Scene()
  // Soft Sky Blue & Fog
  scene.background = new THREE.Color(0x87ceeb)
  scene.fog = new THREE.FogExp2(0x87ceeb, 0.035)

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 11, 14)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvasContainer.value.appendChild(renderer.domElement)

  // Bright Warm Sun & Environment Lighting
  const ambientLight = new THREE.AmbientLight(0xfffaed, 1.8)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xfffaed, 2.5)
  sunLight.position.set(12, 20, 10)
  sunLight.castShadow = true
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  scene.add(sunLight)

  const skyHemiLight = new THREE.HemisphereLight(0x87ceeb, 0x4caf50, 0.8)
  scene.add(skyHemiLight)

  islandGroup = new THREE.Group()
  scene.add(islandGroup)

  // --- 1. OCEAN WATER BASE ---
  const oceanGeo = new THREE.CylinderGeometry(9.5, 9.5, 0.4, 64)
  const oceanMat = new THREE.MeshStandardMaterial({ 
    color: 0x29b6f6, 
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.9 
  })
  const ocean = new THREE.Mesh(oceanGeo, oceanMat)
  ocean.position.y = -0.4
  islandGroup.add(ocean)

  // --- 2. TERRAIN ISLAND (LUSH GREEN GRASS & EARTH CLIFFS) ---
  // Earth Base Dirt Cliff
  const cliffGeo = new THREE.CylinderGeometry(7.5, 7.0, 1.2, 32)
  const cliffMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.8 })
  const cliff = new THREE.Mesh(cliffGeo, cliffMat)
  cliff.position.y = 0.0
  cliff.receiveShadow = true
  islandGroup.add(cliff)

  // Top Grass Land
  const grassGeo = new THREE.CylinderGeometry(7.4, 7.4, 0.35, 32)
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.5 })
  const grass = new THREE.Mesh(grassGeo, grassMat)
  grass.position.y = 0.6
  grass.receiveShadow = true
  islandGroup.add(grass)

  // --- 3. WINDING COBBLESTONE PATHWAY ---
  const nodes = getTrackNodes()
  const pathPoints = nodes.map(n => new THREE.Vector3(n.position.x, 0.78, n.position.z))
  const curve = new THREE.CatmullRomCurve3(pathPoints)

  // Stone Road Mesh
  const roadTubeGeo = new THREE.TubeGeometry(curve, 64, 0.55, 12, false)
  const roadMat = new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.7 })
  const road = new THREE.Mesh(roadTubeGeo, roadMat)
  road.receiveShadow = true
  islandGroup.add(road)

  // Inner Yellow Guide Line
  const innerTubeGeo = new THREE.TubeGeometry(curve, 64, 0.12, 8, false)
  const innerMat = new THREE.MeshStandardMaterial({ color: 0xffd54f, roughness: 0.3 })
  const innerRoad = new THREE.Mesh(innerTubeGeo, innerMat)
  innerRoad.position.y = 0.82
  islandGroup.add(innerRoad)

  // --- 4. SCATTERED NATURE ENVIRONMENT DECORATIONS ---
  // 3D Pine Trees
  const treePositions = [
    { x: -5.0, z: -3.0 },
    { x: 5.0, z: -2.5 },
    { x: -4.8, z: 2.5 },
    { x: 4.5, z: 3.5 },
    { x: 0, z: -5.2 }
  ]

  const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 1.0, 12)
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 })
  const foliageGeo1 = new THREE.ConeGeometry(0.9, 1.4, 12)
  const foliageGeo2 = new THREE.ConeGeometry(0.7, 1.1, 12)
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.4 })

  treePositions.forEach(pos => {
    const treeGroup = new THREE.Group()
    treeGroup.position.set(pos.x, 0.75, pos.z)

    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.y = 0.5
    trunk.castShadow = true
    treeGroup.add(trunk)

    const f1 = new THREE.Mesh(foliageGeo1, foliageMat)
    f1.position.y = 1.4
    f1.castShadow = true
    treeGroup.add(f1)

    const f2 = new THREE.Mesh(foliageGeo2, foliageMat)
    f2.position.y = 2.0
    f2.castShadow = true
    treeGroup.add(f2)

    islandGroup.add(treeGroup)
  })

  // 3D Cute Mushrooms
  const mushroomPositions = [
    { x: -3.5, z: -1.0 },
    { x: 3.8, z: 0.5 },
    { x: -1.8, z: 4.2 }
  ]
  const mStalkGeo = new THREE.CylinderGeometry(0.1, 0.15, 0.4, 12)
  const mStalkMat = new THREE.MeshStandardMaterial({ color: 0xfff8e1 })
  const mCapGeo = new THREE.SphereGeometry(0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5)
  const mCapMat = new THREE.MeshStandardMaterial({ color: 0xe53935, roughness: 0.2 })

  mushroomPositions.forEach(pos => {
    const mGroup = new THREE.Group()
    mGroup.position.set(pos.x, 0.78, pos.z)

    const stalk = new THREE.Mesh(mStalkGeo, mStalkMat)
    stalk.position.y = 0.2
    mGroup.add(stalk)

    const cap = new THREE.Mesh(mCapGeo, mCapMat)
    cap.position.y = 0.4
    mGroup.add(cap)

    islandGroup.add(mGroup)
  })

  // --- 5. BUILD STEPPING NODE MESHES & CHECKPOINT CASTLE ---
  let activeNodePos: THREE.Vector3 | null = null

  nodes.forEach((node) => {
    const nodeGroup = new THREE.Group()
    nodeGroup.position.set(node.position.x, node.position.y, node.position.z)

    // Base Tactile Stone Ring
    const stoneGeo = new THREE.CylinderGeometry(1.0, 1.1, 0.35, 24)
    const stoneMat = new THREE.MeshStandardMaterial({ 
      color: node.isCompleted ? 0xffb700 : (node.isUnlocked ? 0x43a047 : 0xb0bec5),
      roughness: 0.3
    })
    const stone = new THREE.Mesh(stoneGeo, stoneMat)
    stone.position.y = 0.18
    stone.castShadow = true
    stone.userData = { nodeData: node }
    nodeGroup.add(stone)
    nodeMeshes.push(stone)

    if (node.type === 'checkpoint') {
      // 3D Castle Pedestal / Treasure Box for Checkpoint
      const castleGeo = new THREE.BoxGeometry(1.2, 0.8, 1.2)
      const castleMat = new THREE.MeshStandardMaterial({ color: 0xffa000, roughness: 0.2, metalness: 0.5 })
      const castle = new THREE.Mesh(castleGeo, castleMat)
      castle.position.y = 0.65
      castle.castShadow = true
      castle.userData = { nodeData: node }
      nodeGroup.add(castle)
      nodeMeshes.push(castle)

      // Spinning Golden Crown / Trophy 3D
      const crownGeo = new THREE.OctahedronGeometry(0.5, 0)
      const crownMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.1, metalness: 0.8 })
      const crown = new THREE.Mesh(crownGeo, crownMat)
      crown.position.y = 1.5
      nodeGroup.add(crown)
    } else {
      // 3D Star / Check Gem
      const gemGeo = new THREE.SphereGeometry(0.6, 24, 24)
      const gemMat = new THREE.MeshStandardMaterial({ 
        color: node.isCompleted ? 0xffd54f : (node.isUnlocked ? 0x66bb6a : 0xccf0f5),
        roughness: 0.2,
        metalness: 0.3
      })
      const gem = new THREE.Mesh(gemGeo, gemMat)
      gem.position.y = 0.65
      gem.castShadow = true
      gem.userData = { nodeData: node }
      nodeGroup.add(gem)
      nodeMeshes.push(gem)

      // Floating Flag Badge Post
      const flagPostGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8)
      const flagPostMat = new THREE.MeshStandardMaterial({ color: 0x795548 })
      const post = new THREE.Mesh(flagPostGeo, flagPostMat)
      post.position.set(0.5, 1.2, 0)
      nodeGroup.add(post)

      const flagBannerGeo = new THREE.BoxGeometry(0.4, 0.25, 0.04)
      const flagBannerMat = new THREE.MeshStandardMaterial({ color: node.isCompleted ? 0xffb700 : 0x29b6f6 })
      const flag = new THREE.Mesh(flagBannerGeo, flagBannerMat)
      flag.position.set(0.7, 1.4, 0)
      nodeGroup.add(flag)
    }

    if (node.isUnlocked && !node.isCompleted && !activeNodePos) {
      activeNodePos = new THREE.Vector3(node.position.x, node.position.y + 1.25, node.position.z)
    }

    nodeGroup.userData = { id: node.id, targetY: 0, data: node }
    islandGroup.add(nodeGroup)
  })

  // --- 6. 3D ANIMATED MASCOT KIKO STANDING ON ACTIVE NODE ---
  mascotGroup = new THREE.Group()
  if (activeNodePos) {
    mascotGroup.position.copy(activeNodePos)
  } else if (nodes.length > 0) {
    mascotGroup.position.set(nodes[0].position.x, nodes[0].position.y + 1.25, nodes[0].position.z)
  }

  // Cute 3D Mascot Body
  const bodyGeo = new THREE.SphereGeometry(0.4, 20, 20)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.3 })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.castShadow = true
  mascotGroup.add(body)

  // Beak
  const beakGeo = new THREE.ConeGeometry(0.14, 0.28, 12)
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xffb700, roughness: 0.2 })
  const beak = new THREE.Mesh(beakGeo, beakMat)
  beak.rotation.x = Math.PI * 0.5
  beak.position.set(0, 0, 0.4)
  mascotGroup.add(beak)

  // Eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), eyeMat)
  lEye.position.set(-0.14, 0.12, 0.32)
  const lPupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), pupilMat)
  lPupil.position.set(-0.14, 0.12, 0.39)
  mascotGroup.add(lEye)
  mascotGroup.add(lPupil)

  const rEye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), eyeMat)
  rEye.position.set(0.14, 0.12, 0.32)
  const rPupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), pupilMat)
  rPupil.position.set(0.14, 0.12, 0.39)
  mascotGroup.add(rEye)
  mascotGroup.add(rPupil)

  islandGroup.add(mascotGroup)

  // Mouse Listeners
  const dom = renderer.domElement
  dom.addEventListener('mousedown', onMouseDown)
  dom.addEventListener('mousemove', onMouseMove)
  dom.addEventListener('mouseup', onMouseUp)

  animate()
}

const onMouseDown = (e: MouseEvent) => {
  mouse.isDragging = true
  mouse.previousMouseX = e.clientX
  mouse.previousMouseY = e.clientY
}

const onMouseMove = (e: MouseEvent) => {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

  if (mouse.isDragging && islandGroup) {
    const deltaX = e.clientX - mouse.previousMouseX
    islandGroup.rotation.y += deltaX * 0.005
    mouse.previousMouseX = e.clientX
    mouse.previousMouseY = e.clientY
  }

  // Raycasting hover
  if (camera && scene) {
    raycaster.setFromCamera(mouseVector, camera)
    const intersects = raycaster.intersectObjects(nodeMeshes)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      const data = hitObj.userData.nodeData
      if (data) {
        hoveredNode.value = data
        islandGroup.children.forEach((child) => {
          if (child.userData.id === data.id) {
            child.userData.targetY = 0.4
          } else {
            child.userData.targetY = 0
          }
        })
      }
    } else {
      hoveredNode.value = null
      islandGroup.children.forEach((child) => {
        child.userData.targetY = 0
      })
    }
  }
}

const onMouseUp = () => {
  mouse.isDragging = false
}

const onStartNode = (node: any) => {
  if (node) {
    emit('node-click', { unitId: props.unit.id, itemId: node.id, type: node.type })
  }
}

const toggleAutoRotate = () => {
  isAutoRotating.value = !isAutoRotating.value
}

const resetCamera = () => {
  if (islandGroup) islandGroup.rotation.y = 0
  camera.position.set(0, 11, 14)
  camera.lookAt(0, 0, 0)
}

const clock = new THREE.Clock()

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  if (islandGroup && isAutoRotating.value && !mouse.isDragging) {
    islandGroup.rotation.y += 0.0025
  }

  // Mascot Happy Hopping
  if (mascotGroup) {
    mascotGroup.position.y = 1.25 + Math.abs(Math.sin(time * 4)) * 0.25
    mascotGroup.rotation.y = Math.sin(time * 3) * 0.2
  }

  renderer.render(scene, camera)
}

onMounted(() => {
  init3D()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  if (renderer && renderer.domElement) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.bounce-popover-enter-active {
  animation: duo-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.bounce-popover-leave-active {
  transition: all 0.15s ease-in;
  opacity: 0;
  transform: translate(-50%, 10px);
}
</style>
