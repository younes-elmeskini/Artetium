"use client";
import React, { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { topMenuItems, menuData } from "@/lib/constantes";
import { motion } from "framer-motion";

const MegaMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);

  const toggleMobileSubmenu = (menuName: string) => {
    setMobileActiveMenu(mobileActiveMenu === menuName ? null : menuName);
  };

  return (
    <motion.div
    initial={{ y: -200 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
     className="w-full bg-white shadow-md sticky top-0  ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Bouton mobile fixe */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Filter className="w-6 h-6" />
          )}
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1">
            {topMenuItems.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveMenu(item.name)
                }
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`px-4 py-4 text-gray-700 hover:text-cyan-500 font-medium flex text-sm items-center gap-1 transition-colors ${
                    activeMenu === item.name ? "text-cyan-500" : ""
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Mega Menu Dropdown Desktop */}
                {item.hasDropdown && activeMenu === item.name && (
                  <div className="absolute top-full pt-2 z-50 min-w-max">
                    <div className="bg-white shadow-2xl rounded-lg border border-gray-200 p-8">
                      <div
                        className={`grid gap-8 ${
                          menuData[item.name].columns.length > 4
                            ? "grid-cols-5"
                            : menuData[item.name].columns.length > 2
                            ? "grid-cols-3"
                            : "grid-cols-2"
                        }`}
                      >
                        {menuData[item.name].columns.map((column, idx) => (
                          <div key={idx} className="min-w-[180px]">
                            {column.title && (
                              <h3 className="font-bold text-blue-600 mb-3 text-sm">
                                {column.title}
                              </h3>
                            )}
                            <ul className="space-y-2">
                              {column.items.map((subItem, subIdx) => (
                                <li key={subIdx}>
                                  <a
                                    href="#"
                                    className="text-gray-600 hover:text-cyan-500 text-sm block py-1 transition-colors"
                                  >
                                    {subItem}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation Mobile - Full Screen Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto transform transition-all duration-500 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <div className="pt-6 pb-24 px-4">
            <ul className="space-y-2">
              {topMenuItems.map((item) => (
                <li key={item.name} className="border-b border-gray-100">
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu(item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            mobileActiveMenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Submenu Mobile */}
                      {mobileActiveMenu === item.name && (
                        <div className="bg-gray-50 px-4 py-3 space-y-4">
                          {menuData[item.name].columns.map((column, idx) => (
                            <div key={idx}>
                              {column.title && (
                                <h3 className="font-bold text-blue-600 mb-2 text-sm">
                                  {column.title}
                                </h3>
                              )}
                              <ul className="space-y-2 pl-2">
                                {column.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <a
                                      href="#"
                                      className="text-gray-600 hover:text-cyan-500 text-sm block py-1 transition-colors"
                                    >
                                      {subItem}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href="#"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
