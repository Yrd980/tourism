import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import store from './store'

// 引入vue-amap
import VueAMap from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';


const app = createApp(App)

app.use(ElementPlus, {
    locale: locale,
})
app.use(router)
app.use(store)
app.use(VueAMap)
app.mount('#app')
