import React from "react";
import CreatePage from "./pages/CreatePage";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
// import toast from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <PrivateRoute>
              <NoteDetailPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
