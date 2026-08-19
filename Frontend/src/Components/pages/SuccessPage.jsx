import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Shell } from "../AuthShell";
import { useSignup } from "../context/SignupContext";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reset } = useSignup();
  const state = location.state;

  // Guard: no navigation state means someone hit this URL directly.
  if (!state) return <Navigate to="/login" replace />;

  const { mode, form } = state;

  const handleBack = () => {
    reset();
    navigate(mode === "signup" ? "/signup" : "/login");
  };

  return (
    <Shell>
      <div className="success-card">
        <div className="success-icon"><Check size={22} strokeWidth={2.5} /></div>
        <h2 className="success-title">{mode === "signup" ? "Your chart is being cast" : "Welcome back"}</h2>
        <p className="success-copy">
          {mode === "signup"
            ? `We've logged ${form?.name || "your"} birth details — ${form?.dob || "date"} at ${form?.tob || "time"}, ${form?.pob || "location"}. Your natal chart will be ready shortly.`
            : "You're signed in."}
        </p>
        <button className="link-btn" onClick={handleBack}>Back to form</button>
      </div>
    </Shell>
  );
}
