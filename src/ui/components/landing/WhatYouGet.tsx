"use client";
import { useTranslation } from "react-i18next";
import getBg from "@/assets/images/getBg.png";
import Image from "next/image";
import { Separator } from "@/ui/shadCN/separator";
import { Card } from "@/ui/shadCN/card";
import { DollarSign, Handshake, Palette, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const icons = [
  <DollarSign key="dollar" />,
  <Handshake key="handshake" />,
  <Palette key="palette" />,
  <Rocket key="rocket" />,
];

const WhatYouGet = () => {
  const { t } = useTranslation();

  return (
    <div id="whatYouGet" className="py-12 relative min-h-screen">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={getBg}
          alt="getBg"
          className="w-full h-full object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-black/75"></div>
      </div>

      <div className="relative z-10 p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-16 text-slate-800 dark:text-slate-200">
          {t("landing.whatYouGet.title")}
        </h1>

        <div className="relative">
          <div className="absolute left-1/2  h-full">
            <Separator
              orientation="vertical"
              className="h-full w-1 bg-slate-700 dark:bg-slate-300"
            />
          </div>

          <div className="space-y-32">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 z-10"
                >
                  <div className="rounded-full p-4 bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900">
                    {icons[i]}
                  </div>
                </motion.div>

                <div className="flex items-center justify-center">
                  {i % 2 === 0 ? (
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                        className="w-5/12 mr-auto"
                      >
                        <Card className="md:px-4 md:py-8 px-2 py-4 shadow-xl rounded-none">
                          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200">
                            {t(`landing.whatYouGet.item${i + 1}.title`)}
                          </h2>
                          <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400">
                            {t(`landing.whatYouGet.item${i + 1}.description`)}
                          </p>
                        </Card>
                      </motion.div>
                      <div className="w-2/12"></div>
                      <div className="w-5/12"></div>
                    </div>
                  ) : (
                    <div className="">
                      <div className="w-5/12"></div>
                      <div className="w-2/12"></div>
                      <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                        className="w-5/12 ml-auto"
                      >
                        <Card className="md:px-4 md:py-8 px-2 py-4 shadow-xl rounded-none">
                          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200">
                            {t(`landing.whatYouGet.item${i + 1}.title`)}
                          </h2>
                          <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400">
                            {t(`landing.whatYouGet.item${i + 1}.description`)}
                          </p>
                        </Card>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatYouGet;
