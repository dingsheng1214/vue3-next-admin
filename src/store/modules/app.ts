import { defineStore } from 'pinia'
import { getItem, setItem } from '@/assets/js/utils/storage'
import { LANGUAGE, TAGS_VIEW } from '@/assets/js/utils/constant'
import { TagView } from '#/sys'

interface AppState {
  // 国际化语言
  language: string
  tagViews: TagView[]
}

const cacheLang = getItem(LANGUAGE)
if (!cacheLang) {
  setItem(LANGUAGE, 'zh')
}
const initAppState: AppState = {
  language: getItem(LANGUAGE) || 'zh',
  tagViews: getItem(TAGS_VIEW) || [],
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
    // tags_view
    setTagsView(tagView: TagView) {
      const exist = this.tagViews.find((item) => item.path === tagView.path)
      if (!exist) {
        this.tagViews.push(tagView)
        setItem(TAGS_VIEW, this.tagViews)
      }
    },
    /**
     *
     * @param index 当前索引
     * @param type 移除类型, other: 关闭其它 right: 关闭右侧 current: 关闭当前
     */
    removeTagView(index: number, type: 'other' | 'right' | 'current' = 'current') {
      console.log(index, this.tagViews)
      if (type === 'current') {
        this.tagViews.splice(index, 1)
      } else if (type === 'other') {
        this.tagViews.splice(index + 1, this.tagViews.length - index + 1)
        this.tagViews.splice(0, index)
      } else {
        this.tagViews.splice(index + 1, this.tagViews.length - index + 1)
      }
      console.log(this.tagViews)

      setItem(TAGS_VIEW, this.tagViews)
    },
  },
})

export { useAppStore }
