import CardProduct from "@/components/CardProduct";
import { products } from "@/lib/constantes";

export default function CatalogurPage() {
  return (
    <div>
      <div className="flex flex-wrap max-w-full justify-center mt-10">
        {products.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
