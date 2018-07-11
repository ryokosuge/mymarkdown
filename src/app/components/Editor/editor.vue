<template>
  <v-app id="editor">
    <!--
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="addMemo">
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>メモの追加</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(memo, index) in memos"
          :key="`memo-${index}`"
          @click.stop="selectMemo(index)"
        >
          <v-list-tile-action>
            <v-icon v-if="index == selectedIndex" color="pink">check</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ displayTitle(memo.markdown) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-textarea
            box
            auto-grow
            v-model="memos[selectedIndex].markdown"
          ></v-textarea>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  <!--
  <div class="editor">
    <h1>エディター画面</h1>
    <span>{{ user.displayName }}</span>
    <button @click="logout">ログアウト</button>
    <div class="editor-wrapper">
      <div class="memo-list-wrapper">
        <div
          class="memo-list"
          v-for="(memo, index) in memos"
          :key="`markdown-${index}`"
          @click="selectMemo(index)"
          :data-selected="index == selectedIndex"
        >
          <p class="memo-title">{{ displayTitle(memo.markdown) }}</p>
        </div>
        <button class="add-memo-btn" @click="addMemo">メモの追加</button>
        <button class="delete-memo-btn" @click="deleteMemo" v-if="memos.length > 1">選択中のメモの削除</button>
        <button class="save-memos-btn" @click="saveMemos">メモの保存</button>
      </div>
      <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
      <div class="preview" v-html="preview"></div>
    </div>
  </div>
  -->
</template>

<script lang="ts" src="./editor.ts"></script>
<style lang="scss" src="./editor.scss">
