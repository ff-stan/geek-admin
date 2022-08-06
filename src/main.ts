import { createApp } from 'vue'
// import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
// import ELement3 from 'element3'
import ELementPlus from 'element-plus'
import * as ELementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store).use(router).use(ELementPlus).mount('#app')
// elementPlusIcons
for (const [key, component] of Object.entries(ELementPlusIconsVue)) {
    app.component(key, component)
}