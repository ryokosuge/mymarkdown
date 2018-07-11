import Vue from "vue";
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify);

import * as firebase from "firebase/app";
import 'firebase/auth';

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

import App from "@/entry/component/app.component.vue";

export function createApp() {
  const app = new Vue({
    components: { App },
    render: (h) => h("App", { })
  });
  return { app }
};
