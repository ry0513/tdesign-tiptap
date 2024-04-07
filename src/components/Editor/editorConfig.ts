import { Editor, Content, Extensions, JSONContent } from "@tiptap/vue-3";
import Document from "../../extensions/document";
import Text from "../../extensions/text";
import Paragraph from "../../extensions/paragraph";

interface TEditorOptions {
  content: Content;
  baseExtensions?: Extensions;
  buttonExtensions?: Extensions;
  onCreate?: (props: { editor: TEditor }) => void;
  onUpdate?: (props: { editor: TEditor }) => void;
  onDestroy?: () => void;
  onFocus?: (props: { editor: TEditor; event: FocusEvent }) => void;
  onBlur?: (props: { editor: TEditor; event: FocusEvent }) => void;
}

export default class TEditor {
  private tiptap!: Editor;
  private baseExtensions!: Extensions;
  private buttonExtensions!: Extensions;

  constructor(options: TEditorOptions) {
    this.init(options);
  }

  private init({
    baseExtensions = [],
    buttonExtensions = [],
    onCreate,
    onUpdate,
    onDestroy,
    onFocus,
    onBlur,
    content,
  }: TEditorOptions) {
    this.tiptap = new Editor({
      content,
      onCreate: () => {
        onCreate && onCreate({ editor: this });
      },
      onUpdate: () => {
        onUpdate && onUpdate({ editor: this });
      },
      onDestroy: () => {
        onDestroy && onDestroy();
      },
      onFocus: ({ event }) => {
        onFocus && onFocus({ editor: this, event });
      },
      onBlur: ({ event }) => {
        onBlur && onBlur({ editor: this, event });
      },
      extensions: [
        Document,
        Text,
        Paragraph,
        ...baseExtensions,
        ...buttonExtensions.filter((extension) => {
          return extension.name !== "divider";
        }),
      ],
    });
    this.baseExtensions = baseExtensions;
    this.buttonExtensions = buttonExtensions;
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

  getTiptap() {
    return this.tiptap;
  }
  getBaseExtensions() {
    return this.baseExtensions;
  }
  getButtonExtensions() {
    return this.buttonExtensions;
  }
  getExtensions() {
    return [...this.baseExtensions, ...this.buttonExtensions];
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

  setContent(content: Content) {
    this.tiptap.commands.setContent(content);
  }

  destroy() {
    this.tiptap.destroy();
  }
}
