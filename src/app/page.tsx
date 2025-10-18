import SectionCategories from "@/components/Categories";
import SectionProduct from "@/components/SectionProduct";
import SectionSpaces from "@/components/SectionSpaces";
import HeroCarousel from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-11">
      <HeroCarousel/>
      <SectionCategories />
      <SectionProduct/>
      <SectionSpaces />
    </div>
  );
}
