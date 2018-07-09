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

<script lang="ts" src="./app.component.ts"></script>
<style lang="scss" src="./app.component.scss"></style>
