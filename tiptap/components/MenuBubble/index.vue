<template>
  <BubbleMenu
    v-if="editor && isButtonVisible('link')"
    :editor="editor"
    :update-delay="0"
    :tippy-options="tippyOptions"
    :should-show="shouldShow('link')"
  >
    <div class="t-tiptap__menu-bubble t-tiptap__scroll">
      <LinkMenuBubble :editor="editor" />
    </div>
  </BubbleMenu>

  <BubbleMenu
    v-if="editor && isButtonVisible('image')"
    :editor="editor"
    :update-delay="0"
    :tippy-options="tippyOptions"
    :should-show="shouldShow('image')"
  >
    <div class="t-tiptap__menu-bubble t-tiptap__scroll">
      <ImageMenuBubble :extensions="extensions" :editor="editor" />
    </div>
  </BubbleMenu>

  <BubbleMenu
    v-if="editor"
    :editor="editor"
    :update-delay="0"
    :tippy-options="tippyOptions"
    :should-show="shouldShow(['heading', 'paragraph'])"
  >
    <div class="t-tiptap__menu-bubble t-tiptap__scroll">
      <component
        v-for="(spec, i) in generateCommandButtonComponentSpecs()"
        :key="'command-button' + i"
        :is="spec.component"
        v-bind="spec.componentProps"
        v-on="spec.componentEvents || {}"
      />
    </div>
  </BubbleMenu>
</template>

<script lang="ts" setup>
import {
  Editor,
  Extensions,
  BubbleMenu,
  isTextSelection,
  isActive,
} from "@tiptap/vue-3";
import LinkMenuBubble from "../MenuCommands/Link/MenuBubble.vue";
import ImageMenuBubble from "../MenuCommands/Image/MenuBubble.vue";

const props = defineProps<{
  editor: Editor;
  extensions: Extensions;
  tiptapContent: Element | null;
}>();

const tippyOptions: any = {
  maxWidth: "100%",
  placement: "bottom",
  popperOptions: {
    modifiers: [
      {
        name: "flip",
        options: {
          boundary: props.tiptapContent,
        },
      },
      {
        name: "preventOverflow",
        options: {
          boundary: props.tiptapContent,
        },
      },
    ],
  },
  appendTo: "parent",
};

const isButtonVisible = (name: string) => {
  return props.extensions.some((item) => {
    if (item.name === name) {
      return item.options.bubble;
    }
  });
};

const generateCommandButtonComponentSpecs = () => {
  const extensionManager = props.extensions;
  return extensionManager.reduce((acc, extension) => {
    if (extension.options.bubble !== true) return acc;
    if (["image", "link"].includes(extension.name)) return acc;
    const { button } = extension.options;
    if (!button || typeof button !== "function") return acc;
    const menuBtnComponentSpec = button({
      editor: props.editor,
      extension,
    });

    if (Array.isArray(menuBtnComponentSpec)) {
      return [...acc, ...menuBtnComponentSpec];
    }

    return [...acc, menuBtnComponentSpec];
  }, [] as any[]);
};

const shouldShow = (name: string | string[]) => {
  return ({ editor, view, state, from, to }: any) => {
    if (!view.hasFocus()) {
      return false;
    }
    const { doc, selection } = state;
    const { empty } = selection;
    const isEmpty =
      empty ||
      (!doc.textBetween(from, to).length && isTextSelection(state.selection));
    if (typeof name === "string") {
      if ((isEmpty && name === "link") || (!isEmpty && name !== "link")) {
        return isActive(editor.view.state, name);
      }
    } else {
      return (
        !isEmpty &&
        !isActive(editor.view.state, "image") &&
        name.some((item) => isActive(editor.view.state, item))
      );
    }
    return false;
  };
};
</script>
