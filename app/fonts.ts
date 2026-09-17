import localFont from "next/font/local";

// Kanit Font
export const kanit = localFont({
  src: "../public/fonts/kanit/Kanit-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-kanit",
});

// Nexa Font Regular
export const nexaRegular = localFont({
  src: "../public/fonts/nexa/Nexa-Regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-nexa-regular",
});

// Nexa Font Light
export const nexaLight = localFont({
  src: "../public/fonts/nexa/Nexa-Light.otf",
  weight: "100",
  style: "normal",
  variable: "--font-nexa-light",
});
// Nexa Font Heavy
export const nexaBlack = localFont({
  src: "../public/fonts/nexa/Nexa-Black.otf",
  weight: "900",
  style: "normal",
  variable: "--font-nexa-black",
});
