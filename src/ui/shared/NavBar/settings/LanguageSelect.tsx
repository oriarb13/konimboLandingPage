"use client";

import { useState } from "react";
import { Button } from "@/ui/shadCN/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadCN/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/providers/i18n-provider";

interface LanguageSelectMenuProps {
  isMobile?: boolean;
}

const languages = [
  { code: "en", label: "English" },
  { code: "he", label: "עברית" },
];

export const LanguageSelectMenu = ({
  isMobile = false,
}: LanguageSelectMenuProps) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const getCurrentLanguageLabel = () => {
    const lang = languages.find((l) => l.code === currentLanguage);
    return lang ? lang.label : languages[0].label;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2",
            isMobile && "justify-start w-full"
          )}
        >
          <Globe size={18} />
          <span>{getCurrentLanguageLabel()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isMobile ? "start" : "end"}
        className="min-w-[120px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "cursor-pointer",
              currentLanguage === language.code && "bg-accent"
            )}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelectMenu;
