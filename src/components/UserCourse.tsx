import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../interfaces/CourseInterface";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoArrowBack } from "react-icons/io5";
import { motion } from "framer-motion";
import Guy from "../images/guy.png";

const UserCourse = () => {
  const { user } = useAuthContext();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const port = process.env.REACT_APP_URL;
  const [course, setCourse] = useState<Course | null>(null);
  const [page, setPage] = useState("Modules");

  const fetchCourse = async () => {
    const response = await fetch(`${port}/api/course/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    if (!json.isPublished) {
      navigate("/courses");
      toast.error("Course not published.");
    }

    setCourse(json);
  };

  const unEnroll = async () => {
    const response = await fetch(
      `${port}/api/user/unenroll/${user.user_._id}/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      toast.error(json);
      return navigate("/courses");
    }

    toast.success(json.message);
    navigate("/courses");
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="flex flex-row space-x-6 bg-poly-bg-yellow w-screen h-screen bg-center bg-cover p-6">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="flex flex-col w-1/4 h-full rounded-xl bg-white p-3"
      >
        <button
          onClick={() => {
            navigate("/courses");
          }}
          className="text-3xl text-black hover:text-harvest_gold transition-color duration-200"
        >
          <IoArrowBack />
        </button>
        <img
          src={Guy}
          className="w-full h-96 object-cover object-center"
          alt="Pic"
        />
        <div className="text-black font-bold">
          Name: {course && course.courseName}
        </div>
        <div className="text-black font-bold">
          Description: {course && course.description}
        </div>
        <button
          onClick={() => {
            unEnroll();
          }}
          className="btn text-white font-bold bg-red-600"
        >
          Unenroll
        </button>
      </motion.div>{" "}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="flex flex-col w-3/4 h-full rounded-xl bg-white p-3"
      >
        <h1 className="text-4xl">Modules</h1>
        <div className="w-full h-full">Module 1, Module 2, Module 3</div>
      </motion.div>
    </div>
  );
};

export default UserCourse;
