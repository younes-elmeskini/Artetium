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
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/catalogue" className="hover:text-white">Catalogue</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/auth/login" className="hover:text-white">Se connecter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/About" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/About" className="hover:text-white">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/arterium.ma" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-blue-400" /></a>
              <a href="https://www.instagram.com/arterium.ma" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-pink-400" /></a>
              <a href="https://x.com/arterium_ma" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-blue-300" /></a>
            </div>
          </div>  
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Arterium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}