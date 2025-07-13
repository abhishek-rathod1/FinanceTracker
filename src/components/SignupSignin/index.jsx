import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  function signupWithEmail() {
    // alert("signup email pass");
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(cnfPassword);

    //check all conditions of inputs
    if (name != "" && email != "" && password != "" && cnfPassword != "") {
      //firebase code
      if (password == cnfPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // ...
            console.log("user>>", user);
            toast.success("User created successfully");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            toast.error(errorMessage);
          });
      } else {
        toast.error("All fields required");
      }
    } else {
      toast.error("Password and Confirm Password does not match");
    }
  }
  function signupUsingGoogle() {
    alert("signup Google");
  }

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
        <Button
          text={"Signup using Email & Password"}
          onClick={signupWithEmail}
          blue={false}
        />
        <p className="input-para">or</p>
        <Button
          text={"Signup using Google"}
          onClick={signupUsingGoogle}
          blue={true}
        />
        <p onClick={() => alert("show login page")} className="input-para acc">
          Alredy have an Account? <span className="special">Click here</span>
        </p>
      </form>
    </div>
  );
};

export default SignupSigninComponent;
