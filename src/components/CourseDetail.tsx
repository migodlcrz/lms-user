import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Course } from "../interfaces/CourseInterface";
import image from "../images/guy.png";

const CourseDetail = () => {
  const port = process.env.REACT_APP_URL;
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<Course | null>(null);

  const [page, setPage] = useState("Details");

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
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  // if (!course) {
  //   return <div>Loading</div>;
  // }

  return (
    <div className="w-screen h-screen bg-poly-bg-yellow p-6 bg-center bg-cover">
      {course ? (
        <>
          {" "}
          <div className="flex flex-row w-full h-full bg-white rounded-xl p-6 space-x-6">
            <div className="flex flex-col w-1/2 h-full space-y-3">
              <h1 className="text-black">{course.courseName}</h1>
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
              </div>
              <div>{course.description}</div>
              <div className="flex flex-row space-x-2 w-full h-12 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => {
                    setPage("Details");
                  }}
                  className={`w-1/2 h-full rounded-lg transition-colors duration-200 ${
                    page === "Details" && "bg-harvest_gold"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => {
                    setPage("Modules");
                  }}
                  className={`w-1/2 h-full rounded-lg transition-colors duration-200 ${
                    page === "Modules" && "bg-harvest_gold"
                  }`}
                >
                  Modules
                </button>
              </div>
              <div className="w-full h-full bg-slate-100 rounded-xl">
                {page === "Details" ? <>Details</> : <>Modules</>}
              </div>
            </div>
            <div className="w-1/2 h-full">
              <img
                src={image}
                alt="course"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="skeleton w-full h-full"></div>
      )}
    </div>
  );
};

export default CourseDetail;
