<template>
  <ImageReSize :editor="editor" :extensions="extensions" />
  <CommandButton
    :command="() => (dialogShow = true)"
    tooltip="编辑"
    icon="image-edit"
    :isActive="false"
  />
  <component
    v-for="(spec, i) in generateCommandButtonComponentSpecs()"
    :key="'command-button-image' + i"
    :is="spec.component"
    v-bind="spec.componentProps"
    v-on="spec.componentEvents || {}"
  />

  <ImageDialog
    :editor="editor"
    :show="dialogShow"
    @close="dialogShow = false"
  />
</template>
<script lang="ts" setup>
import { Editor, Extensions } from "@tiptap/vue-3";
import ImageReSize from "./ImageReSize.vue";
import { ref } from "vue";
import ImageDialog from "./ImageDialog.vue";
import CommandButton from "../CommandButton.vue";

const props = withDefaults(
  defineProps<{
    editor: Editor;
    extensions?: Extensions;
  }>(),
  {
    extensions: () => [],
  }
);

const dialogShow = ref(false);

const generateCommandButtonComponentSpecs = () => {
  const extension = props.extensions.filter(
    (extension) => extension.name === "textAlign"
  )[0];
  if (!extension) return [];
  const { bubble, button } = extension.options;
  if (bubble === false) return [];
  if (!button || typeof button !== "function") return [];
  return button({
    editor: props.editor,
    extension,
  });
};
</script>
