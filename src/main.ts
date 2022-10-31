import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import '@/assets/styles/index.scss'
import router from './router'
import store from './store'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App).use(ElementPlus).use(router).use(store)
app.component('svg-icon', SvgIcon)

app.mount('#app')
