import { InsertImageFn } from "./extensionOptionsFn";
import { Level } from "@tiptap/extension-heading";

export interface ExtensionsOptions {
  bubble?: boolean;
  bar?: boolean;
  HTMLAttributes?: {};
}

export interface BoldOptions extends ExtensionsOptions {}

export interface HeadingOptions extends ExtensionsOptions {
  levels?: Level[];
}

export interface ItalicOptions extends ExtensionsOptions {}

export interface UnderlineOptions extends ExtensionsOptions {}

export interface StrikeOptions extends ExtensionsOptions {}

export interface BlockquoteOptions extends ExtensionsOptions {}

export interface HorizontalRuleOptions extends ExtensionsOptions {}

export interface CodeOptions extends ExtensionsOptions {}

export interface CodeBlockLowlightOptions extends ExtensionsOptions {}

export interface BulletListOptions extends ExtensionsOptions {}

export interface OrderedListOptions extends ExtensionsOptions {}

export type Alignment = "left" | "center" | "right" | "justify";
export interface TextAlignOptions extends ExtensionsOptions {
  alignments?: Alignment[];
  defaultAlignment?: string;
}

export interface ColorOptions extends ExtensionsOptions {
  colorOptions?: string[][];
}

export interface HighlightOptions extends ExtensionsOptions {
  colorOptions?: string[][];
}

export interface ImageOptions extends ExtensionsOptions {
  sizeOption: { small: string; middle: string; big: string };
  types?: ("network" | "upload")[];
  customUpload?: (file: File, insertFn: InsertImageFn) => void;
}

export interface LinkOptions extends ExtensionsOptions {
  protocols?: string[];
}
