"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface QuestionStepProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: "forward" | "backward";
}

export function QuestionStep({
  children,
  isVisible,
  direction = "forward",
}: QuestionStepProps) {
  const variants = {
    enter: {
      x: direction === "forward" ? 300 : -300,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: direction === "forward" ? -300 : 300,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="question"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
