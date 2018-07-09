import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './component/app.component.vue';
import firebase from 'firebase';

Vue.use(Vuetify)

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBIu95pj4hOtPcWZt3hP37vrBTOzvGEfck",
  authDomain: "mymarkdown-9c228.firebaseapp.com",
  databaseURL: "https://mymarkdown-9c228.firebaseio.com",
  projectId: "mymarkdown-9c228",
  storageBucket: "",
  messagingSenderId: "704610843771"
};
firebase.initializeApp(config);

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

export function createApp() {
  const app = new Vue({
    components: { App },
    render: h => h("App", {})
  });
  return { app };
}
