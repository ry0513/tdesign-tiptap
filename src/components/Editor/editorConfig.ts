import { Editor, Extensions, JSONContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";

export default class EditorConfig {
  private tiptap: Editor;
  private extensions: Extensions;

  constructor({ content, extensions }: any) {
    this.tiptap = new Editor({
      content,
      extensions: [Document, Text, Paragraph, ...extensions],
    });
    this.extensions = extensions;
  }
  getTiptap() {
    return this.tiptap;
  }
  getExtensions() {
    return this.extensions;
  }
  getHTML() {
    return this.tiptap.getHTML();
  }
  getJSON() {
    return this.tiptap.getJSON();
  }
  getText() {
    return this.tiptap.getText();
  }
  getSetImageList() {
    return this.tiptap.storage.image.list;
  }
  getImageList() {
    return this.getListByAttr({ type: "image", attr: "src" });
  }
  getLinkList() {
    return this.getListByAttr({ type: "link", attr: "href" });
  }

  private getListByAttr({
    type,
    attr,
    content = [this.tiptap.getJSON()],
  }: {
    type: string;
    attr: string;
    content?: JSONContent[];
  }) {
    const list: string[] = [];
    content.forEach((item: JSONContent) => {
      if (item.type === type) {
        list.push(item.attrs?.[attr]);
      }
      if (item.content) {
        list.push(...this.getListByAttr({ type, attr, content: item.content }));
      } else if (item.marks) {
        list.push(...this.getListByAttr({ type, attr, content: item.marks }));
      }
    });
    return list;
  }
}
