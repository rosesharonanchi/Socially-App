import { useRef } from "react";
import { useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); // Use navigate instead of history

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  //  console.log({ email: email.current.value, password: password.current.value });
  const { user: newUser } = useContext(AuthContext);
  console.log(newUser);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socially</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socially
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
      s      />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton" type="button" onClick={() => navigate("/")}>
            {isFetching ? (<CircularProgress color="white" size="20px"/> ): ("Create a new Account")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
