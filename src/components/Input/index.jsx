import React from "react";
import "./styles.css";

const InputComponent = ({ label, state, setState, placeholder, type }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="custom-input"
      />{" "}
    </div>
  );
};

export default InputComponent;
