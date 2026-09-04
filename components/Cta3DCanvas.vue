<template>
  <div class="relative w-full h-56 sm:h-64 max-w-lg mx-auto overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-3xl">
    <!-- Transparent 3D WebGL Canvas -->
    <div ref="canvasContainer" class="w-full h-full"></div>

    <!-- Floating 3D Badge Tag -->
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-900/80 text-amber-300 backdrop-blur-md rounded-full text-xs font-heading font-black tracking-wide shadow-lg border border-amber-500/40 flex items-center gap-2 pointer-events-none">
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
      <span>✨ 3D Mascot & Bonus Reward Chest</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

let mascotGroup: THREE.Group
let chestGroup: THREE.Group
const floatingRewards: THREE.Mesh[] = []

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

const init3D = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, 6.0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.3
  canvasContainer.value.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)
  dirLight.position.set(5, 7, 5)
  scene.add(dirLight)

  const pointLight = new THREE.PointLight(0xffc800, 3, 10)
  pointLight.position.set(0, 0, 2)
  scene.add(pointLight)

  // 1. Build 3D Mascot Kiko (Bird Body, Eyes, Beak, Wings)
  mascotGroup = new THREE.Group()

  // Body: Emerald Green Sphere
  const bodyGeo = new THREE.SphereGeometry(1.0, 32, 32)
  bodyGeo.scale(1.0, 1.15, 0.95)
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.25, metalness: 0.1 })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  mascotGroup.add(body)

  // Belly: Light Green Patch
  const bellyGeo = new THREE.SphereGeometry(0.7, 24, 24)
  bellyGeo.scale(0.9, 1.0, 0.4)
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0x8ee000, roughness: 0.3 })
  const belly = new THREE.Mesh(bellyGeo, bellyMat)
  belly.position.set(0, -0.15, 0.72)
  mascotGroup.add(belly)

  // Eyes (White + Black Pupils)
  const eyeMatWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.1 })

  const eyeGeo = new THREE.SphereGeometry(0.28, 20, 20)
  const pupilGeo = new THREE.SphereGeometry(0.13, 16, 16)

  // Left Eye
  const leftEye = new THREE.Mesh(eyeGeo, eyeMatWhite)
  leftEye.position.set(-0.35, 0.35, 0.78)
  const leftPupil = new THREE.Mesh(pupilGeo, pupilMat)
  leftPupil.position.set(-0.35, 0.35, 1.02)
  mascotGroup.add(leftEye)
  mascotGroup.add(leftPupil)

  // Right Eye
  const rightEye = new THREE.Mesh(eyeGeo, eyeMatWhite)
  rightEye.position.set(0.35, 0.35, 0.78)
  const rightPupil = new THREE.Mesh(pupilGeo, pupilMat)
  rightPupil.position.set(0.35, 0.35, 1.02)
  mascotGroup.add(rightEye)
  mascotGroup.add(rightPupil)

  // Beak (Orange Cone)
  const beakGeo = new THREE.ConeGeometry(0.18, 0.4, 16)
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xff9600, roughness: 0.2 })
  const beak = new THREE.Mesh(beakGeo, beakMat)
  beak.rotation.x = Math.PI * 0.5
  beak.position.set(0, 0.15, 0.95)
  mascotGroup.add(beak)

  // Wings (Left & Right)
  const wingGeo = new THREE.SphereGeometry(0.45, 16, 16)
  wingGeo.scale(0.3, 1.2, 0.7)
  const wingMat = new THREE.MeshStandardMaterial({ color: 0x46a302, roughness: 0.3 })

  const leftWing = new THREE.Mesh(wingGeo, wingMat)
  leftWing.position.set(-1.05, 0, 0)
  leftWing.rotation.z = 0.3
  mascotGroup.add(leftWing)

  const rightWing = new THREE.Mesh(wingGeo, wingMat)
  rightWing.position.set(1.05, 0, 0)
  rightWing.rotation.z = -0.3
  mascotGroup.add(rightWing)

  mascotGroup.position.set(0, 0.2, 0)
  scene.add(mascotGroup)

  // 2. Build 3D Orbiting Reward Gold Coins & XP Gems
  const coinGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.08, 24)
  const coinMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.1, metalness: 0.8 })

  const gemGeo = new THREE.OctahedronGeometry(0.32, 0)
  const gemMat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.1, metalness: 0.5 })

  for (let i = 0; i < 6; i++) {
    const isCoin = i % 2 === 0
    const mesh = new THREE.Mesh(isCoin ? coinGeo : gemGeo, isCoin ? coinMat : gemMat)
    const angle = (i / 6) * Math.PI * 2
    const radius = 2.1
    mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, (Math.random() - 0.5) * 0.8)
    if (isCoin) mesh.rotation.x = Math.PI * 0.5
    scene.add(mesh)
    floatingRewards.push(mesh)
  }

  window.addEventListener('mousemove', onMouseMove)
  animate()
}

const onMouseMove = (e: MouseEvent) => {
  if (!canvasContainer.value) return
  const rect = canvasContainer.value.getBoundingClientRect()
  mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

const clock = new THREE.Clock()

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  mouse.x += (mouse.targetX - mouse.x) * 0.08
  mouse.y += (mouse.targetY - mouse.y) * 0.08

  if (mascotGroup) {
    mascotGroup.rotation.y = Math.sin(time * 1.5) * 0.3 + mouse.x * 0.5
    mascotGroup.rotation.x = mouse.y * 0.3
    mascotGroup.position.y = Math.sin(time * 2.5) * 0.15 + 0.1
  }

  // Orbiting Coins & Gems around Mascot
  floatingRewards.forEach((item, idx) => {
    const angle = time * 0.8 + (idx / floatingRewards.length) * Math.PI * 2
    const radius = 2.2
    item.position.x = Math.cos(angle) * radius
    item.position.z = Math.sin(angle) * radius
    item.position.y = Math.sin(time * 3 + idx) * 0.35 + 0.1
    item.rotation.y += 0.04
    item.rotation.z += 0.02
  })

  renderer.render(scene, camera)
}

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
