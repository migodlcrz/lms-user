import Lottie from "lottie-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomCalendar from "../components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import animation from "../images/online.json";
import { useState } from "react";
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
  const [swap, setSwap] = useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-row h-full bg-poly-bg z-0 p-6">
        <div className="w-2/3">
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
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-col w-full h-1/3 pb-3">
                  <div className="w-full h-1/6 font-bold text-black">
                    You're almost finished on this three courses, don't stop
                    now!
                  </div>
                  <div className="flex flex-row w-full h-5/6 space-x-3">
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md bg-poly-bg-yellow rounded-xl p-3">
                      <p className="font-semibold text-white">Not Started</p>
                      <h3 className="text-white font-bold text-5xl">10</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md bg-poly-bg-yellow rounded-xl p-3">
                      <p className="font-semibold text-white">In Progress</p>{" "}
                      <h3 className="text-white font-bold text-5xl">12</h3>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/3 h-full shadow-md bg-poly-bg-yellow rounded-xl p-3">
                      <p className="font-semibold text-white">Finished</p>{" "}
                      <h3 className="text-white font-bold text-5xl">15</h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full h-2/3">
                  <div className="flex items-center px-3 h-20 w-full bg-gradient-to-r from-oslo_gray-400 to-oslo_gray-500 rounded-xl shadow-lg">
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
            </div>
          </div>
        </div>

        <div className="flex flex-row h-full w-1/3">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
