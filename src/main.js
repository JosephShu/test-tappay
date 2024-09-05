import { createApp } from 'vue'
import App from './App.vue'
const {  VITE_PAYMENT_APP_ID,  VITE_PAYMENT_APP_KEY,  VITE_PAYMENT_ENV } = import.meta.env
TPDirect.setupSDK( VITE_PAYMENT_APP_ID,  VITE_PAYMENT_APP_KEY,  VITE_PAYMENT_ENV)

const app = createApp(App)
app.use(TPDirect)
app.mount('#app')



