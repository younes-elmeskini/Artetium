"use client";

import { useCart } from "@/lib/hooks/useCartContext";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } =
    useCart();

  const sendToWhatsApp = () => {
    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    const phoneNumber = "212708015107";
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
    toast.success("Redirection vers WhatsApp!");
  };

  const buildWhatsAppMessage = (): string => {
    let message = "🛍️ Nouvelle Commande\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantité: ${item.quantity}\n`;
      message += `   Prix unitaire: ${item.price} MAD\n`;
      message += `   Sous-total: ${(parseFloat(item.price) * item.quantity).toFixed(2)} MAD\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━\n";
    message += `💰 Total: ${getTotal().toFixed(2)} MAD\n\n`;
    message += "Merci! 🙏";

    return message;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ShoppingCart className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-400 mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Votre panier est vide
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Commencez à ajouter des produits à votre panier
          </p>
          <Link
            href="/catalogue"
            className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-cyan-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">
          Panier ({items.length} {items.length === 1 ? "article" : "articles"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6"
              >
                <div className="flex gap-3 sm:gap-6">
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0">
                    <Image
                      src={item.cover}
                      alt={item.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/images/sofa.png";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                      {item.category.replace("_", " ")}
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-600 mb-3 sm:mb-4">
                      {item.price} MAD
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1.5 sm:gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-gray-900 min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 sm:gap-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">
                          Supprimer
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Résumé de la commande
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Sous-total</span>
                  <span>{getTotal().toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>{getTotal().toFixed(2)} MAD</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={sendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg hover:bg-green-600 transition-colors mb-3 sm:mb-4"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Commander sur WhatsApp
              </button>

              {/* Continue Shopping */}
              <Link
                href="/catalogue"
                className="block w-full text-center border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-lg hover:border-gray-400 transition-colors"
              >
                Continuer les achats
              </Link>

              {/* Clear Cart */}
              <button
                onClick={() => {
                  clearCart();
                  toast.success("Panier vidé");
                }}
                className="block w-full text-center text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium mt-3 sm:mt-4"
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}