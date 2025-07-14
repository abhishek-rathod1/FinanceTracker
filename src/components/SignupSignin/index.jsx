import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  function signupWithEmail() {
    // alert("signup email pass");
    setLoading(true);
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
            // clear values after signin
            setCnfPassword("");
            setName("");
            setEmail("");
            setPassword("");
            // create doc
            createDoc(user);
            navigate("/dashboard");
            setLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password does not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields required");
      setLoading(false);
    }
  }
  function signupUsingGoogle() {
    setLoading(true);
    // alert("signup Google");

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        createDoc(user);
        toast.success("User logged in!!");
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        toast.error(errorMessage);
        setLoading(false);
      });
  }

  function loginWithEmail() {
    if (email != "" && password != "") {
      setLoading(true);
      console.log(email);
      console.log(password);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success("User signed in!!");
          console.log(user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are required!!");
    }
  }
  async function createDoc(user) {
    setLoading(true);
    // make sure that the doc whith the uid doesn't exist
    // create doc.

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("doc created!!");
        setLoading(false);
      } catch (e) {
        toast.error("e.message");
        setLoading(false)
      }
    } else {
      // toast.error("Doc alredy exists!!");
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <>
          {/* login form */}
          <div className="signup-wrapper">
            <h2 className="title">
              Log in to <span className="special">Finance Tracker</span>
            </h2>
            <form>
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

              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login using Email & Password"}
                onClick={loginWithEmail}
                blue={false}
              />
              <p className="input-para">or</p>
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login using Google"}
                onClick={signupUsingGoogle}
                blue={true}
              />
              <p onClick={() => setLoginForm(false)} className="input-para acc">
                Dont have an Account?{" "}
                <span className="special">Click here</span>
              </p>
            </form>
          </div>
        </>
      ) : (
        // signup form
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
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email & Password"}
              onClick={signupWithEmail}
              blue={false}
            />
            <p className="input-para">or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Google"}
              onClick={signupUsingGoogle}
              blue={true}
            />
            <p onClick={() => setLoginForm(true)} className="input-para acc">
              Alredy have an Account?{" "}
              <span className="special">Click here</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSigninComponent;
