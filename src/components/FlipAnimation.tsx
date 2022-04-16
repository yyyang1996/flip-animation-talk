import React, { useRef, useEffect, useLayoutEffect } from 'react'
import { flip, AnimationType } from '../flip'
import { useFlipConfig } from './FlipAnimationProvider'

type Props = {
  flipId: string
  animationType?: AnimationType
} & React.HTMLAttributes<HTMLDivElement>

function FlipAnimation(props: Props) {
  const { flipId, animationType = 'size', ...rest } = props
  const elRef = useRef<HTMLDivElement | null>(null)
  const { getFlipConfig, setFlipConfig } = useFlipConfig()

  useLayoutEffect(() => {
    if (!elRef.current) {
      return
    }

    const container = elRef.current!.firstElementChild! as HTMLElement
    const boundRect = container.getBoundingClientRect()
    const oldConfig = getFlipConfig(flipId)

    const newConfig = {
      layout: {
        x: boundRect.x,
        y: boundRect.y,
        width: boundRect.width,
        height: boundRect.height,
      },
    }

    if (oldConfig) {
      flip(oldConfig, newConfig, container, animationType)
    }

    setFlipConfig(flipId, newConfig)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipId, animationType])

  return <div ref={elRef} {...rest}></div>
}

export default FlipAnimation
