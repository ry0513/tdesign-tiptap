<template>
  <Popup trigger="click" destroyOnClose ref="colorPopup">
    <CommandButton
      :icon="icon"
      :isActive="isActive"
      :tooltip="tooltip"
      :isDisabled="isDisabled"
    />
    <template #content>
      <div class="t-tiptap__menu__color">
        <ul class="t-tiptap-ul">
          <li
            class="t-tiptap__menu__color-reset"
            @mousedown.prevent
            @click="
              command();
              colorPopup!.close();
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
              colorPopup!.close();
            "
          >
            <div
              class="t-tiptap__menu__color-block"
              :style="{ background: color }"
            ></div>
          </li>
        </ul>
      </div>
    </template>
  </Popup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import CommandButton from "./CommandButton.vue";
import { Popup } from "tdesign-vue-next";
defineProps<{
  icon: string;
  command: Function;
  isActive: boolean;
  tooltip: string;
  isDisabled?: boolean;
  currentColor?: string;
  colorOptions: string[][];
}>();

const colorPopup = ref<{ close: Function } | null>(null);
</script>
