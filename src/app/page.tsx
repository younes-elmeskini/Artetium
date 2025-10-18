import SectionCategories from "@/components/Categories";
import SectionSpace from "@/components/Space";
import SectionProduct from "@/components/SectionProduct";
import SectionSpaces from "@/components/SectionSpaces";

export default function Home() {
  return (
    <div className="">
      <SectionCategories />
      <SectionProduct/>
      <SectionSpaces />
    </div>
  );
}
