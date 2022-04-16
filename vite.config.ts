import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      defaultClass: 'icon',
      scale: 1,
    }),
  ],
  server: {
    port: 1234,
    host: '0.0.0.0',
  },
})
