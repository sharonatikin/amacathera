import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import GetInTouch from "@/components/GetInTouch";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsCarousel";
import Partners from "@/components/Partners";
import Pipeline from "@/components/Pipeline";
import ProblemSolution from "@/components/ProblemSolution";
import TeamCarousel from "@/components/TeamCarousel";
import TechnologyHighlights from "@/components/TechnologyHighlights";
import WhatWeDo from "@/components/WhatWeDo";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100">
      <Hero />
      <WhatWeDo/>
      <ProblemSolution/>
      <TechnologyHighlights/>
      <FAQSection/>
      <Partners/>
      <GetInTouch/>
      <Pipeline/>
      <NewsSection/>
      <TeamCarousel/>
    </div>
  );
}