<template>
  <div class="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none">
    <!-- Transparent 3D Canvas -->
    <div ref="canvasContainer" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  feature: 'map' | 'streak' | 'brain' | 'media'
}>()

const canvasContainer = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationFrameId: number

let mainGroup: THREE.Group
const animatedObjects: { mesh: THREE.Object3D; speedY: number; speedRot: number }[] = []

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

const init3D = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, 5.2)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.3
  canvasContainer.value.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.5)
  mainLight.position.set(4, 6, 4)
  scene.add(mainLight)

  mainGroup = new THREE.Group()

  if (props.feature === 'map') {
    buildMapScene()
  } else if (props.feature === 'streak') {
    buildStreakScene()
  } else if (props.feature === 'brain') {
    buildBrainScene()
  } else if (props.feature === 'media') {
    buildMediaScene()
  }

  scene.add(mainGroup)

  window.addEventListener('mousemove', onMouseMove)
  animate()
}

// 1. Map 3D Scene (Peta Jalur Checkpoint & Star Flag)
const buildMapScene = () => {
  // Checkpoint Flag Pole
  const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, 1.8, 16)
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.2, metalness: 0.3 })
  const pole = new THREE.Mesh(poleGeo, poleMat)
  pole.position.set(-0.6, 0, 0)
  mainGroup.add(pole)

  // Flag Banner
  const flagGeo = new THREE.BoxGeometry(0.9, 0.6, 0.05)
  const flagMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.1 })
  const flag = new THREE.Mesh(flagGeo, flagMat)
  flag.position.set(-0.15, 0.5, 0)
  mainGroup.add(flag)

  // Star on top of flag
  const starGeo = new THREE.OctahedronGeometry(0.35, 0)
  const starMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.1, metalness: 0.6 })
  const star = new THREE.Mesh(starGeo, starMat)
  star.position.set(-0.6, 1.05, 0)
  mainGroup.add(star)
  animatedObjects.push({ mesh: star, speedY: 2.0, speedRot: 0.04 })

  // 3D Level Checkpoint Nodes
  const nodeGeo = new THREE.SphereGeometry(0.28, 20, 20)
  for (let i = 0; i < 3; i++) {
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.2 })
    const node = new THREE.Mesh(nodeGeo, nodeMat)
    node.position.set(0.4 + i * 0.45, -0.4 + i * 0.3, (i - 1) * 0.3)
    mainGroup.add(node)
    animatedObjects.push({ mesh: node, speedY: 1.5 + i * 0.3, speedRot: 0.02 })
  }
}

// 2. Streak 3D Scene (Glowing Fire Flame & Bouncing XP Gem)
const buildStreakScene = () => {
  // Central Fire Flame Core
  const fireGroup = new THREE.Group()

  const outerFlameGeo = new THREE.ConeGeometry(0.75, 1.6, 16)
  const outerFlameMat = new THREE.MeshStandardMaterial({ color: 0xff4b4b, roughness: 0.2, metalness: 0.1 })
  const outerFlame = new THREE.Mesh(outerFlameGeo, outerFlameMat)
  fireGroup.add(outerFlame)

  const innerFlameGeo = new THREE.ConeGeometry(0.45, 1.1, 16)
  const innerFlameMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.1 })
  const innerFlame = new THREE.Mesh(innerFlameGeo, innerFlameMat)
  innerFlame.position.y = -0.1
  innerFlame.position.z = 0.1
  fireGroup.add(innerFlame)

  fireGroup.position.set(-0.4, 0, 0)
  mainGroup.add(fireGroup)

  // Floating Bouncing XP Gem (Diamond Octahedron)
  const gemGeo = new THREE.OctahedronGeometry(0.55, 0)
  const gemMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.1, metalness: 0.7 })
  const gem = new THREE.Mesh(gemGeo, gemMat)
  gem.position.set(0.7, 0.2, 0.3)
  mainGroup.add(gem)
  animatedObjects.push({ mesh: gem, speedY: 3.0, speedRot: 0.05 })

  // Floating embers
  for (let i = 0; i < 4; i++) {
    const ember = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffa500 }))
    ember.position.set((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.8)
    mainGroup.add(ember)
    animatedObjects.push({ mesh: ember, speedY: 2.2 + i, speedRot: 0.03 })
  }
}

// 3. Brain 3D Scene (Holographic Memory Brain Core & Orbiting Synapses)
const buildBrainScene = () => {
  const brainGroup = new THREE.Group()

  // Left & Right Hemisphere Spheres
  const hemiGeo = new THREE.SphereGeometry(0.65, 24, 24)
  hemiGeo.scale(0.85, 1.1, 1.2)
  const brainMat = new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.2, metalness: 0.3 })

  const leftHemi = new THREE.Mesh(hemiGeo, brainMat)
  leftHemi.position.set(-0.4, 0, 0)
  brainGroup.add(leftHemi)

  const rightHemi = new THREE.Mesh(hemiGeo, brainMat)
  rightHemi.position.set(0.4, 0, 0)
  brainGroup.add(rightHemi)

  mainGroup.add(brainGroup)

  // Orbiting Synapse Rings
  const ringGeo = new THREE.TorusGeometry(1.3, 0.04, 16, 48)
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x58cc02, roughness: 0.1 })
  const ring1 = new THREE.Mesh(ringGeo, ringMat)
  ring1.rotation.x = Math.PI * 0.35
  mainGroup.add(ring1)

  const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x1cb0f6, roughness: 0.1 })
  const ring2 = new THREE.Mesh(ringGeo, ring2Mat)
  ring2.rotation.y = Math.PI * 0.45
  mainGroup.add(ring2)
}

// 4. Media 3D Scene (Headphones & Musical Equalizer Spheres)
const buildMediaScene = () => {
  const mediaGroup = new THREE.Group()

  // Headphone Band Curved Torus
  const bandGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 32, Math.PI)
  const bandMat = new THREE.MeshStandardMaterial({ color: 0xce82ff, roughness: 0.2, metalness: 0.3 })
  const band = new THREE.Mesh(bandGeo, bandMat)
  band.rotation.z = -Math.PI * 0.5
  mediaGroup.add(band)

  // Ear Pads Left & Right
  const padGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 24)
  const padMat = new THREE.MeshStandardMaterial({ color: 0xff4b4b, roughness: 0.2 })

  const leftPad = new THREE.Mesh(padGeo, padMat)
  leftPad.position.set(-0.9, 0, 0)
  leftPad.rotation.z = Math.PI * 0.5
  mediaGroup.add(leftPad)

  const rightPad = new THREE.Mesh(padGeo, padMat)
  rightPad.position.set(0.9, 0, 0)
  rightPad.rotation.z = Math.PI * 0.5
  mediaGroup.add(rightPad)

  mainGroup.add(mediaGroup)

  // Floating Sound Wave Spheres
  const colors = [0x58cc02, 0x1cb0f6, 0xffc800]
  for (let i = 0; i < 3; i++) {
    const ballMat = new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.1 })
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), ballMat)
    ball.position.set((i - 1) * 0.6, 0.85 + (i % 2) * 0.2, 0.3)
    mainGroup.add(ball)
    animatedObjects.push({ mesh: ball, speedY: 2.0 + i, speedRot: 0.04 })
  }
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
    mainGroup.position.y = Math.sin(time * 2.2) * 0.08
  }

  animatedObjects.forEach((item, idx) => {
    item.mesh.position.y += Math.sin(time * item.speedY + idx) * 0.003
    item.mesh.rotation.y += item.speedRot
    item.mesh.rotation.z += item.speedRot * 0.5
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
