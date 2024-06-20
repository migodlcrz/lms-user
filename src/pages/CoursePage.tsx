import { useEffect, useState } from "react";
import CustomCalendar from "../components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import { User } from "../interfaces/UserInterface";
import { Course } from "../interfaces/CourseInterface";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
          const response = await fetch(`${port}/api/course/${courseId}`, {
            method: "GET",
          });

          if (!response.ok) {
            const json = await response.json();
            throw new Error(json.error);
          }

          return response.json();
        })
      );

      setUserCourses(courses);
    } catch (error) {
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
      <div className="flex flex-row h-full bg-poly-bg bg-center bg-cover z-0 p-6">
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
          className="w-2/3"
        >
          <div className="flex flex-col h-full w-full pr-6 space-y-6">
            <div className="flex flex-col h-full bg-oslo_gray-50 rounded-xl shadow-md p-5 space-y-2">
              <div className="flex flex-row items-center w-full border-b-2 border-oslo_gray-300 py-2">
                <h2 className="font-bold text-harvest_gold-500 text-3xl border-r-2 border-oslo_gray-300 pr-3 mr-3">
                  Course List
                </h2>
                <p className="text-black font-semibold">
                  These are your track records for your courses!
                </p>
              </div>
              <div className="flex flex-col w-full h-full space-y-3 overflow-hidden">
                <div className="flex flex-col w-full h-1/3 pb-3 space-y-3">
                  <div className="w-full h-1/6 font-bold text-black">
                    You're almost finished on this three courses, don't stop
                    now!
                  </div>
                  <div className="flex flex-row w-full h-4/6 space-x-3">
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md bg-poly-bg-yellow rounded-xl p-3">
                      <p className="font-semibold text-white">Total Courses</p>
                      <h3 className="text-white font-bold text-5xl">
                        {userCourses && userCourses.length}
                      </h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 text-black h-full shadow-md border-2 border-dashed border-harvest_gold bg-harvest_gold-700 rounded-xl p-3">
                      <p className="font-semibold">Not Started</p>
                      <h3 className="font-bold text-5xl">0</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 text-black h-full shadow-md border-2 border-dashed border-harvest_gold bg-harvest_gold-700 rounded-xl p-3">
                      <p className="font-semibold ">In Progress</p>{" "}
                      <h3 className=" font-bold text-5xl">0</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 text-black h-full shadow-md border-2 border-dashed border-harvest_gold bg-harvest_gold-700 rounded-xl p-3">
                      <p className="font-semibold">Finished</p>{" "}
                      <h3 className="font-bold text-5xl">0</h3>
                    </div>
                  </div>
                  <div className="flex flex-col h-1/6 w-full">
                    <div className="flex items-center p-2 w-full bg-gradient-to-r from-harvest_gold-400 to-harvest_gold-600 rounded-3xl shadow-lg">
                      <input
                        onClick={() => {
                          setSwap(!swap);
                        }}
                        type="checkbox"
                        className="toggle toggle-lg"
                        checked={swap}
                      />
                    </div>
                  </div>
                </div>
                <div className="h-2/3 overflow-hidden">
                  {swap ? (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      className="flex flex-col w-full h-full overflow-y-scroll px-3"
                    >
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
                                className="flex flex-row items-center space-x-3 justify-between w-full bg-harvest_gold shadow-md rounded-xl my-1 p-3 cursor-pointer"
                              >
                                <p className="text-white font-bold">
                                  {course.courseName}
                                </p>
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
                              </motion.div>
                            );
                          })
                        : "Loading"}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      className="flex flex-wrap w-full h-full overflow-y-scroll"
                    >
                      {userCourses &&
                        userCourses.map((course, index) => {
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
                              className="flex flex-col w-64 h-64 bg-poly-bg-yellow rounded-xl m-1 p-3 cursor-pointer"
                            >
                              <p>{course.courseName}</p>
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
                            </motion.div>
                          );
                        })}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              delay: 0.2,
              duration: 1,
              bounce: 0.4,
            },
          }}
          className="flex flex-row h-full w-1/3"
        >
          <div className="h-full w-full">
            {/* Profile */}
            <div className="flex flex-col space-y-3 bg-oslo_gray-50 shadow-md h-full w-full rounded-xl p-6 items-center">
              <div className="flex flex-row space-x-3 w-full border-b-[1px] rounded-sm border-gray-300 pb-4 h-1/6">
                <div className="avatar online w-1/4">
                  <div className="w-24 h-24 rounded-full">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col w-3/4">
                  <h3 className="font-semibold text-lg text-black">
                    {user.user_.firstName} {user.user_.lastName}
                  </h3>
                  <h3 className="text-harvest_gold-700 font-semibold">
                    Novice
                  </h3>

                  <h3 className="text-black font-semibold mt-2">
                    <span className="bg-gray-400 p-1 px-2 rounded-xl text-white shadow-md">
                      Total Points: 200
                    </span>
                  </h3>
                </div>
              </div>
              <div className="h-full w-full">
                <CustomCalendar />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
