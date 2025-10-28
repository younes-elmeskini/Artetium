import CardProduct from "@/components/CardProduct";
import { products } from "@/lib/constantes";
import FilterHero from "@/UI/filterHero";

export default function CatalogurPage() {
  return (
    <div>
      <FilterHero />
      <div className="flex flex-wrap max-w-full justify-center md:mt-10">
        {products.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
