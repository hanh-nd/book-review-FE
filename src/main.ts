import { createApp } from 'vue';
import App from './App.vue';
import router from './plugins/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/main.css';
import store from '@/plugins/vuex';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);

app.mount('#app');
