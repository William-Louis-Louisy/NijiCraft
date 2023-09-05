export interface IColor {
  hex: string;
  rgb: string;
  rgba: string;
  hsv: string;
  hsva: string;
  hsl: string;
  hsla: string;
}

export interface IPalette {
  id: string;
  name: string;
  colors: IColor[];
}
