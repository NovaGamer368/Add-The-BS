import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFormValues = () => {
    let isValid = true;
    const newErrors = {};
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*-_])(?=.*[0-9]).{8,}$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Email must be in a valid format";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one number and one special character";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Must confirm password";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords must match";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormValues()) {
      try {
        const response = await fetch("http://localhost:3306/createUser", {
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
        console.log("returned data: ", data);

        if (data.success && data.key !== undefined) {
          sessionStorage.setItem("sessionKey", data.key);
          const loginResponse = await fetch("http://localhost:3306/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const loginData = await loginResponse.json();

          if (loginData.success) {
            sessionStorage.setItem("sessionKey", loginData.key);
            navigate("/home");
          } else {
            setErrors({
              apiError: `Login after sign-up failed: ${loginData.Message}`,
            });
            console.log("Login after sign-up failed:", loginData.Message);
          }
        } else {
          setErrors({
            apiError: `Signup failed: ${data.Message}`,
          });
          console.log("Signup failed:", data.Message);
        }
      } catch (error) {
        setErrors({
          apiError: `An error occurred during sign-up: ${error}`,
        });
        console.error("An error occurred during sign-up:", error);
      }
    }
  };

  return (
    <>
      <div className="App">
        <div className="App-header">
          <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="m-auto p-5 w-1/4 border-2 border-white rounded shadow-drawer bg-gray-400">
              <h1 className="text-6xl font-bold mb-6 underline">Add The BS</h1>
              <h3 className="text-3xl mb-5">Sign up!</h3>
              {errors.apiError && (
                <p className="text-red-500">{errors.apiError}</p>
              )}
              <div>
                <form onSubmit={handleSubmit}>
                  <div class="mb-4">
                    <label for="email" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                    <input type="email" id="email" class="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                  </div>
                  <hr className="mb-4"/>
                  <div class="mb-2">
                    <div className="mb-4">
                      <label for="password" class="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your password
                      </label>
                      {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                      )}
                      <input type="password" id="password" class="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                    </div>
                    <div>
                      <label for="password" class="flex my-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                      </label>
                      {errors.confirmPassword && (
                        <p className="text-red-500">{errors.confirmPassword}</p>
                      )}
                      <input type="password" id="confirmPassword" class="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required/>
                    </div>
                  </div>
                  <div className="mb-2">
                    <a className="flex text-sm pl-8 text-blue-600 hover:text-blue-800" href="/login">
                      -Already have an account?
                    </a>
                  </div>
                  <button type="submit" class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create account
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

export default Signup;
