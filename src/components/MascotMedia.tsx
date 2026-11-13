import { useEffect, useState } from 'react'
import { img, prefersReducedMotion } from '../lib'

const video = `${import.meta.env.BASE_URL}videos/mascote.webm`

/**
 * Mascote 3D nas cores do Brasil. Vídeo VP9 com transparência; o Safari não
 * suporta alpha em WebM, então lá (e com movimento reduzido) usa a imagem parada.
 */
export default function MascotMedia({ className = '' }: { className?: string }) {
  const [useVideo, setUseVideo] = useState(false)

  useEffect(() => {
    const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
    setUseVideo(!isSafari && !prefersReducedMotion())
  }, [])

  return (
    <div className={className} aria-hidden="true">
      {useVideo ? (
        <video className="aspect-[4/3] w-full" src={video} poster={img('mascote.webp')} autoPlay muted loop playsInline />
      ) : (
        <img src={img('mascote.webp')} alt="" width={560} height={420} className="aspect-[4/3] w-full" />
      )}
    </div>
  )
}
