"use client";

import { useTranslation } from "react-i18next";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import LinkedInIcon from "@/assets/icons/Linkdin-icon";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import footerBg from "@/assets/images/footerBg.png";

const Footer = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }) || false;

  return (
    <footer className="w-full relative ">
      <div className="absolute inset-0 z-0 ">
        <Image
          src={footerBg}
          alt="footer-bg"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      <div className="bg-ring/80 py-6 relative z-10 text-slate-700 dark:text-slate-300 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">
          {t("footer.title")}
        </h1>

        <div className="flex flex-col items-center ">
          <h2 className="text-xl md:text-2xl font-medium text-center mb-1 ">
            {t("footer.subtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-0 md:gap-4 max-w-[900px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-foreground/20 p-2 md:p-4 rounded-full mb-1">
              <Phone className="md:h-8 md:w-8 h-4 w-4" />
            </div>
            <h3 className="font-semibold">{t("footer.phoneTitle")}</h3>
            <p className="md:text-lg text-sm">+972-52-3080860</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-foreground/20 p-2 md:p-4 rounded-full mb-1">
              <Mail className="md:h-8 md:w-8 h-4 w-4" />
            </div>
            <h3 className="font-semibold">{t("footer.emailTitle")}</h3>
            <a
              href="mailto:oriarb1369@gmail.com"
              className="md:text-lg text-sm hover:underline"
            >
              oriarb1369@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-foreground/20 p-2 md:p-4 rounded-full mb-1">
              {isMobile ? (
                <LinkedInIcon width={16} height={16} />
              ) : (
                <LinkedInIcon width={30} height={30} />
              )}
            </div>
            <h3 className="font-semibold">{t("footer.linkedinTitle")}</h3>
            <Link
              href="https://www.linkedin.com/in/ori-arbeli-316568310/"
              target="_blank"
              rel="noopener noreferrer"
              className="md:text-lg text-sm hover:underline"
            >
              {t("ori arbeli linkedin ")}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-ring relative z-10 md:py-2 py-1 text-slate-700 dark:text-slate-300">
        <div className="container mx-auto">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
