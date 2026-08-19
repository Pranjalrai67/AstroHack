import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Shell, Field, BirthWheel, ProgressSteps } from "../AuthShell";
import { useSignup } from "../context/SignupContext";

export default function SignupBirthPage() {
  const navigate = useNavigate();
  const { form, updateField, accountComplete } = useSignup();
  const [errors, setErrors] = useState({});

  // Guard: if someone lands on /signup/birth-details directly
  // (refresh, bookmarked link, typed URL) without finishing step 1,
  // send them back instead of showing a half-broken form.
  if (!accountComplete) {
    return <Navigate to="/signup" replace />;
  }

  const validate = () => {
    const e = {};
    if (!form.dob) e.dob = "Enter your date of birth.";
    if (!form.tob) e.tob = "Enter your time of birth.";
    if (!form.pob.trim()) e.pob = "Enter your place of birth.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // real signup API call goes here, using the full `form` object
    navigate("/success", { state: { mode: "signup", form } });
  };

  return (
    <Shell>
      <BirthWheel time={form.tob} filled={!!form.pob} />
      <h1 className="headline">Chart your beginning.</h1>
      <p className="subcopy">Now the coordinates that make your chart yours alone.</p>

      <div className="tabs" role="tablist">
        <Link to="/login" className="tab">Log in</Link>
        <Link to="/signup" className="tab tab-active">Sign up</Link>
      </div>

      <ProgressSteps step={2} />

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="divider">
          <span>Birth details</span>
          <span className="divider-hint">for your natal chart</span>
        </div>

        <Field label="Date of birth" error={errors.dob}>
          <Calendar size={16} className="field-icon" />
          <input type="date" value={form.dob} onChange={(e) => updateField("dob", e.target.value)} className="input input-mono" />
        </Field>

        <Field label="Time of birth" error={errors.tob} hint="Check your birth certificate — even 15 minutes shifts your rising sign.">
          <Clock size={16} className="field-icon" />
          <input type="time" value={form.tob} onChange={(e) => updateField("tob", e.target.value)} className="input input-mono" />
        </Field>

        <Field label="Place of birth" error={errors.pob}>
          <MapPin size={16} className="field-icon" />
          <input type="text" placeholder="City, Country" value={form.pob} onChange={(e) => updateField("pob", e.target.value)} className="input" />
        </Field>

        <div className="btn-row">
          <button type="button" className="back-btn" onClick={() => navigate("/signup")}>Back</button>
          <button type="submit" className="submit-btn">
            Cast my chart <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </Shell>
  );
}
