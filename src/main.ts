import { createApp } from 'vue'
// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// SvgIcon
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

// 路由及路由守卫
import router from './router'
import './permission'

// 全局样式
import '@/assets/styles/index.scss'

// 根组件
import App from './App.vue'
// Pinia状态管理
import store from './store'

const app = createApp(App).use(ElementPlus).use(router).use(store)
app.component('svg-icon', SvgIcon)

app.mount('#app')
