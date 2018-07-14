import Vue from "vue";

import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  name: "home",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      msg: "Welcome to MyMarkdown",
      loading: false,
      windowHeight: 0
    };
  },
  watch: {
    isLoading(val): void {
      this.loading = val;
    }
  },
  methods: {
    googleLogin(): void {
      this.loading = true;
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  },
  beforeMount(): void {
    this.windowHeight = window.innerHeight;
    this.loading = this.isLoading;
  }
});
