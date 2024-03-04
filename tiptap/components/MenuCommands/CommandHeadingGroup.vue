<template>
  <Popup trigger="click" destroyOnClose ref="headingGroup">
    <Tooltip :content="tooltip" destroyOnClose placement="bottom">
      <Button variant="text" class="t-tiptap__menu-button" @mousedown.prevent>
        <span style="width: 2em">
          <RIcon name="h1" v-if="level === 1" />
          <RIcon name="h2" v-else-if="level === 2" />
          <RIcon name="h3" v-else-if="level === 3" />
          <RIcon name="h4" v-else-if="level === 4" />
          <RIcon name="h5" v-else-if="level === 5" />
          <RIcon name="h6" v-else-if="level === 6" />
          <span v-else>正文</span>
        </span>
        <template #suffix>
          <RIcon name="arrow-down" />
        </template>
      </Button>
    </Tooltip>
    <template #content>
      <ul class="t-tiptap-ul">
        <li>
          <Button
            variant="text"
            class="t-tiptap__menu-button"
            @mousedown.prevent
            @click="editor.commands.setParagraph()"
            :class="{
              isActive: editor.isActive('paragraph'),
            }"
          >
            <template #icon>
              <RIcon name="text" />
            </template>
            普通正文
          </Button>
        </li>
        <li v-for="item in headOption" :key="item.text">
          <Button
            variant="text"
            class="t-tiptap__menu-button"
            @mousedown.prevent
            @click="editor.commands.toggleHeading({ level: item.level })"
            :class="{
              isActive: editor.isActive('heading', { level: item.level }),
            }"
          >
            <template #icon>
              <RIcon :name="`h${item.level}`" />
            </template>
            {{ item.text }}
          </Button>
        </li>
      </ul>
    </template>
  </Popup>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { Popup, Tooltip, Button } from "tdesign-vue-next";
import RIcon from "../icon/index.vue";
import { Editor } from "@tiptap/vue-3";
import { headOption } from "../../option/headOption";

const props = defineProps<{
  tooltip: string;
  isDisabled?: boolean;
  editor: Editor;
}>();

const headingGroup = ref<{ close: Function } | null>(null);

const level = computed(() => props.editor.getAttributes("heading").level);
</script>
