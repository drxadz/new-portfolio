import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/works", element: <Works /> },
  { path: "/works/:id", element: <WorkDetail /> },
  { 
    path: "/notes", 
    element: <Notes />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: "/notes/:slug", 
    element: <NoteDetail />,
    errorElement: <ErrorBoundary />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);