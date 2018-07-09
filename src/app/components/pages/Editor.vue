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

<script>
import marked from 'marked';
import * as firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

export default {
  name: 'editor',
  props: ['user'],
  data () {
    return {
      memos: [
        {
          markdown: ''
        }
      ],
      selectedIndex: 0
    }
  },
  computed: {
    preview: function() {
      return marked(this.markdown);
    },
    markdown: function() {
      return this.memos[this.selectedIndex].markdown;
    }
  },
  created: function() {
    firebase
      .database()
      .ref("memos/" + this.user.uid)
      .once("value")
      .then((result) => {
        if (result.val()) {
          this.memos = result.val();
        }
      });
  },
  methods: {
    addMemo: function() {
      this.memos.push({
        markdown: ''
      });
      this.selectedIndex += 1;
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        this.selectedIndex -= 1;
      }
    },
    saveMemos: function() {
      firebase.database().ref("memos/" + this.user.uid).set(this.memos);
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
    },
    displayTitle: function(text) {
      return text.split(/\n/)[0];
    },
    logout: function() {
      firebase.auth().signOut();
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-wrapper {
  display: flex;
}
.memo-list-wrapper {
  width: 19%;
  float: left;
  border-top: 1px solid #000;
}
.memo-list {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 1px solid #000;
  &:nth-clild(even) {
    background-color: #ccc;
  }
  &[data-selected="true"] {
    background-color: #ccf;
  }
}
.memo-title {
  height: 1.5em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden
}
.add-memo-btn {
  margin-top: 20px;
}
.delete-memo-btn {
  margin: 10px;
}
.markdown {
  width: 40%;
  height: 500px;
}
.preview {
  width: 40%;
  height: 500px;
}
</style>
