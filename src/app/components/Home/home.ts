import Vue from "vue";

import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  name: 'home',
  props: [ "isLoading" ],
  data() {
    return {
      msg: "Welcome to MyMarkdown",
      loading: false,
      windowHeight: 0
    }
  },
  watch: {
    isLoading: function(val) {
      this.loading = val;
    }
  },
  methods: {
    googleLogin: function() {
      this.loading = true;
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  },
  beforeMount: function() {
    this.windowHeight = window.innerHeight;
    this.loading = this.isLoading;
  }
})
