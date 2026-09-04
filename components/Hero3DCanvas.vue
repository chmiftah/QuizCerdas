<template>
  <div class="relative w-full aspect-square max-w-[560px] mx-auto select-none pointer-events-auto">
    <!-- Transparent 3D WebGL Canvas Container (Frameless & Borderless) -->
    <div ref="canvasContainer" class="w-full h-full cursor-grab active:cursor-grabbing"></div>

    <!-- Floating Interactive Badge Header -->
    <div class="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-duo-green/40 text-duo-green text-xs sm:text-sm font-heading font-black shadow-lg animate-bounce">
        <span>✨ 3D Interactive World (Masa Depan Belajar)</span>
      </span>
    </div>

    <!-- Bottom Interactive Pill Hint -->
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-slate-900/80 text-white backdrop-blur-md rounded-full border border-slate-700 shadow-xl pointer-events-none">
      <span class="w-2.5 h-2.5 rounded-full bg-duo-green animate-ping"></span>
      <span class="text-xs font-heading font-extrabold tracking-wide">
       Belajar jadi lebih seru
      </span>
    </div>

    <!-- Loading Fallback Spinner -->
    <div v-if="loading" class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-transparent gap-3">
      <div class="w-12 h-12 border-4 border-duo-green border-t-transparent rounded-full animate-spin"></div>
      <span class="text-xs font-heading font-bold text-slate-700">Memuat Objek 3D Sains & Globe...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

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

// Specific 3D Educational Models
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

  // 2. Camera (Pulled back z=8.6 for full unclipped field of view)
  camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000)
  camera.position.set(0, 0.15, 8.6)

  // 3. Renderer (Alpha enabled for transparent background)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25
  
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.2)
  mainLight.position.set(6, 10, 6)
  mainLight.castShadow = true
  mainLight.shadow.mapSize.width = 1024
  mainLight.shadow.mapSize.height = 1024
  scene.add(mainLight)

  const greenRimLight = new THREE.PointLight(0x58cc02, 4.0, 12)
  greenRimLight.position.set(-5, -2, 3)
  scene.add(greenRimLight)

  const blueRimLight = new THREE.PointLight(0x1cb0f6, 4.0, 12)
  blueRimLight.position.set(5, 4, 3)
  scene.add(blueRimLight)

  const yellowRimLight = new THREE.PointLight(0xffc800, 3.0, 10)
  yellowRimLight.position.set(0, -4, 2)
  scene.add(yellowRimLight)

  // 5. Create Main 3D Mascot "Kiko"
  createMascot()

  // 6. Create Larger 3D Subject Objects (Globe, Physics Atom, Math Symbol, Science Flask)
  createGlobe()
  createPhysicsAtom()
  createMathSymbol()
  createScienceFlask()

  // 7. Create Star Dust Particles
  createSparkles()

  // Listeners
  window.addEventListener('mousemove', onMouseMove)
  canvasContainer.value.addEventListener('click', onClickCanvas)
  window.addEventListener('resize', onWindowResize)

  loading.value = false
  animate()
}

// Build Scaled-up 3D Owl Mascot "Kiko"
const createMascot = () => {
  mascotGroup = new THREE.Group()

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x58cc02,
    roughness: 0.25,
    metalness: 0.1,
  })

  const bellyMat = new THREE.MeshStandardMaterial({
    color: 0xfff3a1,
    roughness: 0.35,
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

  // Body/Head (Scaled up by ~25%)
  const bodyGeo = new THREE.SphereGeometry(1.4, 32, 32)
  bodyGeo.scale(1, 1.15, 0.95)
  headMesh = new THREE.Mesh(bodyGeo, bodyMat)
  headMesh.castShadow = true
  headMesh.receiveShadow = true
  mascotGroup.add(headMesh)

  // Cream Belly Oval
  const bellyGeo = new THREE.SphereGeometry(0.95, 32, 32)
  bellyGeo.scale(0.85, 0.9, 0.35)
  const bellyMesh = new THREE.Mesh(bellyGeo, bellyMat)
  bellyMesh.position.set(0, -0.3, 0.95)
  mascotGroup.add(bellyMesh)

  // Eyes
  const eyeGeo = new THREE.SphereGeometry(0.44, 32, 32)
  
  const leftEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  leftEyeWhite.position.set(-0.52, 0.4, 1.1)
  mascotGroup.add(leftEyeWhite)

  const rightEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMat)
  rightEyeWhite.position.set(0.52, 0.4, 1.1)
  mascotGroup.add(rightEyeWhite)

  // Pupils
  const pupilGeo = new THREE.SphereGeometry(0.21, 24, 24)
  leftEyePupil = new THREE.Mesh(pupilGeo, pupilMat)
  leftEyePupil.position.set(-0.52, 0.4, 1.45)
  mascotGroup.add(leftEyePupil)

  rightEyePupil = new THREE.Mesh(pupilGeo, pupilMat)
  rightEyePupil.position.set(0.52, 0.4, 1.45)
  mascotGroup.add(rightEyePupil)

  // Eye Catchlights
  const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const glintGeo = new THREE.SphereGeometry(0.07, 16, 16)
  
  const leftGlint = new THREE.Mesh(glintGeo, glintMat)
  leftGlint.position.set(-0.44, 0.48, 1.6)
  mascotGroup.add(leftGlint)

  const rightGlint = new THREE.Mesh(glintGeo, glintMat)
  rightGlint.position.set(0.6, 0.48, 1.6)
  mascotGroup.add(rightGlint)

  // Beak
  const beakGeo = new THREE.ConeGeometry(0.24, 0.4, 4)
  const beakMesh = new THREE.Mesh(beakGeo, beakMat)
  beakMesh.rotation.x = Math.PI * 0.5
  beakMesh.rotation.z = Math.PI
  beakMesh.position.set(0, 0.12, 1.35)
  mascotGroup.add(beakMesh)

  // Wings
  const wingGeo = new THREE.SphereGeometry(0.6, 24, 24)
  wingGeo.scale(0.3, 0.9, 0.6)

  leftWing = new THREE.Mesh(wingGeo, bodyMat)
  leftWing.position.set(-1.45, -0.1, 0.1)
  leftWing.rotation.z = 0.35
  mascotGroup.add(leftWing)

  rightWing = new THREE.Mesh(wingGeo, bodyMat)
  rightWing.position.set(1.45, -0.1, 0.1)
  rightWing.rotation.z = -0.35
  mascotGroup.add(rightWing)

  // Toga Hat
  const hatGroup = new THREE.Group()
  const hatBaseMat = new THREE.MeshStandardMaterial({ color: 0xce82ff, roughness: 0.25 })
  const hatGoldMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2, metalness: 0.6 })

  const hatTopGeo = new THREE.BoxGeometry(0.85, 0.09, 0.85)
  const hatTop = new THREE.Mesh(hatTopGeo, hatBaseMat)
  hatTop.position.y = 0.28
  hatGroup.add(hatTop)

  const hatConeGeo = new THREE.CylinderGeometry(0.3, 0.36, 0.28, 16)
  const hatCone = new THREE.Mesh(hatConeGeo, hatBaseMat)
  hatGroup.add(hatCone)

  const hatButtonGeo = new THREE.SphereGeometry(0.07, 16, 16)
  const hatButton = new THREE.Mesh(hatButtonGeo, hatGoldMat)
  hatButton.position.y = 0.35
  hatGroup.add(hatButton)

  hatGroup.position.set(0, 1.7, 0)
  hatGroup.rotation.z = -0.12
  mascotGroup.add(hatGroup)

  mascotGroup.position.set(0, -0.3, 0)
  scene.add(mascotGroup)
}

// 1. 3D Globe (Sains & Geografi)
const createGlobe = () => {
  globeGroup = new THREE.Group()

  // Ocean Sphere
  const oceanGeo = new THREE.SphereGeometry(0.85, 32, 32)
  const oceanMat = new THREE.MeshStandardMaterial({
    color: 0x1cb0f6,
    roughness: 0.2,
    metalness: 0.1,
  })
  const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat)
  oceanMesh.castShadow = true
  globeGroup.add(oceanMesh)

  // Continents / Landmasses (Green Polygons around sphere)
  const landMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.3 })
  const land1Geo = new THREE.SphereGeometry(0.87, 16, 16, 0, Math.PI * 0.7, 0.4, Math.PI * 0.5)
  const land1 = new THREE.Mesh(land1Geo, landMat)
  globeGroup.add(land1)

  const land2Geo = new THREE.SphereGeometry(0.87, 16, 16, Math.PI * 1.1, Math.PI * 0.5, 0.8, Math.PI * 0.4)
  const land2 = new THREE.Mesh(land2Geo, landMat)
  globeGroup.add(land2)

  // Planetary Saturn Ring around Globe
  const ringGeo = new THREE.TorusGeometry(1.05, 0.07, 16, 64)
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2, metalness: 0.4 })
  const ringMesh = new THREE.Mesh(ringGeo, ringMat)
  ringMesh.rotation.x = Math.PI * 0.4
  globeGroup.add(ringMesh)

  globeGroup.position.set(-2.0, 1.25, 0.3)
  scene.add(globeGroup)
  floatingItems.push(globeGroup)
}

// 2. 3D Physics Atom Model (Fisika)
const createPhysicsAtom = () => {
  physicsAtomGroup = new THREE.Group()

  // Central Nucleus (Glowing Orange/Red Core)
  const nucMat = new THREE.MeshStandardMaterial({ color: 0xff4b4b, roughness: 0.2, metalness: 0.3 })
  const nucGeo = new THREE.SphereGeometry(0.36, 24, 24)
  const nucleus = new THREE.Mesh(nucGeo, nucMat)
  nucleus.castShadow = true
  physicsAtomGroup.add(nucleus)

  // Electron Orbit Ring 1 (Cyan Ring)
  const ring1Geo = new THREE.TorusGeometry(0.8, 0.04, 16, 64)
  const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.1 })
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
  ring1.rotation.x = Math.PI * 0.3
  physicsAtomGroup.add(ring1)

  // Electron Orbit Ring 2 (Purple Ring)
  const ring2Mat = new THREE.MeshStandardMaterial({ color: 0xce82ff, roughness: 0.1 })
  const ring2 = new THREE.Mesh(ring1Geo, ring2Mat)
  ring2.rotation.y = Math.PI * 0.45
  physicsAtomGroup.add(ring2)

  // Orbiting Electrons (Yellow Spheres)
  const elecMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.1 })
  const elecGeo = new THREE.SphereGeometry(0.1, 16, 16)
  
  const elec1 = new THREE.Mesh(elecGeo, elecMat)
  elec1.position.set(0.8, 0, 0)
  ring1.add(elec1)

  const elec2 = new THREE.Mesh(elecGeo, elecMat)
  elec2.position.set(-0.8, 0, 0)
  ring2.add(elec2)

  physicsAtomGroup.position.set(2.0, 1.2, 0.4)
  scene.add(physicsAtomGroup)
  floatingItems.push(physicsAtomGroup)
}

// 3. 3D Math Symbol Block (Matematika)
const createMathSymbol = () => {
  mathSymbolGroup = new THREE.Group()

  // 3D Duo Yellow Math Block with Embossed Plus & Divide
  const blockGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8)
  const blockMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.25, metalness: 0.2 })
  const blockMesh = new THREE.Mesh(blockGeo, blockMat)
  blockMesh.rotation.set(0.3, 0.6, 0.2)
  blockMesh.castShadow = true
  mathSymbolGroup.add(blockMesh)

  // Embossed 3D Plus Symbol on Front (+ Symbol)
  const plusMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
  const plusHGeo = new THREE.BoxGeometry(0.5, 0.14, 0.14)
  const plusVGeo = new THREE.BoxGeometry(0.14, 0.5, 0.14)
  
  const plusH = new THREE.Mesh(plusHGeo, plusMat)
  const plusV = new THREE.Mesh(plusVGeo, plusMat)
  plusH.position.z = 0.4
  plusV.position.z = 0.4

  blockMesh.add(plusH)
  blockMesh.add(plusV)

  mathSymbolGroup.position.set(-1.95, -1.25, 0.5)
  scene.add(mathSymbolGroup)
  floatingItems.push(mathSymbolGroup)
}

// 4. 3D Science Lab Beaker / Flask (Sains)
const createScienceFlask = () => {
  scienceFlaskGroup = new THREE.Group()

  // Flask Neck & Base (Cyan Glass)
  const bodyGeo = new THREE.CylinderGeometry(0.18, 0.52, 0.8, 24)
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

  // Liquid Inside Flask (Green Duo Liquid)
  const liquidGeo = new THREE.CylinderGeometry(0.3, 0.48, 0.4, 24)
  const liquidMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.2 })
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat)
  liquidMesh.position.y = -0.18
  scienceFlaskGroup.add(liquidMesh)

  // Bubbles Floating from Flask
  const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })
  const bubGeo = new THREE.SphereGeometry(0.07, 16, 16)
  
  const bub1 = new THREE.Mesh(bubGeo, bubbleMat)
  bub1.position.set(0, 0.58, 0)
  scienceFlaskGroup.add(bub1)

  const bub2 = new THREE.Mesh(bubGeo, bubbleMat)
  bub2.position.set(0.1, 0.76, 0)
  scienceFlaskGroup.add(bub2)

  scienceFlaskGroup.position.set(1.95, -1.25, 0.5)
  scene.add(scienceFlaskGroup)
  floatingItems.push(scienceFlaskGroup)
}

// Background Floating Particles
const createSparkles = () => {
  const particleCount = 100
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
    positions[i * 3] = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2

    const col = palette[Math.floor(Math.random() * palette.length)]
    colors[i * 3] = col.r
    colors[i * 3 + 1] = col.g
    colors[i * 3 + 2] = col.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.18,
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
    let bounceOffsetY = Math.sin(time * 2.5) * 0.15

    if (clickBounceTime > 0) {
      bounceOffsetY += Math.sin(clickBounceTime * Math.PI) * 0.7
      mascotGroup.rotation.y = time * 8.0
      clickBounceTime -= 0.04
    } else {
      mascotGroup.rotation.y = mouse.x * 0.45
    }

    mascotGroup.position.y = -0.3 + bounceOffsetY
    mascotGroup.rotation.x = -mouse.y * 0.2

    if (leftEyePupil && rightEyePupil) {
      leftEyePupil.position.x = -0.52 + mouse.x * 0.12
      leftEyePupil.position.y = 0.4 + mouse.y * 0.12
      rightEyePupil.position.x = 0.52 + mouse.x * 0.12
      rightEyePupil.position.y = 0.4 + mouse.y * 0.12
    }

    if (leftWing && rightWing) {
      const flap = Math.sin(time * 5.0) * 0.25
      leftWing.rotation.z = 0.35 + flap
      rightWing.rotation.z = -0.35 - flap
    }
  }

  // Globe rotation (Sains)
  if (globeGroup) {
    globeGroup.rotation.y = time * 0.5
    globeGroup.position.y = 1.4 + Math.sin(time * 2) * 0.1
  }

  // Physics Atom rotation (Fisika)
  if (physicsAtomGroup) {
    physicsAtomGroup.rotation.x = time * 0.6
    physicsAtomGroup.rotation.y = time * 0.8
    physicsAtomGroup.position.y = 1.3 + Math.cos(time * 2.2) * 0.1
  }

  // Math Symbol rotation (Matematika)
  if (mathSymbolGroup) {
    mathSymbolGroup.rotation.y = time * 0.7
    mathSymbolGroup.rotation.z = Math.sin(time * 1.5) * 0.2
    mathSymbolGroup.position.y = -1.3 + Math.sin(time * 1.8) * 0.1
  }

  // Science Flask float (Sains Lab)
  if (scienceFlaskGroup) {
    scienceFlaskGroup.rotation.y = time * 0.4
    scienceFlaskGroup.position.y = -1.3 + Math.cos(time * 2.5) * 0.1
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
