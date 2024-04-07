<template>
  <Dialog
    :visible="show"
    attach="body"
    destroyOnClose
    header="插入链接"
    @close="$emit('close')"
    @mousedown.prevent
    :closeOnOverlayClick="false"
  >
    <template #body>
      <Form :labelWidth="64">
        <FormItem label="URL">
          <Input
            placeholder="请输入URL"
            v-model="newAttrs.href"
            @mousedown.prevent
          />
        </FormItem>
        <FormItem label="新窗口">
          <Switch
            :customValue="['_blank', '']"
            v-model="newAttrs.target"
          ></Switch>
        </FormItem>
      </Form>
    </template>
    <template #footer>
      <Button
        @click="
          editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink(newAttrs)
            .run();
          $emit('close');
        "
        >确定</Button
      >
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/vue-3";
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
  Switch,
} from "tdesign-vue-next";
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
const emits = defineEmits<{
  close: [void];
}>();

const newAttrs = ref({ href: "", target: "_blank" });

watch(
  () => props.show,
  (newData) => {
    if (newData) {
      if (props.editor.isActive("link")) {
        newAttrs.value = props.editor.getAttributes("link") as {
          href: string;
          target: string;
        };
      } else {
        newAttrs.value = { href: "", target: "_blank" };
      }
    }
  }
);
</script>
