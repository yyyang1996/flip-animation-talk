import { PAGE_TRANSITION_DURATION } from './constants'

export type AnimationType = 'size'

export type FlipConfig = {
  layout: {
    x: number
    y: number
    width: number
    height: number
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
  const scaleX = from.layout.width / to.layout.width
  const scaleY = from.layout.height / to.layout.height

  const transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`

  const keyframes = [{ transform }, { transform: '' }]

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
