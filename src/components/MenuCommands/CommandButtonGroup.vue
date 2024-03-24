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
        :class="{ isActive }"
        @mousedown.prevent
        :disabled="isDisabled"
        @click="command()"
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
withDefaults(
  defineProps<{
    isActive?: boolean;
    tooltip?: string;
    isDisabled?: boolean;
    command?: Function;
  }>(),
  {
    isActive: false,
    tooltip: "",
    isDisabled: false,
    command: () => {},
  }
);

const bottomGroupPopup = ref<{ close: Function } | null>(null);

const close = () => {
  bottomGroupPopup.value!.close();
};

defineExpose({
  close,
});
</script>
