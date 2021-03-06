import Vue from "vue";
import * as marked from "marked";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default Vue.extend({
  name: "editor",
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      drawer: true,
      tab: 0,
      selectedIndex: 0,
      memos: [
        {
          markdown: ""
        }
      ]
    };
  },
  computed: {
    markdown(): string {
      return this.memos[this.selectedIndex].markdown;
    },
    preview(): string {
      return marked(this.markdown);
    }
  },
  methods: {
    addMemo(): void {
      this.memos.push(
        {
          markdown: "# 無題のメモ"
        }
      );
      this.selectedIndex = this.memos.length - 1;
    },
    deleteMemo(): void {
      this.memos.splice(this.selectedIndex, 1);
      if (this.memos.length) {
        if (this.selectedIndex > 1) {
          this.selectedIndex -= 1;
        } else {
          this.selectedIndex = 0;
        }
      } else {
        this.addMemo();
      }
    },
    saveMemos(): void {
      firebase
        .database()
        .ref("memos/" + this.user.uid)
        .set(this.memos);
    },
    selectMemo(index: number): void {
      this.selectedIndex = index;
    },
    displayTitle(text: string): string {
      return text.split(/\n/)[0];
    },
    logout() {
      firebase.auth().signOut();
    }
  },
  created() {
    firebase
      .database()
      .ref("memos/" + this.user.uid)
      .once("value")
      .then((value) => {
        if (value.val()) {
          this.memos = value.val();
        }
      });
  }
});
