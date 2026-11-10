import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

/**
 * A small robot work cell: a 3-joint industrial arm solved with inverse kinematics so the
 * gripper follows the cursor, standing on concrete among boxes, a pallet and a tote.
 * The arm powers on from a folded "stowed" pose instead of a loading screen.
 */

export type HudRefs = { q: (HTMLElement | null)[]; grip: HTMLElement | null; state: HTMLElement | null }

const L1 = 1.6, L2 = 1.35, SH = 0.75
const clamp = THREE.MathUtils.clamp
const ease = (x: number) => 1 - Math.pow(1 - x, 3)
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

/* ---------- procedural textures ---------- */
function canvas(w: number, h: number) {
  const c = document.createElement("canvas")
  c.width = w; c.height = h
  return [c, c.getContext("2d")!] as const
}
function noise(g: CanvasRenderingContext2D, w: number, h: number, amt: number) {
  const img = g.getImageData(0, 0, w, h), d = img.data
  for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * amt; d[i] += n; d[i + 1] += n; d[i + 2] += n }
  g.putImageData(img, 0, 0)
}
function texture(c: HTMLCanvasElement, repeat = 1) {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeat, repeat)
  return t
}
function concreteTexture() {
  const S = 1024, [c, g] = canvas(S, S)
  g.fillStyle = "#a3a29e"; g.fillRect(0, 0, S, S)
  for (let i = 0; i < 90; i++) { // stains and trowel marks
    const x = Math.random() * S, y = Math.random() * S, r = 40 + Math.random() * 180
    const grad = g.createRadialGradient(x, y, 0, x, y, r)
    const v = Math.random() < 0.5 ? "0,0,0" : "255,255,255"
    grad.addColorStop(0, `rgba(${v},${0.03 + Math.random() * 0.05})`); grad.addColorStop(1, `rgba(${v},0)`)
    g.fillStyle = grad; g.fillRect(x - r, y - r, r * 2, r * 2)
  }
  noise(g, S, S, 26)
  for (let i = 0; i < 1400; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.25})`; g.fillRect(Math.random() * S, Math.random() * S, 1.5, 1.5) }
  g.strokeStyle = "rgba(0,0,0,.35)"; g.lineWidth = 3 // slab joints
  g.beginPath(); g.moveTo(0, 1); g.lineTo(S, 1); g.moveTo(1, 0); g.lineTo(1, S); g.moveTo(0, S / 2); g.lineTo(S, S / 2); g.moveTo(S / 2, 0); g.lineTo(S / 2, S); g.stroke()
  return texture(c, 8)
}
function cardboardTexture() {
  const S = 512, [c, g] = canvas(S, S)
  g.fillStyle = "#b48552"; g.fillRect(0, 0, S, S)
  for (let i = 0; i < 260; i++) { g.strokeStyle = `rgba(${Math.random() < 0.5 ? "60,35,10" : "255,230,190"},${Math.random() * 0.08})`; g.beginPath(); const y = Math.random() * S; g.moveTo(0, y); g.lineTo(S, y + (Math.random() - 0.5) * 6); g.stroke() }
  noise(g, S, S, 18)
  g.fillStyle = "rgba(205,168,112,.92)"; g.fillRect(0, S / 2 - 38, S, 76) // packing tape
  g.fillStyle = "rgba(255,255,255,.18)"; g.fillRect(0, S / 2 - 38, S, 6)
  g.strokeStyle = "rgba(40,25,10,.75)"; g.lineWidth = 4; g.strokeRect(34, 34, 128, 92) // shipping mark
  g.fillStyle = "rgba(40,25,10,.8)"; g.font = "bold 46px sans-serif"; g.fillText("↑↑", 58, 98)
  g.font = "bold 22px monospace"; g.fillText("PJ-0" + Math.floor(Math.random() * 9 + 1), S - 150, S - 44)
  return texture(c)
}
function woodTexture() {
  const [c, g] = canvas(512, 128)
  g.fillStyle = "#a57a4c"; g.fillRect(0, 0, 512, 128)
  for (let i = 0; i < 70; i++) { g.strokeStyle = `rgba(70,40,15,${Math.random() * 0.25})`; g.lineWidth = Math.random() * 2; g.beginPath(); const y = Math.random() * 128; g.moveTo(0, y); g.bezierCurveTo(170, y + 6, 340, y - 6, 512, y); g.stroke() }
  noise(g, 512, 128, 20)
  return texture(c)
}
function hazardTexture() {
  const [c, g] = canvas(256, 32)
  g.fillStyle = "#f0b400"; g.fillRect(0, 0, 256, 32)
  g.fillStyle = "#151515"
  for (let x = -32; x < 288; x += 32) { g.beginPath(); g.moveTo(x, 32); g.lineTo(x + 16, 32); g.lineTo(x + 32, 0); g.lineTo(x + 16, 0); g.fill() }
  noise(g, 256, 32, 16)
  const t = texture(c)
  t.wrapT = THREE.ClampToEdgeWrapping
  return t
}

/* ---------- geometry helpers ---------- */
/** Tapered link with round ends, like a cast arm segment: extruded side profile, bevelled. */
function linkGeometry(len: number, w0: number, w1: number, depth: number) {
  const s = new THREE.Shape()
  s.moveTo(-w0 / 2, 0)
  s.lineTo(-w1 / 2, len)
  s.absarc(0, len, w1 / 2, Math.PI, 0, true)
  s.lineTo(w0 / 2, 0)
  s.absarc(0, 0, w0 / 2, 0, Math.PI, true)
  const bevel = Math.min(0.035, depth * 0.15)
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5, curveSegments: 32 })
  geo.translate(0, 0, -depth / 2)
  geo.rotateY(Math.PI / 2) // profile faces sideways; the arm swings about X
  return geo
}
const axisX = (geo: THREE.BufferGeometry) => geo.rotateZ(Math.PI / 2)

export function createRobotScene(canvasEl: HTMLCanvasElement, hud: HudRefs, startDark: boolean) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, powerPreference: "high-performance" })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
  renderer.setSize(innerWidth, innerHeight, false)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  scene.fog = new THREE.Fog(0x000000, 11, 28)
  const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.1, 100)
  const aniso = renderer.capabilities.getMaxAnisotropy()

  /* lights */
  const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x1a1a1c, 0.4)
  scene.add(hemi)
  const key = new THREE.DirectionalLight(0xffffff, 2.6)
  key.position.set(5, 9, 6)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 })
  key.shadow.bias = -0.0004
  key.shadow.normalBias = 0.02
  scene.add(key)
  const rim = new THREE.PointLight(0xff4a14, 10, 9, 1.6)
  rim.position.set(-3, 2.6, -2.4)
  scene.add(rim)

  /* floor: concrete slabs + safety tape around the cell */
  const floorMat = new THREE.MeshStandardMaterial({ map: concreteTexture(), roughness: 0.92, metalness: 0 })
  floorMat.map!.anisotropy = aniso
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(44, 44), floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)
  const tapeTex = hazardTexture()
  const tapeMat = new THREE.MeshStandardMaterial({ map: tapeTex, roughness: 0.55 })
  const H = 2.15, T = 0.1
  for (let i = 0; i < 4; i++) {
    const tex = tapeTex.clone(); tex.repeat.set((H * 2 + T) / 0.6, 1); tex.needsUpdate = true
    const m = new THREE.Mesh(new THREE.PlaneGeometry(H * 2 + T, T), tapeMat.clone())
    ;(m.material as THREE.MeshStandardMaterial).map = tex
    m.rotation.x = -Math.PI / 2
    m.rotation.z = (i * Math.PI) / 2
    const a = (i * Math.PI) / 2
    m.position.set(Math.sin(a) * H, 0.004, Math.cos(a) * H)
    m.receiveShadow = true
    scene.add(m)
  }

  /* materials */
  const paint = new THREE.MeshPhysicalMaterial({ color: 0xf0501c, roughness: 0.34, metalness: 0, clearcoat: 0.8, clearcoatRoughness: 0.16 })
  const alu = new THREE.MeshStandardMaterial({ color: 0xd2d5da, metalness: 1, roughness: 0.28 })
  const anod = new THREE.MeshStandardMaterial({ color: 0x25282d, metalness: 0.75, roughness: 0.4 })
  const steel = new THREE.MeshStandardMaterial({ color: 0x6a6e74, metalness: 0.9, roughness: 0.45 })
  const rubber = new THREE.MeshStandardMaterial({ color: 0x151617, roughness: 0.85 })
  const led = new THREE.MeshStandardMaterial({ color: 0x220800, emissive: 0xff4a14, emissiveIntensity: 0 })

  const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.castShadow = m.receiveShadow = true
    return m
  }
  const lathe = (pts: [number, number][], mat: THREE.Material, y = 0) => mesh(new THREE.LatheGeometry(pts.map(([r, h]) => new THREE.Vector2(r, h)), 72), mat, 0, y, 0)

  /* ---------- the arm ---------- */
  const robot = new THREE.Group()
  scene.add(robot)
  robot.add(mesh(new THREE.CylinderGeometry(0.95, 0.97, 0.06, 72), steel, 0, 0.03, 0)) // floor plate
  for (let i = 0; i < 8; i++) { // anchor bolts
    const a = (i / 8) * Math.PI * 2
    robot.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.035, 6), alu, Math.cos(a) * 0.84, 0.075, Math.sin(a) * 0.84))
  }
  robot.add(lathe([[0, 0], [0.62, 0], [0.62, 0.05], [0.56, 0.1], [0.52, 0.36], [0.49, 0.42], [0, 0.42]], anod, 0.06)) // pedestal

  const yaw = new THREE.Group()
  yaw.position.y = 0.48
  robot.add(yaw)
  yaw.add(lathe([[0, 0], [0.5, 0], [0.52, 0.03], [0.5, 0.07], [0.44, 0.19], [0.36, 0.25], [0, 0.27]], paint)) // turret
  const ledRing = mesh(new THREE.TorusGeometry(0.505, 0.012, 12, 96), led, 0, 0.035, 0)
  ledRing.rotation.x = Math.PI / 2
  yaw.add(ledRing)

  const shoulder = new THREE.Group()
  shoulder.position.y = SH - 0.48
  yaw.add(shoulder)
  shoulder.add(mesh(axisX(new THREE.CylinderGeometry(0.27, 0.27, 0.52, 64)), paint))
  for (const s of [-1, 1]) shoulder.add(mesh(axisX(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 64)), alu, s * 0.275, 0, 0))
  shoulder.add(mesh(axisX(new THREE.CylinderGeometry(0.16, 0.17, 0.24, 48)), anod, 0.41, 0, 0)) // motor
  shoulder.add(mesh(axisX(new THREE.CylinderGeometry(0.09, 0.09, 0.03, 32)), alu, 0.545, 0, 0))
  const upper = mesh(linkGeometry(L1, 0.42, 0.3, 0.26), paint)
  shoulder.add(upper)
  const cable = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.2, 0.12, -0.12), new THREE.Vector3(-0.27, L1 * 0.5, -0.16), new THREE.Vector3(-0.2, L1 - 0.12, -0.1)])
  shoulder.add(mesh(new THREE.TubeGeometry(cable, 40, 0.026, 10), rubber))

  const elbow = new THREE.Group()
  elbow.position.y = L1
  shoulder.add(elbow)
  elbow.add(mesh(axisX(new THREE.CylinderGeometry(0.2, 0.2, 0.42, 64)), paint))
  for (const s of [-1, 1]) elbow.add(mesh(axisX(new THREE.CylinderGeometry(0.15, 0.15, 0.025, 48)), alu, s * 0.222, 0, 0))
  elbow.add(mesh(axisX(new THREE.CylinderGeometry(0.12, 0.13, 0.17, 40)), anod, -0.31, 0, 0))
  elbow.add(mesh(linkGeometry(L2, 0.3, 0.19, 0.2), paint))
  elbow.add(mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 40), anod, 0, L2 * 0.62, 0)) // band

  const wrist = new THREE.Group()
  wrist.position.y = L2
  elbow.add(wrist)
  wrist.add(mesh(axisX(new THREE.CylinderGeometry(0.105, 0.105, 0.24, 40)), anod))
  wrist.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 40), alu, 0, 0.12, 0)) // tool flange
  wrist.add(mesh(new RoundedBoxGeometry(0.36, 0.12, 0.17, 3, 0.025), anod, 0, 0.2, 0)) // gripper body
  const fingerGeo = new RoundedBoxGeometry(0.045, 0.24, 0.13, 3, 0.012)
  const padGeo = new RoundedBoxGeometry(0.014, 0.11, 0.11, 2, 0.004)
  const fingers = [-1, 1].map((s) => {
    const f = new THREE.Group()
    f.add(mesh(fingerGeo, alu, 0, 0, 0))
    f.add(mesh(padGeo, rubber, -s * 0.028, 0.05, 0))
    f.position.set(s * 0.13, 0.37, 0)
    wrist.add(f)
    return f
  })
  const tipLight = new THREE.PointLight(0xff4a14, 0, 2.2)
  tipLight.position.y = 0.48
  wrist.add(tipLight)

  /* ---------- the cell: pallet with boxes, a tote with cans, loose boxes ---------- */
  const woodTex = woodTexture()
  const wood = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.82 })
  const cardMats = Array.from({ length: 3 }, () => new THREE.MeshStandardMaterial({ map: cardboardTexture(), roughness: 0.88 }))
  const plastic = new THREE.MeshStandardMaterial({ color: 0x3b3f45, roughness: 0.55, metalness: 0 })
  const props = new THREE.Group()
  scene.add(props)
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, ry: number, i: number) => {
    const m = mesh(new RoundedBoxGeometry(w, h, d, 2, 0.012), cardMats[i % cardMats.length], x, y + h / 2, z)
    m.rotation.y = ry
    props.add(m)
    return m
  }
  const pallet = new THREE.Group()
  for (let i = 0; i < 5; i++) pallet.add(mesh(new THREE.BoxGeometry(1.2, 0.03, 0.18), wood, 0, 0.135, -0.5 + i * 0.25))
  for (let i = 0; i < 3; i++) pallet.add(mesh(new THREE.BoxGeometry(0.12, 0.1, 1.2), wood, -0.52 + i * 0.52, 0.07, 0))
  for (let i = 0; i < 3; i++) pallet.add(mesh(new THREE.BoxGeometry(1.2, 0.02, 0.12), wood, 0, 0.01, -0.5 + i * 0.5))
  pallet.position.set(-3.1, 0, -1.3)
  pallet.rotation.y = 0.35
  props.add(pallet)
  const top = 0.15
  const pb = [box(0.56, 0.42, 0.48, -0.26, top, -0.24, 0.02, 0), box(0.5, 0.36, 0.46, 0.3, top, -0.22, -0.04, 1), box(0.52, 0.4, 0.5, 0.02, top, 0.3, 0.05, 2), box(0.44, 0.32, 0.4, -0.18, top + 0.42, -0.2, 0.18, 1)]
  pb.forEach((b) => { props.remove(b); pallet.add(b) })

  const tote = new THREE.Group()
  const TW = 0.74, TD = 0.52, TH = 0.3, TT = 0.025
  tote.add(mesh(new RoundedBoxGeometry(TW, TT, TD, 2, 0.01), plastic, 0, TT / 2, 0))
  for (const [w, d, x, z] of [[TW, TT, 0, TD / 2], [TW, TT, 0, -TD / 2], [TT, TD, TW / 2, 0], [TT, TD, -TW / 2, 0]] as const)
    tote.add(mesh(new RoundedBoxGeometry(w, TH, d, 2, 0.01), plastic, x, TH / 2, z))
  for (let i = 0; i < 3; i++) {
    const can = new THREE.Group()
    can.add(mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.2, 40), i === 1 ? paint : alu, 0, 0.1, 0))
    can.add(mesh(new THREE.CylinderGeometry(0.058, 0.066, 0.012, 40), alu, 0, 0.206, 0))
    can.position.set(-0.2 + i * 0.2, TT, (i % 2) * 0.12 - 0.06)
    tote.add(can)
  }
  tote.position.set(2.75, 0, -1.55)
  tote.rotation.y = -0.4
  props.add(tote)

  box(0.5, 0.38, 0.42, 3.3, 0, 1.4, 0.5, 0)
  box(0.36, 0.28, 0.34, 3.05, 0.38, 1.38, 0.32, 2)
  box(0.42, 0.34, 0.4, -2.55, 0, 2.55, -0.3, 1)
  box(0.6, 0.3, 0.44, 1.1, 0, -3.3, 0.2, 2)
  box(0.32, 0.26, 0.3, -1.1, 0, -3.1, -0.6, 0)

  /* laser spot where the gripper is aiming */
  const spot = new THREE.Group()
  const spotMat = new THREE.MeshBasicMaterial({ color: 0xff3000, transparent: true, opacity: 0.85, depthWrite: false })
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.175, 64), spotMat)
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.03, 24), spotMat)
  ring.rotation.x = dot.rotation.x = -Math.PI / 2
  spot.add(ring, dot)
  scene.add(spot)

  robot.traverse((o) => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true } })

  /* ---------- theme ---------- */
  function setDark(dark: boolean) {
    const bg = new THREE.Color(dark ? 0x08090b : 0xebe9e4)
    scene.background = bg
    ;(scene.fog as THREE.Fog).color.copy(bg)
    floorMat.color.set(dark ? 0x3d3e42 : 0xf2f0ea)
    hemi.intensity = dark ? 0.35 : 1.0
    hemi.groundColor.set(dark ? 0x1a1a1c : 0xb9b6ae)
    key.intensity = dark ? 2.6 : 2.3
    rim.intensity = dark ? 10 : 0
    scene.environmentIntensity = dark ? 0.55 : 0.95
    renderer.toneMappingExposure = dark ? 1 : 1.05
  }
  setDark(startDark)

  /* ---------- input ---------- */
  const mouse = { x: 0, y: 0, active: false }
  let press = false, overDemo = false, grip = 0
  const onMove = (e: PointerEvent) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1; mouse.active = true }
  const onDown = () => (press = true)
  const onUp = () => (press = false)
  const onOver = (e: Event) => (overDemo = !!(e.target as Element).closest?.("[data-open]")) // the gripper closes over a project
  const onResize = () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false) }
  addEventListener("pointermove", onMove)
  addEventListener("pointerdown", onDown)
  addEventListener("pointerup", onUp)
  document.addEventListener("pointerover", onOver)
  addEventListener("resize", onResize)

  /* ---------- IK ---------- */
  const q = { yaw: 0, a1: 0, a2: 0 }
  const target = new THREE.Vector3()
  function solve(t: THREE.Vector3) {
    const f = Math.hypot(t.x, t.z), u = t.y - SH
    const d = clamp(Math.hypot(f, u), 0.6, L1 + L2 - 0.02)
    const alpha = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1))
    const bend = Math.PI - Math.acos(clamp((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2), -1, 1))
    return { yaw: Math.atan2(t.x, t.z), a1: Math.atan2(f, u) - alpha, a2: bend }
  }
  const stowed = { yaw: -0.5, a1: -0.55, a2: 2.55 } // folded back over the base

  /* ---------- loop ---------- */
  const t0 = performance.now()
  let raf = 0, frames = 0, homed = false
  function frame(now: number) {
    raf = requestAnimationFrame(frame)
    const t = (now - t0) / 1000
    const scrollP = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)

    // power-on: status ring flickers on, then the arm homes from its stowed pose
    const power = reduce ? 1 : easeInOut(clamp((t - 0.5) / 1.8, 0, 1))
    const flicker = t < 0.5 ? (Math.sin(t * 40) > 0 ? 0.6 : 0) : 1
    led.emissiveIntensity = reduce ? 2.2 : clamp(t / 0.5, 0, 1) * flicker * 2.2

    const gripTarget = press || overDemo ? 1 : 0
    grip += (gripTarget - grip) * 0.2
    const mx = mouse.active ? mouse.x : Math.sin(t * 0.6) * 0.7
    const my = mouse.active ? mouse.y : Math.sin(t * 0.9) * 0.4
    target.set(mx * 2.4, Math.max(0.4, 1.3 - my * 1.1 - grip * 0.35), 1.7 + Math.cos(t * 0.4) * 0.2)
    const s = solve(target), k = reduce ? 1 : 0.08
    q.yaw += (s.yaw - q.yaw) * k; q.a1 += (s.a1 - q.a1) * k; q.a2 += (s.a2 - q.a2) * k
    const yawA = THREE.MathUtils.lerp(stowed.yaw, q.yaw, power)
    const a1 = THREE.MathUtils.lerp(stowed.a1, q.a1, power)
    const a2 = THREE.MathUtils.lerp(stowed.a2, q.a2, power)
    yaw.rotation.y = yawA
    shoulder.rotation.x = a1
    elbow.rotation.x = a2
    wrist.rotation.x = Math.PI - a1 - a2 // keep the gripper pointing down
    fingers[0].position.x = -0.13 + grip * 0.075
    fingers[1].position.x = 0.13 - grip * 0.075
    tipLight.intensity = grip * 3
    spot.position.set(target.x, 0.008, target.z)
    spotMat.opacity = 0.85 * power
    ring.scale.setScalar(1 + Math.sin(t * 4) * 0.06 + grip * 0.4)

    if (frames++ % 4 === 0) {
      const deg = (r: number) => THREE.MathUtils.radToDeg(r).toFixed(1) + "°"
      hud.q[0] && (hud.q[0].textContent = deg(yawA))
      hud.q[1] && (hud.q[1].textContent = deg(a1))
      hud.q[2] && (hud.q[2].textContent = deg(a2))
      hud.grip && (hud.grip.textContent = gripTarget ? "closed" : "open")
      if (!homed && power >= 1) { homed = true; hud.state && (hud.state.textContent = "ready") }
    }

    // camera orbits the cell as the page scrolls; at the top the arm sits right of the headline
    const intro = reduce ? 1 : ease(clamp(t / 2.4, 0, 1))
    const portrait = innerWidth < innerHeight
    const ang = 0.55 + scrollP * Math.PI * 1.6 + (1 - intro) * 0.9
    const rad = (9.6 - scrollP * 1.5 + (1 - intro) * 2.5) * (portrait ? 1.5 : 1) // phones: pull back so the cell fits
    camera.position.set(Math.sin(ang) * rad, 3.5 + scrollP * 2.4 + (1 - intro) * 1.4, Math.cos(ang) * rad)
    camera.lookAt(0, 1.25, 0)
    const atTop = Math.max(0, 1 - scrollY / innerHeight)
    const atEnd = clamp((scrollP - 0.9) * 10, 0, 1)
    // wide screens: arm right of the headline; phones: arm in the empty space above it
    const shiftX = innerWidth > 960 ? -innerWidth * (0.2 * atTop + 0.22 * atEnd) : 0
    const shiftY = portrait ? innerHeight * 0.22 * atTop : 0
    camera.setViewOffset(innerWidth, innerHeight, shiftX, shiftY, innerWidth, innerHeight)

    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)

  return {
    setDark,
    dispose() {
      cancelAnimationFrame(raf)
      removeEventListener("pointermove", onMove)
      removeEventListener("pointerdown", onDown)
      removeEventListener("pointerup", onUp)
      document.removeEventListener("pointerover", onOver)
      removeEventListener("resize", onResize)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        if (m.isMesh) {
          m.geometry.dispose()
          const mats = Array.isArray(m.material) ? m.material : [m.material]
          mats.forEach((mt) => { (mt as THREE.MeshStandardMaterial).map?.dispose(); mt.dispose() })
        }
      })
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
    },
  }
}
