import type { ReactNode } from 'react'

type ParallaxHeroProps = {
  imageUrl?: string
  className?: string
  position?: 'top' | 'center' | 'bottom'
  overlay?: 'light' | 'medium' | 'heavy'
  children: ReactNode
}

const positionMap: Record<NonNullable<ParallaxHeroProps['position']>, string> = {
  top: '50% 10%',
  center: '50% 50%',
  bottom: '50% 85%',
}

const overlayMap: Record<NonNullable<ParallaxHeroProps['overlay']>, string> = {
  light: 'from-primary/25 via-primary/12 to-background/28',
  medium: 'from-primary/45 via-primary/25 to-background/55',
  heavy: 'from-primary/55 via-primary/35 to-background/70',
}

export function ParallaxHero({
  imageUrl = '/img12.jpeg',
  className = '',
  position = 'center',
  overlay = 'medium',
  children,
}: ParallaxHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-fixed parallax-fixed ${className}`}
      style={{
        backgroundImage: `url(\"${imageUrl}\")`,
        backgroundPosition: positionMap[position],
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayMap[overlay]}`}></div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
