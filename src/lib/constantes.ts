export const team = [
  {
    name: "Ahmed Benali",
    role: "Directeur Général",
    image: "/images/team1.jpg",
    description: "15 ans d'expérience dans l'industrie automobile"
  },
  {
    name: "Fatima Zahra",
    role: "Responsable Commercial",
    image: "/images/team2.jpg",
    description: "Spécialiste en service client et satisfaction"
  },
  {
    name: "Youssef Alami",
    role: "Responsable Technique",
    image: "/images/team3.jpg",
    description: "Expert en maintenance et sécurité automobile"
  }
];


export const Navlinks = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/About", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/add", label: "Gestion" },
];

export const Categories = [
  { link: "#",icon:"/images/phone.png", title: "Phone" },
  { link: "#",icon:"/images/airpod.png", title: "Accessoire" },
  { link: "#",icon:"/images/macbook.png", title: "MacBook" },
  { link: "#",icon:"/images/vision.png", title: "Vision Pro" },
  { link: "#",icon:"/images/phone.png", title: "Phone" },
  { link: "#",icon:"/images/airpod.png", title: "Accessoire" },
  { link: "#",icon:"/images/macbook.png", title: "MacBook" },
  { link: "#",icon:"/images/vision.png", title: "Vision Pro" },
]


export const Product = {
  name: "iPhone 11 Pro ",
  brand: "Apple",
  price: 11000,                       // Use number instead of string for easier calculations
  condition: "neuf",                  // You can keep 'etat' if you prefer French
  storageOptions: [128, 256, 512],   // Fixed typo from 'stockge' to 'storageOptions'
  description: "The iPhone 11 Pro Max features a triple-camera system, Super Retina XDR display, and long-lasting battery life.",
  category: "Smartphones",
  colors: ["Space Gray", "Silver", "Gold", "Midnight Green"],
  image: "/images/iphone11.jpg",
  solde: true,
  bestSeller:true
}

export const Products = [
  {
    id: "p001",
    name: "iPhone 11 Pro",
    brand: "Apple",
    price: 11000,
    oldprice:14000,
    condition: "neuf",
    storageOptions: [128, 256, 512],
    description: "The iPhone 11 Pro features a triple-camera system, Super Retina XDR display, and long-lasting battery life.",
    category: "Smartphones",
    colors: ["Space Gray", "Silver", "Gold", "Midnight Green"],
    image: "/images/iphone11.jpg",
    solde: true,
    bestSeller: true
  },
  {
    id: "p002",
    name: "iPhone 12 Pro",
    brand: "Apple",
    price: 13000,
    oldprice:14000,
    condition: "neuf",
    storageOptions: [64, 128, 256],
    description: "The iPhone 12 features 5G support, OLED display, and a dual-camera system.",
    category: "Smartphones",
    colors: ["Black", "White", "Red", "Blue", "Green"],
    image: "/images/iphne12.png",
    solde: false,
    bestSeller: true
  },
  {
    id: "p003",
    name: "iPhone 13 Pro",
    brand: "Apple",
    price: 15000,
    oldprice:14000,
    condition: "neuf",
    storageOptions: [128, 256, 512, 1024],
    description: "iPhone 13 Pro comes with ProMotion display, A15 Bionic chip, and advanced camera system.",
    category: "Smartphones",
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue"],
    image: "/images/iphone13pro.jpg",
    solde: true,
    bestSeller: false
  },
  {
    id: "p001",
    name: "iPhone 11 Pro",
    brand: "Apple",
    price: 11000,
    oldprice:14000,
    condition: "neuf",
    storageOptions: [128, 256, 512],
    description: "The iPhone 11 Pro features a triple-camera system, Super Retina XDR display, and long-lasting battery life.",
    category: "Smartphones",
    colors: ["Space Gray", "Silver", "Gold", "Midnight Green"],
    image: "/images/iphone11.jpg",
    solde: true,
    bestSeller: true
  },
  {
    id: "p002",
    name: "iPhone 12 Pro",
    brand: "Apple",
    price: 13000,
    oldprice:14000,
    condition: "neuf",
    storageOptions: [64, 128, 256],
    description: "The iPhone 12 features 5G support, OLED display, and a dual-camera system.",
    category: "Smartphones",
    colors: ["Black", "White", "Red", "Blue", "Green"],
    image: "/images/iphne12.png",
    solde: false,
    bestSeller: true
  },
  {
    id: "p003",
    name: "iPhone 13 Pro",
    brand: "Apple",
    price: 15000,
    oldprice:14000,
    condition: "neuf",
    storageOptions: [128, 256, 512, 1024],
    description: "iPhone 13 Pro comes with ProMotion display, A15 Bionic chip, and advanced camera system.",
    category: "Smartphones",
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue"],
    image: "/images/iphone13pro.jpg",
    solde: true,
    bestSeller: false
  }
]
