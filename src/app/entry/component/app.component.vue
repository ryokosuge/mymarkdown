<template>
  <div id="app">
    <v-app>
      <v-content>
        <Home v-if="!isLogin" :is-loading="isLoading"></Home>
        <Editor v-if="isLogin" :user="userData"></Editor>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Home from '@/components/pages/Home.vue';
import Editor from '@/components/pages/Editor.vue';

export default {
  name: 'App',
  components: {
    'Home': Home,
    'Editor': Editor
  },
  data () {
    return {
      isLogin: false,
      userData: null,
      isLoading: false
    }
  },
  created: function() {
    this.isLoading = true;
    firebase.auth().onAuthStateChanged(user => {
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
}
</script>

<style lang="scss">
body {
  height: 100%;
}
</style>
