import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'
import { flip, AnimationType } from '../flip'
import { useFlipConfig } from './FlipAnimationProvider'
import { getFontStyle } from '../utils'
import { flushTasks } from '../task'
import { PAGE_TRANSITION_DURATION } from '../constants'
type Props = {
  flipId: string
  animationType?: AnimationType
} & React.HTMLAttributes<HTMLDivElement>

function FlipAnimation(props: Props, ref: any) {
  const { flipId, animationType = 'size', ...rest } = props
  const elRef = useRef<HTMLDivElement | null>(null)
  const { getFlipConfig, setFlipConfig, count } = useFlipConfig()

  const updateConfig = useCallback(() => {
    const container = elRef.current!.firstElementChild! as HTMLElement
    const boundRect = container.getBoundingClientRect()
    const newConfig = {
      layout: {
        x: boundRect.x,
        y: boundRect.y,
        width: boundRect.width,
        height: boundRect.height,
      },
      font: getFontStyle(container),
    }
    setFlipConfig(flipId, newConfig)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipId, elRef])

  useImperativeHandle(ref, () => {
    return {
      updateConfig,
    }
  })

  useEffect(() => {
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
      font: getFontStyle(container),
    }

    if (oldConfig) {
      flip(oldConfig, newConfig, container, animationType).then(() => {
        updateConfig()
      })

      flushTasks()
    }

    setFlipConfig(flipId, newConfig)

    setTimeout(() => {
      updateConfig()
    }, PAGE_TRANSITION_DURATION)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipId, animationType])

  useEffect(() => {
    return count(flipId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={elRef} {...rest}></div>
}

export default forwardRef(FlipAnimation)
