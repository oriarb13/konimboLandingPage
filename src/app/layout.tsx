"use client";

import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import NavBar from "@/ui/shared/NavBar/NavBar";
import { I18nProvider } from "@/providers/i18n-provider";
import Footer from "@/ui/shared/footer";
import logo2 from "@/assets/images/logo2.png";
import { useState, useEffect } from "react";
import Form from "@/ui/shared/form/ContactForm";
import Loader from "@/ui/shared/loaders/Loader";

const GlobalHydrationWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 bg-background dark:bg-foreground/10 flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  display: "swap",
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
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <GlobalHydrationWrapper>
              <NavBar setIsFormOpen={setIsFormOpen} />
              {children}
              {isFormOpen && <Form setIsFormOpen={setIsFormOpen} />}
              <div id="findUs">
                <Footer />
              </div>
            </GlobalHydrationWrapper>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
