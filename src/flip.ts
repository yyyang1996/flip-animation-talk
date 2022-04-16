import { PAGE_TRANSITION_DURATION } from './constants'

export type AnimationType = 'size' | 'font'

export type FlipConfig = {
  layout: {
    x: number
    y: number
    width: number
    height: number
  }
  font: {
    size?: number | undefined
    color?: string | undefined
  }
}

export function flip(
  from: FlipConfig,
  to: FlipConfig,
  container: HTMLElement,
  animationType: AnimationType = 'size'
) {
  const translateX = from.layout.x - to.layout.x
  const translateY = from.layout.y - to.layout.y
  let scaleX = from.layout.width / to.layout.width
  let scaleY = from.layout.height / to.layout.height

  if (animationType === 'font') {
    scaleX = 1
    scaleY = 1
  }

  const transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`

  const keyframes = [
    { transform, fontSize: from.font.size + 'px', color: from.font.color },
    { transform: '', fontSize: to.font.size + 'px', color: to.font.color },
  ]

  console.info('keyframes', keyframes)

  return new Promise<void>(resolve => {
    container
      .animate(keyframes, {
        duration: PAGE_TRANSITION_DURATION,
        easing: 'ease',
      })
      .addEventListener('finish', () => {
        resolve()
      })
  })
}
