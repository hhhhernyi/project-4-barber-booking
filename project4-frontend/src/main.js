import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import router from '../src/router/index'
import toast from 'vue-toastification'
import 'vue-toastification/dist/index.css';
import ConfirmationService from 'primevue/confirmationservice';


const app = createApp(App)
app.use(ConfirmationService);
app.use(PrimeVue);
app.use(router);
app.use(toast)
app.mount('#app')