<template>
  <CommandButtonGroup
    :isActive="isActive"
    :tooltip="tooltip"
    :isDisabled="isDisabled"
    ref="buttonGroup"
  >
    <template #title>
      <RIcon :name="icon" />
    </template>
    <template #content>
      <div class="t-tiptap__menu__color">
        <ul class="t-tiptap-ul">
          <li
            class="t-tiptap__menu__color-reset"
            @mousedown.prevent
            @click="
              command();
              buttonGroup!.close();
            "
          >
            <div class="t-tiptap__menu__color-block"></div>
            <span>默认颜色</span>
          </li>
        </ul>
        <ul
          v-for="(colorGroup, index) in colorOptions"
          class="t-tiptap-ul"
          :key="`group-${index}`"
        >
          <li
            :class="{ active: color === currentColor }"
            v-for="color in colorGroup"
            :key="`color-${color}`"
            @mousedown.prevent
            @click="
              command(color);
              buttonGroup!.close();
            "
          >
            <div
              class="t-tiptap__menu__color-block"
              :style="{ background: color }"
            />
          </li>
        </ul>
      </div>
    </template>
  </CommandButtonGroup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import RIcon from "../../Icon/index.vue";
import CommandButtonGroup from "../CommandButtonGroup.vue";
defineProps<{
  icon: string;
  command: Function;
  isActive: boolean;
  tooltip: string;
  isDisabled?: boolean;
  currentColor?: string;
  colorOptions: string[][];
}>();

const buttonGroup = ref<{ close: Function } | null>(null);
</script>
