<template>
  <div class="relative w-full max-w-xl mx-auto h-[580px] sm:h-[660px] select-none">
    <!-- WebGL Canvas Container -->
    <div ref="canvasContainer" class="w-full h-full cursor-pointer"></div>

    <!-- Floating Title Pill Badges Overlay Projected Over 3D Nodes -->
    <div class="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <div 
        v-for="node in projectedNodes" 
        :key="node.id"
        class="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-75 pointer-events-auto cursor-pointer flex flex-col items-center"
        :style="{ left: `${node.screenX}px`, top: `${node.screenY}px` }"
        @click="onBadgeClick(node)"
      >
        <!-- Blinking "Lanjut di Sini!" Mascot Callout for Current Active Node -->
        <div 
          v-if="node.isUnlocked && !node.isCompleted && node.type === 'lesson'"
          class="mb-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-[10px] font-heading font-black shadow-lg border-2 border-white flex items-center gap-1.5 animate-bounce animate-pulse"
        >
          <span class="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
          <span>🦉 Lanjut di sini!</span>
        </div>

        <!-- Node Title Badge (Matching 2D Skill Tree Style) -->
        <div 
          class="px-3 py-1.5 rounded-2xl border-2 shadow-lg text-center max-w-[140px] font-heading font-black text-[11px] truncate backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
          :class="getNodeBadgeClass(node)"
        >
          <span v-if="!node.isUnlocked" class="mr-1">🔒</span>
          <span v-else-if="node.isCompleted" class="mr-1 text-emerald-600">✓</span>
          <span v-else class="mr-1 text-amber-500">⭐</span>
          <span>{{ node.title }}</span>
        </div>
      </div>
    </div>

    <!-- Active Node Popover HUD Card -->
    <Transition name="bounce-popover">
      <div 
        v-if="activeCardNode"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-3.5 bg-white/95 backdrop-blur-xl border-4 rounded-3xl text-slate-800 font-heading shadow-2xl z-30 pointer-events-auto flex items-center gap-3.5 max-w-sm w-[90%] animate-pop"
        :class="activeCardNode.type === 'checkpoint' ? 'border-amber-400' : 'border-emerald-400'"
      >
        <div 
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md cursor-pointer"
          :class="activeCardNode.type === 'checkpoint' ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950' : 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white'"
          @click="launchQuiz(activeCardNode)"
        >
          {{ activeCardNode.type === 'checkpoint' ? '👑' : (activeCardNode.isCompleted ? '✓' : '⭐') }}
        </div>

        <div class="text-left space-y-0.5 flex-1 min-w-0 cursor-pointer" @click="launchQuiz(activeCardNode)">
          <div class="flex items-center gap-2">
            <span 
              class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-2xs"
              :class="activeCardNode.type === 'checkpoint' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'"
            >
              {{ activeCardNode.type === 'checkpoint' ? '👑 UJIAN CHECKPOINT' : `🎯 PELAJARAN ${activeCardNode.order}` }}
            </span>
            <span class="text-[10px] text-amber-600 font-black">+{{ activeCardNode.type === 'checkpoint' ? '50' : '20' }} XP</span>
          </div>

          <h4 class="text-sm font-black text-slate-800 truncate">{{ activeCardNode.title }}</h4>
          <p class="text-[11px] text-slate-500 font-body truncate">
            {{ activeCardNode.isCompleted ? '✅ Selesai! Klik untuk mengulang' : (activeCardNode.isUnlocked ? '🚀 Klik tombol untuk mulai kuis!' : '🔒 Terkunci. Selesaikan materi sebelumnya') }}
          </p>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button 
            @click="launchQuiz(activeCardNode)"
            class="px-3.5 py-2 rounded-xl font-heading font-black text-xs shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95"
            :class="activeCardNode.type === 'checkpoint' ? 'duo-btn-yellow' : 'duo-btn-green'"
          >
            MULAI
          </button>
          
          <button 
            @click="selectedNode = null"
            class="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] font-black flex items-center justify-center cursor-pointer border border-slate-300"
            title="Tutup Popup"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
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
const selectedNode = ref<any | null>(null)
const projectedNodes = ref<any[]>([])

const activeCardNode = computed(() => selectedNode.value || hoveredNode.value)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

let terrainGroup: THREE.Group
let mascotGroup: THREE.Group
let pulseRingMesh: THREE.Mesh | null = null
const nodeMeshes: THREE.Mesh[] = []
const rawNodesList: any[] = []

const mouse = { x: 0, y: 0, isDragging: false, previousMouseX: 0, previousMouseY: 0 }
const raycaster = new THREE.Raycaster()
const mouseVector = new THREE.Vector2()

const unitTitle = ref(props.unit.title || 'Terrain 3D Petualangan')

// Calculate Vertical S-Curve Nodes
const getVerticalTrackNodes = () => {
  const nodes: any[] = []
  const lessons = props.unit.lessons || []
  const totalCount = lessons.length + 1

  const startZ = -4.0
  const zSpacing = 8.0 / Math.max(totalCount - 1, 1)
  const xOffsets = [-1.2, 1.2, -1.2, 1.2, -1.2, 1.2]

  lessons.forEach((l: any, idx: number) => {
    const x = xOffsets[idx % xOffsets.length]
    const z = startZ + (idx * zSpacing)
    const isCompleted = props.completedLessons.includes(l.id)
    const isUnlocked = idx === 0 || props.completedLessons.includes(lessons[idx - 1]?.id)

    nodes.push({
      id: l.id,
      title: l.title,
      type: 'lesson',
      order: idx + 1,
      position: { x, y: 0.55, z },
      isCompleted,
      isUnlocked
    })
  })

  // Checkpoint Node at the bottom center
  const cpId = props.unit.checkpoint?.id || `checkpoint_${props.unit.id}`
  const cpTitle = props.unit.checkpoint?.title || `Checkpoint Unit ${props.unit.order}`
  const lastZ = startZ + (lessons.length * zSpacing)
  const isCpCompleted = props.completedCheckpoints.includes(cpId)
  const isCpUnlocked = lessons.every((l: any) => props.completedLessons.includes(l.id))

  nodes.push({
    id: cpId,
    title: cpTitle,
    type: 'checkpoint',
    order: lessons.length + 1,
    position: { x: 0, y: 0.55, z: lastZ },
    isCompleted: isCpCompleted,
    isUnlocked: isCpUnlocked
  })

  return nodes
}

const getNodeBadgeClass = (node: any) => {
  if (!node.isUnlocked) {
    return 'bg-slate-100/90 text-slate-400 border-slate-300'
  }
  if (node.isCompleted) {
    return 'bg-white/95 text-slate-800 border-emerald-400 shadow-emerald-200'
  }
  // Current active unlocked position: Blinking glowing green border!
  return 'bg-emerald-500 text-white border-white shadow-emerald-400 animate-pulse scale-105'
}

const onBadgeClick = (node: any) => {
  if (node.isUnlocked) {
    selectedNode.value = node
  }
}

const init3D = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  scene = new THREE.Scene()
  scene.background = null

  camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
  camera.position.set(0, 15.0, 3.8)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvasContainer.value.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.2)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xfffaed, 2.5)
  sunLight.position.set(8, 18, 8)
  sunLight.castShadow = true
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  scene.add(sunLight)

  terrainGroup = new THREE.Group()
  scene.add(terrainGroup)

  // --- 1. PROPORTIONAL VERTICAL 3D TERRAIN ISLAND ---
  const baseBoxGeo = new THREE.BoxGeometry(5.2, 0.8, 10.5)
  const cliffMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.8 })
  const baseCliff = new THREE.Mesh(baseBoxGeo, cliffMat)
  baseCliff.position.y = -0.1
  baseCliff.receiveShadow = true
  terrainGroup.add(baseCliff)

  const grassTopGeo = new THREE.BoxGeometry(5.1, 0.3, 10.4)
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.5 })
  const grassSurface = new THREE.Mesh(grassTopGeo, grassMat)
  grassSurface.position.y = 0.45
  grassSurface.receiveShadow = true
  terrainGroup.add(grassSurface)

  // --- 2. WINDING ROAD PATHWAY ---
  const nodes = getVerticalTrackNodes()
  rawNodesList.push(...nodes)

  const pathPoints = nodes.map(n => new THREE.Vector3(n.position.x, 0.58, n.position.z))
  const curve = new THREE.CatmullRomCurve3(pathPoints)

  const roadTubeGeo = new THREE.TubeGeometry(curve, 64, 0.35, 12, false)
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 })
  const road = new THREE.Mesh(roadTubeGeo, roadMat)
  road.receiveShadow = true
  terrainGroup.add(road)

  const innerTubeGeo = new THREE.TubeGeometry(curve, 64, 0.1, 8, false)
  const innerMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2 })
  const innerRoad = new THREE.Mesh(innerTubeGeo, innerMat)
  innerRoad.position.y = 0.61
  terrainGroup.add(innerRoad)

  // --- 3. SCALED 3D ENVIRONMENT DECORATIONS ---
  const treeSidePositions = [
    { x: -2.1, z: -4.5 },
    { x: 2.1, z: -2.8 },
    { x: -2.2, z: -0.8 },
    { x: 2.2, z: 1.0 },
    { x: -2.1, z: 2.8 },
    { x: 2.1, z: 4.5 }
  ]

  const trunkGeo = new THREE.CylinderGeometry(0.09, 0.14, 0.6, 12)
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 })
  const leavesGeo = new THREE.SphereGeometry(0.42, 16, 16)
  const leavesMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.4 })

  treeSidePositions.forEach(pos => {
    const tGroup = new THREE.Group()
    tGroup.position.set(pos.x, 0.58, pos.z)

    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.y = 0.3
    trunk.castShadow = true
    tGroup.add(trunk)

    const leaves = new THREE.Mesh(leavesGeo, leavesMat)
    leaves.position.y = 0.75
    leaves.castShadow = true
    tGroup.add(leaves)

    terrainGroup.add(tGroup)
  })

  // 3D Fluffy Clouds
  const cloudPositions = [
    { x: 2.2, z: -3.5, y: 2.8 },
    { x: -2.2, z: -0.2, y: 3.0 },
    { x: 2.2, z: 2.8, y: 2.6 }
  ]
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const cloudGeo = new THREE.SphereGeometry(0.35, 16, 16)

  cloudPositions.forEach(pos => {
    const cGroup = new THREE.Group()
    cGroup.position.set(pos.x, pos.y, pos.z)

    const c1 = new THREE.Mesh(cloudGeo, cloudMat)
    const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), cloudMat)
    c2.position.set(0.25, 0.08, 0)
    cGroup.add(c1)
    cGroup.add(c2)
    terrainGroup.add(cGroup)
  })

  // --- 4. STEPPING NODES & PULSING GLOW RING ---
  let activeNodePos: THREE.Vector3 | null = null

  nodes.forEach((node) => {
    const nodeGroup = new THREE.Group()
    nodeGroup.position.set(node.position.x, node.position.y, node.position.z)

    // Base Cobblestone Disc Ring
    const ringGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.22, 24)
    const ringMat = new THREE.MeshStandardMaterial({ 
      color: node.isCompleted ? 0xffb700 : (node.isUnlocked ? 0x43a047 : 0x64748b),
      roughness: 0.3 
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.y = 0.11
    ring.castShadow = true
    ring.userData = { nodeData: node }
    nodeGroup.add(ring)
    nodeMeshes.push(ring)

    if (node.type === 'checkpoint') {
      const cpBoxGeo = new THREE.BoxGeometry(0.9, 0.52, 0.9)
      const cpBoxMat = new THREE.MeshStandardMaterial({ 
        color: node.isUnlocked ? 0xff9800 : 0x64748b, 
        roughness: 0.2, 
        metalness: 0.5 
      })
      const cpBox = new THREE.Mesh(cpBoxGeo, cpBoxMat)
      cpBox.position.y = 0.48
      cpBox.castShadow = true
      cpBox.userData = { nodeData: node }
      nodeGroup.add(cpBox)
      nodeMeshes.push(cpBox)

      const crownGeo = new THREE.OctahedronGeometry(0.34, 0)
      const crownMat = new THREE.MeshStandardMaterial({ 
        color: node.isUnlocked ? 0xffd700 : 0x94a3b8, 
        roughness: 0.1, 
        metalness: 0.8 
      })
      const crown = new THREE.Mesh(crownGeo, crownMat)
      crown.position.y = 1.1
      nodeGroup.add(crown)
    } else {
      const gemGeo = new THREE.SphereGeometry(0.42, 24, 24)
      const gemMat = new THREE.MeshStandardMaterial({ 
        color: node.isCompleted ? 0xffd54f : (node.isUnlocked ? 0x66bb6a : 0x64748b),
        roughness: 0.2,
        metalness: 0.3 
      })
      const gem = new THREE.Mesh(gemGeo, gemMat)
      gem.position.y = 0.44
      gem.castShadow = true
      gem.userData = { nodeData: node }
      nodeGroup.add(gem)
      nodeMeshes.push(gem)
    }

    // Add 3D Metallic Lock Padlock for locked nodes 🔒
    if (!node.isUnlocked) {
      const lockGroup = new THREE.Group()
      lockGroup.position.set(0, 0.85, 0)

      const lockBodyGeo = new THREE.BoxGeometry(0.28, 0.26, 0.12)
      const lockBodyMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.3 })
      const lockBody = new THREE.Mesh(lockBodyGeo, lockBodyMat)
      lockGroup.add(lockBody)

      const shackleGeo = new THREE.TorusGeometry(0.09, 0.03, 12, 16, Math.PI)
      const shackleMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.8, roughness: 0.2 })
      const shackle = new THREE.Mesh(shackleGeo, shackleMat)
      shackle.rotation.x = Math.PI
      shackle.position.set(0, 0.18, 0)
      lockGroup.add(shackle)

      nodeGroup.add(lockGroup)
    }

    if (node.isUnlocked && !node.isCompleted && !activeNodePos) {
      activeNodePos = new THREE.Vector3(node.position.x, node.position.y + 0.85, node.position.z)
    }

    nodeGroup.userData = { id: node.id, targetY: 0, data: node }
    terrainGroup.add(nodeGroup)
  })

  // Pulsing 3D Glowing Aura Ring for Active Position
  if (activeNodePos) {
    const pulseRingGeo = new THREE.RingGeometry(0.7, 1.0, 32)
    const pulseRingMat = new THREE.MeshBasicMaterial({ 
      color: 0x58cc02, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8 
    })
    pulseRingMesh = new THREE.Mesh(pulseRingGeo, pulseRingMat)
    pulseRingMesh.rotation.x = Math.PI * 0.5
    pulseRingMesh.position.set(activeNodePos.x, 0.59, activeNodePos.z)
    terrainGroup.add(pulseRingMesh)
  }

  // --- 5. 3D ANIMATED MASCOT KIKO ---
  mascotGroup = new THREE.Group()
  if (activeNodePos) {
    mascotGroup.position.copy(activeNodePos)
  } else if (nodes.length > 0) {
    mascotGroup.position.set(nodes[0].position.x, nodes[0].position.y + 0.85, nodes[0].position.z)
  }

  const bodyGeo = new THREE.SphereGeometry(0.3, 20, 20)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.3 })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.castShadow = true
  mascotGroup.add(body)

  const beakGeo = new THREE.ConeGeometry(0.09, 0.2, 12)
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xffb700, roughness: 0.2 })
  const beak = new THREE.Mesh(beakGeo, beakMat)
  beak.rotation.x = Math.PI * 0.5
  beak.position.set(0, 0, 0.3)
  mascotGroup.add(beak)

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), eyeMat)
  lEye.position.set(-0.1, 0.08, 0.24)
  const lPupil = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), pupilMat)
  lPupil.position.set(-0.1, 0.08, 0.29)
  mascotGroup.add(lEye)
  mascotGroup.add(lPupil)

  const rEye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), eyeMat)
  rEye.position.set(0.1, 0.08, 0.24)
  const rPupil = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), pupilMat)
  rPupil.position.set(0.1, 0.08, 0.29)
  mascotGroup.add(rEye)
  mascotGroup.add(rPupil)

  terrainGroup.add(mascotGroup)

  // Listeners
  const dom = renderer.domElement
  dom.addEventListener('mousedown', onMouseDown)
  dom.addEventListener('mousemove', onMouseMove)
  dom.addEventListener('mouseup', onMouseUp)
  dom.addEventListener('click', onClickCanvas)

  animate()
}

const updateProjectedNodeBadges = () => {
  if (!camera || !canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  const projected: any[] = []

  rawNodesList.forEach(node => {
    // Project 3D vector to 2D screen coordinate
    const vec = new THREE.Vector3(node.position.x, node.position.y + 0.95, node.position.z)
    vec.project(camera)

    const screenX = (vec.x * 0.5 + 0.5) * width
    const screenY = (-vec.y * 0.5 + 0.5) * height

    projected.push({
      ...node,
      screenX,
      screenY
    })
  })

  projectedNodes.value = projected
}

const onMouseDown = (e: MouseEvent) => {
  mouse.isDragging = false
  mouse.previousMouseX = e.clientX
  mouse.previousMouseY = e.clientY
}

const onMouseMove = (e: MouseEvent) => {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

  if (camera && scene) {
    raycaster.setFromCamera(mouseVector, camera)
    const intersects = raycaster.intersectObjects(nodeMeshes)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      const data = hitObj.userData.nodeData
      if (data && data.isUnlocked) {
        hoveredNode.value = data
        terrainGroup.children.forEach((child) => {
          if (child.userData.id === data.id) {
            child.userData.targetY = 0.25
          } else {
            child.userData.targetY = 0
          }
        })
      } else {
        hoveredNode.value = null
      }
    } else {
      hoveredNode.value = null
      terrainGroup.children.forEach((child) => {
        child.userData.targetY = 0
      })
    }
  }
}

const onMouseUp = () => {
  mouse.isDragging = false
}

const onClickCanvas = () => {
  if (camera && scene) {
    raycaster.setFromCamera(mouseVector, camera)
    const intersects = raycaster.intersectObjects(nodeMeshes)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      const data = hitObj.userData.nodeData
      if (data && data.isUnlocked) {
        selectedNode.value = data
      }
    }
  }
}

const launchQuiz = (node: any) => {
  if (node && node.isUnlocked) {
    emit('node-click', { unitId: props.unit.id, itemId: node.id, type: node.type })
  }
}

const clock = new THREE.Clock()

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  // Mascot Happy Hopping
  if (mascotGroup) {
    mascotGroup.position.y = 0.85 + Math.abs(Math.sin(time * 4)) * 0.18
  }

  // Active Position Pulsing Ring Animation
  if (pulseRingMesh) {
    const scale = 1.0 + Math.sin(time * 5) * 0.25
    pulseRingMesh.scale.set(scale, scale, 1)
    const mat = pulseRingMesh.material as THREE.MeshBasicMaterial
    mat.opacity = 0.4 + Math.sin(time * 5) * 0.4
  }

  // Project 3D node points to 2D HTML badges in real time
  updateProjectedNodeBadges()

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
