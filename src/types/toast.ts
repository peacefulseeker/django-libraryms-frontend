import { type ToastServiceMethods } from 'primevue/toastservice';
declare global {
  interface Window {
    $toast: ToastServiceMethods;
  }
}
