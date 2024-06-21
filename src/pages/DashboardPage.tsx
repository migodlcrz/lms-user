import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import CustomCalendar from "../components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import animation from "../images/online.json";
import { User } from "../interfaces/UserInterface";
import { toast } from "react-toastify";
import CalendarPanel from "../components/CalendarPanel";
import { FaBookOpen, FaPerson } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";

// import "rsuite/dist/rsuite.min.css";

const data = [
  {
    subject: "Math",
    A: 87,
    fullMark: 100,
  },
  {
    subject: "Chinese",
    A: 50,
    fullMark: 100,
  },
  {
    subject: "English",
    A: 86,
    fullMark: 100,
  },
  {
    subject: "Geography",
    A: 99,
    fullMark: 100,
  },
  {
    subject: "Physics",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "History",
    A: 65,
    fullMark: 100,
  },
];

const DashboardPage = () => {
  const { user } = useAuthContext();
  const port = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const fetchUser = async () => {
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
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
          <div className="flex flex-col w-full h-[6%]">
            <h1 className="text-white text-4xl">
              Good Day,{" "}
              <span className="text-harvest_gold-600">
                {userProfile && userProfile.firstName}
              </span>
            </h1>
          </div>
          <div className="flex flex-col h-[94%] w-full space-y-2">
            <div className="flex flex-row h-28 items-center shadow-md bg-gradient-to-r from-raisin_black-500 to-raisin_black-400 rounded-md py-3 px-7">
              <p className="text-fuchsia-50 font-semibold w-4/5 text-xs md:text-xl">
                Learn to Fly! Explore our vast selection of courses and unlock
                your potential today!
              </p>
              <div className="w-1/5">
                <Lottie animationData={animation} className="mb-20" />
              </div>
            </div>
            <div className="flex flex-row h-full space-x-2">
              <div className="flex flex-col w-1/3 h-full space-y-2">
                <div className="flex flex-col items-start justify-between w-full h-1/3 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                    <div className="flex items-center justify-center text-harvest_gold-800 text-2xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                      <FaBookOpen />
                    </div>
                    <span>Courses</span>
                  </p>
                  <h3 className="text-white font-bold text-5xl">
                    {userProfile && userProfile.courses.length === 0 ? (
                      <div className="text-xl">No courses yet</div>
                    ) : (
                      userProfile && userProfile.courses.length
                    )}
                  </h3>
                  <button className="text-harvest_gold-500 font-semibold">
                    Check out your courses
                  </button>
                </div>
                <div className="flex flex-col items-start justify-between w-full h-1/3 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                    <div className="flex items-center justify-center text-harvest_gold-800 text-2xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                      <FaPerson />
                    </div>
                    <span>Tier</span>
                  </p>
                  <h3 className="text-white font-bold text-5xl">
                    {userProfile && userProfile.tier}
                  </h3>
                  <button className="text-harvest_gold-500 font-semibold">
                    Visit our tier list
                  </button>
                </div>
                <div className="flex flex-col items-start justify-between w-full h-1/3 shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500">
                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                    <div className="flex items-center justify-center text-harvest_gold-800 text-2xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                      <FaPerson />
                    </div>
                    <span>Store</span>
                  </p>

                  <button
                    onClick={() => {
                      navigate("/store");
                    }}
                    className="text-harvest_gold-500 font-semibold"
                  >
                    Buy more courses
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-2/3 items-center justify-center h-full bg-gradient-to-tl from-[#201c2100] to-raisin_black-500 rounded-md">
                <div className="flex flex-row justify-start items-center h-[20%] w-full  space-x-2 p-10">
                  <div className="flex items-center justify-center text-harvest_gold-800 text-2xl w-10 h-10 bg-harvest_gold-400 rounded-full">
                    <IoIosStats />
                  </div>
                  <span className="text-white font-semibold text-xl">
                    Statistics
                  </span>
                </div>

                <div className="flex justify-center items-center h-[80%] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#8d6300"
                        fill="#eca400"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
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
