import { motion } from "framer-motion";
import React from "react";

const ModulePanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 0.5,
          // bounce: 0.4,
        },
      }}
      className="flex flex-row w-full h-full p-3"
    >
      ModulePanel
    </motion.div>
  );
};

export default ModulePanel;
