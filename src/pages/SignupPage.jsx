import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    const user = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://work-asana-backend.vercel.app/api/users/register",
        user
      );
      if (response.data.token) {
        localStorage.setItem("Login token", response.data.token);
        setMessage("Register successful");
        setTimeout(() => setMessage(""), 1500);
        setPassword("");
        setEmail("");
      } else {
        setMessage("Something went wrong please Register again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Registeration failed: " + error.message);
      setTimeout(() => setMessage(""), 1500);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              {message && (
                <div
                  className={`alert ${
                    message === "Register successful"
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
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                  Sign Up
                </button>
              </form>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <p className="mb-0">Already registered?</p>
                <Link
                  className="text-decoration-none fw-medium text-primary ms-1"
                  to="/"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
