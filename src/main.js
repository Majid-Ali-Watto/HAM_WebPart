import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './User/store'

const app = createApp(App).use(store).use(router)
app.mount('#app')

