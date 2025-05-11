"use client";
import { useTranslation } from "react-i18next";
import { Separator } from "@/ui/shadCN/separator";
import { motion } from "framer-motion";

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
        <div className="text-slate-300 absolute inset-0 bg-black/60 flex flex-col justify-center">
          <motion.div
            className="rtl:mr-[10%] ltr:ml-[10%]"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={{
                hidden: {
                  y: 60,
                  opacity: 0,
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.9,
                    duration: 0.9,
                  },
                },
              }}
            >
              <motion.h1 className="text-3xl md:text-8xl font-bold mb-4">
                KONIMBO
              </motion.h1>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  y: 60,
                  opacity: 0,
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <motion.h2 className="text-lg md:text-5xl font-bold mb-4">
                {t("landing.firstSection.title")}
              </motion.h2>
            </motion.div>

            <Separator className="bg-slate-300 py-[2px] max-w-xs md:max-w-2xl w-fit mb-4" />

            <div>
              <p className="text-md md:text-2xl max-w-2xl">
                {t("landing.firstSection.description")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
