import { defineStore } from 'pinia'

interface UiState {
  // SideBar 是否收缩
  sideBarCollapse: boolean
}
const initUiState: UiState = {
  sideBarCollapse: false,
}

const useUiStore = defineStore({
  id: 'app-ui',
  state: (): UiState => initUiState,
  getters: {},
  actions: {
    // 切换侧边栏是否收缩
    triggerSideBarCollapse() {
      this.sideBarCollapse = !this.sideBarCollapse
    },
  },
})

export { useUiStore }
