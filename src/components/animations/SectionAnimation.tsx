"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

export default function SectionAnimation({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className = "",
}: SectionAnimationProps) {
  const getInitialAndAnimate = () => {
    switch (direction) {
      case "left":
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 }
        };
      case "right":
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 }
        };
      case "up":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 }
        };
      case "down":
        return {
          initial: { opacity: 0, y: -50 },
          animate: { opacity: 1, y: 0 }
        };
      default:
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 }
        };
    }
  };

  const { initial, animate } = getInitialAndAnimate();

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// Composant pour animer les éléments de liste (cartes, etc.)
export function StaggeredAnimation({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Composant pour animer chaque élément enfant
export function StaggeredItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
