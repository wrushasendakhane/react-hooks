import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Auth() {
  const authContext = useContext(AuthContext);
  const loginHandler = () => {
    authContext.login();
  };
  return (
    <div className="card text-center">
      <div className="card-body">
        <h2>You are not authenticated!</h2>
        <p>Please log int to continue.</p>
        <button className="btn btn-primary" onClick={loginHandler}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Auth;
