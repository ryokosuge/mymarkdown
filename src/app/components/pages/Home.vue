<template>
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
        <v-btn large light color="light-blue" @click.native="googleLogin" class="white--text" :loading="isLoading" :disabled="isLoading">
          <v-icon dark left>fab fa-google</v-icon>
          Google アカウントでログイン
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
export default {
  name: 'home',
  props: [
    'isLoading'
  ],
  data() {
    return {
      msg: 'Welcome to MyMarkdown',
      windowHeight: 0
    }
  },
  methods: {
    googleLogin: function() {
      this.isLoading = true;
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  },
  beforeMount: function() {
    this.windowHeight = window.innerHeight;
  }
}
</script>

<style lang="scss" scoped>
#home {
  height: 100%;
}
</style>

