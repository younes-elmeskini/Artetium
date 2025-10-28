const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";
export const API_URL = isDev
  ? process.env.NEXT_PUBLIC_API_URL
  : "https://silicontech-backend.elmeskini.site";
export const Navlinks = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/products", label: "Gestion" },
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
    id: "1",
    name: "Elegant Sofa Set",
    category: "Category_1",
    cover: "/images/sofa.png",
    description: "Modern and comfortable sofa for your living room",
    price: "2999",
    solde: true,
    BestSeller: true,
  },
  {
    id: "2",
    name: "Premium Dining Table",
    category: "Category_2",
    cover: "/images/sofa.png",
    description: "Beautiful dining table perfect for your dining room",
    price: "2399",
    solde: false,
    BestSeller: true,
  },
  {
    id: "3",
    name: "Luxury Chair Collection",
    category: "Category_3",
    cover: "/images/sofa.png",
    description: "Stylish chairs to enhance your home decor",
    price: "1899",
    solde: true,
    BestSeller: false,
  },
  {
    id: "4",
    name: "Modern Decor Piece",
    category: "Category_4",
    cover: "/images/sofa.png",
    description: "Contemporary decor item for your space",
    price: "1699",
    solde: false,
    BestSeller: false,
  },
  {
    id: "5",
    name: "Comfortable Lounge Set",
    category: "Category_1",
    cover: "/images/sofa.png",
    description: "Relax in style with this premium lounge set",
    price: "1299",
    solde: true,
    BestSeller: true,
  },
  {
    id: "6",
    name: "Elegant Bedroom Set",
    category: "Category_4",
    cover: "/images/sofa.png",
    description: "Complete bedroom furniture set",
    price: "2099",
    solde: false,
    BestSeller: true,
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
