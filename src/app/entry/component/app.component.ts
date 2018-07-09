import Vue from 'vue';
import * as firebase from 'firebase/app'
import 'firebase/auth';

import Home from '@/components/pages/Home.vue';
import Editor from '@/components/pages/Editor.vue';

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
      isLoading: false
    }
  },
  created () {
    this.isLoading = true;
    firebase.auth().onAuthStateChanged((user: any) => {
      console.log(user);
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
