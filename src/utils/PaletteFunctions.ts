import { IPalette } from "../types/Palette.types";

// Generate a random ObjectID
export const generateObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
      .toLowerCase()
  );
};

export const determineTextColor = (backgroundColor: string) => {
  const color = backgroundColor
    .substring(
      backgroundColor.indexOf("(") + 1,
      backgroundColor.lastIndexOf(")")
    )
    .split(/,\s*/);
  const r = parseInt(color[0]);
  const g = parseInt(color[1]);
  const b = parseInt(color[2]);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? "#000000" : "#FFFFFF";
};

export const updateSelectedColor = (rgba: {
  r: number;
  g: number;
  b: number;
  a: number;
}) => {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
};

export const resetColorPicker = () => {
  return { r: 0, g: 0, b: 0, a: 1 };
};

export const addColor = (currentPalette: IPalette, selectedColor: string) => {
  if (currentPalette.colors.length < 12) {
    return {
      ...currentPalette,
      colors: [...currentPalette.colors, selectedColor],
    };
  }
  return currentPalette;
};

export const editColor = (
  currentPalette: IPalette,
  oldColor: string,
  newColor: string
) => {
  const newColors = currentPalette.colors.map((color) =>
    color === oldColor ? newColor : color
  );
  return {
    ...currentPalette,
    colors: newColors,
  };
};

export const deleteColor = (
  currentPalette: IPalette,
  colorToDelete: string
) => {
  const newColors = currentPalette.colors.filter(
    (color) => color !== colorToDelete
  );
  return {
    ...currentPalette,
    colors: newColors,
  };
};

// Generate a random number between 0 and 255
export const randomColor = () => Math.floor(Math.random() * 256);

// Convert the rgba color to a hex string
export const hexColor = (color: string) => {
  const rgba = color.replace("rgba(", "").replace(")", "").split(",");
  const r = parseInt(rgba[0]);
  const g = parseInt(rgba[1]);
  const b = parseInt(rgba[2]);
  const a = parseInt(rgba[3]);
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${hex}`;
};
