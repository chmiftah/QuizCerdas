<template>
  <div class="relative w-full h-[620px] sm:h-[720px] rounded-[36px] overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50 border-4 border-sky-300 shadow-2xl select-none group">
    <!-- WebGL Canvas Container -->
    <div ref="canvasContainer" class="w-full h-full cursor-pointer"></div>

    <!-- Floating Top Bar Badge & Controls -->
    <div class="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
      <div class="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-emerald-400/80 text-slate-800 font-heading text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span>🌴 Peta Terrain 3D • {{ unitTitle }}</span>
      </div>

      <div class="flex items-center gap-2 pointer-events-auto">
        <button 
          @click="resetCamera"
          class="px-3.5 py-2 bg-white/90 hover:bg-white text-emerald-700 border-2 border-emerald-300 rounded-xl font-heading font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>🔄 Reset Posisi</span>
        </button>
      </div>
    </div>

    <!-- Persistent & Hover Active Node Popover HUD Card -->
    <Transition name="bounce-popover">
      <div 
        v-if="activeCardNode"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 bg-white/95 backdrop-blur-xl border-4 rounded-3xl text-slate-800 font-heading shadow-2xl z-30 pointer-events-auto flex items-center gap-4 max-w-md w-[92%] animate-pop"
        :class="activeCardNode.type === 'checkpoint' ? 'border-amber-400' : 'border-emerald-400'"
      >
        <div 
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg cursor-pointer"
          :class="activeCardNode.type === 'checkpoint' ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950' : 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white'"
          @click="onStartNode(activeCardNode)"
        >
          {{ activeCardNode.type === 'checkpoint' ? '👑' : (activeCardNode.isCompleted ? '✓' : '⭐') }}
        </div>

        <div class="text-left space-y-1 flex-1 min-w-0 cursor-pointer" @click="onStartNode(activeCardNode)">
          <div class="flex items-center gap-2">
            <span 
              class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-2xs"
              :class="activeCardNode.type === 'checkpoint' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'"
            >
              {{ activeCardNode.type === 'checkpoint' ? '👑 UJIAN CHECKPOINT' : `🎯 PELAJARAN ${activeCardNode.order}` }}
            </span>
            <span class="text-[10px] text-amber-600 font-black">+{{ activeCardNode.type === 'checkpoint' ? '50' : '20' }} XP</span>
          </div>

          <h4 class="text-base font-black text-slate-800 truncate">{{ activeCardNode.title }}</h4>
          <p class="text-xs text-slate-600 font-body truncate">
            {{ activeCardNode.isCompleted ? '✅ Selesai! Klik untuk mengulang' : (activeCardNode.isUnlocked ? '🚀 Klik tombol untuk mulai kuis!' : '🔒 Terkunci. Selesaikan materi sebelumnya') }}
          </p>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button 
            @click="onStartNode(activeCardNode)"
            class="px-4 py-2.5 rounded-xl font-heading font-black text-xs shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
            :class="activeCardNode.type === 'checkpoint' ? 'duo-btn-yellow' : 'duo-btn-green'"
          >
            MULAI
          </button>
          
          <button 
            @click="selectedNode = null"
            class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-black flex items-center justify-center cursor-pointer border border-slate-300"
            title="Tutup Popup"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>

    <!-- Bottom Helper Overlay -->
    <div class="absolute bottom-3 left-4 text-xs font-heading font-bold text-slate-700 bg-white/80 px-3.5 py-1.5 rounded-xl backdrop-blur-sm pointer-events-none shadow-xs border border-white">
      💡 Klik node 3D mana saja untuk memilih & memulai kuis!
    </div>
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

// Compute active node card: selectedNode takes priority so card stays open when mouse moves!
const activeCardNode = computed(() => selectedNode.value || hoveredNode.value)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

let terrainGroup: THREE.Group
let mascotGroup: THREE.Group
const nodeMeshes: THREE.Mesh[] = []

const mouse = { x: 0, y: 0, isDragging: false, previousMouseX: 0, previousMouseY: 0 }
const raycaster = new THREE.Raycaster()
const mouseVector = new THREE.Vector2()

const unitTitle = ref(props.unit.title || 'Terrain 3D Petualangan')

// Calculate Vertical S-Curve Nodes matching the user's screenshot layout
const getVerticalTrackNodes = () => {
  const nodes: any[] = []
  const lessons = props.unit.lessons || []
  const totalCount = lessons.length + 1 // lessons + checkpoint

  // Vertical Z layout from Top (Z = -4.2) to Bottom (Z = +4.2)
  const startZ = -4.2
  const zSpacing = 8.4 / Math.max(totalCount - 1, 1)
  const xOffsets = [-1.5, 1.5, -1.5, 1.5, -1.5, 1.5]

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
      position: { x, y: 0.65, z },
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
  scene.background = new THREE.Color(0xe0f2fe)
  scene.fog = new THREE.FogExp2(0xe0f2fe, 0.025)

  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
  camera.position.set(0, 14.5, 3.5)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvasContainer.value.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2)
  sunLight.position.set(8, 18, 8)
  sunLight.castShadow = true
  sunLight.shadow.mapSize.width = 1024
  sunLight.shadow.mapSize.height = 1024
  scene.add(sunLight)

  terrainGroup = new THREE.Group()
  scene.add(terrainGroup)

  // --- 1. VERTICAL 3D TERRAIN ISLAND PLATFORM ---
  const baseBoxGeo = new THREE.BoxGeometry(6.5, 1.0, 11.5)
  const cliffMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.8 })
  const baseCliff = new THREE.Mesh(baseBoxGeo, cliffMat)
  baseCliff.position.y = -0.1
  baseCliff.receiveShadow = true
  terrainGroup.add(baseCliff)

  const grassTopGeo = new THREE.BoxGeometry(6.4, 0.35, 11.4)
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x4caf50, roughness: 0.5 })
  const grassSurface = new THREE.Mesh(grassTopGeo, grassMat)
  grassSurface.position.y = 0.5
  grassSurface.receiveShadow = true
  terrainGroup.add(grassSurface)

  // --- 2. WINDING BLUE/YELLOW PATHWAY ---
  const nodes = getVerticalTrackNodes()
  const pathPoints = nodes.map(n => new THREE.Vector3(n.position.x, 0.68, n.position.z))
  const curve = new THREE.CatmullRomCurve3(pathPoints)

  const roadTubeGeo = new THREE.TubeGeometry(curve, 64, 0.5, 12, false)
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 })
  const road = new THREE.Mesh(roadTubeGeo, roadMat)
  road.receiveShadow = true
  terrainGroup.add(road)

  const innerTubeGeo = new THREE.TubeGeometry(curve, 64, 0.15, 8, false)
  const innerMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2 })
  const innerRoad = new THREE.Mesh(innerTubeGeo, innerMat)
  innerRoad.position.y = 0.72
  terrainGroup.add(innerRoad)

  // --- 3. 3D ENVIRONMENT DECORATIONS ---
  const treeSidePositions = [
    { x: -2.6, z: -5.0 },
    { x: 2.6, z: -3.2 },
    { x: -2.7, z: -1.2 },
    { x: 2.7, z: 0.8 },
    { x: -2.6, z: 2.8 },
    { x: 2.6, z: 4.8 }
  ]

  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.8, 12)
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 })
  const leavesGeo = new THREE.SphereGeometry(0.55, 16, 16)
  const leavesMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.4 })

  treeSidePositions.forEach(pos => {
    const tGroup = new THREE.Group()
    tGroup.position.set(pos.x, 0.68, pos.z)

    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.y = 0.4
    trunk.castShadow = true
    tGroup.add(trunk)

    const leaves = new THREE.Mesh(leavesGeo, leavesMat)
    leaves.position.y = 1.0
    leaves.castShadow = true
    tGroup.add(leaves)

    terrainGroup.add(tGroup)
  })

  // 3D Fluffy Clouds
  const cloudPositions = [
    { x: 2.8, z: -4.0, y: 3.2 },
    { x: -2.8, z: -0.5, y: 3.5 },
    { x: 2.8, z: 3.0, y: 3.0 }
  ]
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const cloudGeo = new THREE.SphereGeometry(0.45, 16, 16)

  cloudPositions.forEach(pos => {
    const cGroup = new THREE.Group()
    cGroup.position.set(pos.x, pos.y, pos.z)

    const c1 = new THREE.Mesh(cloudGeo, cloudMat)
    const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), cloudMat)
    c2.position.set(0.3, 0.1, 0)
    cGroup.add(c1)
    cGroup.add(c2)
    terrainGroup.add(cGroup)
  })

  // --- 4. STEPPING NODE BUTTONS & CHECKPOINT NODE ---
  let activeNodePos: THREE.Vector3 | null = null

  nodes.forEach((node) => {
    const nodeGroup = new THREE.Group()
    nodeGroup.position.set(node.position.x, node.position.y, node.position.z)

    // Base Cobblestone 3D Disc Ring
    const ringGeo = new THREE.CylinderGeometry(0.9, 0.95, 0.3, 24)
    const ringMat = new THREE.MeshStandardMaterial({ 
      color: node.isCompleted ? 0xffb700 : (node.isUnlocked ? 0x43a047 : 0x94a3b8),
      roughness: 0.3 
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.y = 0.15
    ring.castShadow = true
    ring.userData = { nodeData: node }
    nodeGroup.add(ring)
    nodeMeshes.push(ring)

    if (node.type === 'checkpoint') {
      const cpBoxGeo = new THREE.BoxGeometry(1.2, 0.7, 1.2)
      const cpBoxMat = new THREE.MeshStandardMaterial({ color: 0xff9800, roughness: 0.2, metalness: 0.5 })
      const cpBox = new THREE.Mesh(cpBoxGeo, cpBoxMat)
      cpBox.position.y = 0.6
      cpBox.castShadow = true
      cpBox.userData = { nodeData: node }
      nodeGroup.add(cpBox)
      nodeMeshes.push(cpBox)

      const crownGeo = new THREE.OctahedronGeometry(0.45, 0)
      const crownMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.1, metalness: 0.8 })
      const crown = new THREE.Mesh(crownGeo, crownMat)
      crown.position.y = 1.4
      nodeGroup.add(crown)
    } else {
      const gemGeo = new THREE.SphereGeometry(0.55, 24, 24)
      const gemMat = new THREE.MeshStandardMaterial({ 
        color: node.isCompleted ? 0xffd54f : (node.isUnlocked ? 0x66bb6a : 0xcbd5e1),
        roughness: 0.2,
        metalness: 0.3 
      })
      const gem = new THREE.Mesh(gemGeo, gemMat)
      gem.position.y = 0.55
      gem.castShadow = true
      gem.userData = { nodeData: node }
      nodeGroup.add(gem)
      nodeMeshes.push(gem)
    }

    if (node.isUnlocked && !node.isCompleted && !activeNodePos) {
      activeNodePos = new THREE.Vector3(node.position.x, node.position.y + 1.1, node.position.z)
    }

    nodeGroup.userData = { id: node.id, targetY: 0, data: node }
    terrainGroup.add(nodeGroup)
  })

  // --- 5. 3D ANIMATED MASCOT KIKO STANDING ON ACTIVE NODE ---
  mascotGroup = new THREE.Group()
  if (activeNodePos) {
    mascotGroup.position.copy(activeNodePos)
  } else if (nodes.length > 0) {
    mascotGroup.position.set(nodes[0].position.x, nodes[0].position.y + 1.1, nodes[0].position.z)
  }

  const bodyGeo = new THREE.SphereGeometry(0.38, 20, 20)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.3 })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.castShadow = true
  mascotGroup.add(body)

  const beakGeo = new THREE.ConeGeometry(0.12, 0.25, 12)
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xffb700, roughness: 0.2 })
  const beak = new THREE.Mesh(beakGeo, beakMat)
  beak.rotation.x = Math.PI * 0.5
  beak.position.set(0, 0, 0.38)
  mascotGroup.add(beak)

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), eyeMat)
  lEye.position.set(-0.13, 0.1, 0.3)
  const lPupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), pupilMat)
  lPupil.position.set(-0.13, 0.1, 0.36)
  mascotGroup.add(lEye)
  mascotGroup.add(lPupil)

  const rEye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), eyeMat)
  rEye.position.set(0.13, 0.1, 0.3)
  const rPupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), pupilMat)
  rPupil.position.set(0.13, 0.1, 0.36)
  mascotGroup.add(rEye)
  mascotGroup.add(rPupil)

  terrainGroup.add(mascotGroup)

  // Mouse & Click Listeners
  const dom = renderer.domElement
  dom.addEventListener('mousedown', onMouseDown)
  dom.addEventListener('mousemove', onMouseMove)
  dom.addEventListener('mouseup', onMouseUp)
  dom.addEventListener('click', onClickCanvas)

  animate()
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

  // Raycasting hover
  if (camera && scene) {
    raycaster.setFromCamera(mouseVector, camera)
    const intersects = raycaster.intersectObjects(nodeMeshes)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      const data = hitObj.userData.nodeData
      if (data) {
        hoveredNode.value = data
        terrainGroup.children.forEach((child) => {
          if (child.userData.id === data.id) {
            child.userData.targetY = 0.35
          } else {
            child.userData.targetY = 0
          }
        })
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

// Click Canvas Direct Trigger Handler
const onClickCanvas = () => {
  if (camera && scene) {
    raycaster.setFromCamera(mouseVector, camera)
    const intersects = raycaster.intersectObjects(nodeMeshes)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      const data = hitObj.userData.nodeData
      if (data) {
        selectedNode.value = data
        // If node is unlocked, immediately launch quiz or keep card persistent
        if (data.isUnlocked) {
          onStartNode(data)
        }
      }
    }
  }
}

const onStartNode = (node: any) => {
  if (node) {
    selectedNode.value = node
    emit('node-click', { unitId: props.unit.id, itemId: node.id, type: node.type })
  }
}

const resetCamera = () => {
  selectedNode.value = null
  hoveredNode.value = null
  if (terrainGroup) terrainGroup.rotation.y = 0
  camera.position.set(0, 14.5, 3.5)
  camera.lookAt(0, 0, 0)
}

const clock = new THREE.Clock()

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  if (mascotGroup) {
    mascotGroup.position.y = 1.1 + Math.abs(Math.sin(time * 4)) * 0.2
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
