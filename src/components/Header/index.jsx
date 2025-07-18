import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/profileIcon1.svg"
const Header = () => {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logoutFnc() {
    // alert("Logout functionality not implemented yet");

    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("User Logout Successfully!");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="heading">MoneyDiary</p>

      {user && (
        <div className="profile-container">
          <img
            src={user.photoURL ? user.photoURL : userImg}
            className="profile-icon"
          />
          <p className="logout link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
