import { createPinia } from 'pinia'
import { useUserStore } from './modules/user'
import { useUiStore } from './modules/ui'
import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permission'

const store = createPinia()

export default store
export { useUserStore, useUiStore, useAppStore, usePermissionStore }
