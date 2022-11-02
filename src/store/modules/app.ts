import { defineStore } from 'pinia'
import { getItem, setItem } from '@/assets/js/utils/storage'
import { LANGUAGE } from '@/assets/js/utils/constant'

interface AppState {
  // 国际化语言
  language: string
}
console.log('lang', getItem(LANGUAGE))

const cacheLang = getItem(LANGUAGE)
if (!cacheLang) {
  setItem(LANGUAGE, 'zh')
}
const initAppState: AppState = {
  language: getItem(LANGUAGE) || 'zh',
}

const useAppStore = defineStore({
  id: 'app-app',
  state: (): AppState => ({ ...initAppState }),
  getters: {},
  actions: {
    // 国际化切换
    selectLanguage(language: string) {
      this.language = language
      setItem(LANGUAGE, language)
    },
  },
})

export { useAppStore }
