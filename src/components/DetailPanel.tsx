import { motion } from "framer-motion";
import React from "react";
import { Course } from "../interfaces/CourseInterface";

interface DetailPanelProps {
  course: Course;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 0.5,
          // bounce: 0.4,
        },
      }}
      className="flex flex-col w-full h-full p-3"
    >
      <div className="w-full h-1/4">
        <h2 className="font-bold text-2xl">About Course</h2>
        <p className="text-black text-justify">{course.description}</p>
      </div>
      <div className="w-full h-1/4">
        <h2 className="font-bold text-2xl">Published By:</h2>
        <p className="text-black text-justify">{course.publisher}</p>
      </div>
      <div className="w-full h-1/4">
        <h2 className="font-bold text-2xl">Publish At:</h2>
        <p className="text-black text-justify">{course.createdAt}</p>
      </div>
    </motion.div>
  );
};

export default DetailPanel;
