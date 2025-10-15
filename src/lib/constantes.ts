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
];
interface MenuItem {
  image: string;
  name: string;
  hasDropdown: boolean;
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
  { image:'', name: 'Configurateur PC', hasDropdown: false },
  { image:'', name: 'Composants', hasDropdown: true },
  { image:'', name: 'PC Gamer', hasDropdown: true },
  { image:'', name: 'Setup Complet', hasDropdown: false },
  { image:'', name: 'PC Portable', hasDropdown: true },
  { image:'', name: 'Périphériques', hasDropdown: true },
  { image:'', name: 'Image & Son', hasDropdown: true },
  { image:'', name: 'Consoles', hasDropdown: true },
  { image:'', name: 'Chaise & Bureau', hasDropdown: true }
];

export const menuData: MenuData = {
  'PC Gamer': {
    columns: [
      {
        title: 'PC Gamer INTEL',
        items: ['Intel Core Ultra 9', 'Intel Core Ultra 7', 'Intel Core Ultra 5', 'Intel Core i9', 'Intel Core i7', 'Intel Core i5', 'Intel Core i3']
      },
      {
        title: 'PC Gamer AMD',
        items: ['Ryzen 9', 'Ryzen 7', 'Ryzen 5', 'Ryzen 3']
      }
    ]
  },
  'Composants': {
    columns: [
      {
        title: 'Processeur',
        items: ['Processeur Intel', 'Processeur AMD']
      },
      {
        title: 'Carte mère',
        items: ['Socket Intel', 'Socket AMD']
      },
      {
        title: 'Refroidissement',
        items: ['Watercooling', 'Refroidissement Processeur', 'Ventilateur Boitier', 'Pâte thermique']
      },
      {
        title: 'Carte graphique',
        items: ['GPU NVIDIA', 'GPU AMD', 'GPU INTEL']
      },
      {
        title: 'Mémoire vive',
        items: ['RAM DDR4', 'RAM DDR5', 'RAM pour PC Portable']
      },
      {
        title: 'STOCKAGE',
        items: ['Disque SSD', 'Disque HDD', 'Disque dur externe', 'Clé USB']
      },
      {
        title: 'Alimentation PC',
        items: ['Moins de 500 W', 'Entre 500 W et 599 W', 'Entre 600 W et 699 W', 'Entre 700 W et 799 W', 'Entre 800 W et 899 W', 'Plus de 900 W']
      },
      {
        title: 'Boitier PC',
        items: ['Les Grandes Tours', 'Les Moyennes Tours', 'Les Minis Boitiers']
      },
      {
        title: 'Carte son',
        items: []
      }
    ]
  },
  'PC Portable': {
    columns: [
      {
        title: '',
        items: ['PC Portable Gamer', 'PC Portable Multimédia', 'Sac ordinateur portable', 'Ventilateur PC portable', 'Chargeur PC portable']
      }
    ]
  },
  'Périphériques': {
    columns: [
      {
        title: '',
        items: ['Clavier', 'Souris', 'Tapis de souris', 'Pack Claviers/Souris', 'Accessoires streaming', 'Manettes', 'Volant PC']
      }
    ]
  },
  'Image & Son': {
    columns: [
      {
        title: '',
        items: ['Ecran', 'Bras & Pied', 'Casque', 'Microphone', 'Enceinte PC', 'Webcam']
      }
    ]
  },
  'Consoles': {
    columns: [
      {
        title: '',
        items: ['Console PS5', 'Console Xbox Series', 'Console Nintendo Switch', 'Accessoires PS5']
      }
    ]
  },
  'Chaise & Bureau': {
    columns: [
      {
        title: '',
        items: ['Chaise Gamer', 'Chaise Ergonomique', 'Bureau Gaming', 'Tapis De Sol Gamer']
      }
    ]
  }
};

