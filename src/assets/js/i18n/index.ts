import { createI18n } from 'vue-i18n'
import { LANGUAGE } from '@/assets/js/utils/constant'
import { getItem } from '@/assets/js/utils/storage'
import en from './lang/en'
import zh from './lang/zh'

// 1. 定义数据源
const messages = {
  en: { msg: { ...en } },
  zh: { msg: { ...zh } },
}

const locale = getItem(LANGUAGE)
console.log('i18n init')

// 2. 创建i18n实例
const i18n = createI18n({
  // 使用composition API
  legacy: false,
  // 全局使用 t 函数  --> $t('msg.test')
  globalInjection: true,
  fallbackLocale: 'zh',
  locale,
  messages,
})

export { i18n }
