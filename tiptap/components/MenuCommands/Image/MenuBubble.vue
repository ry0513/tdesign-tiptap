<template>
  <ImageReSize :editor="editor" />
  <component
    v-for="(spec, i) in generateCommandButtonComponentSpecs()"
    :key="'command-button-image' + i"
    :is="spec.component"
    v-bind="spec.componentProps"
    v-on="spec.componentEvents || {}"
  />
  <!-- <CommandButton
    :command="() => editor.commands.deleteSelection()"
    tooltip="删除"
    icon="delete"
    :isActive="false"
  /> -->
</template>
<script lang="ts" setup>
import { Editor, Extensions } from "@tiptap/vue-3";
import ImageReSize from "./ImageReSize.vue";
// import CommandButton from "../CommandButton.vue";

const props = defineProps<{
  editor: Editor;
  extensions: Extensions;
}>();

const generateCommandButtonComponentSpecs = () => {
  const extension = props.extensions.filter(
    (extension) => extension.name === "textAlign"
  )[0];
  if (!extension) return [];
  const { button } = extension.options;
  return button({
    editor: props.editor,
    extension,
    alignments: ["left", "center", "right"],
  });
};
</script>
