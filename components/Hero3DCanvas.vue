<template>
  <div class="relative w-full aspect-square max-w-[620px] mx-auto select-none pointer-events-auto">
    <!-- Transparent 3D WebGL Canvas Container (Frameless & Borderless) -->
    <div ref="canvasContainer" class="w-full h-full cursor-grab active:cursor-grabbing"></div>

    <!-- Bottom Interactive Pill Hint -->
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-slate-900/80 text-white backdrop-blur-md rounded-full border border-slate-700 shadow-xl pointer-events-none">
      <span class="w-2.5 h-2.5 rounded-full bg-duo-green animate-ping"></span>
      <span class="text-xs font-heading font-extrabold tracking-wide">
        ✨ Sentuh & Klik Burung Kiko Untuk Melompat! 🚀
      </span>
    </div>

    <!-- Loading Fallback Spinner -->
    <div v-if="loading" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-transparent gap-3">
      <div class="w-12 h-12 border-4 border-duo-green border-t-transparent rounded-full animate-spin"></div>
      <span class="text-xs font-heading font-bold text-slate-700">Memuat Teks 3D & Mascot Kiko...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const canvasContainer = ref<HTMLDivElement | null>(null)
const loading = ref(true)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

// 3D Groups
let mascotGroup: THREE.Group
let headMesh: THREE.Mesh
let leftEyePupil: THREE.Mesh
let rightEyePupil: THREE.Mesh
let leftWing: THREE.Mesh
let rightWing: THREE.Mesh

// 3D Text Group
let textGroup: THREE.Group
let textLine1Mesh: THREE.Mesh
let textLine2Mesh: THREE.Mesh
let textLine3Mesh: THREE.Mesh

// Specific Shrunk 3D Educational Models
let globeGroup: THREE.Group
let physicsAtomGroup: THREE.Group
let mathSymbolGroup: THREE.Group
let scienceFlaskGroup: THREE.Group

const floatingItems: THREE.Group[] = []
let particlesMesh: THREE.Points

// Mouse & Interaction State
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
let clickBounceTime = 0

// Setup 3D Scene
const init3D = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  // 1. Scene
  scene = new THREE.Scene()

  // 2. Camera (Positioned for balanced FOV)
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
  camera.position.set(0, 0, 9.2)

  // 3. Renderer (Alpha enabled for transparent background)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.3
  
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.5)
  mainLight.position.set(6, 10, 6)
  mainLight.castShadow = true
  mainLight.shadow.mapSize.width = 1024
  mainLight.shadow.mapSize.height = 1024
  scene.add(mainLight)

  const greenRimLight = new THREE.PointLight(0x58cc02, 5.0, 14)
  greenRimLight.position.set(-6, -2, 4)
  scene.add(greenRimLight)

  const blueRimLight = new THREE.PointLight(0x1cb0f6, 5.0, 14)
  blueRimLight.position.set(6, 4, 4)
  scene.add(blueRimLight)

  const yellowRimLight = new THREE.PointLight(0xffc800, 4.0, 12)
  yellowRimLight.position.set(0, -5, 3)
  scene.add(yellowRimLight)

  // 5. Create Enlarged 3D Mascot "Kiko" (PERBESAR BURUNG)
  createMascot()

  // 6. Create Shrunk 3D Subject Objects (PERKECIL ELEMEN 3D LAIN)
  createGlobe()
  createPhysicsAtom()
  createMathSymbol()
  createScienceFlask()

  // 7. Create Dynamic 3D Text using Three.js (TEXT 3D)
  create3DText()

  // 8. Create Star Dust Particles
  createSparkles()

  // Listeners
  window.addEventListener('mousemove', onMouseMove)
  canvasContainer.value.addEventListener('click', onClickCanvas)
  window.addEventListener('resize', onWindowResize)

  loading.value = false
  animate()
}

// Build Scaled-up 3D Owl Mascot "Kiko" (ENLARGED ~45%)
const createMascot = () => {
  mascotGroup = new THREE.Group()

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x58cc02,
    roughness: 0.2,
    metalness: 0.15,
  })

  const bellyMat = new THREE.MeshStandardMaterial({
    color: 0xfff3a1,
    roughness: 0.3,
  })

  const eyeWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
  })

  const pupilMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.1,
  })

  const beakMat = new THREE.MeshStandardMaterial({
    color: 0xff9600,
    roughness: 0.2,
  })

  // Body/Head (Scaled up: radius 1.85)
  const bodyGeo = new THREE.SphereGeometry(1.85, 36, 36)
  bodyGeo.scale(1, 1.15, 0.95)
  headMesh = new THREE.Mesh(bodyGeo, bodyMat)
  headMesh.castShadow = true
  headMesh.receiveShadow = true
  mascotGroup.add(headMesh)

  // Cream Belly Oval
  const bellyGeo = new THREE.SphereGeometry(1.25, 32, 32)
  bellyGeo.scale(0.85, 0.9, 0.35)
  const bellyMesh = new THREE.Mesh(bellyGeo, bellyMat)
  bellyMesh.position.set(0, -0.4, 1.25)
  mascotGroup.add(bellyMesh)

  // Eyes (Scaled up)
  const eyeGeo = new THREE.SphereGeometry(0.58, 32, 32)
  
  const leftEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  leftEyeWhite.position.set(-0.68, 0.52, 1.45)
  mascotGroup.add(leftEyeWhite)

  const rightEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  rightEyeWhite.position.set(0.68, 0.52, 1.45)
  mascotGroup.add(rightEyeWhite)

  // Pupils
  const pupilGeo = new THREE.SphereGeometry(0.28, 24, 24)
  leftEyePupil = new THREE.Mesh(pupilGeo, pupilMat)
  leftEyePupil.position.set(-0.68, 0.52, 1.9)
  mascotGroup.add(leftEyePupil)

  rightEyePupil = new THREE.Mesh(pupilGeo, pupilMat)
  rightEyePupil.position.set(0.68, 0.52, 1.9)
  mascotGroup.add(rightEyePupil)

  // Eye Catchlights
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const glintGeo = new THREE.SphereGeometry(0.09, 16, 16)
  
  const leftGlint = new THREE.Mesh(glintGeo, glintMat)
  leftGlint.position.set(-0.58, 0.62, 2.1)
  mascotGroup.add(leftGlint)

  const rightGlint = new THREE.Mesh(glintGeo, glintMat)
  rightGlint.position.set(0.78, 0.62, 2.1)
  mascotGroup.add(rightGlint)

  // Beak
  const beakGeo = new THREE.ConeGeometry(0.32, 0.52, 4)
  const beakMesh = new THREE.Mesh(beakGeo, beakMat)
  beakMesh.rotation.x = Math.PI * 0.5
  beakMesh.rotation.z = Math.PI
  beakMesh.position.set(0, 0.16, 1.78)
  mascotGroup.add(beakMesh)

  // Wings
  const wingGeo = new THREE.SphereGeometry(0.8, 24, 24)
  wingGeo.scale(0.3, 0.9, 0.6)

  leftWing = new THREE.Mesh(wingGeo, bodyMat)
  leftWing.position.set(-1.9, -0.15, 0.15)
  leftWing.rotation.z = 0.35
  mascotGroup.add(leftWing)

  rightWing = new THREE.Mesh(wingGeo, bodyMat)
  rightWing.position.set(1.9, -0.15, 0.15)
  rightWing.rotation.z = -0.35
  mascotGroup.add(rightWing)

  // Toga Graduation Hat
  const hatGroup = new THREE.Group()
  const hatBaseMat = new THREE.MeshStandardMaterial({ color: 0xce82ff, roughness: 0.2 })
  const hatGoldMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2, metalness: 0.6 })

  const hatTopGeo = new THREE.BoxGeometry(1.1, 0.12, 1.1)
  const hatTop = new THREE.Mesh(hatTopGeo, hatBaseMat)
  hatTop.position.y = 0.38
  hatGroup.add(hatTop)

  const hatConeGeo = new THREE.CylinderGeometry(0.4, 0.48, 0.38, 16)
  const hatCone = new THREE.Mesh(hatConeGeo, hatBaseMat)
  hatGroup.add(hatCone)

  const hatButtonGeo = new THREE.SphereGeometry(0.09, 16, 16)
  const hatButton = new THREE.Mesh(hatButtonGeo, hatGoldMat)
  hatButton.position.y = 0.48
  hatGroup.add(hatButton)

  hatGroup.position.set(0, 2.25, 0)
  hatGroup.rotation.z = -0.12
  mascotGroup.add(hatGroup)

  mascotGroup.position.set(0, -0.6, 0)
  scene.add(mascotGroup)
}

// 1. Shrunk 3D Globe (Sains & Geografi)
const createGlobe = () => {
  globeGroup = new THREE.Group()

  // Ocean Sphere (Shrunk radius: 0.45)
  const oceanGeo = new THREE.SphereGeometry(0.45, 24, 24)
  const oceanMat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.2, metalness: 0.1 })
  const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat)
  oceanMesh.castShadow = true
  globeGroup.add(oceanMesh)

  // Continents
  const landMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.3 })
  const land1Geo = new THREE.SphereGeometry(0.46, 16, 16, 0, Math.PI * 0.7, 0.4, Math.PI * 0.5)
  const land1 = new THREE.Mesh(land1Geo, landMat)
  globeGroup.add(land1)

  // Saturn Ring
  const ringGeo = new THREE.TorusGeometry(0.58, 0.04, 16, 32)
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2, metalness: 0.4 })
  const ringMesh = new THREE.Mesh(ringGeo, ringMat)
  ringMesh.rotation.x = Math.PI * 0.4
  globeGroup.add(ringMesh)

  globeGroup.position.set(-2.7, 2.2, 0.5)
  scene.add(globeGroup)
  floatingItems.push(globeGroup)
}

// 2. Shrunk 3D Physics Atom Model (Fisika)
const createPhysicsAtom = () => {
  physicsAtomGroup = new THREE.Group()

  // Central Nucleus (Shrunk radius: 0.18)
  const nucMat = new THREE.MeshStandardMaterial({ color: 0xff4b4b, roughness: 0.2, metalness: 0.3 })
  const nucGeo = new THREE.SphereGeometry(0.18, 20, 20)
  const nucleus = new THREE.Mesh(nucGeo, nucMat)
  nucleus.castShadow = true
  physicsAtomGroup.add(nucleus)

  // Orbit Rings (Shrunk radius: 0.45)
  const ring1Geo = new THREE.TorusGeometry(0.45, 0.025, 16, 32)
  const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.1 })
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
  ring1.rotation.x = Math.PI * 0.3
  physicsAtomGroup.add(ring1)

  const ring2Mat = new THREE.MeshStandardMaterial({ color: 0xce82ff, roughness: 0.1 })
  const ring2 = new THREE.Mesh(ring1Geo, ring2Mat)
  ring2.rotation.y = Math.PI * 0.45
  physicsAtomGroup.add(ring2)

  // Orbiting Electrons
  const elecMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.1 })
  const elecGeo = new THREE.SphereGeometry(0.06, 12, 12)
  
  const elec1 = new THREE.Mesh(elecGeo, elecMat)
  elec1.position.set(0.45, 0, 0)
  ring1.add(elec1)

  physicsAtomGroup.position.set(2.7, 2.2, 0.5)
  scene.add(physicsAtomGroup)
  floatingItems.push(physicsAtomGroup)
}

// 3. Shrunk 3D Math Symbol Block (Matematika)
const createMathSymbol = () => {
  mathSymbolGroup = new THREE.Group()

  // Shrunk Block Geometry (0.45 x 0.45 x 0.45)
  const blockGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45)
  const blockMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.25, metalness: 0.2 })
  const blockMesh = new THREE.Mesh(blockGeo, blockMat)
  blockMesh.rotation.set(0.3, 0.6, 0.2)
  blockMesh.castShadow = true
  mathSymbolGroup.add(blockMesh)

  // Plus Symbol
  const plusMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
  const plusHGeo = new THREE.BoxGeometry(0.28, 0.08, 0.08)
  const plusVGeo = new THREE.BoxGeometry(0.08, 0.28, 0.08)
  
  const plusH = new THREE.Mesh(plusHGeo, plusMat)
  const plusV = new THREE.Mesh(plusVGeo, plusMat)
  plusH.position.z = 0.23
  plusV.position.z = 0.23

  blockMesh.add(plusH)
  blockMesh.add(plusV)

  mathSymbolGroup.position.set(-2.6, -2.2, 0.8)
  scene.add(mathSymbolGroup)
  floatingItems.push(mathSymbolGroup)
}

// 4. Shrunk 3D Science Beaker Flask
const createScienceFlask = () => {
  scienceFlaskGroup = new THREE.Group()

  // Flask Neck & Base (Shrunk height: 0.45)
  const bodyGeo = new THREE.CylinderGeometry(0.1, 0.3, 0.45, 20)
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xce82ff,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85,
    metalness: 0.1,
  })
  const flaskMesh = new THREE.Mesh(bodyGeo, glassMat)
  flaskMesh.castShadow = true
  scienceFlaskGroup.add(flaskMesh)

  // Green Liquid Inside
  const liquidGeo = new THREE.CylinderGeometry(0.16, 0.26, 0.22, 20)
  const liquidMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.2 })
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat)
  liquidMesh.position.y = -0.1
  scienceFlaskGroup.add(liquidMesh)

  scienceFlaskGroup.position.set(2.6, -2.2, 0.8)
  scene.add(scienceFlaskGroup)
  floatingItems.push(scienceFlaskGroup)
}

// 5. Dynamic 3D Text using Three.js FontLoader & TextGeometry
const create3DText = () => {
  textGroup = new THREE.Group()

  const loader = new FontLoader()
  loader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
    const createLine = (text: string, colorHex: number, yPos: number, size: number = 0.38) => {
      const textGeo = new TextGeometry(text, {
        font: font,
        size: size,
        depth: 0.08,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.015,
        bevelOffset: 0,
        bevelSegments: 5,
      })
      textGeo.center()

      const textMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.2,
        metalness: 0.3,
      })

      const mesh = new THREE.Mesh(textGeo, textMat)
      mesh.position.set(0, yPos, 0)
      mesh.castShadow = true
      mesh.receiveShadow = true
      return mesh
    }

    // Line 1: "Belajar Matematika" (Duo Green)
    textLine1Mesh = createLine('Belajar Matematika', 0x58cc02, 3.1, 0.42)
    textGroup.add(textLine1Mesh)

    // Line 2: "Sains & Bahasa" (Duo Blue)
    textLine2Mesh = createLine('Sains & Bahasa', 0x1cb0f6, 2.5, 0.38)
    textGroup.add(textLine2Mesh)

    // Line 3: "Paling Seru!" (Duo Gold/Yellow)
    textLine3Mesh = createLine('Paling Seru!', 0xffc800, 1.95, 0.36)
    textGroup.add(textLine3Mesh)

    textGroup.position.set(0, 0, 0.2)
    scene.add(textGroup)
  })
}

// Background Floating Particles
const createSparkles = () => {
  const particleCount = 120
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  const palette = [
    new THREE.Color(0x58cc02),
    new THREE.Color(0x1cb0f6),
    new THREE.Color(0xffc800),
    new THREE.Color(0xce82ff),
  ]

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2

    const col = palette[Math.floor(Math.random() * palette.length)]
    colors[i * 3] = col.r
    colors[i * 3 + 1] = col.g
    colors[i * 3 + 2] = col.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
  })

  particlesMesh = new THREE.Points(geometry, material)
  scene.add(particlesMesh)
}

// Mouse Tracking
const onMouseMove = (event: MouseEvent) => {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  mouse.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.targetY = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

// Click Trigger for 3D Mascot Jump
const onClickCanvas = () => {
  clickBounceTime = 1.0
}

// Window Resize
const onWindowResize = () => {
  if (!canvasContainer.value || !renderer || !camera) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// Render Animation Loop
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  mouse.x += (mouse.targetX - mouse.x) * 0.08
  mouse.y += (mouse.targetY - mouse.y) * 0.08

  // Mascot rotation and float
  if (mascotGroup) {
    let bounceOffsetY = Math.sin(time * 2.5) * 0.18

    if (clickBounceTime > 0) {
      bounceOffsetY += Math.sin(clickBounceTime * Math.PI) * 0.85
      mascotGroup.rotation.y = time * 8.0
      clickBounceTime -= 0.04
    } else {
      mascotGroup.rotation.y = mouse.x * 0.45
    }

    mascotGroup.position.y = -0.6 + bounceOffsetY
    mascotGroup.rotation.x = -mouse.y * 0.2

    if (leftEyePupil && rightEyePupil) {
      leftEyePupil.position.x = -0.68 + mouse.x * 0.15
      leftEyePupil.position.y = 0.52 + mouse.y * 0.15
      rightEyePupil.position.x = 0.68 + mouse.x * 0.15
      rightEyePupil.position.y = 0.52 + mouse.y * 0.15
    }

    if (leftWing && rightWing) {
      const flap = Math.sin(time * 5.0) * 0.3
      leftWing.rotation.z = 0.35 + flap
      rightWing.rotation.z = -0.35 - flap
    }
  }

  // 3D Text Floating & Tilting Wave Animation
  if (textGroup) {
    textGroup.rotation.y = mouse.x * 0.15
    textGroup.rotation.x = -mouse.y * 0.1
    textGroup.position.y = Math.sin(time * 1.8) * 0.08
  }

  // Shrunk Globe rotation
  if (globeGroup) {
    globeGroup.rotation.y = time * 0.6
    globeGroup.position.y = 2.2 + Math.sin(time * 2.2) * 0.1
  }

  // Shrunk Physics Atom rotation
  if (physicsAtomGroup) {
    physicsAtomGroup.rotation.x = time * 0.7
    physicsAtomGroup.rotation.y = time * 0.9
    physicsAtomGroup.position.y = 2.2 + Math.cos(time * 2.5) * 0.1
  }

  // Shrunk Math Symbol rotation
  if (mathSymbolGroup) {
    mathSymbolGroup.rotation.y = time * 0.8
    mathSymbolGroup.rotation.z = Math.sin(time * 1.6) * 0.2
    mathSymbolGroup.position.y = -2.2 + Math.sin(time * 2.0) * 0.1
  }

  // Shrunk Science Flask float
  if (scienceFlaskGroup) {
    scienceFlaskGroup.rotation.y = time * 0.5
    scienceFlaskGroup.position.y = -2.2 + Math.cos(time * 2.8) * 0.1
  }

  // Particles rotation
  if (particlesMesh) {
    particlesMesh.rotation.y = time * 0.04
  }

  renderer.render(scene, camera)
}

const clock = new THREE.Clock()

onMounted(() => {
  init3D()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onWindowResize)
  if (renderer && renderer.domElement) {
    renderer.dispose()
  }
})
</script>
