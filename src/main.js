import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './User/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App).use(store).use(router).use(ElementPlus)
app.mount('#app')   

