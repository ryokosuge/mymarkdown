<template>
  <v-app>
    <v-content>
      <section id="home">
        <v-parallax
          :height="windowHeight"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../../assets/logo.png">
            <h1 class="white--text ma-3 display-1 text-xs-center">{{ msg }}</h1>
            <v-btn
              :loading="loading"
              :disabled="loading"
              large
              light
              color="light-blue"
              class="white--text"
              @click.native="googleLogin"
            >
              <v-icon
                dark
                left
              >fab fa-google</v-icon>
              Google アカウントでログイン
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </v-content>
  </v-app>
</template>
<script lang="ts" src="./home.ts"></script>
