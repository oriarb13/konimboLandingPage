"use client";
import { useTranslation } from "react-i18next";
import { Separator } from "@/ui/shadCN/separator";

const FirstSection = () => {
  const { t } = useTranslation();
  return (
    <div id="top" className="w-full relative">
      <div className="w-full relative">
        <video
          src="https://d3m9l0v76dty0.cloudfront.net/system/photos/973211/original/84cecb0e286ead29fa0c5d4cabc51499.mp4?1742910697"
          autoPlay
          muted
          loop
          className="w-full object-cover"
          style={{
            minWidth: "100%",
            maxHeight: "70vh",
          }}
        />
        <div className="text-slate-300 absolute inset-0 bg-black/60 flex flex-col justify-center ">
          <div className="rtl:mr-[10%] ltr:ml-[10%]">
            <h1 className=" text-4xl md:text-8xl font-bold mb-4">KONIMBO</h1>
            <h2 className=" text-3xl md:text-5xl font-bold mb-4">
              {t("landing.firstSection.title")}
            </h2>
            <Separator className="bg-slate-300 py-[2px] max-w-sm md:max-w-2xl w-fit mb-4" />
            <p className=" text-xl md:text-2xl max-w-2xl">
              {t("landing.firstSection.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
