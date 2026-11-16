import { img } from '../lib'

/**
 * Os prints do app vêm dentro de um iPhone de borda roxa (358x730). Aqui só a
 * tela (x 19–339, y 80–642) é mostrada, reenquadrada numa moldura de tinta preta.
 */
export default function PhoneShot({ file, alt, className = '' }: { file: string; alt: string; className?: string }) {
  return (
    <div className={`mx-auto rounded-[22px] border-[9px] border-ink bg-ink shadow-[0_18px_24px_-8px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="relative aspect-[320/562] overflow-hidden rounded-[13px]">
        <img
          src={img(file)}
          alt={alt}
          width={358}
          height={730}
          loading="lazy"
          className="absolute left-[-5.94%] top-[-14.23%] w-[111.88%] max-w-none"
        />
      </div>
    </div>
  )
}
