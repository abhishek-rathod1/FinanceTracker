import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../Input";
const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span className="special">Finance Tracker</span>
      </h2>
      <form>
        <InputComponent
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
          type={"text"}
        />
        <InputComponent
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"john@example.com"}
          type={"email"}
        />
        <InputComponent
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"John@Ey78y$%^"}
          type={"password"}
        />
        <InputComponent
          label={"Confirm Password"}
          state={cnfPassword}
          setState={setCnfPassword}
          placeholder={"John@Ey78y$%^"}
          type={"password"}
        />
      </form>
      
    </div>
  );
};

export default SignupSigninComponent;
