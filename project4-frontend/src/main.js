import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import router from '../src/router/index'
const app = createApp(App)
app.use(PrimeVue);
app.use(router);
app.mount('#app')