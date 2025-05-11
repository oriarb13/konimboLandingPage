"use client";

import { useTranslation } from "react-i18next";
import Setting from "./settings/Setting";
import { Button } from "@/ui/shadCN/button";
import Image from "next/image";
import logo2 from "@/assets/images/logo2.png";
import logo3 from "@/assets/images/logo3.png";
import { Separator } from "@/ui/shadCN/separator";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/ui/shadCN/sheet";
import { useMediaQuery } from "react-responsive";

const menuItems: string[] = [
  "aboutUs",
  "customerRecommendations",
  "questionsAndAnswers",
  "whatYouGet",
  "findUs",
];

interface NavBarProps {
  setIsFormOpen: (isFormOpen: boolean) => void;
}

const NavBar = ({ setIsFormOpen }: NavBarProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" }) || false;

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = isMobile ? 150 : 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return !isMobile ? (
    <div className="flex justify-between items-center p-4 bg-foreground/10 backdrop-blur-sm sticky top-0 z-50 w-full">
      <Image
        src={logo3}
        alt="logo"
        width={200}
        className="cursor-pointer"
        onClick={() => scrollToElement("top")}
      />
      <div className="flex items-center justify-around  w-full xl:text-xl lg:text-lg text-sm mx-4">
        {menuItems.map((item, index) => (
          <div key={item} className="flex items-center gap-1">
            {index > 0 && (
              <div className="h-6 mx-1">
                <Separator
                  orientation="vertical"
                  className="h-full bg-foreground/30"
                />
              </div>
            )}
            <div
              className=" cursor-pointer hover:text-foreground/80 font-bold"
              onClick={() => scrollToElement(item)}
            >
              {t(`navBar.${item}`)}
            </div>
          </div>
        ))}
      </div>
      <Button variant="primary" onClick={() => setIsFormOpen(true)}>
        {t("navBar.contactUs")}
      </Button>
      <div className="flex items-center gap-2">
        <Setting />
      </div>
    </div>
  ) : (
    <div className="flex justify-between items-center p-4 bg-foreground/10 backdrop-blur-sm sticky top-0 z-50 w-full py-0">
      <Button variant="primary" onClick={() => setIsFormOpen(true)}>
        {t("navBar.contactUs")}
      </Button>
      <Image
        className="cursor-pointer"
        src={logo2}
        alt="logo"
        width={120}
        onClick={() => scrollToElement("top")}
      />
      <Sheet>
        <SheetTrigger asChild={true}>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">{t("navBar.menu")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="flex flex-row items-center mt-6">
            <Setting />
            <SheetTitle>{t("navBar.menu")}</SheetTitle>
          </SheetHeader>
          <SheetDescription></SheetDescription>
          <div className="flex flex-col space-y-4 mt-6">
            {menuItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="justify-start"
                onClick={() => scrollToElement(item)}
              >
                {t(`navBar.${item}`)}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavBar;
