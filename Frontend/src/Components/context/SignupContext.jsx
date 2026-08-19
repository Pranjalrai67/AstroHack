import React, { createContext, useContext, useState } from "react";

// Holds signup form data so it survives navigation between
// /signup (step 1) and /signup/birth-details (step 2).
// For a real app, swap this for whatever you already use
// (Redux, Zustand, React Query mutation state, etc).

const SignupContext = createContext(null);

const initialForm = {
  name: "",
  email: "",
  password: "",
  dob: "",
  tob: "",
  pob: "",
};

export function SignupProvider({ children }) {
  const [form, setForm] = useState(initialForm);
  const [accountComplete, setAccountComplete] = useState(false);

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const reset = () => {
    setForm(initialForm);
    setAccountComplete(false);
  };

  return (
    <SignupContext.Provider value={{ form, updateField, accountComplete, setAccountComplete, reset }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup must be used inside <SignupProvider>");
  return ctx;
}
