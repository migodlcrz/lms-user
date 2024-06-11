import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryBadge from "../components/CategoryBadge";
import { useNavigate } from "react-router-dom";
import { Course } from "../interfaces/CourseInterface";
import Guy from "../images/guy.png";

const StorePage = () => {
  const port = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(0);
  const [hoveredCourseIndex, setHoveredCourseIndex] = useState<number | null>(
    null
  );

  const fetchCourses = async () => {
    const response = await fetch(`${port}/api/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    setCourses(json);
  };

  const handleBadgeClick = (index: number) => {
    setSelectedBadge(index);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-poly-bg bg-center bg-cover">
      <div className="flex flex-col w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-col space-y-2 items-center justify-center w-full py-3 h-1/3 bg-harvest_gold"
        >
          {courses ? (
            <>
              <h2 className="text-black font-bold">Browse 1000+ of Courses</h2>
              <input type="text" className="input w-[50%]" />
              <div className="flex flex-row space-x-3 w-3/4 py-3 justify-center">
                <CategoryBadge
                  category="All"
                  isSelected={selectedBadge === 0}
                  onClick={() => handleBadgeClick(0)}
                />
                <CategoryBadge
                  category="Programming"
                  isSelected={selectedBadge === 1}
                  onClick={() => handleBadgeClick(1)}
                />
                <CategoryBadge
                  category="Artificial Intelligence"
                  isSelected={selectedBadge === 2}
                  onClick={() => handleBadgeClick(2)}
                />
                <CategoryBadge
                  category="Analytics"
                  isSelected={selectedBadge === 3}
                  onClick={() => handleBadgeClick(3)}
                />
              </div>
            </>
          ) : (
            <div className="skeleton w-1/4 h-full"></div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-row w-full h-full overflow-hidden"
        >
          {courses ? (
            <>
              <div
                className="flex flex-wrap h-full bg-poly-bg bg-cover w-full overflow-y-scroll p-3 content-start"
                style={{
                  scrollbarColor: "#030303 #ebf2ed",
                  scrollbarWidth: "thin",
                }}
              >
                {courses &&
                  courses.map(
                    (course, index) =>
                      course.isPublished && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              type: "spring",
                              duration: 1,
                              bounce: 0.4,
                              delay: 0.2 * index,
                            },
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => {
                            setHoveredCourseIndex(index);
                          }}
                          onMouseLeave={() => {
                            setHoveredCourseIndex(null);
                          }}
                          onClick={() => {
                            navigate(`/store/course/${course._id}`);
                          }}
                          className="w-72 h-72 rounded-xl shadow-xl m-1 bg-cover bg-center relative cursor-pointer"
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 20%, transparent 50%), url(${Guy})`,
                          }}
                        >
                          <div className="flex flex-col justify-between items-center bg-transparent h-full w-full p-3">
                            <div className="flex flex-row items-center justify-between w-full">
                              <div
                                className={`badge 
                   ${
                     course.tier === "Free" &&
                     "bg-black text-white font-semibold"
                   } 
                   ${
                     course.tier === "Basic" &&
                     "bg-gradient-to-r from-harvest_gold-400 via-harvest_gold-600 to-harvest_gold-800 text-black font-semibold"
                   }
                   ${
                     course.tier === "Premium" &&
                     "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 shadow-lg text-black font-semibold"
                   }
                 `}
                              >
                                <p>{course.tier}</p>
                              </div>
                              <h2 className="text-white font-bold truncate text-xl">
                                {course.courseName}
                              </h2>
                            </div>
                          </div>
                          {hoveredCourseIndex === index && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold"
                            >
                              <p>Click to see more...</p>
                            </motion.div>
                          )}
                        </motion.div>
                      )
                  )}
              </div>
            </>
          ) : (
            <div className="skeleton w-3/4 h-full"></div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StorePage;
