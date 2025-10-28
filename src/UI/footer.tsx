import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DecorHome</h3>
            <p className="text-gray-400">Transforming homes with style.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#hero" className="hover:text-white">Home</a></li>
              <li><a href="#best-sellers" className="hover:text-white">Best Sellers</a></li>
              <li><a href="#recently-sold" className="hover:text-white">Recently Sold</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-blue-400" /></a>
              <a href="#" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-pink-400" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-blue-300" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 DecorHome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}