import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";
import ErrorLog from "./ErrorLog";
import { FaInfoCircle } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { emailLogIn, errWhileLog } = UserAuth();
  const [verificationWarning, setVerificationWarning] = useState(false);
  const modalRef = useRef(null);

  const getData = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailLogIn(data.email, data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setVerificationWarning(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative overflow-y-hidden min-h-[90vh] flex mt-6 place-content-center">
      <form>
        <div className="hero">
          <div className="hero-content flex-col md:w-screen md:px-4">
            <div className="w-[50%] md:w-[90%] text-center">
              <h1 className="text-5xl font-bold md:text-3xl">Log In</h1>
              <p className="py-6 md:text-sm">
                Collaborative platform to store, manage, and share documents
                with friends in dedicated rooms. 📖💫
              </p>
            </div>
            <div className="card w-[30rem] shadow-2xl bg-base-100 md:w-[95%]">
              <div className="card-body md:py-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={getData}
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={getData}
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control mt-6">
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Log In
                  </button>
                  <div>
                    <Link
                      className="block underline mt-2 text-xs text-right"
                      to="/passwordreset"
                    >
                      Forgot Password
                    </Link>
                  </div>
                  <Link
                    className="underline mt-4 text-xs text-center"
                    to="/signup"
                  >
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {errWhileLog && <ErrorLog />}
      {!verificationWarning && (
        <button
          onClick={() => setVerificationWarning(true)}
          className="absolute w-fit rounded-md right-10"
        >
          <FaInfoCircle className="text-2xl" />
        </button>
      )}
      {verificationWarning && (
        <div
          ref={modalRef}
          onClick={() => setVerificationWarning(false)}
          className="absolute bg-[#ffcc00a5] p-6 rounded-lg right-10 w-[20%] md:bg-[#ffda45] md:w-[70%]"
        >
          <div className="text-justify">
            <strong>Note:</strong> If your are unable to login, make sure you
            have verified your account. Verification link was sent to your email
            when you created an account.
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
