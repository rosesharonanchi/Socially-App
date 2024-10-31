import { useRef } from "react";
import "./register.css";
import axios from "../../components/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
      passwordAgain.current.reportValidity();
    } else {
      passwordAgain.current.setCustomValidity("");

      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        navigate("/login"); // Navigate only after successful registration
      } catch (err) {
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socially</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socially
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              required
              ref={username}
            />
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              minLength="6"
              className="loginInput"
              required
              ref={password}
            />
            <input
              type="password"
              minLength="6"
              placeholder="Password Again"
              className="loginInput"
              required
              ref={passwordAgain}
            />
            <button
              className="loginButton"
              type="submit"
            >
              Sign Up
            </button>
            <button 
              className="loginRegisterButton" 
              type="button"  
              onClick={() => navigate("/login")}
            >
              Login into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
