import React from "react";
import { UserAuth } from "../context/auth";

const ErrorLog = () => {
  const { errWhileLog } = UserAuth();
  return (
    <div className="fixed mt-4 bottom-0 alert alert-error rounded-none">
      <p className="block max-w-fit md:text-xs">
        Error Occured --{`>`}
        {errWhileLog.message}
      </p>
    </div>
  );
};

export default ErrorLog;
