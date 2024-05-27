import { motion } from "framer-motion";
import React from "react";

interface CategoryBadgeProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center px-3 h-10 rounded-3xl font-semibold shadow-md transition-colors ${
        isSelected
          ? "bg-harvest_gold text-white"
          : "bg-white text-black hover:bg-gray-500"
      }`}
      onClick={onClick}
    >
      {category}
    </motion.button>
  );
};

export default CategoryBadge;
