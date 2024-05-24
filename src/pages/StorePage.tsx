import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Topic {
  name: string;
  isComplete: boolean;
}

interface Quiz {
  name: string;
  isComplete: boolean;
}

interface Module {
  topics: Topic[];
  quiz: Quiz[];
}

interface Course {
  _id?: string;
  courseID: string;
  courseName: string;
  publisher?: string;
  tier: string;
  description: string;
  isPublished?: boolean;
  createdAt?: string;
  modules?: Module[];
  students?: { id: string }[];
}

const StorePage = () => {
  const port = process.env.REACT_APP_URL;
  const [courses, setCourses] = useState<Course[] | null>(null);
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

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-row h-full bg-poly-bg z-0 p-6">
        <div className="flex flex-col h-full w-full space-y-6 bg-white rounded-xl">
          <div className="h-full w-full">
            {courses &&
              courses.map((course, index) => (
                <motion.div
                  //   whileHover={{ scale: 1.1 }}
                  //   whileTap={{ scale: 0.8 }}
                  className="bg-red-400"
                >
                  <div
                    className="p-3"
                    style={{ transition: "opacity 0.3s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.5")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <div
                      className={`card w-80 bg-base-100 shadow-xl h-96 ${
                        course.isPublished ? "border-4 border-fuchsia-700" : ""
                      }`}
                    >
                      <figure>
                        <img
                          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                          alt="Shoes"
                        />
                      </figure>
                      <div className="card-body p-3">
                        <h2 className="card-title flex flex-row justify-center items-center">
                          <p
                            className="text-black w-full truncate tooltip"
                            data-tip={course.courseName}
                          >
                            {course.courseName}
                          </p>
                        </h2>
                        <p className="text-black">{course.description}</p>
                        <div className="card-actions justify-end">
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
                          "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 shadow-lgtext-black font-semibold"
                        }
                        `}
                          >
                            <p>{course.tier}</p>
                          </div>
                          <div
                            className={`badge ${
                              course.isPublished
                                ? "bg-fuchsia-700 shadow-lg"
                                : "border-gray-400"
                            }`}
                          >
                            <p
                              className={`${
                                course.isPublished
                                  ? "text-white"
                                  : "text-gray-400"
                              }`}
                            >
                              {course.isPublished
                                ? "Published"
                                : "Not Published"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
