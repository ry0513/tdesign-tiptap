<template>
  <CommandButtonGroup :isActive="isActive" :tooltip="tooltip" ref="buttonGroup">
    <template #title>
      <RIcon :name="icon" />
    </template>
    <template #content>
      <CommandButtonGroupItem
        v-for="language in languages"
        :key="language"
        @click="
          editor.commands.toggleCodeBlock({ language });
          buttonGroup!.close();
        "
        :isActive="editor.isActive('heading', { level: 1 })"
        >{{ language }}</CommandButtonGroupItem
      >
      <!-- <CommandButtonGroupItem
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
      > -->
    </template>
  </CommandButtonGroup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Editor } from "@tiptap/vue-3";
import CommandButtonGroup from "../CommandButtonGroup.vue";
import CommandButtonGroupItem from "../CommandButtonGroupItem.vue";
import RIcon from "../../Icon/index.vue";
// import { headingOption } from "../../../option";
// import { Level } from "../../../extensions/heading";
withDefaults(
  defineProps<{
    isActive?: boolean;
    tooltip?: string;
    isDisabled?: boolean;
    editor: Editor;
    icon: string;
    languages: string[];
  }>(),
  {
    isActive: false,
    tooltip: "",
    isDisabled: false,
  }
);

const buttonGroup = ref<{ close: Function } | null>(null);
</script>
