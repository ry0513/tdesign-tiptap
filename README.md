一款基于 [tiptap](https://github.com/ueberdosis/tiptap)，使用 [tdesign](https://tdesign.tencent.com/vue-next) 风格的 [Vue3](https://cn.vuejs.org/) 富文本编辑器

## 说明

- 基于 [tiptap](https://github.com/ueberdosis/tiptap) 富文本编辑器
- 使用 [tdesign-vue-next](https://tdesign.tencent.com/vue-next) 组件库
- 支持 TypeScript 

## Demo
[https://demo.tnloy.cc/tdesign-tiptap](https://demo.tnloy.cc/tdesign-tiptap)

## 安装

### 下载插件

```shell
npm i tdesign-tiptap
# 或者
pnpm i tdesign-tiptap
```


### 安装插件

#### 局部引入

```vue
<template>
  <t-tiptap v-model="content" :extensions="extensions" />
</template>

<script lang="ts" setup>
// 导入组件与样式
import { TTiptap } from "tdesign-tiptap";
import "tdesign-tiptap/lib/style.css";
</script>
```

## 使用

```vue
<template>
  <t-tiptap v-model="content" :extensions="extensions" />
</template>

<script setup>
import { ref } from 'vue';
import {
  TTiptap,
  // 扩展
  Bold,
  Italic,
  Strike,
  Underline,
} from "tdesign-tiptap";

// 声明 extensions
// 声明的顺序决定菜单栏和气泡菜单的顺序
const extensions = [
  // 默认在菜单栏中显示
  Bold, 
  // 在菜单栏与气泡菜单中显示
  Italic.configure({ bubble: true }),
  // 在菜单栏中隐藏
  Strike.configure({ bar:false }), 
  // 在气泡菜单中显示，在菜单栏中隐藏
  Underline.configure({ bubble: true, bar: false }), 
];

// 编辑器的内容
const content = ref(`
  <p>我是文本内容</p>
`);
</script>
```

## 扩展
### 扩展列表
目前支持的扩展

  - `Heading`
  - `HeadingGroup` (自定义扩展，将 `Heading` 合并为下拉菜单)
  - `Divider` (自定义扩展，菜单栏或气泡菜单中的分割符)
  - `Blockquote`
  - `Code`
  - `CodeBlockLowlight`
  - `BulletList`
  - `OrderedList`
  - `Bold`
  - `Italic`
  - `Strike`
  - `Underline`
  - `Link`
  - `TextAlign`
  - `HorizontalRule`
  - `Color`
  - `Highlight`
  - `Image`
  - 其他扩展开发中...

### 扩展属性
#### bar
说明：是否显示在菜单栏中

类型: `boolean`

默认值：`true`
#### bubble
说明：是否显示在气泡菜单中

类型: `boolean`

默认值：`false`