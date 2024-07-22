import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import LaraCustom from '@/presets/LaraCustom';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import router from './router';

import './style.css';
import 'primeicons/primeicons.css';

export const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ToastService);
app.use(PrimeVue, {
  unstyled: true,
  pt: LaraCustom,
});

app.mount('#app');
