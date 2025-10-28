const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";
export const API_URL = isDev
  ? process.env.NEXT_PUBLIC_API_URL
  : "https://silicontech-backend.elmeskini.site";
export const Navlinks = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/add", label: "Gestion" },
];

interface MenuItem {
  image: string;
  name: string;
  link: string;
}

export const topMenuItems: MenuItem[] = [
  { image: "", name: "Category 1", link: "/#" },
  { image: "", name: "Category 2", link: "/#" },
  { image: "", name: "Category 3", link: "/#" },
  { image: "", name: "Category 4", link: "/#" },
  { image: "", name: "Category 5", link: "/#" },
];

export const categories = [
  { image: "/categories/livingroom.png", name: "Living Room"},
  { image: "/categories/diningroom.png", name: "Dining Room" },
  { image: "/categories/decor.png", name: "Decor & accessoir" },
  { image: "/categories/enfant.png", name: "Espace Enfant"},
  { image: "/categories/diningroom.png", name: "Category 2" },
];

export const products = [
  {
    id: 1,
    name: "Le nom du produit",
    brand: "La marque",
    price: 2999,
    image: "/images/sofa.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Le nom du produit",
    brand: "La marque",
    price: 2399,
    image: "/images/sofa.png",
    inStock: true,
  },
  {
    id: 3,
    name: "Le nom du produit",
    brand: "La marque",
    price: 1899,
    image: "/images/sofa.png",
    inStock: true,
  },
  {
    id: 4,
    name: "Le nom du produit",
    brand: "La marque",
    price: 1699,
    image: "/images/sofa.png",
    inStock: false,
  },
  {
    id: 5,
    name: "Le nom du produit",
    brand: "La marque",
    price: 1299,
    image: "/images/sofa.png",
    inStock: true,
  },
  {
    id: 6,
    name: "Le nom du produit",
    brand: "La marque",
    price: 2099,
    image: "/images/sofa.png",
    inStock: true,
  },
];

export const spaces = [
  {
    title: "En Promotion",
    link: "#",
  },
  {
    title: "Best Seller",
    link: "#",
  },
  {
    title: "Category 3",
     link: "#",
  },
];
