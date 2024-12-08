import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import '/src/assets/tailwind.css';


const app = createApp(App)
app.use(router)


app.mount('#app')
