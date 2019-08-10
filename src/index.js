import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'stats.js'

//init
const clock = new THREE.Clock()
let model

const aspect = window.innerWidth / window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.z = 10

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('canvas').appendChild(renderer.domElement)

//stats
const fps = new Stats()
fps.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.getElementById('canvas').appendChild(fps.dom)

//loading model
const loader = new GLTFLoader()

loader.load('model.glb', gltf => {
  model = gltf.scene

  scene.add(gltf.scene)
})

//lights
const sphere = new THREE.SphereBufferGeometry(0.03)

const light1 = new THREE.PointLight(0xff0040, 0.2, 50)
light1.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 }))
)
scene.add(light1)
const light2 = new THREE.PointLight(0x0040ff, 0.2, 50)
light2.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff }))
)
scene.add(light2)
const light3 = new THREE.PointLight(0x80ff80, 0.2, 50)
light3.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 }))
)
scene.add(light3)
const light4 = new THREE.PointLight(0xffaa00, 0.2, 50)
light4.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 }))
)
scene.add(light4)

//resize the canvas to full screen
window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

//add camera control
const controls = new OrbitControls(camera, renderer.domElement)

//render loop
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  const time = Date.now() * 0.0005

  var delta = clock.getDelta()
  if (model) model.rotation.y -= 0.5 * delta

  fps.update()

  light1.position.x = Math.sin(time * 0.4) * 3
  light1.position.y = Math.cos(time * 0.2) * 6
  light1.position.z = Math.cos(time * 0.1) * 3
  light2.position.x = Math.cos(time * 0.3) * 6
  light2.position.y = Math.sin(time * 0.2) * 6
  light2.position.z = Math.sin(time * 0.4) * 3
  light3.position.x = Math.sin(time * 0.4) * 3
  light3.position.y = Math.cos(time * 0.1) * 6
  light3.position.z = Math.sin(time * 0.2) * 3
  light4.position.x = Math.sin(time * 0.1) * 3
  light4.position.y = Math.cos(time * 0.4) * 6
  light4.position.z = Math.sin(time * 0.2) * 3

  controls.update()
}

animate()
