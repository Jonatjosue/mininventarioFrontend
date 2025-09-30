import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './assets/main.css';
import { createPinia } from 'pinia';
import router from './router/index.js';
import { useAuthStore } from './stores/auth.js';
import GlobalLoading from './components/GlobalLoading.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VCalendar, {});
app.component('GlobalLoading', GlobalLoading);

app.mount('#app');
