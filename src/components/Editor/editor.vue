<template>
  <div v-if="load" class="t-tiptap">
    <MenuBar
      :editor="editor.getTiptap()"
      :extensions="editor.getButtonExtensions()"
    />
    <div ref="tiptapContent" class="t-tiptap__content t-tiptap__scroll">
      <MenuBubble
        :editor="editor.getTiptap()"
        :extensions="editor.getButtonExtensions()"
        :tiptapContent="tiptapContent"
      />
      <EditorContent :editor="editor.getTiptap()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { EditorContent } from "@tiptap/vue-3";
import EditorConfig from "./editorConfig";
import MenuBar from "../MenuBar/index.vue";
import MenuBubble from "../MenuBubble/index.vue";
defineProps<{ editor: EditorConfig }>();
const load = ref(false);
const tiptapContent = ref<Element | null>(null);
onMounted(() => {
  load.value = true;
});
</script>
