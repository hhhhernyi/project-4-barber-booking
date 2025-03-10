import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import router from '../src/router/index'
import toast from 'vue-toastification'
import 'vue-toastification/dist/index.css';
import ConfirmationService from 'primevue/confirmationservice';
import Carousel3d from 'vue-carousel-3d'


const app = createApp(App)
app.use(ConfirmationService);
app.use(PrimeVue, { unstyled: true });
app.use(router);
app.use(toast);
app.use(Carousel3d);
app.mount('#app')