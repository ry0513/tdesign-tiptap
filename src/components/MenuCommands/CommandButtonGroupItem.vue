<template>
  <Button
    variant="text"
    class="t-tiptap__menu-button t-tiptap__menu-button__group-item"
    @mousedown.prevent
    :class="{
      isActive: isActive,
    }"
  >
    <template #icon>
      <RIcon :name="icon" />
    </template>
    <slot />
  </Button>
</template>
<script lang="ts" setup>
import { Button } from "tdesign-vue-next";
import RIcon from "../Icon/index.vue";
withDefaults(
  defineProps<{
    isActive?: boolean;
    icon?: string;
    isDisabled?: boolean;
  }>(),
  {
    isActive: false,
    icon: "",
    isDisabled: false,
  }
);
</script>
