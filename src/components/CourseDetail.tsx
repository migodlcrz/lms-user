import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Course } from "../interfaces/CourseInterface";
import image from "../images/guy.png";
import DetailPanel from "./DetailPanel";
import ModulePanel from "./ModulePanel";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

const CourseDetail = () => {
  const port = process.env.REACT_APP_URL;
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  // console.log("COURSE ID: ", courseId);
  // console.log("COURSE USER: ", user.user_._id);

  const [course, setCourse] = useState<Course | null>(null);
  const [page, setPage] = useState("Details");
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  const fetchCourse = async () => {
    const response = await fetch(`${port}/api/course/${courseId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }
    console.log(json);
    setCourse(json);
    isUserEnrolled();
  };

  const isUserEnrolled = async () => {
    const response = await fetch(
      `${port}/api/user/checkEnrollStatus/${user.user_._id}/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    setIsEnrolled(json.status);
  };

  const enrollUser = async () => {
    const response = await fetch(
      `${port}/api/user/enroll/${user.user_._id}/${courseId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    toast.success(json.message);
    navigate("/dashboard");
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      <div className="w-screen h-screen bg-poly-bg-yellow p-6 bg-center bg-cover">
        {course ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="flex flex-row w-full h-full bg-white rounded-xl p-6 space-x-6"
            >
              <div className="flex flex-col w-1/2 h-full space-y-3">
                <div className="flex w-full justify-start">
                  <button
                    onClick={() => {
                      navigate("/store");
                    }}
                    className="text-black hover:text-harvest_gold transition-colors text-3xl"
                  >
                    <IoArrowBack />
                  </button>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h1 className="text-black">{course.courseName}</h1>
                  {isEnrolled ? (
                    <div className="flex flex-col">
                      <div className="text-black text-sm">
                        You are already enrolled in this course
                      </div>
                      <button
                        onClick={() => {
                          navigate("/courses");
                        }}
                        className="btn bg-harvest_gold rounded-xl hover:bg-harvest_gold-600 hover:border:bg_harvest_gold-600"
                      >
                        <h2 className="test-black text-2xl font-bold">
                          Visit Course
                        </h2>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        enrollUser();
                      }}
                      className="btn bg-harvest_gold rounded-xl hover:bg-harvest_gold-600 hover:border:bg_harvest_gold-600"
                    >
                      <h2 className="test-black text-2xl font-bold">
                        Enroll Now
                      </h2>
                    </button>
                  )}
                </div>
                <div className="flex flex-row w-full items-center space-x-2">
                  <div className="rating">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                  </div>
                  <p className="text-harvest_gold">Rating: 3.5</p>
                  <div
                    className={`badge font-bold 
                  ${course.tier === "Free" && "bg-black text-white"} 
                  ${
                    course.tier === "Basic" &&
                    "bg-gradient-to-r from-harvest_gold-400 via-harvest_gold-600 to-harvest_gold-800 text-black"
                  }
                  ${
                    course.tier === "Premium" &&
                    "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 shadow-lg text-black"
                  }`}
                  >
                    {course.tier}
                  </div>
                </div>
                <div className="flex flex-row space-x-2 w-full h-12 bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => {
                      setPage("Details");
                    }}
                    className={`w-1/2 h-full rounded-lg transition-colors duration-200 ${
                      page === "Details" && "bg-harvest_gold"
                    }`}
                  >
                    <p className="text-black font-semibold">Details</p>
                  </button>
                  <button
                    onClick={() => {
                      setPage("Modules");
                    }}
                    className={`w-1/2 h-full rounded-lg transition-colors duration-200 ${
                      page === "Modules" && "bg-harvest_gold"
                    }`}
                  >
                    <p className="text-black font-semibold">Modules</p>
                  </button>
                </div>
                <div className="w-full h-full bg-slate-100 rounded-xl">
                  {page === "Details" ? (
                    <DetailPanel course={course} />
                  ) : (
                    <ModulePanel />
                  )}
                </div>
              </div>
              <div className="w-1/2 h-full">
                <img
                  src={image}
                  alt="course"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </>
        ) : (
          <div className="skeleton w-full h-full"></div>
        )}
      </div>
    </>
  );
};

export default CourseDetail;
