"use client";
import React, { useState } from "react";
import {
  Cpu,
  HardDrive,
  Fan,
  Zap,
  Box,
  Plus,
  X,
  Check,
  ShoppingCart,
  Printer,
  Monitor,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  inStock: boolean;
}

interface Products {
  processeur: Product[];
  carteMere: Product[];
  carteGraphique: Product[];
  memoireVive: Product[];
  ssd: Product[];
  refroidissement: Product[];
  alimentation: Product[];
  boitier: Product[];
}

type ComponentKey = keyof Products;

interface SelectedComponents {
  [key: string]: Product;
}

export default function ConfigPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedComponents, setSelectedComponents] =
    useState<SelectedComponents>({});
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<"intel" | "amd">("intel");

  const intelProducts: Products = {
    processeur: [
      {
        id: 1,
        name: "Intel Core i9 14900K (3.2 GHz / 5.8 GHz) Tray",
        price: 5683.02,
        oldPrice: 5799.0,
        image: "/composants/inteli7.png",
        inStock: true,
      },
      {
        id: 2,
        name: "Intel Core i7 14700K (3.4 GHz / 5.6 GHz) Tray",
        price: 3625.02,
        oldPrice: 3699.0,
        image: "/composants/inteli7.png",
        inStock: true,
      },
      {
        id: 3,
        name: "Intel Core i5 14600KF (3.5 GHz / 5.3 GHz) Tray",
        price: 2351.02,
        oldPrice: 2399.0,
        image: "/composants/inteli7.png",
        inStock: true,
      },
      {
        id: 4,
        name: "Intel Core i5 10400F (2.9 GHz / 4.3 GHz)",
        price: 1264.2,
        oldPrice: 1290.0,
        image: "/composants/inteli7.png",
        inStock: true,
      },
    ],
    carteMere: [
      {
        id: 5,
        name: "ASUS ROG Strix Z790-E Gaming",
        price: 4299.0,
        oldPrice: 4500.0,
        image: "/composants/msicatremere.png",
        inStock: true,
      },
      {
        id: 6,
        name: "MSI MPG Z790 Carbon",
        price: 3799.0,
        oldPrice: 3999.0,
        image: "/composants/msicatremere.png",
        inStock: true,
      },
      {
        id: 7,
        name: "Gigabyte Z790 AORUS Elite",
        price: 2899.0,
        oldPrice: 3099.0,
        image: "/composants/msicatremere.png",
        inStock: true,
      },
    ],
    carteGraphique: [
      {
        id: 8,
        name: "NVIDIA RTX 4080",
        price: 12499.0,
        oldPrice: 12999.0,
        image: "/composants/nvdia.png",
        inStock: true,
      },
      {
        id: 9,
        name: "NVIDIA RTX 4070 Ti",
        price: 8999.0,
        oldPrice: 9299.0,
        image: "/composants/nvdia.png",
        inStock: true,
      },
      {
        id: 10,
        name: "NVIDIA RTX 4060 Ti",
        price: 5499.0,
        oldPrice: 5699.0,
        image: "/composants/nvdia.png",
        inStock: true,
      },
    ],
    memoireVive: [
      {
        id: 11,
        name: "Corsair Vengeance DDR5 32GB",
        price: 1899.0,
        oldPrice: 1999.0,
        image: "/composants/ram.png",
        inStock: true,
      },
      {
        id: 12,
        name: "G.Skill Trident Z5 64GB",
        price: 3299.0,
        oldPrice: 3499.0,
        image: "/composants/ram.png",
        inStock: true,
      },
      {
        id: 13,
        name: "Kingston Fury DDR5 16GB",
        price: 999.0,
        oldPrice: 1099.0,
        image: "/composants/ram.png",
        inStock: true,
      },
    ],
    ssd: [
      {
        id: 14,
        name: "Samsung 990 PRO 2TB",
        price: 2299.0,
        oldPrice: 2499.0,
        image: "/composants/sdd.png",
        inStock: true,
      },
      {
        id: 15,
        name: "WD Black SN850X 1TB",
        price: 1299.0,
        oldPrice: 1399.0,
        image: "/composants/sdd.png",
        inStock: true,
      },
      {
        id: 16,
        name: "Crucial P5 Plus 500GB",
        price: 699.0,
        oldPrice: 799.0,
        image: "/composants/sdd.png",
        inStock: true,
      },
    ],
    refroidissement: [
      {
        id: 17,
        name: "Noctua NH-D15",
        price: 1099.0,
        oldPrice: 1199.0,
        image: "/composants/novaglacial.png",
        inStock: true,
      },
      {
        id: 18,
        name: "Corsair H150i Elite",
        price: 1899.0,
        oldPrice: 1999.0,
        image: "/composants/novaglacial.png",
        inStock: true,
      },
      {
        id: 19,
        name: "be quiet! Dark Rock Pro 4",
        price: 899.0,
        oldPrice: 999.0,
        image: "/composants/novaglacial.png",
        inStock: true,
      },
    ],
    alimentation: [
      {
        id: 20,
        name: "Corsair RM1000x 1000W",
        price: 2199.0,
        oldPrice: 2399.0,
        image: "/composants/alimentation.png",
        inStock: true,
      },
      {
        id: 21,
        name: "Seasonic Focus GX-850 850W",
        price: 1699.0,
        oldPrice: 1899.0,
        image: "/composants/alimentation.png",
        inStock: true,
      },
      {
        id: 22,
        name: "EVGA SuperNOVA 750W",
        price: 1299.0,
        oldPrice: 1499.0,
        image: "/composants/alimentation.png",
        inStock: true,
      },
    ],
    boitier: [
      {
        id: 23,
        name: "Lian Li O11 Dynamic",
        price: 1599.0,
        oldPrice: 1699.0,
        image: "/composants/boite.png",
        inStock: true,
      },
      {
        id: 24,
        name: "Corsair 4000D Airflow",
        price: 1199.0,
        oldPrice: 1299.0,
        image: "/composants/boite.png",
        inStock: true,
      },
      {
        id: 25,
        name: "NZXT H510 Elite",
        price: 1399.0,
        oldPrice: 1499.0,
        image: "/composants/boite.png",
        inStock: true,
      },
    ],
  };

  const amdProducts: Products = {
    processeur: [
      {
        id: 26,
        name: "AMD Ryzen 9 7950X",
        price: 5499.0,
        oldPrice: 5699.0,
        image: "/composants/inteli7.png",
        inStock: true,
      },
      {
        id: 27,
        name: "AMD Ryzen 7 7800X3D",
        price: 4299.0,
        oldPrice: 4499.0,
        image: "/composants/inteli7.png",
        inStock: true,
      },
      {
        id: 28,
        name: "AMD Ryzen 5 7600X",
        price: 2699.0,
        oldPrice: 2799.0,
        image: "/composants/inteli7.png",
        inStock: true,
      },
    ],
    carteMere: [
      {
        id: 29,
        name: "ASUS TUF Gaming X670E",
        price: 3899.0,
        oldPrice: 4099.0,
        image: "/composants/msicatremere.png",
        inStock: true,
      },
      {
        id: 30,
        name: "MSI MAG B650 Tomahawk",
        price: 2499.0,
        oldPrice: 2699.0,
        image: "/composants/msicatremere.png",
        inStock: true,
      },
      {
        id: 31,
        name: "Gigabyte X670 AORUS Elite",
        price: 3299.0,
        oldPrice: 3499.0,
        image: "/composants/msicatremere.png",
        inStock: true,
      },
    ],
    carteGraphique: [
      {
        id: 32,
        name: "AMD Radeon RX 7900 XTX",
        price: 10999.0,
        oldPrice: 11499.0,
        image: "/composants/nvdia.png",
        inStock: true,
      },
      {
        id: 33,
        name: "AMD Radeon RX 7800 XT",
        price: 7499.0,
        oldPrice: 7799.0,
        image: "/composants/nvdia.png",
        inStock: true,
      },
      {
        id: 34,
        name: "AMD Radeon RX 7600",
        price: 3999.0,
        oldPrice: 4199.0,
        image: "/composants/nvdia.png",
        inStock: true,
      },
    ],
    memoireVive: intelProducts.memoireVive,
    ssd: intelProducts.ssd,
    refroidissement: intelProducts.refroidissement,
    alimentation: intelProducts.alimentation,
    boitier: intelProducts.boitier,
  };

  const products = selectedBrand === "intel" ? intelProducts : amdProducts;

  const components = [
    { id: "processeur", name: "PROCESSEUR", icon: Cpu, required: true },
    { id: "carteMere", name: "CARTE MÈRE", icon: Monitor, required: true },
    {
      id: "refroidissement",
      name: "REFROIDISSEMENT",
      icon: Fan,
      required: false,
    },
    {
      id: "carteGraphique",
      name: "CARTE GRAPHIQUE",
      icon: Monitor,
      required: false,
    },
    {
      id: "memoireVive",
      name: "MÉMOIRE VIVE",
      icon: HardDrive,
      required: true,
    },
    { id: "ssd", name: "SSD", icon: HardDrive, required: false },
    { id: "alimentation", name: "ALIMENTATION", icon: Zap, required: false },
    { id: "boitier", name: "BOÎTIER", icon: Box, required: false },
  ];

  const handleSelectComponent = (componentId: string, product: Product) => {
    setSelectedComponents({ ...selectedComponents, [componentId]: product });
    setActiveModal(null);
  };

  const handleRemoveComponent = (componentId: string) => {
    const newComponents = { ...selectedComponents };
    delete newComponents[componentId];
    setSelectedComponents(newComponents);
  };

  const calculateTotal = (): number => {
    return Object.values(selectedComponents).reduce(
      (sum: number, item: Product) => sum + item.price,
      0
    );
  };

  const calculateDiscount = (): number => {
    const total = calculateTotal();
    return total * 0.02;
  };

  const canProceedToStep2 = selectedBrand !== null;
  const canProceedToStep3 = Object.keys(selectedComponents).length >= 3;

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Steps Indicator */}
      <div className=" mx-auto px-4 py-3 ">
        <div className="flex justify-between items-center  mb-8 max-w-4xl mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex flex-col items-center ${
                  step < 3 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
                    currentStep >= step
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep > step ? <Check size={24} /> : step}
                </div>
                <span className="text-xs mt-2 font-semibold">
                  {step === 1
                    ? "Choisir Type"
                    : step === 2
                    ? "Composants"
                    : "Récapitulatif"}
                </span>
              </div>
              {step < 3 && (
                <div className="flex-1 h-1 bg-gray-300 mx-4 mt-[-20px]">
                  <div
                    className={`h-full transition-all ${
                      currentStep > step ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Brand Selection */}
        {currentStep === 1 && (
          <div className="bg-white ">
            <h2 className="text-3xl font-bold text-primary my-2 text-center mb-4">
              Étape 1: Choisissez le type de processeur
            </h2>
            <div className=" flex flex-col md:flex-row items-center justify-center gap-9">
              <button
                onClick={() => {
                  setSelectedBrand("intel");
                  setSelectedComponents({});
                }}
                className={`flex flex-col justify-items-center gap-3 p-5 rounded-lg border-2 transition-all ${
                  selectedBrand === "intel"
                    ? "border-blue-600 bg-blue-50 shadow-2xl scale-102"
                    : "border-gray-200 hover:border-blue-600 hover:shadow-lg"
                }`}
              >
                <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover">
                  <Image
                    src={"/images/intercore.jpg"}
                    alt={"inter"}
                    height={300}
                    width={300}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-gray-600">Processeurs Intel Core</p>
                {selectedBrand === "intel" && (
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Check size={20} />
                    <span className="font-semibold">Sélectionné</span>
                  </div>
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedBrand("amd");
                  setSelectedComponents({});
                }}
                className={`flex flex-col justify-items-center gap-3 p-5 rounded-lg border-2 transition-all ${
                  selectedBrand === "amd"
                    ? "border-red-600 bg-red-50 shadow-2xl scale-102"
                    : "border-gray-200 hover:border-red-400 hover:shadow-lg"
                }`}
              >
                <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover">
                  <Image
                    src={"/images/ryzen.jpg"}
                    alt={"inter"}
                    height={300}
                    width={300}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-gray-600">Processeurs Intel Core</p>
                {selectedBrand === "amd" && (
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <Check size={20} />
                    <span className="font-semibold">Sélectionné</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Components Selection */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Étape 2: Choisissez vos composants (
                  {selectedBrand.toUpperCase()})
                </h2>
                <div className="space-y-4">
                  {components.map((component) => {
                    const Icon = component.icon;
                    const selected = selectedComponents[component.id];

                    return (
                      <div
                        key={component.id}
                        className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Icon className="text-primary" size={32} />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-700">
                                {component.name}
                              </h3>
                              {selected && (
                                <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={selected.image}
                                      alt={"image"}
                                      width={32}
                                      height={32}
                                      className="flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-sm font-medium break-words line-clamp-2">
                                        {selected.name}
                                      </p>
                                      <p className="text-sm text-gray-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span className="line-through whitespace-nowrap">
                                          {selected.oldPrice.toFixed(2)} DH
                                        </span>
                                        <span className="text-cyan-500 font-bold whitespace-nowrap">
                                          {selected.price.toFixed(2)} DH
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 sm:flex-shrink-0">
                                    <button
                                      onClick={() =>
                                        setActiveModal(component.id)
                                      }
                                      className="flex-1 sm:flex-none px-4 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded whitespace-nowrap"
                                    >
                                      MODIFIER
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleRemoveComponent(component.id)
                                      }
                                      className="flex-1 sm:flex-none px-4 py-1 text-sm text-red-600 hover:bg-red-50 rounded whitespace-nowrap"
                                    >
                                      RETIRER
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveModal(component.id)}
                            className="text-blue-600 hover:bg-blue-100 p-2 rounded-full"
                          >
                            <Plus size={24} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mini Summary in Step 2 */}
            <div>
              <div className="bg-white rounded-lg shadow-xl p-6 sticky top-4">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Sélection actuelle
                </h3>
                {Object.keys(selectedComponents).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Aucun composant sélectionné
                  </p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(selectedComponents).map(([key, item]) => (
                      <div
                        key={key}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="text-green-500" size={14} />
                        <span className="flex-1 truncate">{item.name}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t mt-4">
                      <div className="flex justify-between font-bold text-cyan-500">
                        <span>Total</span>
                        <span>
                          {(calculateTotal() - calculateDiscount()).toFixed(2)}{" "}
                          DH
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Final Summary */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
                Étape 3: Récapitulatif de votre configuration
              </h2>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="text-blue-600" size={32} />
                  <h3 className="text-xl font-bold">
                    Type: {selectedBrand.toUpperCase()}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {Object.entries(selectedComponents).map(([key, item]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={"image"}
                        width={32}
                        height={32}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {key === "processeur"
                            ? "Processeur"
                            : key === "carteMere"
                            ? "Carte Mère"
                            : key === "carteGraphique"
                            ? "Carte Graphique"
                            : key === "memoireVive"
                            ? "Mémoire RAM"
                            : key === "ssd"
                            ? "Stockage"
                            : key === "refroidissement"
                            ? "Refroidissement"
                            : key === "alimentation"
                            ? "Alimentation"
                            : key === "boitier"
                            ? "Boîtier"
                            : key}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 line-through">
                        {item.oldPrice.toFixed(2)} DH
                      </p>
                      <p className="text-lg font-bold text-cyan-500">
                        {item.price.toFixed(2)} DH
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">
                    {calculateTotal().toFixed(2)} DH
                  </span>
                </div>
                <div className="flex justify-between text-lg text-green-600">
                  <span>💎 Remise 2%</span>
                  <span className="font-semibold">
                    -{calculateDiscount().toFixed(2)} DH
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-cyan-500 pt-3 border-t-2">
                  <span>Total</span>
                  <span>
                    {(calculateTotal() - calculateDiscount()).toFixed(2)} DH
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-bold flex items-center justify-center gap-2 transition-all">
                  <Check size={24} />
                  Valider la commande
                </button>

                <button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                  <ShoppingCart size={20} />
                  Ajouter au panier
                </button>

                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <Printer size={20} />
                  Imprimer la configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 shadow-lg"
            }`}
          >
            <ChevronLeft size={24} />
            Précédent
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNextStep}
              disabled={
                (currentStep === 1 && !canProceedToStep2) ||
                (currentStep === 2 && !canProceedToStep3)
              }
              className={`flex items-center gap-2 px-5 py-3 button transition-all ${
                (currentStep === 1 && !canProceedToStep2) ||
                (currentStep === 2 && !canProceedToStep3)
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
              }`}
            >
              Suivant
              <ChevronRight size={24} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-8 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b md:p-4 p-2.5 flex justify-between items-center z-10">
              <h2 className="md:text-xl text-sm font-bold text-primary">
                {components.find((c) => c.id === activeModal)?.name}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full"
              >
                <X size={28} />
              </button>
            </div>

            <div className="">
              <div className="flex flex-wrap w-full justify-center">
                {products[activeModal as ComponentKey]?.map(
                  (product: Product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      whileHover={{ scale: 1.05 }}
                      className="p-5 max-w-[290px] flex flex-col gap-2.5  bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="justify-items-center w-[250px] h-[250px] rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={250}
                          height={250}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="bg-gray-100 p-2.5 text-sm rounded-md">
                        {/* <p className="text-gray-600">{product.brand}</p> */}
                        <p className="text-primary font-semibold max-w-[250px] truncate">
                          {product.name}
                        </p>
                      </div>

                      <div className="p-1">
                        <p className="text-xl text-secondary font-medium">
                          {product.price} Dh
                        </p>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              product.inStock ? "bg-green-700" : "bg-gray-600"
                            }`}
                          ></div>
                          <p
                            className={`text-sm font-semibold ${
                              product.inStock
                                ? "text-green-700"
                                : "text-gray-600"
                            }`}
                          >
                            {product.inStock ? "En stock" : "Rupture"}
                          </p>
                        </div>
                      </div>

                      <motion.button
                        onClick={() =>
                          handleSelectComponent(activeModal, product)
                        }
                        whileTap={{ scale: 0.95 }}
                        className="flex justify-center items-center gap-2 bg-primary text-white p-2 rounded-md hover:bg-primary/90 cursor-pointer"
                      >
                        <ShoppingCart />
                        <p className="font-medium">Ajouter au panier</p>
                      </motion.button>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
