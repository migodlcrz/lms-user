import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryBadge from "../components/CategoryBadge";
import { useNavigate } from "react-router-dom";
import { Course } from "../interfaces/CourseInterface";

const StorePage = () => {
  const port = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

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
    <div className="flex flex-col h-screen w-full bg-poly-bg-yellow">
      {/* <div className="h-20 w-full bg-poly-bg z-50 shadow-lg"></div> */}
      <div className="flex flex-col w-full h-full p-6 space-y-6">
        <div className="flex flex-row space-x-6 w-full py-3">
          {courses ? (
            <>
              <div className="w-1/4 h-full bg-white rounded-xl p-3">
                Profile of user
              </div>
            </>
          ) : (
            <div className="skeleton w-1/4 h-full"></div>
          )}
          <div className="flex flex-row space-x-3 w-3/4 py-3">
            <CategoryBadge
              category="Programming"
              isSelected={selectedBadge === 0}
              onClick={() => handleBadgeClick(0)}
            />
            <CategoryBadge
              category="Programming"
              isSelected={selectedBadge === 1}
              onClick={() => handleBadgeClick(1)}
            />
            <CategoryBadge
              category="Programming"
              isSelected={selectedBadge === 2}
              onClick={() => handleBadgeClick(2)}
            />
          </div>
        </div>
        <div className="flex flex-row w-full h-full space-x-6 overflow-hidden">
          <div className="flex h-full w-1/4">
            {courses ? (
              <>
                <div className="flex flex-row w-full h-full bg-white rounded-xl shadow-lg p-5">
                  <div className="flex flex-col w-full h-1/6 border-b border-gray-400">
                    <h2 className="text-black font-bold text-3xl text-center">
                      Tier
                    </h2>
                    <div className="flex flex-row w-full h-full items-center justify-around">
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="radio"
                          name="tier"
                          value="All"
                          // checked={selectedOption === "Basic"}
                          // onChange={handleOptionChange}
                          className="radio checked:bg-harvest_gold"
                        />
                        <label className="text-black">All</label>
                      </div>
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="radio"
                          name="tier"
                          value="Basic"
                          // checked={selectedOption === "Basic"}
                          // onChange={handleOptionChange}
                          className="radio checked:bg-harvest_gold"
                        />
                        <label className="text-black">Free</label>
                      </div>
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="radio"
                          name="tier"
                          value="Basic"
                          // checked={selectedOption === "Basic"}
                          // onChange={handleOptionChange}
                          className="radio checked:bg-harvest_gold"
                        />
                        <label className="text-black">Basic</label>
                      </div>
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="radio"
                          name="tier"
                          value="Basic"
                          // checked={selectedOption === "Basic"}
                          // onChange={handleOptionChange}
                          className="radio checked:bg-harvest_gold"
                        />
                        <label className="text-black">Premium</label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="skeleton w-full h-full" />
            )}
          </div>
          {courses ? (
            <>
              {" "}
              <div
                className="flex flex-wrap h-full bg-white rounded-xl w-3/4 overflow-y-scroll p-3 content-start"
                style={{
                  scrollbarColor: "#2f2100 #eca400",
                  scrollbarWidth: "thin",
                }}
              >
                {courses &&
                  courses.map(
                    (course, index) =>
                      course.isPublished && (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                          onClick={() => {
                            navigate(`/store/course/${course._id}`);
                          }}
                          className="w-64 h-64 rounded-xl bg-poly-bg-yellow shadow-xl m-1 bg-opacity-50"
                        >
                          <div className="flex flex-col justify-between items-center bg-transparent h-full w-full p-2">
                            <div className="flex flex-row space-x-1 w-full">
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
                        "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 shadow-lg text-black font-semibold text-black"
                      }
                      `}
                              >
                                <p>{course.tier}</p>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between w-full items-end">
                              <h2 className="text-white font-bold truncate text-xl">
                                {course.courseName}
                              </h2>
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
              </div>
            </>
          ) : (
            <div className="skeleton w-3/4 h-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
