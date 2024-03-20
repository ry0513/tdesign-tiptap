<template>
  <div class="t-tiptap" v-if="editor">
    <MenuBar :editor="editor" :extensions="extensions" />
    <div ref="tiptapContent" class="t-tiptap__content t-tiptap__scroll">
      <MenuBubble
        :editor="editor"
        :extensions="extensions"
        :tiptapContent="tiptapContent"
      />
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, Extensions, Editor, EditorEvents } from "@tiptap/vue-3";
import MenuBar from "./MenuBar/index.vue";
import MenuBubble from "./MenuBubble/index.vue";
import Document from "../extensions/document";
import Text from "../extensions/text";
import Paragraph from "../extensions/paragraph";
import "../styles/editor.scss";
import "../styles/index.scss";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";

const props = withDefaults(
  defineProps<{
    content?: string;
    extensions: Extensions;
  }>(),
  {
    content: "",
    extensions: () => [],
  }
);

const emits = defineEmits<{
  "update:content": [content: string];
  beforeCreate: [props: EditorEvents["beforeCreate"]];
  create: [props: EditorEvents["create"]];
  update: [props: EditorEvents["update"]];
  destroy: [props: EditorEvents["destroy"]];
  focus: [props: EditorEvents["focus"]];
  blur: [props: EditorEvents["blur"]];
  selectionUpdate: [props: EditorEvents["selectionUpdate"]];
  transaction: [props: EditorEvents["transaction"]];
}>();

const extensions = [Document, Text, Paragraph, ...props.extensions];
const tiptapContent = ref<Element | null>(null);
const editor = shallowRef<Editor | null>(null);

onMounted(() => {
  editor.value = new Editor({
    content: props.content,
    extensions,

    onBeforeCreate: (props) => {
      emits("beforeCreate", props);
    },
    onCreate: (props) => {
      emits("create", props);
    },
    onUpdate: (props) => {
      emits("update:content", props.editor.getHTML());
      emits("update", props);
    },
    onDestroy: (props) => {
      emits("destroy", props);
    },
    onFocus: (props) => {
      emits("focus", props);
    },
    onBlur: (props) => {
      emits("blur", props);
    },
    onSelectionUpdate: (props) => {
      emits("selectionUpdate", props);
    },
    onTransaction: (props) => {
      emits("transaction", props);
    },
  });
});
onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
