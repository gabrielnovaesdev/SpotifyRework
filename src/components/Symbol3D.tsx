import { useEffect, useState } from 'react'
import { img } from '../lib'

/**
 * Símbolo do Spotify com volume real (referência: o "S" renderizado da slush.app).
 * A imagem `symbol-3d.webp` foi gerada UMA vez com Three.js (src/three/renderSymbol.ts): este
 * mesmo path extrudado com chanfro arredondado, material físico verde com grão fino e luz de
 * estúdio. Em produção é só uma imagem (nada de WebGL rodando); o SVG com filtros de luz fica
 * de reserva se a imagem falhar. Para gerar de novo: `npm run dev` e abrir `/?bake-symbol`
 * (veja tools/bake-symbol.mjs). Decorativo (aria-hidden).
 */
const LOGO =
  'M84 0a84 84 0 1 0 0 168A84 84 0 0 0 84 0Zm38.5 121.2a5.2 5.2 0 0 1-7.2 1.7c-19.7-12-44.4-14.7-73.6-8.1a5.2 5.2 0 1 1-2.3-10.2c31.9-7.3 59.3-4.2 81.4 9.3a5.2 5.2 0 0 1 1.7 7.3Zm10.3-22.8a6.5 6.5 0 0 1-9 2.1c-22.5-13.8-56.8-17.8-83.4-9.8a6.5 6.5 0 1 1-3.8-12.5c30.4-9.2 68.2-4.8 94 11.1a6.5 6.5 0 0 1 2.2 9.1Zm.9-23.8C106.7 58.6 62.2 57.1 36.4 65a7.8 7.8 0 1 1-4.5-15c29.6-9 78.8-7.2 109.8 11.2a7.8 7.8 0 0 1-8 13.4Z'

export default function Symbol3D({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  useBake()
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      {failed ? (
        <SvgSymbol className="absolute inset-0 h-full w-full" />
      ) : (
        <img
          src={img('symbol-3d.webp')}
          alt=""
          width={1400}
          height={1400}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          onError={() => setFailed(true)}
          className="absolute inset-[4%] h-[92%] w-[92%] select-none drop-shadow-[0_28px_36px_rgba(6,40,20,0.22)]"
        />
      )}
    </div>
  )
}

/** Só em desenvolvimento, com ?bake-symbol: renderiza o PNG e o expõe para o script de geração. */
function useBake() {
  useEffect(() => {
    if (!import.meta.env.DEV || !location.search.includes('bake-symbol')) return
    import('../three/renderSymbol').then(async ({ renderSymbol }) => {
      const blob = await renderSymbol(LOGO, 1400)
      if (!blob) return
      const r = new FileReader()
      r.onload = () => {
        const out = document.createElement('textarea')
        out.id = 'bake-out'
        out.textContent = String(r.result)
        document.body.append(out)
      }
      r.readAsDataURL(blob)
    })
  }, [])
}

function SvgSymbol({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-24 -24 216 216" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="s3-fill" cx="36%" cy="28%" r="85%">
          <stop offset="0" stopColor="#8dffb6" />
          <stop offset="0.35" stopColor="#2fe06f" />
          <stop offset="0.75" stopColor="#13a44c" />
          <stop offset="1" stopColor="#086b30" />
        </radialGradient>
        <filter id="s3-fx" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4.5" result="bump" />
          <feDiffuseLighting in="bump" surfaceScale="6" diffuseConstant="1.05" lightingColor="#ffffff" result="diff">
            <feDistantLight azimuth="235" elevation="52" />
          </feDiffuseLighting>
          <feComposite in="diff" in2="SourceAlpha" operator="in" result="diffIn" />
          <feBlend in="SourceGraphic" in2="diffIn" mode="multiply" result="lit" />
          <feSpecularLighting in="bump" surfaceScale="7" specularConstant="1.15" specularExponent="26" lightingColor="#ffffff" result="spec">
            <fePointLight x="10" y="-60" z="190" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.55 0 0 0 -0.2" result="grain" />
          <feComposite in="grain" in2="SourceAlpha" operator="in" result="grainIn" />
          <feMerge>
            <feMergeNode in="lit" />
            <feMergeNode in="grainIn" />
            <feMergeNode in="specIn" />
          </feMerge>
        </filter>
        <filter id="s3-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
          <feOffset dy="14" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.28" />
          </feComponentTransfer>
        </filter>
      </defs>
      <path d={LOGO} fill="#0a0a0b" filter="url(#s3-shadow)" />
      <path d={LOGO} fill="url(#s3-fill)" filter="url(#s3-fx)" />
    </svg>
  )
}
