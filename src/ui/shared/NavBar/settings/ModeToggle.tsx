"use client";

import * as React from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/shadCN/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadCN/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {theme === "dark" ? (
          <Button variant="outline" className={cn("flex items-center gap-2")}>
            <Moon className="h-[16px] w-[16px] " />
            <span>{t("navBar.dark")}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className={cn("flex items-center gap-2")}>
            <Sun className="h-[16px] w-[16px] " />
            <span>{t("navBar.light")}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <div className="flex items-center justify-between w-full">
            <div className="text-sm">{t("navBar.light")}</div>
            <Sun className="h-[16px] w-[16px]" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <div className="flex items-center justify-between w-full">
            <div className="text-sm">{t("navBar.dark")}</div>
            <Moon className=" h-[16px] w-[16px]  " />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
