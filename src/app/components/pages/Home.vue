<template>
  <v-app>
    <v-content>
      <section id="home">
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" :height="windowHeight">
          <v-layout
              column
              align-center
              justify-center
              class="white--text"
            >
            <img src="../../assets/logo.png">
            <h1 class="white--text ma-3 display-1 text-xs-center">{{ msg }}</h1>
            <v-btn large light color="light-blue" @click.native="googleLogin" class="white--text" :loading="loading" :disabled="loading">
              <v-icon dark left>fab fa-google</v-icon>
              Google アカウントでログイン
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </v-content>
  </v-app>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth';

export default {
  name: 'home',
  props: [
    'isLoading'
  ],
  data() {
    return {
      msg: 'Welcome to MyMarkdown',
      loading: false,
      windowHeight: 0
    }
  },
  watch: {
    isLoading (val) {
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
}
</script>

<style lang="scss" scoped>
#home {
  height: 100%;
}
</style>

