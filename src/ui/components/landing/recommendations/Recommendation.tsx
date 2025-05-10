"use client";

import { AvatarFallback, AvatarImage, Avatar } from "@/ui/shadCN/avatar";
import { Card, CardContent } from "@/ui/shadCN/card";

interface RecommendationProps {
  image: string;
  name: string;
  text: string;
}

const Recommendation = ({ image, name, text }: RecommendationProps) => {
  return (
    <Card className="h-full bg-[#82b841]">
      <CardContent>
        <div className="flex flex-col h-full ">
          <div className="flex items-center mb-4 gap-2">
            <Avatar className="h-12 w-12 mr-3 border-2 border-primary/20">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg">{name}</h3>
          </div>

          <p className="text-zinc-700 flex-grow leading-relaxed">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendation;
