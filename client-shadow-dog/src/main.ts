import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
    autoClose: 1000,
  } as ToastContainerOptions)
app.use(pinia)

app.mount('#app')
