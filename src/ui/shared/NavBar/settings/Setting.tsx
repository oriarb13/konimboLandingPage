import { useRef } from "react";
import { ModeToggle } from "@/ui/shared/NavBar/settings/ModeToggle";
import LanguageSelect from "@/ui/shared/NavBar/settings/LanguageSelect";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/shadCN/dropdown-menu";
import { Button } from "@/ui/shadCN/button";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" ref={dropdownRef}>
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="px-4 pb-2">
        <DropdownMenuLabel className="text-center text-lg">
          {t("navBar.settings")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex  gap-2 justify-center">
          <DropdownMenuItem
            className="p-0 focus:bg-transparent cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <ModeToggle />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-0 focus:bg-transparent cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <LanguageSelect />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Setting;
