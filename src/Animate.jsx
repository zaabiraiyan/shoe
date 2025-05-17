import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./animation.css"; // Make sure this file exists

const AnimationScene = () => {
  const [phase, setPhase] = useState("start");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("toppings"), 3000); // After 3 seconds
    const timer2 = setTimeout(() => setPhase("final"), 6000);    // After 6 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="animation-container">
      <AnimatePresence mode="wait">
        {phase === "start" && (
          <motion.div
            key="start"
            className="scene dark-yellow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
              Getting Started...
            </motion.h1>
          </motion.div>
        )}

        {phase === "toppings" && (
          <motion.div
            key="toppings"
            className="scene black-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              🧀 Add Your Toppings
            </motion.h1>
          </motion.div>
        )}

        {phase === "final" && (
          <motion.div
            key="final"
            className="scene fully-cooked"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 60 }}
            >
              🍕 Fully Cooked & Ready to Serve!
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimationScene;
