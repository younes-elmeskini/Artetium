"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionAnimation from "@/components/animations/SectionAnimation";
import SimpleMap from "@/components/SimpleMap";
import About from "@/components/About";

export default function AboutPage() {

  const stats = [
    { number: "1000+", label: "Articles décoratifs", icon: "🪞" },
    { number: "200+", label: "Designs uniques", icon: "🎨" },
    { number: "500+", label: "Clients satisfaits", icon: "😊" },
    { number: "24/7", label: "Support en ligne", icon: "💬" }
  ];

  const features = [
    {
      icon: "🎨",
      title: "Design unique",
      description: "Chaque article est soigneusement sélectionné pour apporter une touche d’élégance et d’originalité à votre intérieur."
    },
    {
      icon: "🪑",
      title: "Produits de qualité",
      description: "Nos meubles et accessoires sont fabriqués avec des matériaux durables et de haute qualité."
    },
    {
      icon: "📦",
      title: "Livraison rapide",
      description: "Recevez vos articles de décoration directement chez vous en quelques jours, partout au Maroc."
    },
    {
      icon: "💳",
      title: "Paiement sécurisé",
      description: "Payez facilement et en toute sécurité grâce à nos méthodes de paiement fiables."
    },
    {
      icon: "🤝",
      title: "Service personnalisé",
      description: "Notre équipe vous accompagne pour choisir les pièces parfaites selon votre style et votre budget."
    },
    {
      icon: "🌿",
      title: "Décoration éco-responsable",
      description: "Nous privilégions des produits respectueux de l’environnement et fabriqués de manière éthique."
    }
  ];

  const team = [
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <SectionAnimation direction="up" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            À propos de nous
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
Votre partenaire de confiance pour la décoration intérieure au Maroc depuis 2018
          </motion.p>
        </div>
      </SectionAnimation>

      {/* Stats Section */}
      <SectionAnimation direction="up" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionAnimation>

      {/* About Content */}
      <SectionAnimation direction="up" className="py-16">
      <About />
      </SectionAnimation>

      {/* Features Section */}
      <SectionAnimation direction="up" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous offrons des services exceptionnels qui font la différence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionAnimation>
      

      {/* Team Section */}
      <SectionAnimation direction="up" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés à votre service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionAnimation>

      {/* Location Section */}
      <SectionAnimation direction="up" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre localisation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Retrouvez-nous au cœur de Casablanca
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations pratiques</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Adresse</h4>
                      <p className="text-gray-600">Boulevard Mohammed V, Casablanca 20000, Maroc</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Heures d&apos;ouverture</h4>
                      <p className="text-gray-600">Lun - Dim: 8h00 - 22h00</p>
                      <p className="text-sm text-gray-500">Service d&apos;urgence 24h/24</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Contact</h4>
                      <p className="text-gray-600">+212 708 015 107</p>
                      <p className="text-gray-600">contact@carrental.ma</p>
                    </div>
                  </div>
                </div>
        </div>
      </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SimpleMap className="w-full h-96" />
            </motion.div>
          </div>
        </div>
      </SectionAnimation>
    </div>
  );
}