<template>
  <button @click="test">test</button>
  <div class="tdesign-tiptap">
    <h1 style="text-align: center">Tdesign-Tiptap</h1>
    <TTiptap :editor="editor" />
  </div>
  <div>{{ editor.getHTML() }}</div>
  <!-- <div v-html="editor.getHTML()"></div> -->
</template>

<script setup>
import {
  TTiptap,
  EditorConfig,
  Bold,
  Heading,
  Italic,
  Strike,
  Underline,
  Blockquote,
  HorizontalRule,
  Code,
  // CodeBlock,
  CodeBlockLowlight,
  BulletList,
  OrderedList,
  TextAlign,
  Color,
  Highlight,
  Image,
  Link,
  TextStyle,
  ListItem,
  Divider,
} from "../src/index";
import { onBeforeUnmount } from "vue";

const editor = new EditorConfig({
  content: "sssssssss<pre><code class='language-js'>const a = 56;</code></pre>",
  //   content: `<h1>标题-H1</h1><h2>标题-H2</h2><h3>标题-H3</h3><hr><p><strong>加粗  </strong><em>斜体 </em><s> 删除线 </s> <u>下划线</u></p><hr><p>左对齐</p><p style="text-align: center">居中对齐</p><p style="text-align: right">右对齐</p><hr><ul><li><p>首先</p></li><li><p>其次</p></li><li><p>最后</p></li></ul><hr><ol><li><p>首先</p></li><li><p>其次</p></li><li><p>最后</p></li></ol><hr><p>一个关于 <code class="inline">CodeBlockLowlight</code> 的代码片段</p><pre><code class="language-ts">import { Editor } from "@tiptap/core";
  // import TiptapCodeBlockLowlight, {
  //   CodeBlockLowlightOptions,
  // } from "@tiptap/extension-code-block-lowlight";
  // import { common, createLowlight } from "lowlight";
  // import CommandButton from "../components/MenuCommands/CommandButton.vue";
  // import { ExtensionsOptions } from "../types/extensionOptions";

  // const CodeBlockLowlight = TiptapCodeBlockLowlight.extend&lt;
  //   CodeBlockLowlightOptions &amp; ExtensionsOptions
  // &gt;({
  //   addOptions() {
  //     return {
  //       ...this.parent?.(),
  //       lowlight: createLowlight(common),
  //       bubble: false,
  //       bar: true,
  //       button({ editor }: { editor: Editor }) {
  //         return {
  //           component: CommandButton,
  //           componentProps: {
  //             command: () =&gt; {
  //               editor.commands.toggleCodeBlock();
  //             },
  //             isActive: editor.isActive("codeBlock"),
  //             icon: "code-block",
  //             tooltip: "代码块",
  //           },
  //         };
  //       },
  //     };
  //   },
  // });

  // export default CodeBlockLowlight;
  // </code></pre><hr><blockquote><p>下图是一个被<span style="color: rgb(0, 108, 69)"><mark data-color="#f5ba18" style="background-color: #f5ba18; color: inherit">修改过</mark></span>的壁纸图片，原版在这里 [<a target="_blank" rel="noopener noreferrer nofollow" href="https://www.pixiv.net/artworks/73718366">传送门</a>]</p></blockquote><p style="text-align: center"><img src="https://files.catbox.moe/rpn0q6.png" alt="我的壁纸" width="50%"></p><p></p>`,
  baseExtensions: [TextStyle, ListItem],
  buttonExtensions: [
    Heading,
    // Bold,
    // "|",
    // Divider,
    // Italic,
    // Divider,
    // Strike,
    // Underline,
    // Blockquote,
    // HorizontalRule,
    // Code,
    // // CodeBlock.configure({ bubble: true }),
    CodeBlockLowlight.configure({ bubble: true }),
    // BulletList,
    // OrderedList,
    // TextAlign,
    // Color.configure({ colorOptions: [["red"]] }),
    // Highlight,
    // Image.configure({ bubble: true }),
    // Link.configure({ bubble: true }),
  ],
});
const test = () => {
  console.log(editor.setText());

  // console.log(editor.getHTML());
  // console.log(editor.getJSON());
  // console.log(editor.getText());
  // console.log(editor.getImageList());
  // console.log(editor.getLinkList());
};

onBeforeUnmount(() => {
  editor.destroy();
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.tdesign-tiptap {
  margin: 50px auto;
  max-width: 900px;
  height: 600px;
  padding: 10px;
}
</style>
