import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Arterium</h3>
            <p className="text-gray-400">Transformant les maisons en bijoux.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li><Link href="/catalogue" className="hover:text-white">Catalogue</Link></li>
              <li><Link href="/about" className="hover:text-white">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/auth/login" className="hover:text-white">Se connecter</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/About" className="hover:text-white">Shipping Info</Link></li>
              <li><Link href="/About" className="hover:text-white">Returns</Link></li>
            </ul>
          </div>
          <div> 
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/arterium.ma" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-blue-400" /></Link>
              <Link href="https://www.instagram.com/arterium.ma" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-pink-400" /></Link>
              <Link href="https://x.com/arterium_ma" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-blue-300" /></Link>
            </div>
          </div>  
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Arterium. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}