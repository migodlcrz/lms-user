import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Utility function to get the number of days in a month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Utility function to get the first day of the month
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

interface TodoItem {
  title: string;
  date: number;
}

const CustomCalendar: React.FC = () => {
  const { user } = useAuthContext();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Create an array representing the days of the current month
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  // State for the selected date and to-do list
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [addList, setAddlist] = useState("");

  // Function to fetch and set the to-do list for the selected date
  const fetchTodoList = async (date: Date) => {
    console.log(user._id);
    try {
      const response = await fetch(
        `http://localhost:4000/api/user/todo/${user.user_._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch to-do list");
      }
      const data = await response.json();
      setTodoList(data.todos);
    } catch (error) {
      console.error("Error fetching to-do list:", error);
      setTodoList([]);
    }
  };

  const addToDo = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(addList);
    console.log(selectedDate);

    const bodyRequest = {
      title: addList,
      date: selectedDate,
    };

    console.log(bodyRequest);

    try {
      const response = await fetch(
        `http://localhost:4000/api/user/todo/add/${user.user_._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyRequest),
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log(json.message);
      }

      if (!response.ok) {
        console.log(json.error);
      }
    } catch (error) {
      console.log("ERROR");
    }
  };

  // Effect to fetch the to-do list when the selected date changes
  useEffect(() => {
    fetchTodoList(selectedDate);
  }, [selectedDate]);

  // Function to handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center h-2/3">
        <div className="bg-white rounded-xl p-4 shadow-md w-full">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-bold text-caribbean-600">
              {today.toLocaleString("default", { month: "long" })} {currentYear}
            </h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={index} />
            ))}

            {daysArray.map((day) => {
              const currentDay = new Date(currentYear, currentMonth, day);
              const isSelected =
                currentDay.toDateString() === selectedDate.toDateString();
              const hasTodo = todoList.some((todo) => todo.date === day); // Check if the current day has a to-do

              return (
                <div
                  key={day}
                  className={`flex justify-center text-center p-2 rounded-xl cursor-pointer hover:bg-gray-200 transition ${
                    day === currentDate
                      ? "shadow-lg bg-gradient-to-r from-caribbean-500 to-caribbean-600 font-bold"
                      : ""
                  } ${
                    isSelected
                      ? "bg-gradient-to-r from-caribbean-200 to-caribbean-400 shadow-inner"
                      : ""
                  }`}
                  onClick={() => {
                    handleDateClick(currentDay);
                    console.log(currentDay);
                  }}
                >
                  <div
                    className={`${hasTodo ? "border-b-2 border-red-400" : ""}`}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-1/3 w-full py-2">
        <div className="flex flex-col bg-white w-full h-full rounded-xl shadow-md p-4">
          <h3 className="flex flex-row justify-between text-lg font-bold mb-2 text-caribbean-600">
            <p>{selectedDate.toDateString()}</p>
            <button>+</button>
          </h3>
          <ul>
            {todoList.filter((todo) => todo.date === selectedDate.getDate())
              .length > 0 ? (
              todoList
                .filter((todo) => todo.date === selectedDate.getDate())
                .map((todo, index) => (
                  <li key={index} className="mb-1">
                    {todo.title}
                  </li>
                ))
            ) : (
              <p className="text-black font-normal mb-1">
                No to-dos for this date.
              </p>
            )}
          </ul>
          <form onSubmit={addToDo} className="flex flex-row w-full">
            <input
              type="text"
              placeholder="Input task"
              onChange={(e) => {
                setAddlist(e.target.value);
              }}
              className="input border-[0.5px] border-black h-6 px-2"
            />
            <button className="">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
