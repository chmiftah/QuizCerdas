<template>
  <div class="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none">
    <!-- Transparent 3D Canvas -->
    <div ref="canvasContainer" class="w-full h-full"></div>
    
    <!-- Subtle 3D Tag Overlay -->
    <div class="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-900/70 text-white backdrop-blur-md rounded-full text-[10px] font-heading font-extrabold flex items-center gap-1.5 shadow-md pointer-events-none">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
      <span>3D Interactive Scene</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const props = defineProps<{
  subject: 'math' | 'science' | 'language' | 'art'
}>()

const canvasContainer = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

let mainGroup: THREE.Group
const animatedParts: { mesh: THREE.Object3D; speedY: number; speedRot: number }[] = []

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

const init3D = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, 5.5)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  canvasContainer.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.2)
  dirLight.position.set(4, 6, 4)
  scene.add(dirLight)

  mainGroup = new THREE.Group()

  if (props.subject === 'math') {
    buildMathScene()
  } else if (props.subject === 'science') {
    buildScienceScene()
  } else if (props.subject === 'language') {
    buildLanguageScene()
  } else if (props.subject === 'art') {
    buildArtScene()
  }

  scene.add(mainGroup)

  window.addEventListener('mousemove', onMouseMove)
  animate()
}

// 1. Math 3D Scene: Gold block with math reliefs & orbiting spheres
const buildMathScene = () => {
  const blockGeo = new THREE.BoxGeometry(1.3, 1.3, 1.3)
  const blockMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2, metalness: 0.3 })
  const blockMesh = new THREE.Mesh(blockGeo, blockMat)
  blockMesh.rotation.set(0.3, 0.5, 0.2)
  mainGroup.add(blockMesh)

  // Plus relief on front
  const plusMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const pH = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.22, 0.22), plusMat)
  const pV = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.8, 0.22), plusMat)
  pH.position.z = 0.65
  pV.position.z = 0.65
  blockMesh.add(pH)
  blockMesh.add(pV)

  // Orbiting number balls
  const colors = [0x58cc02, 0x1cb0f6, 0xce82ff, 0xff4b4b]
  const radius = 1.6
  for (let i = 0; i < 4; i++) {
    const ballMat = new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.2 })
    const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 20), ballMat)
    const angle = (i / 4) * Math.PI * 2
    ballMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 0.5)
    mainGroup.add(ballMesh)
    animatedParts.push({ mesh: ballMesh, speedY: 1.5, speedRot: 0.02 })
  }
}

// 2. Science 3D Scene: Earth Globe with rings & atom core
const buildScienceScene = () => {
  const globeGeo = new THREE.SphereGeometry(1.1, 32, 32)
  const oceanMat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.2, metalness: 0.2 })
  const globeMesh = new THREE.Mesh(globeGeo, oceanMat)
  mainGroup.add(globeMesh)

  const landMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.3 })
  const landGeo = new THREE.SphereGeometry(1.12, 16, 16, 0, Math.PI * 0.8, 0.3, Math.PI * 0.5)
  const land = new THREE.Mesh(landGeo, landMat)
  globeMesh.add(land)

  // Ring around planet
  const ringGeo = new THREE.TorusGeometry(1.5, 0.08, 16, 64)
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2 })
  const ringMesh = new THREE.Mesh(ringGeo, ringMat)
  ringMesh.rotation.x = Math.PI * 0.4
  mainGroup.add(ringMesh)

  // DNA Atom Ring
  const ring2Mat = new THREE.MeshStandardMaterial({ color: 0xce82ff, roughness: 0.2 })
  const ring2Mesh = new THREE.Mesh(ringGeo, ring2Mat)
  ring2Mesh.rotation.y = Math.PI * 0.45
  mainGroup.add(ring2Mesh)
}

// 3. Language 3D Scene: Open Book with floating 3D A, B, C letters
const buildLanguageScene = () => {
  const bookGroup = new THREE.Group()

  const coverMat = new THREE.MeshStandardMaterial({ color: 0xce82ff, roughness: 0.3 })
  const pageMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })

  const coverLeft = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.4, 0.08), coverMat)
  coverLeft.position.set(-0.55, 0, 0)
  coverLeft.rotation.y = 0.25
  bookGroup.add(coverLeft)

  const coverRight = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.4, 0.08), coverMat)
  coverRight.position.set(0.55, 0, 0)
  coverRight.rotation.y = -0.25
  bookGroup.add(coverRight)

  const pages = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.3, 0.25), pageMat)
  pages.position.set(0, 0, 0.1)
  bookGroup.add(pages)

  mainGroup.add(bookGroup)

  // Floating 3D Text Letters A, B, C
  const loader = new FontLoader()
  loader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
    const letters = ['A', 'B', 'C']
    const textColors = [0x58cc02, 0xffc800, 0x1cb0f6]
    letters.forEach((char, idx) => {
      const geo = new TextGeometry(char, {
        font: font,
        size: 0.55,
        depth: 0.12,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
      })
      geo.center()
      const mat = new THREE.MeshStandardMaterial({ color: textColors[idx], roughness: 0.2 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set((idx - 1) * 0.9, 0.85 + (idx % 2) * 0.2, 0.4)
      mainGroup.add(mesh)
      animatedParts.push({ mesh, speedY: 2.0 + idx, speedRot: 0.03 })
    })
  })
}

// 4. Art 3D Scene: Palette & Rotating 3D Geometric Crystal shapes
const buildArtScene = () => {
  const paletteGroup = new THREE.Group()

  // Artist Palette Base
  const palGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.1, 32)
  palGeo.scale(1.2, 1, 0.8)
  const palMat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.2, metalness: 0.2 })
  const palMesh = new THREE.Mesh(palGeo, palMat)
  palMesh.rotation.x = Math.PI * 0.25
  paletteGroup.add(palMesh)

  // Paint Drops
  const paintColors = [0xff4b4b, 0xffc800, 0x58cc02, 0xce82ff]
  const paintGeo = new THREE.SphereGeometry(0.22, 16, 16)
  paintColors.forEach((col, idx) => {
    const pMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.1 })
    const pMesh = new THREE.Mesh(paintGeo, pMat)
    const angle = (idx / 4) * Math.PI * 2
    pMesh.position.set(Math.cos(angle) * 0.8, Math.sin(angle) * 0.6, 0.15)
    palMesh.add(pMesh)
  })

  // Floating 3D Crystal Gem (Icosahedron)
  const crystalMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.1, metalness: 0.5 })
  const crystal = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), crystalMat)
  crystal.position.set(0, 0.9, 0.5)
  paletteGroup.add(crystal)
  animatedParts.push({ mesh: crystal, speedY: 2.5, speedRot: 0.04 })

  mainGroup.add(paletteGroup)
}

const onMouseMove = (e: MouseEvent) => {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  mouse.x += (mouse.targetX - mouse.x) * 0.08
  mouse.y += (mouse.targetY - mouse.y) * 0.08

  if (mainGroup) {
    mainGroup.rotation.y = time * 0.5 + mouse.x * 0.4
    mainGroup.rotation.x = mouse.y * 0.3
    mainGroup.position.y = Math.sin(time * 2) * 0.08
  }

  animatedParts.forEach((part, i) => {
    part.mesh.position.y += Math.sin(time * part.speedY + i) * 0.003
    part.mesh.rotation.y += part.speedRot
    part.mesh.rotation.z += part.speedRot * 0.5
  })

  renderer.render(scene, camera)
}

const clock = new THREE.Clock()

onMounted(() => {
  init3D()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', onMouseMove)
  if (renderer && renderer.domElement) {
    renderer.dispose()
  }
})
</script>
