import {
  NeutralToneMapping,
  CanvasTexture,
  Color,
  DirectionalLight,
  PointLight,
  HemisphereLight,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
  Box3,
  Vector3,
} from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/** Textura de grão fino (ruído), usada como relevo e como variação de rugosidade. */
function grain(size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const img = g.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 110 + Math.random() * 145
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  g.putImageData(img, 0, 0)
  const t = new CanvasTexture(c)
  t.wrapS = t.wrapT = RepeatWrapping
  t.repeat.set(0.034, 0.034) // a UV da extrusão é a coordenada do path (0–168): ~1 texel por pixel
  return t
}

/**
 * Renderiza UMA vez o símbolo do Spotify extrudado (chanfro arredondado, material físico verde
 * com grão fino, luz de estúdio) e devolve um blob PNG com fundo transparente. O contexto WebGL
 * é descartado em seguida: nada fica rodando na página.
 */
export async function renderSymbol(path: string, px: number, type = 'image/webp', quality = 0.9): Promise<Blob | null> {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = px
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'low-power' })
  try {
    renderer.setPixelRatio(1)
    renderer.setSize(px, px, false)
    renderer.toneMapping = NeutralToneMapping
    renderer.toneMappingExposure = 0.92
    renderer.outputColorSpace = SRGBColorSpace

    const scene = new Scene()
    const pmrem = new PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture
    scene.environmentIntensity = 0.3

    const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168"><path d="${path}"/></svg>`)
    const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p))
    const geo = new ExtrudeGeometry(shapes, {
      depth: 8,
      bevelEnabled: true,
      bevelThickness: 11,
      bevelSize: 5.2,
      bevelSegments: 18,
      curveSegments: 96,
    })
    const tex = grain()
    const mat = new MeshPhysicalMaterial({
      color: new Color('#12c454'),
      roughness: 0.48,
      roughnessMap: tex,
      bumpMap: tex,
      bumpScale: 1.4,
      metalness: 0,
      clearcoat: 0.25,
      clearcoatRoughness: 0.5,
    })
    const mesh = new Mesh(geo, mat)
    // o SVG tem y para baixo: vira e centraliza
    mesh.scale.set(1, -1, 1)
    const box = new Box3().setFromObject(mesh)
    const center = box.getCenter(new Vector3())
    mesh.position.sub(center)
    const g = new Group()
    g.add(mesh)
    g.rotation.set(-0.2, 0.32, -0.06)
    scene.add(g)

    // luz de estúdio: chave pontual perto (queda suave na face), céu/chão e um recorte frio
    const key = new PointLight('#ffffff', 620, 0, 1)
    key.position.set(-120, 170, 150)
    scene.add(key)
    const fill = new DirectionalLight('#ffffff', 0.35)
    fill.position.set(-60, 120, 300)
    scene.add(fill)
    scene.add(new HemisphereLight('#f4fff7', '#0b4a24', 0.55))
    const rim = new DirectionalLight('#c8ffe0', 1.1)
    rim.position.set(260, -80, 60)
    scene.add(rim)

    const cam = new PerspectiveCamera(30, 1, 10, 2000)
    cam.position.set(0, 0, 400)
    cam.lookAt(0, 0, 0)
    renderer.render(scene, cam)

    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, type, quality))
    geo.dispose()
    mat.dispose()
    tex.dispose()
    pmrem.dispose()
    return blob
  } finally {
    renderer.dispose()
    renderer.forceContextLoss()
  }
}
