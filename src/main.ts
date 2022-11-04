import { createApp } from 'vue'
// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

// SvgIcon
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

// 路由及
import router from '@/router'
// 路由守卫
import '@/permission'

// 全局样式
import '@/assets/styles/index.scss'

// 根组件
import App from '@/App.vue'
// 状态管理 Pinia
import store from '@/store'
// 国际化 i18n
import { i18n } from '@/assets/js/i18n'

import { getItem } from '@/assets/js/utils/storage'
import { LANGUAGE } from '@/assets/js/utils/constant'

// 注册全局属性或方法
import installFilters from '@/assets/js/filter'

const app = createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .use(ElementPlus, {
    local: getItem(LANGUAGE) === 'en' ? en : zhCn,
  })
app.component('svg-icon', SvgIcon)

installFilters(app)
app.mount('#app')
