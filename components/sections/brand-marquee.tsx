'use client'

import Image, { type StaticImageData } from 'next/image'
import logo1 from '@/assets/1.png'
import logo2 from '@/assets/2.png'
import logo3 from '@/assets/3.png'
import logo4 from '@/assets/4.png'
import logo5 from '@/assets/5.png'
import logo6 from '@/assets/6.png'
import logo7 from '@/assets/7.png'
import logo8 from '@/assets/8.png'
import logo9 from '@/assets/9.png'
import logo10 from '@/assets/10.png'
import logo11 from '@/assets/11.png'
import logo12 from '@/assets/12.png'

const logos = [
  { src: logo1, alt: 'TARF partner 1' },
  { src: logo2, alt: 'TARF partner 2' },
  { src: logo3, alt: 'TARF partner 3' },
  { src: logo4, alt: 'TARF partner 4' },
  { src: logo5, alt: 'TARF partner 5' },
  { src: logo6, alt: 'TARF partner 6' },
  { src: logo7, alt: 'TARF partner 7' },
  { src: logo8, alt: 'TARF partner 8' },
  { src: logo9, alt: 'TARF partner 9' },
  { src: logo10, alt: 'TARF partner 10' },
  { src: logo11, alt: 'TARF partner 11' },
  { src: logo12, alt: 'TARF partner 12' },
]

type BrandMarqueeVariant = 'default' | 'overlay'

export function BrandMarquee({ locale, variant = 'default' }: { locale: string; variant?: BrandMarqueeVariant }) {
  // Kayan logo satırı için logoları iki kez tekrar ederek kesintisiz bir akış oluşturuyoruz
  const displayLogos = [...logos, ...logos]

  const helper =
    locale === 'tr'
      ? 'Ekosistem ortakları'
      : locale === 'ar'
        ? 'شركاء المنظومة'
        : 'Ecosystem partners'

  const sectionClass =
    variant === 'overlay'
      ? 'relative overflow-hidden py-0'
      : 'relative overflow-hidden bg-gradient-to-b from-[#fff4e7] via-white to-[#fff1e0] py-10'

  const helperClass =
    variant === 'overlay'
      ? 'flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-black drop-shadow-lg'
      : 'flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-black'

  const frameClass =
    variant === 'overlay'
      ? 'relative overflow-hidden rounded-[160px] bg-gradient-to-r from-[#fff1e0]/90 via-white/95 to-[#fff1e0]/85 py-6 shadow-[0_40px_90px_rgba(255,176,74,0.25)] backdrop-blur-3xl'
      : 'relative overflow-hidden rounded-[120px] border border-white/30 bg-gradient-to-r from-white/80 via-white/95 to-white/80 py-6 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl'

  return (
    <section className={sectionClass}>
      {variant === 'default' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_bottom,_rgba(255,244,232,0.85),_transparent_65%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#fff4e7]/60 to-[#fff4e7]" />
        </div>
      )}
      <div className="container relative mx-auto max-w-[1400px] space-y-6 px-0">
        <div className={helperClass}>
          <span className="inline-flex h-[2px] w-12 rounded-full bg-gradient-to-r from-white via-primary to-amber-200 opacity-70" />
          {helper}
        </div>
        <div className={frameClass}>
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,0.52),rgba(255,255,255,0.18),rgba(255,255,255,0.52))] brand-marquee-shimmer" />
          <MarqueeRow logos={displayLogos} />
        </div>
      </div>
    </section>
  )
}

function MarqueeRow({
  logos,
}: {
  logos: Array<{ src: StaticImageData; alt: string }>
}) {
  return (
    <div
      className="overflow-hidden brand-marquee-mask"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <div className="flex min-w-[200%] items-center gap-10 px-8 brand-marquee-track">
        {logos.map((logo, index) => (
          <LogoCard key={index} logo={logo} />
        ))}
      </div>
    </div>
  )
}

function LogoCard({ logo }: { logo: typeof logos[number] }) {
  return (
    <div className="group relative flex h-24 w-44 shrink-0 items-center justify-center rounded-[80px] border border-white/30 bg-gradient-to-br from-white via-white/95 to-[#fff5eb] px-8 py-3 shadow-[0_15px_40px_rgba(255,188,124,0.2)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_rgba(255,176,74,0.3)]">
      <div className="absolute inset-0 rounded-[80px] bg-gradient-to-r from-white via-transparent to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full w-full items-center justify-center">
        <Image src={logo.src} alt={logo.alt} className="h-16 w-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)]" />
      </div>
    </div>
  )
}
