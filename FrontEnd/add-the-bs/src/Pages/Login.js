import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateFormValues = () => {
    let isValid = true;
    const newErrors = {};
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Email must be in a valid format";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(validateFormValues());
    if (validateFormValues()) {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          sessionStorage.setItem("sessionKey", data.key);
          sessionStorage.setItem("userId", data.userId);
          navigate("/home");
        } else {
          setErrors({
            apiError: `Login failed: ${data.Message}`,
          });
          console.log("Login failed:", data.Message);
        }
      } catch (error) {
        setErrors({
          apiError: `An error occurred during login: ${error.Message}`,
        });
        console.error("An error occurred during login:", error);
      }
    }
  };

  return (
    <>
      <div className="App">
        <div className="App-header">
          <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="m-auto p-5 w-1/4 border-4 border-gray-700 rounded shadow-drawer bg-gray-400">
              <h1 className="text-6xl font-bold mb-6 underline">Cut The BS</h1>
              <h3 className="text-3xl mb-5">Login</h3>
              {errors.apiError && (
                <p className="text-red-500">{errors.apiError}</p>
              )}
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label for="email" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                    <input type="email" id="email" className="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                  </div>
                  <div className="mb-2">
                    <label for="password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your password
                    </label>
                    {errors.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                    <input type="password" id="password" className="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                  </div>
                  <div className="mb-2">
                    <a className="flex text-sm pl-8 text-blue-600 hover:text-blue-800" href="/signup">
                      - Don't have an account?
                    </a>
                  </div>
                  <button type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
