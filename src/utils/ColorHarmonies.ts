import { IColor } from "../types/Palette.types";
import { handleStringifyColor, hslToHex, hslToRgb } from "./PaletteFunctions";

export const getColorHarmonies = (color: IColor) => {
  // Extraire les valeurs HSL
  const hslValues = color.hsl
    .slice(4, -1)
    .split(",")
    .map((val) => parseFloat(val.trim()));
  const [hue, saturation, lightness] = hslValues;

  // Couleur complémentaire
  const complementary = `hsl(${
    (hue + 180) % 360
  }, ${saturation}%, ${lightness}%)`;

  // Couleurs analogues
  const analogous1 = `hsl(${(hue + 30) % 360}, ${saturation}%, ${lightness}%)`;
  const analogous2 = `hsl(${
    (hue - 30 + 360) % 360
  }, ${saturation}%, ${lightness}%)`;

  // Couleurs triadiques
  const triadic1 = `hsl(${(hue + 120) % 360}, ${saturation}%, ${lightness}%)`;
  const triadic2 = `hsl(${
    (hue - 120 + 360) % 360
  }, ${saturation}%, ${lightness}%)`;

  // Couleurs tetradiques
  const tetradic1 = `hsl(${(hue + 90) % 360}, ${saturation}%, ${lightness}%)`;
  const tetradic2 = `hsl(${
    (hue - 90 + 360) % 360
  }, ${saturation}%, ${lightness}%)`;
  const tetradic3 = `hsl(${(hue + 180) % 360}, ${saturation}%, ${lightness}%)`;

  // Retourner les harmonies sous forme de tableau d'objets
  return [
    {
      name: "complementary",
      color: complementary,
      hex: hslToHex(complementary),
      rgb: handleStringifyColor(hslToRgb(complementary)),
    },
    {
      name: "analogous1",
      color: analogous1,
      hex: hslToHex(analogous1),
      rgb: handleStringifyColor(hslToRgb(analogous1)),
    },
    {
      name: "analogous2",
      color: analogous2,
      hex: hslToHex(analogous2),
      rgb: handleStringifyColor(hslToRgb(analogous2)),
    },
    {
      name: "triadic1",
      color: triadic1,
      hex: hslToHex(triadic1),
      rgb: handleStringifyColor(hslToRgb(triadic1)),
    },
    {
      name: "triadic2",
      color: triadic2,
      hex: hslToHex(triadic2),
      rgb: handleStringifyColor(hslToRgb(triadic2)),
    },
    {
      name: "tetradic1",
      color: tetradic1,
      hex: hslToHex(tetradic1),
      rgb: handleStringifyColor(hslToRgb(tetradic1)),
    },
    {
      name: "tetradic2",
      color: tetradic2,
      hex: hslToHex(tetradic2),
      rgb: handleStringifyColor(hslToRgb(tetradic2)),
    },
  ];
};
