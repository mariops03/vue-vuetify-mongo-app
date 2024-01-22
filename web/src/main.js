import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vuetify/styles';  // Importa los estilos de Vuetify
import 'material-design-icons-iconfont/dist/material-design-icons.css';  // Importa los estilos de los iconos de MDI
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',  // Utiliza el formato de icono de Material Design
  },
});

createApp(App).use(router).use(vuetify).mount('#app');
