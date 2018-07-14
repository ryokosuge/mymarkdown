import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/auth";

import home from "@/components/Home/home.vue";
import editor from "@/components/Editor/editor.vue";

export default Vue.extend({
  name: "app",
  components: {
    home,
    editor
  },
  data() {
    return {
      isLogin: false,
      userData: null,
      isLoading: true
    };
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
});
