import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SignupProvider } from "./Components/context/SignupContext";
import LoginPage from "./Components/pages/LoginPage";
import SignupAccountPage from "./Components/pages/SignupAccountPage";
import SignupBirthPage from "./Components/pages/SignupBirthPage";
import SuccessPage from "./Components/pages/SuccessPage";

export default function App() {
  return (
    <SignupProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupAccountPage />} />

        <Route
          path="/signup/birth-details"
          element={<SignupBirthPage />}
        />

        <Route path="/success" element={<SuccessPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </SignupProvider>
  );
}