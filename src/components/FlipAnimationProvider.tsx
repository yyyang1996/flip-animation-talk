import React, { createContext, useContext, useState, useMemo, useCallback, useRef } from 'react'
import { FlipConfig } from '../flip'

const noop = () => {
  //
}

const FlipConfigContext = createContext<{
  getFlipConfig: (id: string) => FlipConfig | undefined
  setFlipConfig: (id: string, config: FlipConfig) => void
  count(flip: string): () => void
}>({
  getFlipConfig: () => undefined,
  setFlipConfig: noop,
  count: () => noop,
})

export function FlipAnimationProvider(props: { children: React.ReactNode }) {
  const [configs, setConfigs] = useState<Record<string, FlipConfig>>({})
  const countRef = useRef<Record<string, number>>({})

  ;(window as any).flipConfigs = configs

  const count = useCallback((id: string) => {
    if (!countRef.current[id]) {
      countRef.current[id] = 0
    }
    countRef.current[id]++
    return () => {
      countRef.current[id]--
      if (countRef.current[id] === 0) {
        delete countRef.current[id]
        setConfigs(config => {
          const { [id]: a, ...rest } = config
          return {
            ...rest,
          }
        })
      }
    }
  }, [])

  const value = useMemo(() => {
    const getFlipConfig = (id: string) => {
      return configs[id]
    }

    const setFlipConfig = (id: string, config: FlipConfig) => {
      setConfigs(prevConfigs => {
        return {
          ...prevConfigs,
          [id]: config,
        }
      })
    }

    return {
      getFlipConfig,
      setFlipConfig,
      count,
    }
  }, [configs, count])

  return <FlipConfigContext.Provider value={value}>{props.children}</FlipConfigContext.Provider>
}

export function useFlipConfig() {
  return useContext(FlipConfigContext)
}
