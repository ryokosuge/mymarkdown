<template>
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
</template>

<script lang="ts" src="./Editor.ts">
</script>

<style lang="scss" src="./Editor.scss" scoped>
