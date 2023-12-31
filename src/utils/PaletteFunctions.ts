// Stringify rgb color
export const handleStringifyColor = ({ r, g, b }) => {
  return `rgb(${r}, ${g}, ${b})`;
};

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

// Determine the text color based on the background color
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

// RGBA to a HEX
export const hexColor = (color: string) => {
  const rgba = color.replace("rgba(", "").replace(")", "").split(",");
  const r = parseInt(rgba[0]);
  const g = parseInt(rgba[1]);
  const b = parseInt(rgba[2]);
  const a = parseInt(rgba[3]);
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${hex}`;
};

// HEX to RGB
export function hexToRgb(hex: string) {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

// RGB to HSL
export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h = 0,
    s = 0,
    l = 0;
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

  h = Math.round(h * 360);

  return { h: h, s: s * 100, l: l * 100 };
}

// RGB to HSV
export function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h = 0,
    s = 0,
    v = 0;
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

  h = Math.round(h * 360);

  return { h: h, s: s * 100, v: v * 100 };
}

// HSL to RGB
export function hslToRgb(hsl: string) {
  const hslValues = hsl
    .replace("hsl(", "")
    .replace(")", "")
    .split(",")
    .map((val) => parseFloat(val.trim()));

  let [h, s, l] = hslValues;

  // Convertir les pourcentages en fractions
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

// RGB to HEX
export function rgbToHex(rgb: any) {
  const { r, g, b } = rgb;
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${hex}`;
}

// HSL to HEX
export function hslToHex(color: string) {
  const rgb = hslToRgb(color);
  return rgbToHex(rgb);
}
