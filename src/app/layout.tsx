"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import NavBar from "@/ui/shared/NavBar/NavBar";
import { I18nProvider } from "@/providers/i18n-provider";
import Footer from "@/ui/shared/footer";
import logo2 from "@/assets/images/logo2.png";
import { useState } from "react";
import Form from "@/ui/shared/form/ContactForm";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteMetadata = {
  title: "KONIMBO",
  description: "LANDING PAGE",
  image: "/src/assets/images/logo2.png",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <html
      lang={params.locale}
      suppressHydrationWarning
      dir={params.locale === "he" ? "rtl" : "ltr"}
    >
      <head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta property="og:image" content={siteMetadata.image} />

        <link rel="icon" href={logo2.src} type="image/png" />
        <link rel="apple-touch-icon" href={logo2.src} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar setIsFormOpen={setIsFormOpen} />
            {children}
            {isFormOpen && <Form setIsFormOpen={setIsFormOpen} />}
            <div id="findUs">
              <Footer />
            </div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
