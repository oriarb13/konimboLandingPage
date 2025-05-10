"use client";
import { Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/shadCN/accordion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const QuestionsAnswers = () => {
  const { t } = useTranslation();
  const [openAnswer, setOpenAnswer] = useState<number | null>(null);
  return (
    <div id="questionsAndAnswers" className="dark:bg-foreground/10 py-12  ">
      <div className="   rounded-lg p-4 bg-foreground/10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 mask-radial-from-neutral-100">
          {t("landing.questionsAnswers.title")}
        </h1>
        <h2 className="text-2xl  text-center mb-8 mask-radial-from-neutral-900">
          {t("landing.questionsAnswers.subtitle")}
        </h2>
        <Accordion type="single" collapsible>
          {Array.from({ length: 4 }).map((_, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger
                className="flex items-center cursor-pointer"
                onClick={() =>
                  setOpenAnswer(openAnswer === index + 1 ? null : index + 1)
                }
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#82b841] p-2 ">
                    {openAnswer === index + 1 ? <Minus /> : <Plus />}
                  </div>
                  <h2 className="text-xl font-bold">
                    {t(`landing.questionsAnswers.question${index + 1}`)}
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg">
                  {t(`landing.questionsAnswers.answer${index + 1}`)}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
export default QuestionsAnswers;
