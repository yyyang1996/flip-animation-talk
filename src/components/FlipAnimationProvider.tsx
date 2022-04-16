import React, { createContext, useContext, useState, useMemo } from 'react'
import { FlipConfig } from '../flip'

const noop = () => {
  //
}

const FlipConfigContext = createContext<{
  getFlipConfig: (id: string) => FlipConfig | undefined
  setFlipConfig: (id: string, config: FlipConfig) => void
}>({
  getFlipConfig: () => undefined,
  setFlipConfig: noop,
})

export function FlipAnimationProvider(props: { children: React.ReactNode }) {
  const [configs, setConfigs] = useState<Record<string, FlipConfig>>({})

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
    }
  }, [configs])

  return <FlipConfigContext.Provider value={value}>{props.children}</FlipConfigContext.Provider>
}

export function useFlipConfig() {
  return useContext(FlipConfigContext)
}
