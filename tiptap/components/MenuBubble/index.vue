<template>
  <BubbleMenu
    v-if="editor"
    :editor="editor"
    :tippy-options="{
      duration: 0,
      maxWidth: '100%',
      zIndex: 9,
      placement: 'bottom',
    }"
  >
    <div class="t-tiptap__menu-bubble t-tiptap__scroll">
      <component
        v-for="(spec, i) in generateCommandButtonComponentSpecs()"
        :key="'command-button' + i"
        :is="spec.component"
        v-bind="spec.componentProps"
        v-on="spec.componentEvents || {}"
        menuType="bubble"
      />
    </div>
  </BubbleMenu>
</template>

<script lang="ts" setup>
import { Editor, Extensions, BubbleMenu } from "@tiptap/vue-3";

const props = defineProps<{
  editor: Editor;
  extensions: Extensions;
}>();
const generateCommandButtonComponentSpecs = () => {
  const extensionManager = props.extensions;
  return extensionManager.reduce((acc, extension) => {
    if (extension.options.bubble !== true) return acc;
    const { button } = extension.options;
    if (!button || typeof button !== "function") return acc;
    const menuBtnComponentSpec = button({
      editor: props.editor,
      extension,
    });
    if (Array.isArray(menuBtnComponentSpec)) {
      return [...acc, ...menuBtnComponentSpec];
    }
    return [...acc, menuBtnComponentSpec];
  }, [] as any[]);
};
</script>
