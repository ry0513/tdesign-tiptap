<template>
  <CommandButtonGroup :isActive="isActive" :tooltip="tooltip" ref="buttonGroup">
    <template #title>
      <span style="width: 2em">
        <RIcon name="h1" v-if="level === 'h1'" />
        <RIcon name="h2" v-else-if="level === 'h2'" />
        <RIcon name="h3" v-else-if="level === 'h3'" />
        <RIcon name="h4" v-else-if="level === 'h4'" />
        <RIcon name="h5" v-else-if="level === 'h5'" />
        <RIcon name="h6" v-else-if="level === 'h6'" />
        <span v-else>正文</span>
      </span>
    </template>
    <template #content>
      <CommandButtonGroupItem
        icon="text"
        @click="
          editor.commands.setParagraph();
          buttonGroup!.close();
        "
        :isActive="editor.isActive('paragraph')"
        >普通正文</CommandButtonGroupItem
      >
      <CommandButtonGroupItem
        v-for="level in levels"
        :key="level"
        :icon="level"
        @click="
          editor.commands.toggleHeading({ level });
          buttonGroup!.close();
        "
        :isActive="editor.isActive('heading', { level })"
        >{{ headingOption[level] }}</CommandButtonGroupItem
      >
    </template>
  </CommandButtonGroup>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { Editor } from "@tiptap/vue-3";
import CommandButtonGroup from "../CommandButtonGroup.vue";
import CommandButtonGroupItem from "../CommandButtonGroupItem.vue";
import RIcon from "../../Icon/index.vue";
import { headingOption } from "../../../option";
import { Level } from "../../../extensions/heading";
const props = withDefaults(
  defineProps<{
    isActive?: boolean;
    tooltip?: string;
    isDisabled?: boolean;
    editor: Editor;
    levels: Level[];
  }>(),
  {
    isActive: false,
    tooltip: "",
    isDisabled: false,
  }
);

const buttonGroup = ref<{ close: Function } | null>(null);
const level = computed(() => props.editor.getAttributes("heading").level);
</script>
