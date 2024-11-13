import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const CalendarBar = () => {
  const [value, onChange] = useState(new Date());

  const renderTileContent = ({ date, view }) => {
    if (view === "month" && date.getDate() === 15) {
      return <span style={{ color: "red" }}>•</span>; // Add a red dot on the 15th
    }
  };

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        className="custom-calendar " // Add a custom CSS class
        tileClassName={({ date }) =>
          date.getDay() === 0 ? "sunday" : "tuesday"
        }
      />
    </>
  );
};
