import { Outfit, Roboto_Slab, Oswald, Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const outFit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const robotoFont = Roboto_Slab({
  variable: "--font-roboto",
  subsets: ["latin-ext"],
});

const oswaldFont = Oswald({
  variable: "--font-oswald",
  subsets: ["latin-ext"],
});

const openSans = Open_Sans({
  variable: "--font-openSans",
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${outFit.variable} ${openSans.variable} ${robotoFont.variable} ${oswaldFont.variable} antialiased`}
      >
        {children}
        <ToastContainer />
        <NextTopLoader
          color="#CE0F2E"
          height={3}
          showSpinner={true}
          zIndex={1600}
        />
        <Analytics />
      </body>
    </html>
  );
}
