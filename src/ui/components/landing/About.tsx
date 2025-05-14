"use client";
import { useTranslation } from "react-i18next";
import about2 from "@/assets/images/about2.png";
import about3 from "@/assets/images/about1.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
const About = () => {
  const [mounted, setMounted] = useState(false);

  const { t } = useTranslation();

  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setMounted(true);
    setIsDarkMode(theme === "dark");
  }, [theme]);
  if (!mounted) return null;
  return (
    <div id="aboutUs" className="w-full">
      <div className="flex flex-col md:flex-row w-full lg:h-[400px]">
        <div className="hidden md:block md:w-1/2 h-auto">
          <Image
            src={isDarkMode ? about2 : about3}
            alt="about"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 px-4 md:px-6 lg:px-4 xl:px-6 2xl:px-8 py-6 md:py-4 lg:py-1 xl:py-3 2xl:py-6 flex flex-col justify-center bg-zinc-50 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-50 ">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-3 md:mb-4 lg:mb-1 xl:mb-3 2xl:mb-6">
            {t("landing.about.title")}
          </h1>
          <div className="space-y-2 md:space-y-3 lg:space-y-1 xl:space-y-2 2xl:space-y-4">
            <p className="text-base sm:text-lg md:text-lg lg:text-md xl:text-lg 2xl:text-xl">
              {t("landing.about.p1")}
            </p>
            <p className="text-base sm:text-lg md:text-lg lg:text-md xl:text-lg 2xl:text-xl">
              {t("landing.about.p2")}
            </p>
            <p className="text-base sm:text-lg md:text-lg lg:text-md xl:text-lg 2xl:text-xl">
              {t("landing.about.p3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
