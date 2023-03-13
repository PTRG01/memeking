export { default as Konva } from 'konva/lib/index-types';

export type ObjectType = 'image' | 'text';

export interface Scheme {
  type: ObjectType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  fontSize?: number;
}

export interface ImageScheme extends Scheme {
  id: string;
  type: 'image';
  url: string;
}

export interface TextScheme extends Scheme {
  type: 'text';
  content: string;
}

export type ObjectScheme = TextScheme | ImageScheme;

export interface EditorDocument {
  objects: ObjectScheme[];
  image: string;
}
