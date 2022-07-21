import React from "react";
import cl from "./Input.module.css";

const Input = ({ isError, ...props }) => {
  return (
    <div className={isError ? cl.error : ""}>
      <input {...props} className={cl.myInput} />
    </div>
  );
};

export default Input;
