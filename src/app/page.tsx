import FirstSection from "@/ui/components/landing/FirstSection";
import About from "@/ui/components/landing/About";
import RecommendationsCarousel from "@/ui/components/landing/recommendations/RecommendationsCarousel";
import QuestionsAnswers from "@/ui/components/landing/QuestionsAnswers";
import WhatYouGet from "@/ui/components/landing/WhatYouGet";
export default function Home() {
  return (
    <div className="">
      <FirstSection />
      <About />
      <RecommendationsCarousel />
      <QuestionsAnswers />
      <WhatYouGet />
    </div>
  );
}
