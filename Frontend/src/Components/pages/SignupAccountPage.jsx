import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Shell, Field, BirthWheel, ProgressSteps } from "../AuthShell";
import { useSignup } from "../context/SignupContext";

export default function SignupAccountPage() {
  const navigate = useNavigate();
  const { form, updateField, setAccountComplete } = useSignup();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!form.email.trim()) e.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That email doesn't look right.";
    if (!form.password) e.password = "Enter a password.";
    else if (form.password.length < 8) e.password = "Use at least 8 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setAccountComplete(true);
    navigate("/signup/birth-details");
  };

  return (
    <Shell>
      <BirthWheel time="" filled={!!form.pob} />
      <h1 className="headline">Chart your beginning.</h1>
      <p className="subcopy">
        Your natal chart is fixed the moment you're born. We just need the coordinates —
        date, place, and exact time.
      </p>

      <div className="tabs" role="tablist">
        <Link to="/login" className="tab">Log in</Link>
        <Link to="/signup" className="tab tab-active">Sign up</Link>
      </div>

      <ProgressSteps step={1} />

      <form className="form" onSubmit={handleContinue} noValidate>
        <Field label="Full name" error={errors.name}>
          <User size={16} className="field-icon" />
          <input type="text" placeholder="Ada Lovelace" value={form.name} onChange={(e) => updateField("name", e.target.value)} className="input" />
        </Field>

        <Field label="Email" error={errors.email}>
          <Mail size={16} className="field-icon" />
          <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="input" />
        </Field>

        <Field label="Password" error={errors.password}>
          <Lock size={16} className="field-icon" />
          <input type={showPassword ? "text" : "password"} placeholder="At least 8 characters" value={form.password} onChange={(e) => updateField("password", e.target.value)} className="input" />
          <button type="button" className="eye-btn" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </Field>

        <button type="submit" className="submit-btn">
          Continue <ArrowRight size={16} />
        </button>
      </form>

      <p className="switch-line">
        Already have an account? <Link to="/login" className="link-btn">Log in</Link>
      </p>
    </Shell>
  );
}
