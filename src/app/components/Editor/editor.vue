<template>
  <v-app
    id="editor"
    class="grey lighten-4"
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      class="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <v-subheader>メモ</v-subheader>
        <template v-for="(memo, index) in memos">
          <v-list-tile
            :key="`memo-${index}`"
            @click.stop="selectMemo(index)"
          >
            <v-list-tile-action>
              <v-icon
                v-if="index === selectedIndex"
                color="pink"
              >check</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ displayTitle(memo.markdown) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider
            :key="index"
            light
          />
        </template>
        <v-subheader>アクション</v-subheader>
        <v-list-tile @click.stop="addMemo">
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>メモの追加</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="saveMemos">
          <v-list-tile-action>
            <v-icon>save_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>メモの保存</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="deleteMemo">
          <v-list-tile-action>
            <v-icon color="red">delete</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>選択してるメモの削除</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="amber"
      fixed
      app
      tabs
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>MyMarkdown</v-toolbar-title>
      <v-spacer />
      <v-menu
        left
      >
        <v-btn
          slot="activator"
          icon
        >
          <v-avatar
            size="36px"
          >
            <img
              :src="user.photoURL"
              alt="Avatar"
            >
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img
                :src="user.photoURL"
                alt="Avatar"
              >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile @click.stop="logout">
            <v-list-tile-action>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>ログアウト</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-tabs
        slot="extension"
        v-model="tab"
        light
        color="amber"
        slider-color="grey darken-4"
      >
        <v-tab
          href="#editor"
        >
          Markdown
        </v-tab>
        <v-tab
          href="#preview"
        >
          Preview
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout
          fill-height
          column
        >
          <v-tabs-items v-model="tab">
            <v-tab-item id="editor">
              <v-textarea v-model="memos[selectedIndex].markdown"/>
            </v-tab-item>
            <v-tab-item id="preview">
              <div v-html="preview"/>
            </v-tab-item>
          </v-tabs-items>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./editor.ts"></script>
<style lang="scss" src="./editor.scss" scoped></style>
