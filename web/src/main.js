import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);


createApp(App).use(router).use(vuetify).use(pinia).mount('#app');
