import Vue from 'vue'
import App from './component/app.component.vue';

export function createApp() {
  const app = new Vue({
    components: { App },
    render: h => h("App", {})
  });
  return { app };
}
