import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import '/src/assets/tailwind.css';
import pinia from './store';


const app = createApp(App)
app.use(pinia);
app.use(router)


app.mount('#app')
