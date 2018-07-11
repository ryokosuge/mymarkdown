<template>
  <div id="app">
    <transition name="fade">
      <Home v-if="!isLogin" :is-loading="isLoading"></Home>
    </transition>
    <transition name="fade">
      <Editor v-if="isLogin" :user="userData"></Editor>
    </transition>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
<style lang="scss" src="./app.component.scss"></style>
