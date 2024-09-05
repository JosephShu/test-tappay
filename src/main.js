import { createApp } from 'vue'
import App from './App.vue'
const {  VITE_PAYMENT_APP_ID,  VITE_PAYMENT_APP_KEY,  VITE_PAYMENT_ENV } = import.meta.env
TPDirect.setupSDK(153545,  'app_qOKLo8nH8oiofOaoWxPbeEWdelgQ98gy6OdBBTl7fVvuI4kB2iM2aOBTyEXa',  'sandbox')

const app = createApp(App)
app.use(TPDirect)
app.mount('#app')



