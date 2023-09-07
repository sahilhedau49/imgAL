import React from "react";
import { UserAuth } from "../context/auth";

const ErrorSign = () => {
  const { errWhileSign } = UserAuth();
  return (
    <div className="absolute bottom-0 alert alert-error rounded-none">
      <p className="block max-w-fit">
        Error Occured --{`>`}
        {errWhileSign.message}
      </p>
    </div>
  );
};

export default ErrorSign;