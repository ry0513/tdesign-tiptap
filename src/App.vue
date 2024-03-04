<template>
  <div>
    <t-tiptap v-model="content" :extensions="textExtensions" />
  </div>
</template>

<script setup lang="ts">
import {
  TTiptap,
  Divider,
  Bold,
  Italic,
  Strike,
  Underline,
  Blockquote,
  TextAlign,
  HorizontalRule,
  Code,
  CodeBlockLowlight,
  BulletList,
  OrderedList,
  Link,
  Color,
  Highlight,
  Heading,
  HeadingGroup,
} from "tdesign-tiptap";
import { ref } from "vue";
const textExtensions = [
  Heading.configure({ bubble: true }),
  Bold.configure({ bubble: true }),
  Italic.configure({ bubble: true }),
  Strike.configure({ bubble: true }),
  Underline.configure({ bubble: true }),
  Divider.configure({ bubble: true }),
  TextAlign.configure(),
  Divider.configure(),
  Blockquote.configure(),
  HorizontalRule.configure(),
  Code.configure(),
  CodeBlockLowlight.configure(),
  BulletList.configure(),
  OrderedList.configure(),
  Divider.configure(),
  Link.configure({ bubble: true }),
  Color,
  Highlight,
  HeadingGroup,
];
const content = ref(`<p>我是内容</p>`);
</script>

<style></style>
