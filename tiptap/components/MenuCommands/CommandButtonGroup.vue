<template>
  <Popup
    trigger="click"
    ref="bottomGroupPopup"
    destroyOnClose
    placement="bottom"
    :zIndex="100"
  >
    <Tooltip :content="tooltip" placement="bottom" destroyOnClose :zIndex="100">
      <Button
        variant="text"
        class="t-tiptap__menu-button"
        @mousedown.prevent
        :disabled="isDisabled"
      >
        <slot name="title" />
      </Button>
    </Tooltip>
    <template #content>
      <div class="t-tiptap__menu-button__group">
        <slot name="content" />
      </div>
    </template>
  </Popup>
</template>
<script lang="ts" setup>
import { Tooltip, Button, Popup } from "tdesign-vue-next";
import { ref } from "vue";

defineProps<{
  isActive: boolean;
  tooltip: string;
  isDisabled?: boolean;
}>();

const bottomGroupPopup = ref<{ close: Function } | null>(null);

const close = () => {
  bottomGroupPopup.value!.close();
};

defineExpose({
  close,
});
</script>
