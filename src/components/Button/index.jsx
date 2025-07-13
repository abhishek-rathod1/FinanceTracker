import React from "react";
import "./styles.css";
const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <div
      disabled={disabled}
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
