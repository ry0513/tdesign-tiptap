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
      <CommandButtonGroupItem icon="upload" @click="uploadImage"
        >上传图片</CommandButtonGroupItem
      >
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
import { Editor, Extension } from "@tiptap/vue-3";
import CommandButtonGroup from "../CommandButtonGroup.vue";
import CommandButtonGroupItem from "../CommandButtonGroupItem.vue";
import RIcon from "../../Icon/index.vue";
import ImageDialog from "./ImageDialog.vue";

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
    tooltip?: string;
    isDisabled?: boolean;
    editor: Editor;
    icon?: string;
    extension: Extension;
  }>(),
  {
    isActive: false,
    tooltip: "",
    isDisabled: false,
    icon: "",
  }
);

const dialogShow = ref(false);
const uploadImage = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const file = target.files[0];
      props.extension.options.customUpload(
        file,
        ({ url, alt }: { url: string; alt: string }) => {
          props.editor.commands.setImage({
            src: url,
            alt,
          });
          props.editor.commands.focus();
        }
      );
    }
  });
  fileInput.click();
};
</script>
