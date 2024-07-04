import React, { useState } from "react";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(false);
  const [err, setErr] = useState("");
  const { sendPasswordReset, passreseterr } = UserAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email === "") {
      setErr("Please provide email");
    } else {
      try {
        sendPasswordReset(email);
        setMsg(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="overflow-y-hidden">
      <div className="hero min-h-[90vh]">
        <div className="hero-content flex-col w-[80%] md:w-[95%] pb-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 md:text-3xl">
              Password Reset
            </h1>
          </div>
          <div className="card flex-shrink-0 w-[50%] md:w-[100%] shadow-2xl bg-base-100">
            <div className="card-body md:px-6 md:py-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn btn-primary w-fit mx-auto"
                  onClick={handleSubmit}
                >
                  Send Password Reset Mail
                </button>
              </div>

              <Link
                className="block underline text-lg mt-2 text-center"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      {msg && (
        <div className="fixed mt-4 bottom-0 z-20 rounded-none alert alert-success">
          Password reset link is sent to your mail. Please use it to reset your
          password. Once done, Login Again.
        </div>
      )}
      {err && (
        <div className="fixed mt-4 bottom-0 rounded-none alert alert-error">
          {err}
        </div>
      )}
      {passreseterr && (
        <div className="fixed z-10 mt-4 bottom-0 rounded-none alert alert-error">
          {passreseterr.message}
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
