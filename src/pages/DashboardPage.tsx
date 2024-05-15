import React, { PureComponent } from "react";
import Sidebar from "../components/SideBar";
import { useAuthContext } from "../hooks/useAuthContext";
import Lottie from "lottie-react";
import animation from "../images/online.json";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      {/* <div className="h-14 shadow-lg z-10">hello</div> */}
      <div className="flex flex-col h-full bg-gray-50 z-0 p-6">
        <div className="flex-flex-col w-full">
          <h1 className="text-black text-4xl">
            Good Day,{" "}
            <span className="text-caribbean-600">{user.user_.name}</span>
          </h1>
          <h3 className="text-gray-500 font-normal text-sm">
            Here is your profile overview
          </h3>
        </div>
        <div className="flex flex-row h-full w-full">
          <div className="flex flex-col h-full w-2/3 py-4 pr-6 space-y-6">
            <div className="flex flex-row h-28 bg-gradient-to-l items-center shadow-md from-caribbean-500 via-caribbean-700 to-caribbean-900 rounded-xl py-3 px-7">
              <p className="text-caribbean-50 font-bold w-4/5 text-xs md:text-xl">
                You are doing great! So far you have completed 60% of your
                courses. Keep up the good job!
              </p>
              <div className="w-1/5">
                <Lottie animationData={animation} className="mb-20" />
              </div>
            </div>
            <div className="flex flex-col h-full bg-white rounded-xl shadow-md p-5 space-y-4">
              <div className="flex flex-row items-center w-full ">
                <h2 className="font-bold text-black text-3xl border-r-2 border-black pr-3 mr-3">
                  Course Progress
                </h2>
                <p>These are your track records for your courses!</p>
              </div>
              <div className="flex flex-row w-full h-full">
                <div className="flex flex-col space-y-5 w-1/5">
                  <div className="flex flex-col items-start justify-start w-full h-1/3 shadow-md p-3">
                    <p className="font-semibold text-gray-400">Courses</p>
                    <h3 className="text-black font-bold text-5xl">10</h3>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full h-1/3 shadow-md p-3">
                    <p className="font-semibold text-gray-400">Modules</p>{" "}
                    <h3 className="text-black font-bold text-5xl">12</h3>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full h-1/3 shadow-md p-3">
                    <p className="font-semibold text-gray-400">Quizzes</p>{" "}
                    <h3 className="text-black font-bold text-5xl">15</h3>
                  </div>
                </div>
                <div className="w-4/5 h-full p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      barSize={20}
                    >
                      <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar
                        dataKey="pv"
                        fill="#00c496"
                        background={{ fill: "#eee" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-1/3 py-4">
            <div className="flex flex-col bg-white shadow-md h-full w-full rounded-xl p-4">
              <div>Lagay mo profile pic nila dito sheesh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
