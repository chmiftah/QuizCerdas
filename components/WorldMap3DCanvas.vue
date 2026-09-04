<template>
  <div class="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden bg-slate-900 border-4 border-slate-700 shadow-2xl select-none group">
    <!-- WebGL Canvas Container -->
    <div ref="canvasContainer" class="w-full h-full cursor-grab active:cursor-grabbing"></div>

    <!-- Floating Top Bar Badge & Controls -->
    <div class="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
      <div class="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 text-white font-heading text-xs font-black flex items-center gap-2 shadow-lg">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span>🌴 Peta Kepulauan Belajarku (3D WebGL)</span>
      </div>

      <div class="flex items-center gap-2 pointer-events-auto">
        <button 
          @click="toggleAutoRotate"
          class="px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-slate-600 rounded-xl font-heading font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>{{ isAutoRotating ? '⏸️ Jeda Rotasi' : '▶️ Putar Peta' }}</span>
        </button>
        <button 
          @click="resetCamera"
          class="px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-sky-300 border border-slate-600 rounded-xl font-heading font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>🔄 Reset Kamera</span>
        </button>
      </div>
    </div>

    <!-- Active Island Hover HUD Tooltip -->
    <Transition name="fade">
      <div 
        v-if="hoveredIsland"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900/95 backdrop-blur-xl border-2 border-emerald-400/80 rounded-2xl text-white font-heading text-center shadow-2xl z-20 pointer-events-auto cursor-pointer animate-pop flex items-center gap-3"
        @click="openHoveredCourse"
      >
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg" :class="hoveredIsland.bgClass">
          {{ hoveredIsland.icon }}
        </div>
        <div class="text-left space-y-0.5">
          <p class="text-xs text-emerald-400 font-extrabold uppercase tracking-wider">KLIK UNTUK MEMBUKA</p>
          <h4 class="text-lg font-black text-white">{{ hoveredIsland.title }}</h4>
          <p class="text-[11px] text-slate-300 font-body">{{ hoveredIsland.description }}</p>
        </div>
        <div class="pl-2 text-xl text-emerald-400 font-black">➔</div>
      </div>
    </Transition>

    <!-- Bottom Instructions Bar -->
    <div class="absolute bottom-3 left-4 text-xs font-heading font-bold text-slate-400 bg-slate-950/70 px-3 py-1 rounded-xl backdrop-blur-sm pointer-events-none">
      💡 Geser kursor untuk memutar peta • Klik pulau untuk membuka modul
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const emit = defineEmits(['select-course'])

const props = defineProps({
  courses: {
    type: Array as () => any[],
    default: () => []
  }
})

const canvasContainer = ref<HTMLDivElement | null>(null)
const hoveredIsland = ref<any | null>(null)
const isAutoRotating = ref(true)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

let islandsGroup: THREE.Group
let oceanMesh: THREE.Mesh
const islandMeshes: THREE.Mesh[] = []

const mouse = { x: 0, y: 0, isDragging: false, previousMouseX: 0, previousMouseY: 0 }
const raycaster = new THREE.Raycaster()
const mouseVector = new THREE.Vector2()

const islandData = [
  {
    id: 'counting_101',
    category: 'math',
    title: 'Pulau Matematika & Angka 3D',
    description: 'Pengenalan Angka, Berhitung Visual, dan Penjumlahan Dasar',
    icon: '🔢',
    bgClass: 'bg-duo-green text-white',
    color: 0x58cc02,
    position: { x: -3.2, z: -1.5 },
    buildElements: (group: THREE.Group) => {
      // 3D Math Elements (Number Blocks 1, 2, Plus Sign)
      const numMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.6 })
      const blockGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6)

      const block1 = new THREE.Mesh(blockGeo, numMat)
      block1.position.set(-0.4, 0.8, -0.3)
      block1.rotation.y = 0.4
      group.add(block1)

      const block2 = new THREE.Mesh(blockGeo, numMat)
      block2.position.set(0.4, 1.1, 0.2)
      block2.rotation.y = -0.3
      group.add(block2)

      // Plus Sign
      const plusGeo1 = new THREE.BoxGeometry(0.6, 0.18, 0.18)
      const plusGeo2 = new THREE.BoxGeometry(0.18, 0.6, 0.18)
      const plusMat = new THREE.MeshStandardMaterial({ color: 0xff4b4b, roughness: 0.2 })
      const plus1 = new THREE.Mesh(plusGeo1, plusMat)
      const plus2 = new THREE.Mesh(plusGeo2, plusMat)
      const plusGroup = new THREE.Group()
      plusGroup.add(plus1)
      plusGroup.add(plus2)
      plusGroup.position.set(0, 1.6, 0)
      group.add(plusGroup)
    }
  },
  {
    id: 'science_animals_101',
    category: 'science',
    title: 'Hutan Sains & Dunia Hewan 3D',
    description: 'Eksplorasi Nama-Nama Hewan, Habitat, & Klasifikasi Objek',
    icon: '🦁',
    bgClass: 'bg-sky-500 text-white',
    color: 0x1cb0f6,
    position: { x: 3.2, z: -1.5 },
    buildElements: (group: THREE.Group) => {
      // 3D Trees & Globe
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 })
      const leavesMat = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.3 })

      const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.7, 12)
      const leavesGeo = new THREE.ConeGeometry(0.55, 1.1, 16)

      // Tree 1
      const t1Trunk = new THREE.Mesh(trunkGeo, trunkMat)
      t1Trunk.position.set(-0.5, 0.6, -0.3)
      const t1Leaves = new THREE.Mesh(leavesGeo, leavesMat)
      t1Leaves.position.set(-0.5, 1.3, -0.3)
      group.add(t1Trunk)
      group.add(t1Leaves)

      // 3D Orbiting Planet Earth
      const earthGeo = new THREE.SphereGeometry(0.5, 24, 24)
      const earthMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57, roughness: 0.4 })
      const earth = new THREE.Mesh(earthGeo, earthMat)
      earth.position.set(0.3, 1.4, 0.2)
      group.add(earth)
    }
  },
  {
    id: 'indonesian_vocab_101',
    category: 'indonesian',
    title: 'Istana Bahasa Indonesia 3D',
    description: 'Pengenalan Abjad, Kosa Kata Bergambar, dan Membaca Nyaring',
    icon: '📚',
    bgClass: 'bg-duo-purple text-white',
    color: 0xce82ff,
    position: { x: -2.0, z: 2.5 },
    buildElements: (group: THREE.Group) => {
      // 3D Castle Tower & Open Book
      const towerMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.3 })
      const roofMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.2 })

      const towerGeo = new THREE.CylinderGeometry(0.5, 0.6, 1.2, 16)
      const roofGeo = new THREE.ConeGeometry(0.7, 0.8, 16)

      const tower = new THREE.Mesh(towerGeo, towerMat)
      tower.position.set(0, 0.8, 0)
      const roof = new THREE.Mesh(roofGeo, roofMat)
      roof.position.set(0, 1.7, 0)

      group.add(tower)
      group.add(roof)

      // 3D Floating Book Pages
      const bookGeo = new THREE.BoxGeometry(0.8, 0.1, 0.6)
      const bookMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2 })
      const book = new THREE.Mesh(bookGeo, bookMat)
      book.position.set(0, 2.3, 0)
      book.rotation.z = 0.2
      group.add(book)
    }
  },
  {
    id: 'art_geometry_101',
    category: 'art',
    title: 'Taman Seni & Geometri 3D',
    description: 'Mengenal Bentuk 2D/3D, Warna Primer, & Pola Visual',
    icon: '🎨',
    bgClass: 'bg-duo-yellow text-slate-900',
    color: 0xffc800,
    position: { x: 2.0, z: 2.5 },
    buildElements: (group: THREE.Group) => {
      // 3D Gem Crystals & Palette
      const gemGeo = new THREE.OctahedronGeometry(0.55, 0)
      const gemMat = new THREE.MeshStandardMaterial({ color: 0xff4081, roughness: 0.1, metalness: 0.5 })
      const gem = new THREE.Mesh(gemGeo, gemMat)
      gem.position.set(0, 1.3, 0)
      group.add(gem)

      const torusGeo = new THREE.TorusGeometry(0.7, 0.08, 16, 32)
      const torusMat = new THREE.MeshStandardMaterial({ color: 0x00e676, roughness: 0.2 })
      const ring = new THREE.Mesh(torusGeo, torusMat)
      ring.position.set(0, 1.3, 0)
      ring.rotation.x = Math.PI * 0.4
      group.add(ring)
    }
  }
]

const init3D = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0f172a)

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 8.5, 11)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  canvasContainer.value.appendChild(renderer.domElement)

  // Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)
  dirLight.position.set(10, 15, 10)
  scene.add(dirLight)

  const bluePointLight = new THREE.PointLight(0x1cb0f6, 4, 20)
  bluePointLight.position.set(0, 3, 0)
  scene.add(bluePointLight)

  // Ocean Grid Base
  const oceanGeo = new THREE.CylinderGeometry(8.5, 8.5, 0.4, 64)
  const oceanMat = new THREE.MeshStandardMaterial({ 
    color: 0x1e293b, 
    roughness: 0.1, 
    metalness: 0.3,
    transparent: true,
    opacity: 0.95 
  })
  oceanMesh = new THREE.Mesh(oceanGeo, oceanMat)
  oceanMesh.position.y = -0.2
  scene.add(oceanMesh)

  // Decorative Outer Ocean Ring
  const ringGeo = new THREE.RingGeometry(8.6, 9.2, 64)
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
  const ringMesh = new THREE.Mesh(ringGeo, ringMat)
  ringMesh.rotation.x = Math.PI * 0.5
  ringMesh.position.y = -0.01
  scene.add(ringMesh)

  // Build Islands Group
  islandsGroup = new THREE.Group()
  scene.add(islandsGroup)

  islandData.forEach((data) => {
    const islandGroup = new THREE.Group()
    islandGroup.position.set(data.position.x, 0, data.position.z)

    // Base Island Cylinder (Hexagonal / Cylinder)
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.4, 0.8, 8)
    const baseMat = new THREE.MeshStandardMaterial({ 
      color: data.color, 
      roughness: 0.3, 
      metalness: 0.2 
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    baseMesh.userData = { islandId: data.id, data }
    islandGroup.add(baseMesh)
    islandMeshes.push(baseMesh)

    // Top Grass Land
    const topGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.15, 8)
    const topMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
    const topMesh = new THREE.Mesh(topGeo, topMat)
    topMesh.position.y = 0.42
    topMesh.userData = { islandId: data.id, data }
    islandGroup.add(topMesh)
    islandMeshes.push(topMesh)

    // Build Specific 3D Landmark Elements
    data.buildElements(islandGroup)

    islandGroup.userData = { id: data.id, basePosY: 0, targetY: 0, data }
    islandsGroup.add(islandGroup)
  })

  // Canvas Interactions
  const domElement = renderer.domElement
  domElement.addEventListener('mousedown', onMouseDown)
  domElement.addEventListener('mousemove', onMouseMove)
  domElement.addEventListener('mouseup', onMouseUp)
  domElement.addEventListener('click', onClickCanvas)

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

  if (mouse.isDragging && islandsGroup) {
    const deltaX = e.clientX - mouse.previousMouseX
    islandsGroup.rotation.y += deltaX * 0.005
    mouse.previousMouseX = e.clientX
    mouse.previousMouseY = e.clientY
  }

  // Raycasting hover detection
  if (camera && scene) {
    raycaster.setFromCamera(mouseVector, camera)
    const intersects = raycaster.intersectObjects(islandMeshes)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      const data = hitObj.userData.data
      if (data) {
        hoveredIsland.value = data
        // Animate hovered island upward
        islandsGroup.children.forEach((child) => {
          if (child.userData.id === data.id) {
            child.userData.targetY = 0.4
          } else {
            child.userData.targetY = 0
          }
        })
      }
    } else {
      hoveredIsland.value = null
      islandsGroup.children.forEach((child) => {
        child.userData.targetY = 0
      })
    }
  }
}

const onMouseUp = () => {
  mouse.isDragging = false
}

const onClickCanvas = () => {
  if (hoveredIsland.value) {
    openHoveredCourse()
  }
}

const openHoveredCourse = () => {
  if (hoveredIsland.value) {
    emit('select-course', hoveredIsland.value.id)
  }
}

const toggleAutoRotate = () => {
  isAutoRotating.value = !isAutoRotating.value
}

const resetCamera = () => {
  if (islandsGroup) {
    islandsGroup.rotation.y = 0
  }
  camera.position.set(0, 8.5, 11)
  camera.lookAt(0, 0, 0)
}

const clock = new THREE.Clock()

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  if (islandsGroup && isAutoRotating.value && !mouse.isDragging) {
    islandsGroup.rotation.y += 0.003
  }

  // Animate Islands Floating & Hover Effects
  if (islandsGroup) {
    islandsGroup.children.forEach((child, idx) => {
      // Gentle floating bobbing
      const floatOffsetY = Math.sin(time * 2 + idx * 1.5) * 0.08
      const targetY = child.userData.targetY || 0

      child.position.y += (targetY + floatOffsetY - child.position.y) * 0.1
    })
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}
</style>
