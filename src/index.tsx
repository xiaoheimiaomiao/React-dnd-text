import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App4/index";
import reportWebVitals from "./reportWebVitals";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";

// const routes = [
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "bbb/:id",
//         element: <Bbb />,
//       },
//       {
//         path: "ccc",
//         element: <Ccc />,
//       },
//     ],
//   },
// ];
// const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>
  // <RouterProvider router={router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
