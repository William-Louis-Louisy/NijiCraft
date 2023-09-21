import { hexToRgb } from "./PaletteFunctions";

/**
 * Calculates the relative luminance of a color.
 * @param color - The RGB values of the color
 * @returns - The relative luminance of the color
 */
function getLuminance({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculates the contrast ratio between two colors.
 * @param color1 - The first color
 * @param color2 - The second color
 * @returns - The contrast ratio between the two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(hexToRgb(color1));
  const luminance2 = getLuminance(hexToRgb(color2));
  return luminance1 > luminance2
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05);
}

/**
 * Evaluates the contrast and returns a rating from 0 to 5 stars.
 * @param contrastRatio - The contrast ratio
 * @returns - The contrast rating (0 to 5 stars)
 */
function evaluateContrast(contrastRatio: number): number {
  if (contrastRatio >= 7) return 5; // Excellent
  if (contrastRatio >= 4.5) return 4; // Good
  if (contrastRatio >= 3) return 3; // Acceptable
  if (contrastRatio >= 2) return 2; // Poor
  if (contrastRatio >= 1.5) return 1; // Very poor
  return 0; // Extremely poor or no contrast
}

/**
 * Depending on the constrast rating, return the corresponding amount of stars.
 * @param contrastRating - The contrast rating
 * @returns - The stars
 */
function getStars(contrastRating: number) {
  switch (contrastRating) {
    case 0:
      return {
        star1: "star-outline",
        star2: "star-outline",
        star3: "star-outline",
        star4: "star-outline",
        star5: "star-outline",
      };
    case 1:
      return {
        star1: "star",
        star2: "star-outline",
        star3: "star-outline",
        star4: "star-outline",
        star5: "star-outline",
      };
    case 2:
      return {
        star1: "star",
        star2: "star",
        star3: "star-outline",
        star4: "star-outline",
        star5: "star-outline",
      };
    case 3:
      return {
        star1: "star",
        star2: "star",
        star3: "star",
        star4: "star-outline",
        star5: "star-outline",
      };
    case 4:
      return {
        star1: "star",
        star2: "star",
        star3: "star",
        star4: "star",
        star5: "star-outline",
      };
    case 5:
      return {
        star1: "star",
        star2: "star",
        star3: "star",
        star4: "star",
        star5: "star",
      };
  }
}

function evaluateColorContrast(color1: string, color2: string) {
  const contrastRatio = Math.round(getContrastRatio(color1, color2) * 10) / 10;
  const contrastRating = evaluateContrast(contrastRatio);
  return {
    contrastRatio,
    contrastRating,
  };
}

function getContrastColor(contrastRatio: number) {
  const thresholds = [
    {
      min: 7,
      color: { textColor: "#0d5f07", bgColor: "#d2fbd0", valueKey: "exellent" },
    },
    {
      min: 4.5,
      color: { textColor: "#5f5207", bgColor: "#fbf5d0", valueKey: "good" },
    },
    {
      min: 3,
      color: {
        textColor: "#5f5207",
        bgColor: "#fbf5d0",
        valueKey: "acceptable",
      },
    },
    {
      min: 2,
      color: { textColor: "#5f0707", bgColor: "#fbd0d0", valueKey: "poor" },
    },
  ];
  for (const threshold of thresholds) {
    if (contrastRatio >= threshold.min) {
      return threshold.color;
    }
  }
  return { textColor: "#5f0707", bgColor: "#fbd0d0", valueKey: "veryPoor" };
}

function isValidHexColor(hex: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
  return hexRegex.test(hex);
}

export {
  hexToRgb,
  getLuminance,
  getContrastRatio,
  evaluateContrast,
  getStars,
  evaluateColorContrast,
  getContrastColor,
  isValidHexColor,
};
