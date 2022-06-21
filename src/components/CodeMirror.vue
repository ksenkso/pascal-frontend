<template>
  <div class="editor" ref="editor"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { basicSetup, EditorView } from 'codemirror';
import { StreamLanguage } from '@codemirror/language';
import { pascal } from '@codemirror/legacy-modes/mode/pascal';
import { EditorState } from '@codemirror/state';

export default defineComponent({
  name: 'CodeMirror',
  mounted() {
      const doc = `\n\n\n\n\n`
      let state = EditorState.create({
        doc,
        extensions: [
          basicSetup,
          StreamLanguage.define(pascal)
        ]
      });

      this.codeMirror = new EditorView({
        state,
        parent: this.$refs.editor as HTMLElement,
      });
  },
  data() {
    return {
      codeMirror: null as EditorView | null
    }
  },
  methods: {
    getCode() {
      return this.codeMirror?.state.doc.toString();
    },
    setCode(code: string) {
      if(this.codeMirror) {
        this.codeMirror.dispatch({ changes: {from: 0, insert: code} })
      }
    }
  }
})
</script>

<style scoped>

</style>
