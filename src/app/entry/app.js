import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './component/app.component.vue';

Vue.use(Vuetify)

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

export function createApp() {
  const app = new Vue({
    components: { App },
    render: h => h("App", {})
  });
  return { app };
}
