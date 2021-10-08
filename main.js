import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as THREE from 'three'

const scene = new THREE.Scene()

let fov = 75
let aspectRatio = window.innerWidth / window.innerHeight

const camera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio,
  0.1, //Fastrum is about visible distance 0.1 = min distance 1000 = max distance
  1000
)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth, window.innerHeight) //window size

camera.position.setZ(30)

renderer.render(scene, camera)

const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100, 202)

const torusMaterial = new THREE.MeshPhysicalMaterial({
  color: 'red'
}) //No light source needed

const torus = new THREE.Mesh(torusGeometry, torusMaterial)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff) //This is a hexadecimal literal
const ambientLight = new THREE.AmbientLight(0x404040) //This is a hexadecimal literal

pointLight.position.set(5, 5, 5)

scene.add(pointLight, ambientLight)

const background = new THREE.TextureLoader().load('./ahevUf.png')

scene.background = background

const Sphere = new THREE.TextureLoader().load('./boxWrapper.png')
const mappedSphere = new THREE.Mesh(
  new THREE.SphereGeometry(3),
  new THREE.MeshBasicMaterial({ map: Sphere })
)
scene.add(mappedSphere)

const biggerTorusGeometry = new THREE.TorusGeometry(30, 4, 15, 15, 15)

const biggerTorusMaterial = new THREE.MeshPhysicalMaterial({
  color: 'darkred'
}) //No light source needed

const biggerTorus = new THREE.Mesh(biggerTorusGeometry, biggerTorusMaterial)

scene.add(biggerTorus)

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.z += 0.012

  mappedSphere.position.z += 0.012

  biggerTorus.rotation.z -= 0.0012
  biggerTorus.rotation.x = -4

  pointLight.position.x += 0.0001
  pointLight.position.z += 0.0001

  setTimeout(() => {
    camera.position.z += 0.01
  }, 5000)

  renderer.render(scene, camera)
}

animate()
