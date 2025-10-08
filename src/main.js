import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './assets/main.css';
import { createPinia } from 'pinia';
import router from './router/index.js';
import GlobalLoading from './components/GlobalLoading.vue';
import VCalendar from 'v-calendar';
import { driver } from 'driver.js'; // import default, no named import
import 'driver.js/dist/driver.css';
import 'v-calendar/style.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VCalendar, {});
app.component('GlobalLoading', GlobalLoading);

// Registrar Driver.js globalmente
app.config.globalProperties.$driver = driver;

app.mount('#app');
