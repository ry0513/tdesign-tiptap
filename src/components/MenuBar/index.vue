<template>
  <div class="t-tiptap__menu-bar t-tiptap__scroll">
    <component
      v-for="(spec, i) in generateCommandButtonComponentSpecs()"
      :key="'command-button' + i"
      :is="spec.component"
      v-bind="spec.componentProps"
      v-on="spec.componentEvents || {}"
    />
  </div>
</template>

<script lang="ts" setup>
import { Editor, Extensions } from "@tiptap/vue-3";

const props = withDefaults(
  defineProps<{
    editor: Editor;
    extensions?: Extensions;
  }>(),
  {
    extensions: () => [],
  }
);

const generateCommandButtonComponentSpecs = () => {
  const extensionManager = props.extensions;
  return extensionManager.reduce((acc, extension) => {
    if (extension.options.bar === false) return acc;
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
