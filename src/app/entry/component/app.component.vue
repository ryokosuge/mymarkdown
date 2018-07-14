<template>
  <div id="app">
    <home
      v-if="!isLogin"
      :is-loading="isLoading"/>
    <editor
      v-if="isLogin"
      :user="userData"/>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
<style lang="scss" src="./app.component.scss"></style>
