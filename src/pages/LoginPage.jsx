import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // if token is already in local storage
  //   const token = sessionStorage.getItem("Login token");
  //   console.log("token:-", token);
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://work-asana-backend.vercel.app/api/users/login",
        user
      );
      if (response.data.token) {
        localStorage.setItem("Login token", response.data.token);
        setMessage("Login successful");

        setTimeout(() => {
          navigate("/dashboard");
          setMessage("");
        }, 1500);
        setPassword("");
        setEmail("");
      } else {
        setMessage("Something went wrong please login again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Login failed");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {message && (
                <div
                  className={`alert ${
                    message === "Login successful"
                      ? "alert-success"
                      : "alert-danger"
                  } text-center`}
                  role="alert"
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <p className="mb-0">Not registered yet? </p>
                <Link
                  className="text-decoration-none fw-medium text-primary ms-1"
                  to="/signUp"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
