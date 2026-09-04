<template>
  <div class="relative w-full h-[550px] sm:h-[650px] rounded-[32px] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-4 border-slate-700 shadow-2xl select-none group">
    <!-- WebGL Canvas Container -->
    <div ref="canvasContainer" class="w-full h-full cursor-grab active:cursor-grabbing"></div>

    <!-- Floating Top Control Bar -->
    <div class="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
      <div class="px-4 py-2 bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-700 text-white font-heading text-xs font-black flex items-center gap-2 shadow-lg">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
        <span>🗺️ Jalur Petualangan 3D • {{ unitTitle }}</span>
      </div>

      <div class="flex items-center gap-2 pointer-events-auto">
        <button 
          @click="toggleAutoRotate"
          class="px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-slate-600 rounded-xl font-heading font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>{{ isAutoRotating ? '⏸️ Jeda' : '▶️ Putar 3D' }}</span>
        </button>
        <button 
          @click="resetCamera"
          class="px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-300 border border-slate-600 rounded-xl font-heading font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>🔄 Reset Kamera</span>
        </button>
      </div>
    </div>

    <!-- Active Hover Node Tooltip Popover HUD -->
    <Transition name="bounce-popover">
      <div 
        v-if="hoveredNode"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 bg-slate-900/95 backdrop-blur-xl border-4 rounded-3xl text-white font-heading shadow-2xl z-20 pointer-events-auto cursor-pointer animate-pop flex items-center gap-4 max-w-md w-[90%]"
        :class="hoveredNode.type === 'checkpoint' ? 'border-amber-400 bg-amber-950/95' : 'border-emerald-400 bg-slate-900/95'"
        @click="onStartNode(hoveredNode)"
      >
        <div 
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg"
          :class="hoveredNode.type === 'checkpoint' ? 'bg-amber-400 text-amber-950' : 'bg-emerald-500 text-white'"
        >
          {{ hoveredNode.type === 'checkpoint' ? '👑' : (hoveredNode.isCompleted ? '✓' : '⭐') }}
        </div>

        <div class="text-left space-y-1 flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span 
              class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
              :class="hoveredNode.type === 'checkpoint' ? 'bg-amber-400 text-amber-950' : 'bg-emerald-400 text-slate-900'"
            >
              {{ hoveredNode.type === 'checkpoint' ? '👑 UJIAN CHECKPOINT' : '🎯 PELAJARAN 3D' }}
            </span>
            <span class="text-[10px] text-amber-300 font-extrabold">+{{ hoveredNode.type === 'checkpoint' ? '50' : '20' }} XP</span>
          </div>

          <h4 class="text-base font-black text-white truncate">{{ hoveredNode.title }}</h4>
          <p class="text-xs text-slate-300 font-body truncate">
            {{ hoveredNode.isCompleted ? '✅ Pelajaran telah diselesaikan!' : (hoveredNode.isUnlocked ? '🚀 Klik untuk mulai kuis 3D!' : '🔒 Selesaikan pelajaran sebelumnya') }}
          </p>
        </div>

        <button 
          class="px-4 py-2.5 rounded-xl font-heading font-black text-xs shadow-lg shrink-0"
          :class="hoveredNode.type === 'checkpoint' ? 'duo-btn-yellow' : 'duo-btn-green'"
        >
          MULAI
        </button>
      </div>
    </Transition>

    <!-- Bottom Drag Helper Overlay -->
    <div class="absolute bottom-3 left-4 text-xs font-heading font-bold text-slate-400 bg-slate-950/70 px-3.5 py-1.5 rounded-xl backdrop-blur-sm pointer-events-none">
      💡 Putar jalur 3D dengan kursor • Klik node emas/hijau 3D untuk belajar
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
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

let pathGroup: THREE.Group
let mascotGroup: THREE.Group
const nodeMeshes: THREE.Mesh[] = []

const mouse = { x: 0, y: 0, isDragging: false, previousMouseX: 0, previousMouseY: 0 }
const raycaster = new THREE.Raycaster()
const mouseVector = new THREE.Vector2()

const unitTitle = ref(props.unit.title || 'Unit Pembelajaran 3D')

// Generate 3D Node points along a winding S-curve track
const getTrackNodes = () => {
  const nodes: any[] = []
  const lessons = props.unit.lessons || []

  const xPositions = [-2.5, 2.5, -2.5, 2.5]
  const zPositions = [-4.0, -1.5, 1.0, 3.5]

  lessons.forEach((l: any, idx: number) => {
    const x = xPositions[idx % xPositions.length]
    const z = zPositions[idx % zPositions.length] || (idx * 2.2 - 3.5)
    const isCompleted = props.completedLessons.includes(l.id)
    const isUnlocked = idx === 0 || props.completedLessons.includes(lessons[idx - 1]?.id)

    nodes.push({
      id: l.id,
      title: l.title,
      type: 'lesson',
      position: { x, y: 0.5, z },
      isCompleted,
      isUnlocked
    })
  })

  // Add Checkpoint Node at the end
  const cpId = props.unit.checkpoint?.id || `checkpoint_${props.unit.id}`
  const cpTitle = props.unit.checkpoint?.title || `Checkpoint Unit ${props.unit.order}`
  const lastZ = nodes.length > 0 ? nodes[nodes.length - 1].position.z + 2.5 : 3.5
  const isCpCompleted = props.completedCheckpoints.includes(cpId)
  const isCpUnlocked = lessons.every((l: any) => props.completedLessons.includes(l.id))

  nodes.push({
    id: cpId,
    title: cpTitle,
    type: 'checkpoint',
    position: { x: 0, y: 0.5, z: lastZ },
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
  scene.background = new THREE.Color(0x0f172a)

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 9, 12)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  canvasContainer.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)
  dirLight.position.set(10, 15, 10)
  scene.add(dirLight)

  const pointLight = new THREE.PointLight(0x58cc02, 3, 15)
  pointLight.position.set(0, 4, 0)
  scene.add(pointLight)

  pathGroup = new THREE.Group()
  scene.add(pathGroup)

  // 3D Island Base Platform
  const islandGeo = new THREE.CylinderGeometry(6, 6, 0.6, 32)
  const islandMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
  const islandBase = new THREE.Mesh(islandGeo, islandMat)
  islandBase.position.y = -0.3
  pathGroup.add(islandBase)

  const grassGeo = new THREE.CylinderGeometry(5.8, 5.8, 0.2, 32)
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 })
  const grassTop = new THREE.Mesh(grassGeo, grassMat)
  grassTop.position.y = 0.1
  pathGroup.add(grassTop)

  // Build Track Curved Line & Nodes
  const nodes = getTrackNodes()
  const curvePoints = nodes.map(n => new THREE.Vector3(n.position.x, 0.25, n.position.z))
  const curve = new THREE.CatmullRomCurve3(curvePoints)
  
  const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.25, 12, false)
  const tubeMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.4 })
  const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat)
  pathGroup.add(tubeMesh)

  // Build 3D Node Meshes
  let activeNodePos: THREE.Vector3 | null = null

  nodes.forEach((node) => {
    const nodeGroup = new THREE.Group()
    nodeGroup.position.set(node.position.x, node.position.y, node.position.z)

    // Base Cobblestone 3D Pedestal
    const basePedestalGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.3, 16)
    const basePedestalMat = new THREE.MeshStandardMaterial({ 
      color: node.isCompleted ? 0xf59e0b : (node.isUnlocked ? 0x10b981 : 0x64748b),
      roughness: 0.3
    })
    const pedestal = new THREE.Mesh(basePedestalGeo, basePedestalMat)
    pedestal.userData = { nodeData: node }
    nodeGroup.add(pedestal)
    nodeMeshes.push(pedestal)

    // 3D Gem / Star Node Top
    if (node.type === 'checkpoint') {
      // 3D Crown/Trophy Base
      const cpGeo = new THREE.BoxGeometry(1.0, 0.7, 1.0)
      const cpMat = new THREE.MeshStandardMaterial({ color: 0xffb700, roughness: 0.1, metalness: 0.8 })
      const cpMesh = new THREE.Mesh(cpGeo, cpMat)
      cpMesh.position.y = 0.45
      cpMesh.userData = { nodeData: node }
      nodeGroup.add(cpMesh)
      nodeMeshes.push(cpMesh)

      // Floating 3D Golden Star
      const starGeo = new THREE.OctahedronGeometry(0.45, 0)
      const starMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.1, metalness: 0.7 })
      const star = new THREE.Mesh(starGeo, starMat)
      star.position.y = 1.3
      nodeGroup.add(star)
    } else {
      // 3D Sphere Gem Node
      const gemGeo = new THREE.SphereGeometry(0.55, 24, 24)
      const gemMat = new THREE.MeshStandardMaterial({ 
        color: node.isCompleted ? 0xffc800 : (node.isUnlocked ? 0x58cc02 : 0x94a3b8),
        roughness: 0.2,
        metalness: 0.4
      })
      const gemMesh = new THREE.Mesh(gemGeo, gemMat)
      gemMesh.position.y = 0.55
      gemMesh.userData = { nodeData: node }
      nodeGroup.add(gemMesh)
      nodeMeshes.push(gemMesh)
    }

    if (node.isUnlocked && !node.isCompleted && !activeNodePos) {
      activeNodePos = new THREE.Vector3(node.position.x, node.position.y + 1.2, node.position.z)
    }

    nodeGroup.userData = { id: node.id, targetY: 0, data: node }
    pathGroup.add(nodeGroup)
  })

  // Build 3D Kiko Mascot standing on active node
  mascotGroup = new THREE.Group()
  if (activeNodePos) {
    mascotGroup.position.copy(activeNodePos)
  } else if (nodes.length > 0) {
    mascotGroup.position.set(nodes[0].position.x, nodes[0].position.y + 1.2, nodes[0].position.z)
  }

  // Mascot Body (Green sphere)
  const bodyGeo = new THREE.SphereGeometry(0.35, 16, 16)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.3 })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  mascotGroup.add(body)

  // Mascot Beak
  const beakGeo = new THREE.ConeGeometry(0.12, 0.25, 12)
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2 })
  const beak = new THREE.Mesh(beakGeo, beakMat)
  beak.rotation.x = Math.PI * 0.5
  beak.position.set(0, 0, 0.35)
  mascotGroup.add(beak)

  // Mascot Eyes
  const eyeGeo = new THREE.SphereGeometry(0.08, 12, 12)
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 })

  const leftEye = new THREE.Mesh(eyeGeo, eyeMat)
  leftEye.position.set(-0.12, 0.1, 0.28)
  const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), pupilMat)
  leftPupil.position.set(-0.12, 0.1, 0.34)
  mascotGroup.add(leftEye)
  mascotGroup.add(leftPupil)

  const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
  rightEye.position.set(0.12, 0.1, 0.28)
  const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), pupilMat)
  rightPupil.position.set(0.12, 0.1, 0.34)
  mascotGroup.add(rightEye)
  mascotGroup.add(rightPupil)

  pathGroup.add(mascotGroup)

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

  if (mouse.isDragging && pathGroup) {
    const deltaX = e.clientX - mouse.previousMouseX
    pathGroup.rotation.y += deltaX * 0.005
    mouse.previousMouseX = e.clientX
    mouse.previousMouseY = e.clientY
  }

  // Raycasting node hover
  if (camera && scene) {
    raycaster.setFromCamera(mouseVector, camera)
    const intersects = raycaster.intersectObjects(nodeMeshes)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      const data = hitObj.userData.nodeData
      if (data) {
        hoveredNode.value = data
        pathGroup.children.forEach((child) => {
          if (child.userData.id === data.id) {
            child.userData.targetY = 0.35
          } else {
            child.userData.targetY = 0
          }
        })
      }
    } else {
      hoveredNode.value = null
      pathGroup.children.forEach((child) => {
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
  if (pathGroup) pathGroup.rotation.y = 0
  camera.position.set(0, 9, 12)
  camera.lookAt(0, 0, 0)
}

const clock = new THREE.Clock()

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  if (pathGroup && isAutoRotating.value && !mouse.isDragging) {
    pathGroup.rotation.y += 0.002
  }

  // Bobbing animation for mascot Kiko
  if (mascotGroup) {
    mascotGroup.position.y = 1.2 + Math.sin(time * 3) * 0.15
    mascotGroup.rotation.y = Math.sin(time * 2) * 0.2
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
