import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/auth";

import Home from "@/components/Home/home.vue";
import Editor from "@/components/Editor/editor.vue";

export default Vue.extend({
  name: 'App',
  components: {
    Home,
    Editor
  },
  data () {
    return {
      isLogin: false,
      userData: null,
      isLoading: true
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      }
      this.isLoading = false;
    });
  }
})
