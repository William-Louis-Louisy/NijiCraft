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

// Convertit une couleur hexadécimale en RGB
export function hexToRgb(hex: string) {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h = 0,
    s = 0,
    l = 0; // Initialisation ici
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h = 0,
    s = 0,
    v = 0; // Initialisation ici
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  v = max;

  if (max !== min) {
    const d = max - min;
    s = d / max;
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
}
