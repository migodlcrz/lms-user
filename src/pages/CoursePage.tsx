import { useEffect, useState } from "react";
import CustomCalendar from "../components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import { User } from "../interfaces/UserInterface";
import { Course } from "../interfaces/CourseInterface";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CalendarPanel from "../components/CalendarPanel";
import { FaBookOpen, FaHourglassStart, FaPlay } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";

const DashboardPage = () => {
  const { user } = useAuthContext();
  const port = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [swap, setSwap] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userCourses, setUserCourses] = useState<Course[] | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${port}/api/user/${user.user_._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        return toast.error(json.error);
      }

      setUserProfile(json);
    } catch (error) {
      toast.error("Failed to fetch user profile.");
    }
  };

  const fetchCourses = async (courseIds: any[]) => {
    console.log(courseIds);
    try {
      const courses = await Promise.all(
        courseIds.map(async (courseId) => {
          const response = await fetch(`${port}/api/course/${courseId}`);

          if (!response.ok) {
            const json = await response.json();
            throw new Error(json.error);
          }

          return response.json();
        })
      );

      setUserCourses(courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to fetch courses.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.courses) {
      fetchCourses(userProfile.courses);
    }
  }, [userProfile]);

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-row h-full bg-raisin_black-300 z-0 p-6 space-x-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              duration: 1,
              bounce: 0.4,
            },
          }}
          className="w-3/4"
        >
          <div className="flex flex-col h-full w-full space-y-6">
            <div className="flex flex-col h-full space-y-2">
              <div className="flex flex-row w-full h-full space-x-2 overflow-hidden">
                <div className="flex flex-col w-1/4 h-full space-y-3">
                  <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                    <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                      <div className="flex items-center justify-center text-harvest_gold-800 text-xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                        <FaBookOpen />
                      </div>
                      <span>Courses</span>
                    </p>
                    <h3 className="text-white font-bold text-5xl">
                      {userCourses && userCourses.length}
                    </h3>
                    <button className="text-harvest_gold font-semibold text-start">
                      Total published and unpublished courses.
                    </button>
                  </div>
                  <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                    <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                      <div className="flex items-center justify-center text-harvest_gold-800 text-xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                        <FaHourglassStart />
                      </div>
                      <span>Not Started</span>
                    </p>
                    <h3 className="text-white font-bold text-5xl">2</h3>
                    <button className="text-harvest_gold font-semibold text-start">
                      Courses you haven't started
                    </button>
                  </div>
                  <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                    <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                      <div className="flex items-center justify-center text-harvest_gold-800 text-xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                        <FaPlay />
                      </div>
                      <span>In Progress</span>
                    </p>
                    <h3 className="text-white font-bold text-5xl">3</h3>
                    <button className="text-harvest_gold font-semibold text-start">
                      Courses you are currently in progress
                    </button>
                  </div>
                  <div className="flex flex-col items-start justify-between w-full h-1/4 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                    <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                      <div className="flex items-center justify-center text-harvest_gold-800 text-xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                        <IoMdDoneAll />
                      </div>
                      <span>Finished</span>
                    </p>
                    <h3 className="text-white font-bold text-5xl">10</h3>
                    <button className="text-harvest_gold font-semibold text-start">
                      Courses you have finished{" "}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-3/4 h-full bg-gradient-to-tl space-y-3 from-[#201c2100] to-raisin_black-500 rounded-md p-5">
                  <div className="flex flex-row justify-between w-full">
                    <h2 className="font-bold text-white text-3xl border-r-[0.5px] border-raisin_black-600 pr-3 mr-3">
                      Course List
                    </h2>
                    <span className="flex flex-row space-x-2">
                      <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                        <div className="flex items-center justify-center text-harvest_gold-800 text-sm w-7 h-7 bg-harvest_gold-400 rounded-full">
                          F
                        </div>
                        <div>Free</div>
                      </p>
                      <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                        <div className="flex items-center justify-center text-harvest_gold-800 text-sm w-7 h-7 bg-harvest_gold-400 rounded-full">
                          B
                        </div>
                        <div>Basic</div>
                      </p>
                      <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                        <div className="flex items-center justify-center text-harvest_gold-800 text-sm w-7 h-7 bg-harvest_gold-400 rounded-full">
                          P
                        </div>
                        <div>Premium</div>
                      </p>
                    </span>
                  </div>
                  <div className="flex flex-col w-full h-full overflow-hidden overflow-y-scroll px-3 space-y-2">
                    <div className="flex flex-row justify-between w-full px-2">
                      <h3 className="text-white font-bold text-xl">Title</h3>
                      <h3 className="text-white font-bold text-xl">Tier</h3>
                    </div>
                    {userCourses
                      ? userCourses.map((course, index) => {
                          return (
                            <motion.div
                              whileTap={{ scale: 0.9 }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = "0.7")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity = "1")
                              }
                              onClick={() => {
                                navigate(`/courses/${course._id}`);
                              }}
                              className="flex flex-row items-center space-x-3 justify-between w-full border-b-[0.5px] border-raisin_black-600 p-3 cursor-pointer"
                            >
                              <p className="text-white font-bold">
                                {course.courseName}
                              </p>
                              <div>
                                {course.tier === "Free" && (
                                  <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                                    <div className="flex items-center justify-center text-harvest_gold-800 text-sm w-7 h-7 bg-harvest_gold-400 rounded-full">
                                      F
                                    </div>
                                  </p>
                                )}
                                {course.tier === "Basic" && (
                                  <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                                    <div className="flex items-center justify-center text-harvest_gold-800 text-sm w-7 h-7 bg-harvest_gold-400 rounded-full">
                                      B
                                    </div>
                                  </p>
                                )}
                                {course.tier === "Premium" && (
                                  <p className="flex flex-row items-center text-sm font-semibold text-white space-x-2">
                                    <div className="flex items-center justify-center text-harvest_gold-800 text-sm w-7 h-7 bg-harvest_gold-400 rounded-full">
                                      P
                                    </div>
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })
                      : "Loading"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <CalendarPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
