const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";
export const API_URL = isDev
  ? process.env.NEXT_PUBLIC_API_URL
  : "https://silicontech.elmeskini.site/api";

export const menuItems = [
  {
    icon: "/icons/phone.png",
    alt: "support",
    label: "Support",
    link: "/+212708015107",
  },
  {
    icon: "/icons/user.png",
    alt: "connexion",
    label: "Connexion",
    link: "/auth/login",
  },
  {
    icon: "/icons/panier.png",
    alt: "panier",
    label: "Panier",
    link: "/panier",
  },
  {
    icon: "/icons/user.png",
    alt: "deconnexion",
    label: "Déconnexion",
    link: "/logout",
  },
];
interface MenuItem {
  image: string;
  name: string;
  hasDropdown: boolean;
  link?:string
}

interface MenuColumn {
  title: string;
  items: string[];
}

interface MenuCategory {
  columns: MenuColumn[];
}

interface MenuData {
  [key: string]: MenuCategory;
}

export const topMenuItems: MenuItem[] = [
  { image: "", name: "Configurateur PC", hasDropdown: false , link:"/configurateur-pc"},
  { image: "", name: "Composants", hasDropdown: true },
  { image: "", name: "PC Gamer", hasDropdown: true },
  { image: "", name: "Setup Complet", hasDropdown: false },
  { image: "", name: "PC Portable", hasDropdown: true },
  { image: "", name: "Périphériques", hasDropdown: true },
  { image: "", name: "Image & Son", hasDropdown: true },
  { image: "", name: "Consoles", hasDropdown: true },
  { image: "", name: "Chaise & Bureau", hasDropdown: true },
];

export const categories = [
  { image: "/categories/pc-gamer.png", name: "PC Gamer" },
  { image: "/categories/pc-portable.png", name: "PC Portable" },
  { image: "/categories/chaise-gamer.png", name: "Chaise Gamer" },
  { image: "/categories/processeur.png", name: "Processeur" },
  { image: "/categories/carte-graphique.png", name: "Carte Graphique" },
  { image: "/categories/monitor.png", name: "Monitor" },
  { image: "/categories/pc-gamer.png", name: "PC Gamer" },
  { image: "/categories/pc-portable.png", name: "PC Portable" },
];

export const menuData: MenuData = {
  "PC Gamer": {
    columns: [
      {
        title: "PC Gamer INTEL",
        items: [
          "Intel Core Ultra 9",
          "Intel Core Ultra 7",
          "Intel Core Ultra 5",
          "Intel Core i9",
          "Intel Core i7",
          "Intel Core i5",
          "Intel Core i3",
        ],
      },
      {
        title: "PC Gamer AMD",
        items: ["Ryzen 9", "Ryzen 7", "Ryzen 5", "Ryzen 3"],
      },
    ],
  },
  Composants: {
    columns: [
      {
        title: "Processeur",
        items: ["Processeur Intel", "Processeur AMD"],
      },
      {
        title: "Carte mère",
        items: ["Socket Intel", "Socket AMD"],
      },
      {
        title: "Refroidissement",
        items: [
          "Watercooling",
          "Refroidissement Processeur",
          "Ventilateur Boitier",
          "Pâte thermique",
        ],
      },
      {
        title: "Carte graphique",
        items: ["GPU NVIDIA", "GPU AMD", "GPU INTEL"],
      },
      {
        title: "Mémoire vive",
        items: ["RAM DDR4", "RAM DDR5", "RAM pour PC Portable"],
      },
      {
        title: "STOCKAGE",
        items: ["Disque SSD", "Disque HDD", "Disque dur externe", "Clé USB"],
      },
      {
        title: "Alimentation PC",
        items: [
          "Moins de 500 W",
          "Entre 500 W et 599 W",
          "Entre 600 W et 699 W",
          "Entre 700 W et 799 W",
          "Entre 800 W et 899 W",
          "Plus de 900 W",
        ],
      },
      {
        title: "Boitier PC",
        items: [
          "Les Grandes Tours",
          "Les Moyennes Tours",
          "Les Minis Boitiers",
        ],
      },
      {
        title: "Carte son",
        items: [],
      },
    ],
  },
  "PC Portable": {
    columns: [
      {
        title: "",
        items: [
          "PC Portable Gamer",
          "PC Portable Multimédia",
          "Sac ordinateur portable",
          "Ventilateur PC portable",
          "Chargeur PC portable",
        ],
      },
    ],
  },
  Périphériques: {
    columns: [
      {
        title: "",
        items: [
          "Clavier",
          "Souris",
          "Tapis de souris",
          "Pack Claviers/Souris",
          "Accessoires streaming",
          "Manettes",
          "Volant PC",
        ],
      },
    ],
  },
  "Image & Son": {
    columns: [
      {
        title: "",
        items: [
          "Ecran",
          "Bras & Pied",
          "Casque",
          "Microphone",
          "Enceinte PC",
          "Webcam",
        ],
      },
    ],
  },
  Consoles: {
    columns: [
      {
        title: "",
        items: [
          "Console PS5",
          "Console Xbox Series",
          "Console Nintendo Switch",
          "Accessoires PS5",
        ],
      },
    ],
  },
  "Chaise & Bureau": {
    columns: [
      {
        title: "",
        items: [
          "Chaise Gamer",
          "Chaise Ergonomique",
          "Bureau Gaming",
          "Tapis De Sol Gamer",
        ],
      },
    ],
  },
};

export const products = [
  {
    id: 1,
    name: "PC Gamer Ryzen 7 7800X3D RTX 5080",
    brand: "MSI",
    price: 2999,
    image: "/categories/pc-gamer.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Laptop MacBook Pro M3 16”",
    brand: "Apple",
    price: 2399,
    image: "/categories/pc-portable.png",
    inStock: true,
  },
  {
    id: 3,
    name: "Dell XPS 13 Evo i7 13th Gen",
    brand: "Dell",
    price: 1899,
    image: "/categories/pc-portable.png",
    inStock: true,
  },
  {
    id: 4,
    name: "ASUS TUF Gaming F15 RTX 4060",
    brand: "ASUS",
    price: 1699,
    image: "/categories/monitor.png",
    inStock: false,
  },
  {
    id: 5,
    name: "HP Envy x360 Convertible",
    brand: "HP",
    price: 1299,
    image: "/categories/pc-gamer.png",
    inStock: true,
  },
  {
    id: 6,
    name: "Lenovo Legion 7i RTX 4070",
    brand: "Lenovo",
    price: 2099,
    image: "/categories/pc-gamer.png",
    inStock: true,
  },
];

export const spaces = [
  {
    title: "ORDI SPACE",
    description:
      "Que vous êtes Architecte, Infographiste, Modeleur ou Gamer, découvrez une large sélection d'ordinateurs choisi par SiliconTech.ma",
    link: "#",
    image: "/spaces/ordispace.png",
  },
  {
    title: "SCREEN SPACE",
    description:
      "Écrans dédiés aux Gamers et Professionnels qui cherchent la performance et de la haute qualité d'affichage.",
    link: "#",
    image: "/spaces/screenspace.png",
  },
  {
    title: "NOTRE COLLECTION DE PÉRIPHÉRIQUES",
    description:
      "Nos spécialistes de Techspace.ma ont sélectionné pour vous un large choix de périphériques informatiques.",
    link: "#",
    image: "/spaces/peripheriques.png",
  },
  {
    title: "PC Portable Multimédia",
    description:
      "Techspace vous offre une large collection des PC portable multimédia destiné à vos besoins.",
    link: "#",
    image: "/spaces/pcportable.png",
  },
];
