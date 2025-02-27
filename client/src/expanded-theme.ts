import {Palette, PaletteColor } from "../node_modules/@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette"{
  interface Palette {
    [key: number ]: string;

  }
  interface Palatte{
    tertiary: PaletteColor;
  }
}
