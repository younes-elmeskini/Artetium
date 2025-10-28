import Hero from '@/components/Hero';
import About from '@/components/About';
import SectionSpaces from '@/components/SectionSpaces';
import SectionCategories from '@/components/Categories';
export default function Home() {
  return (
    <main className="min-h-screen space-y-10">
      <Hero />
      <SectionCategories/>
      <SectionSpaces />
    </main>
  );
}