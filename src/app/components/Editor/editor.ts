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
          markdown: ""
        }
      );
      this.selectedIndex = this.memos.length - 1;
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1);
      this.selectedIndex = (this.selectedIndex > 0) ? this.selectedIndex - 1 : 0;
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
