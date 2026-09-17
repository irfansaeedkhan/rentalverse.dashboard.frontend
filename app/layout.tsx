import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/components/user-provider";
import "./globals.css";
import { kanit, nexaLight, nexaRegular, nexaBlack } from "./fonts";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Portfolio Dashboard Demo",
  description: "A standalone dashboard portfolio demo.",
  keywords: ["dashboard", "portfolio", "demo"],
  authors: [{ name: "Portfolio Demo" }],
  openGraph: {
    title: "Portfolio Dashboard Demo",
    siteName: "Portfolio Dashboard Demo",
    url: "http://localhost:3000",
    description: "A standalone dashboard portfolio demo.",
    images: [
      {
        url: "/images/logo.png",
        width: "420",
        height: "420",
      },
    ],
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "shortcut icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon.ico",
    },
  ],
  robots: {
    follow: true,
  },
  twitter: {
    title: "Altaria",
    description: "Altaria is worlds best and reliable Web3 Organization",
    images: [
      {
        url: "/images/logo.png",
        width: "420",
        height: "420",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nexaLight.variable} ${kanit.variable} ${nexaRegular.variable} ${nexaBlack.variable} ${inter.variable} font-sans`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning={true} className="bg-primary font-nexa">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
        <UserProvider />
        {children}
      </body>
    </html>
  );
}
