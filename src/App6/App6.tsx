import React, { useEffect, useRef } from "react";
import "./App6.css";
// import Test, { CalendarRef } from "./Calendar";
// import Calendar from "./Calendar";
import { Calendar } from "antd";
export default function App() {
  //   const time = new Date(2023, 10, 28);
  //   console.log("time: ", time.toLocaleString());

  // const calenderRef = useRef<CalendarRef>(null);

  // useEffect(() => {
  //   console.log(calenderRef.current?.getDate().toLocaleDateString);

  //   setTimeout(() => {
  //     calenderRef.current?.setDate(new Date(2024, 1, 2));
  //   }, 3000);
  // }, []);
  // const { token } = theme.useToken();
  // const wrapperStyle: React.CSSProperties = {
  //   width: 300,
  //   border: `1px solid ${token.colorBorderSecondary}`,
  //   borderRadius: token.borderRadiusLG,
  // };
  return (
    <div>
      <Calendar
      style={{}}
        onChange={() => {
          console.log("ss");
        }}
      ></Calendar>
    </div>
  );
}
