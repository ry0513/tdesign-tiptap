import { InsertImageFn } from "./extensionOptionsFn";

export interface ExtensionsOptions {
  bubble?: boolean;
  bar?: boolean;
  button?: Function;
}

export interface ExtensionsImageOptions {
  customUpload?: (file: File, insertFn: InsertImageFn) => void;
}

export interface ExtensionsColorOptions {
  colorOptions?: string[][];
}
