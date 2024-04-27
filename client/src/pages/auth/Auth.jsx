import "./auth.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaLock, FaSignInAlt, FaUser } from "react-icons/fa";
import Input from "@components/input/Input.jsx";
import Button from "@components/button/Button.jsx";
import { login, register, toggleForm } from "@app/services/authSlice.js";

function Auth() {
  const dispatch = useDispatch();
  const { isRegister, status } = useSelector((state) => state.auth);

  const INPUTS = [
    {
      type: "file",
      name: "profilePic",
      errorMessage: "Please provide png or jpg",
      display: isRegister,
    },
    {
      label: "Username",
      type: "text",
      name: "name",
      icon: <FaUser />,
      pattern: "^[A-Za-z0-9]{4,16}$",
      errorMessage: "Please enter a valid name",
      display: isRegister,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: <FaEnvelope />,
      errorMessage: "Please enter a valid email",
      display: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: <FaLock />,
      pattern:
        "^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$",
      errorMessage: "Please enter a valid password",
      display: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const credential = new FormData(event.target);
    if (isRegister) dispatch(register(credential));
    else dispatch(login(credential));
  };

  return (
    <main id="auth" className="flex">
      <div className="formContainer">
        <h1>{isRegister ? "Register" : "Admin Login"}</h1>{" "}
        <form
          method="POST"
          encType="multipart/form-data"
          className="form"
          onSubmit={handleSubmit}
          disabled={status === "loading"}
        >
          {INPUTS.map(
            (input, index) => input.display && <Input key={index} {...input} />
          )}

          <Button
            type="submit"
            label={isRegister ? "Register" : "Login"}
            icon={<FaSignInAlt />}
            className="btn-primary"
          />
        </form>
        <div className="changeForm">
          <span>
            {isRegister ? "Already have account?" : "Dont have account?"}
          </span>
          <Button
            type="button"
            label={isRegister ? "Login" : "Register"}
            onClick={() => dispatch(toggleForm())}
            disabled={status === "loading"}
          />
        </div>
      </div>
    </main>
  );
}

export default Auth;
