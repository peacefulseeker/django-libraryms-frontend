import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import LaraCustom from '@/presets/LaraCustom';
import ToastService from 'primevue/toastservice';
import { type RootProps } from '@/types/rootProps';

import App from './App.vue';
import router from './router';

import './style.css';
import 'primeicons/primeicons.css';

const app = createApp(App, window.__rootProps as Record<string, RootProps>);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ToastService);
app.use(PrimeVue, {
  unstyled: true,
  pt: LaraCustom,
});

window.$toast = app.config.globalProperties.$toast;

app.mount('#app');
