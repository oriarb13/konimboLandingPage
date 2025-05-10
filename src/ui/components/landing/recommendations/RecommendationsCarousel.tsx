"use client";
import { useTranslation } from "react-i18next";
import Recommendation from "./Recommendation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/shadCN/carousel";
import recommendations from "@/assets/recommendation.json";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const RecommendationsCarousel = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const isRTL = i18n.language === "he" || pathname?.includes("/he");

  const autoplayRef = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: true,
    })
  );

  const restartTimerRef = useRef<number | null>(null);

  const startRestartTimer = () => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }

    restartTimerRef.current = window.setTimeout(() => {
      autoplayRef.current.play();
    }, 6000);
  };

  const handleInteraction = () => {
    if (autoplayRef.current && autoplayRef.current.stop) {
      autoplayRef.current.stop();
    }
    startRestartTimer();
  };

  useEffect(() => {
    return () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      id="customerRecommendations"
      className="w-full py-12 dark:bg-foreground/10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {t("landing.recommendations.title")}
      </h2>

      <Carousel
        className="w-full"
        opts={{
          direction: isRTL ? "rtl" : "ltr",
          loop: true,
        }}
        plugins={[autoplayRef.current]}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
        onScroll={handleInteraction}
      >
        <CarouselContent>
          {recommendations.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Recommendation
                image={testimonial.image}
                name={testimonial.name}
                text={testimonial.text}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6" onClick={handleInteraction}>
          <CarouselPrevious className="relative mr-2 bg-[#82b841] rounded-full p-2 text-slate-800" />
          <CarouselNext className="relative ml-2 bg-[#82b841] rounded-full p-2 text-slate-900" />
        </div>
      </Carousel>
    </div>
  );
};

export default RecommendationsCarousel;
