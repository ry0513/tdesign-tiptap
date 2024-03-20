<template>
  <Dialog
    :visible="show"
    attach="body"
    destroyOnClose
    header="插入图片"
    @close="$emit('close')"
    @mousedown.prevent
    :closeOnOverlayClick="false"
  >
    <template #body>
      <Form :labelWidth="64">
        <FormItem label="图片地址">
          <Input placeholder="请输入图片地址" v-model="newAttrs.src" />
        </FormItem>
        <FormItem label="图片描述">
          <Input placeholder="请输入图片地址" v-model="newAttrs.alt" />
        </FormItem>
      </Form>
    </template>
    <template #footer>
      <Button
        @click="
          editor.commands.setImage(newAttrs);
          editor.commands.focus();
          $emit('close');
        "
        >确定</Button
      >
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import { Dialog, Form, FormItem, Input, Button } from "tdesign-vue-next";
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    editor: Editor;
    show?: boolean;
  }>(),
  {
    show: false,
  }
);

defineEmits<{
  close: [void];
}>();

const newAttrs = ref({ src: "", alt: "" });

watch(
  () => props.show,
  () => {
    newAttrs.value = { src: "", alt: "" };
  }
);
</script>
