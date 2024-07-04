import React from "react";
import { UserAuth } from "../context/auth";

const ErrorSign = () => {
  const { errWhileSign } = UserAuth();
  return (
    <div className="fixed mt-4 bottom-0 alert alert-error rounded-none">
      <p className="block max-w-fit md:text-xs">
        Error Occured --{`>`}
        {errWhileSign.message}
      </p>
    </div>
  );
};

export default ErrorSign;
