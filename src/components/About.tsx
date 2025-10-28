"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src='/images/hero2.png'
            alt="Our store"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">About DecorHome</h2>
          <p className="text-lg text-gray-600 mb-4">
            At DecorHome, we believe every home deserves to be a sanctuary. Our curated collection of premium interior decorations combines style, comfort, and sustainability to help you create spaces that reflect your personality.
          </p>
          <p className="text-lg text-gray-600">
            From modern sofas to elegant lamps, we're committed to quality craftsmanship and exceptional customer service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}