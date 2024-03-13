<template>
  <CommandButtonGroup
    :isActive="isActive"
    :tooltip="tooltip"
    :isDisabled="isDisabled"
  >
    <template #title>
      <RIcon name="image" />
    </template>
    <template #content>
      <CommandButtonGroupItem icon="image" @click="dialogShow = true"
        >网络图片</CommandButtonGroupItem
      >
      <!-- <CommandButtonGroupItem icon="upload">上传图片</CommandButtonGroupItem> -->
    </template>
  </CommandButtonGroup>

  <ImageDialog
    :editor="editor"
    :show="dialogShow"
    @close="dialogShow = false"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Editor } from "@tiptap/vue-3";
import CommandButtonGroup from "../CommandButtonGroup.vue";
import CommandButtonGroupItem from "../CommandButtonGroupItem.vue";
import RIcon from "../../Icon/index.vue";
import ImageDialog from "./ImageDialog.vue";

defineProps<{
  isActive: boolean;
  tooltip: string;
  isDisabled?: boolean;
  editor: Editor;
  icon: string;
}>();

const dialogShow = ref(false);
</script>
