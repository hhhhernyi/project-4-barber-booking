import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router/index'
import toast from 'vue-toastification'
import 'vue-toastification/dist/index.css';
import Carousel3d from 'vue-carousel-3d'


const app = createApp(App)
app.use(router);
app.use(toast);
app.use(Carousel3d);
app.mount('#app')