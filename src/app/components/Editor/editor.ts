import Vue from 'vue';
import * as marked from "marked";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default Vue.extend({
  name: "editor",
  props: [ "user" ],
  data() {
    return {
      drawer: true,
      left: null,
      tab: 0,
      memos: [
        {
          markdown: ""
        }
      ],
      selectedIndex: 0
    }
  },
  computed: {
    markdown: function() {
      return this.memos[this.selectedIndex].markdown;
    },
    preview: function() {
      return marked(this.markdown);
    }
  },
  methods: {
    addMemo: function() {
      this.memos.push(
        {
          markdown: "# 無題のメモ"
        }
      );
      this.selectedIndex = this.memos.length - 1;
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.memos.length) {
        this.selectedIndex -= 1;
      } else {
        this.addMemo();
      }
    },
    saveMemos: function() {
      firebase.database().ref("memos/" + this.user.uid).set(this.memos);
    },
    selectMemo: function(index: number) {
      this.selectedIndex = index;
    },
    displayTitle: function(text: string) {
      return text.split(/\n/)[0];
    },
    logout: function() {
      firebase.auth().signOut();
    }
  },
  created: function() {
    firebase
      .database()
      .ref("memos/" + this.user.uid)
      .once("value")
      .then((value) => {
        if (value.val()) {
          this.memos = value.val();
        }
      })
  }
});
