<template>
  <CommandButtonGroup :isActive="isActive" :tooltip="tooltip" ref="buttonGroup">
    <template #title>
      <span style="width: 2em">
        <RIcon name="h1" v-if="level === 1" />
        <RIcon name="h2" v-else-if="level === 2" />
        <RIcon name="h3" v-else-if="level === 3" />
        <RIcon name="h4" v-else-if="level === 4" />
        <RIcon name="h5" v-else-if="level === 5" />
        <RIcon name="h6" v-else-if="level === 6" />
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
        v-for="item in headOption"
        :key="item.text"
        :icon="`h${item.level}`"
        @click="
          editor.commands.toggleHeading({ level: item.level });
          buttonGroup!.close();
        "
        :isActive="editor.isActive('heading', { level: item.level })"
        >{{ item.text }}</CommandButtonGroupItem
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
import { headOption } from "../../../option/headOption";
const props = defineProps<{
  isActive: boolean;
  tooltip: string;
  isDisabled?: boolean;
  editor: Editor;
}>();
const buttonGroup = ref<{ close: Function } | null>(null);
const level = computed(() => props.editor.getAttributes("heading").level);
</script>
