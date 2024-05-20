import Lottie from "lottie-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomCalendar from "../components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";
import animation from "../images/online.json";
// import "rsuite/dist/rsuite.min.css";

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

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      {/* <div className="h-14 shadow-lg z-10">hello</div> */}
      <div className="flex flex-row h-full bg-gray-50 z-0 p-6">
        <div className="w-2/3">
          {/* Good day */}
          <div className="flex flex-col w-full h-[10%]">
            <h1 className="text-black text-4xl">
              Good Day,{" "}
              <span className="text-caribbean-600">{user.user_.firstName}</span>
            </h1>
            <h3 className="text-gray-500 font-normal text-sm">
              Here is your profile overview
            </h3>
          </div>
          {/* <div className="flex-grow bg-yellow-400 h-[90%]">hello</div> */}
          {/* Course progress */}
          <div className="flex flex-col h-[90%] w-full pr-6 space-y-6">
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
                  <div className="h-[50%] w-[50%]">
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
                  <div className="h-[50%] w-[50%]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie
                          data={data01}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                        />
                        <Pie
                          data={data02}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          fill="#82ca9d"
                          label
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-full w-1/3">
          <div className="h-full w-full">
            {/* Profile */}
            <div className="flex flex-col space-y-3 bg-white shadow-md h-full w-full rounded-xl p-6 items-center">
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
                  <h3 className="text-caribbean-700 font-semibold">Novice</h3>

                  <h3 className="text-black font-semibold mt-2">
                    <span className="bg-gray-400 p-1 px-2 rounded-xl text-white shadow-md">
                      Total Points: 200
                    </span>
                  </h3>
                </div>
              </div>
              <div className="h-4/6 w-full">
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
