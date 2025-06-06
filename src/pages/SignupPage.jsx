import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  const handleSingup = async (e) => {
    e.preventDefault();
    // console.log("Email:", email, "Password:", password);

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
      // console.log("response.data:- ", response.data);

      if (response.data) {
        setMessage("Register successful");
        setName("");
        setPassword("");
        setEmail("");
        setAlert(true);

        setTimeout(() => {
          setMessage("");
          setAlert(false);
          navigate("/");
        }, 1500);
      } else {
        setMessage("Something went wrong please Register again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Registeration failed: " + error.message);
      setAlert(true);
      setTimeout(() => {
        setMessage("");
        setAlert(false);
        setName("");
        setPassword("");
        setEmail("");
      }, 1500);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-2 text-primary">Workasana</h2>
              <h3 className="text-center mb-4">Sign Up</h3>
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
              <form onSubmit={handleSingup}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    placeholder="Enter your name"
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
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
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
                    placeholder="Enter password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="fw-medium btn btn-primary w-100"
                >
                  {alert === false ? "Sign Up" : "Loading..."}
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
