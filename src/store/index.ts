import { createPinia } from 'pinia'
import { useUserStore } from './modules/user'
import { useUiStore } from './modules/ui'

const store = createPinia()

export default store
export { useUserStore, useUiStore }
