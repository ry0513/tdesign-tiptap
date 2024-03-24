<template>
  <Tooltip :content="tooltip" destroyOnClose placement="bottom">
    <Button
      variant="text"
      @click="command()"
      @mousedown.prevent
      class="t-tiptap__menu-button"
      :class="{ isActive }"
      :disabled="isDisabled"
    >
      <RIcon :name="icon" />
    </Button>
  </Tooltip>
</template>
<script lang="ts" setup>
import RIcon from "../Icon/index.vue";
import { Tooltip, Button } from "tdesign-vue-next";
withDefaults(
  defineProps<{
    icon?: string;
    command?: Function;
    isActive?: boolean;
    tooltip?: string;
    isDisabled?: boolean;
  }>(),
  {
    icon: "",
    command: () => {},
    isActive: false,
    tooltip: "",
    isDisabled: false,
  }
);
</script>
