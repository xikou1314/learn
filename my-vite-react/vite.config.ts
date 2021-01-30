import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    modules: {
      scopeBehaviour: 'global',
      hashPrefix: 'camelCase',
      localsConvention: 'camelCaseOnly'
    }
  }
})
