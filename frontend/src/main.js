import { createApp } from 'vue'
import App from './App.vue'
import './css/index.css'
import '@fortawesome/fontawesome-free/css/all.css'; 
import axios from 'axios';

import router from './router' 


const app = createApp(App);
app.use(router);

const apiUrl = process.env.VUE_APP_API_URL; // Mengakses variabel lingkungan

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$apiUrl = apiUrl;

app.mount('#app');