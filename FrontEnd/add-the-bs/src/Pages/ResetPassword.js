import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userKey = sessionStorage.getItem("userKey");
    if (!userKey) {

      navigate("/profile");
    }
  }, [navigate]);

  const validateFormValues = () => {
    let isValid = true;
    const newErrors = {};

    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Old Password is required";
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New Password is required";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Must confirm new password";
      isValid = false;
    } else if (confirmPassword !== newPassword) {
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
        const userKey = sessionStorage.getItem("userKey");
        const response = await fetch("http://localhost:3306/user/resetPassword", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userKey: userKey,
            password: newPassword, 
          }),
        });
  
        const data = await response.json();
        console.log("returned data: ", data);
  
        if (data.success) {
          navigate("/login");
        } else {
          setErrors({
            apiError: `Reset password failed: ${data.Message}`,
          });
          console.log("Reset password failed:", data.Message);
        }
      } catch (error) {
        setErrors({
          apiError: `An error occurred during password reset: ${error}`,
        });
        console.error("An error occurred during password reset:", error);
      }
    }
  };

  return (
    <>
      <div className="App">
        <div className="App-header">
          <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="m-auto p-5 w-1/4 border-2 border-white rounded shadow-drawer bg-gray-400">
              <h1 className="text-6xl font-bold mb-6 underline">Reset Password</h1>
              {errors.apiError && (
                <p className="text-red-500">{errors.apiError}</p>
              )}
              <div>
                <form onSubmit={handleSubmit}>
                  <div class="mb-4">
                    <label for="oldPassword" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Old Password
                    </label>
                    {errors.oldPassword && (
                      <p className="text-red-500">{errors.oldPassword}</p>
                    )}
                    <input type="password" id="oldPassword" class="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Old Password" required/>
                  </div>
                  <hr className="mb-4"/>
                  <div class="mb-2">
                    <div className="mb-4">
                      <label for="newPassword" class="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                      </label>
                      {errors.newPassword && (
                        <p className="text-red-500">{errors.newPassword}</p>
                      )}
                      <input type="password" id="newPassword" class="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required/>
                    </div>
                    <div>
                      <label for="confirmPassword" class="flex my-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                      </label>
                      {errors.confirmPassword && (
                        <p className="text-red-500">{errors.confirmPassword}</p>
                      )}
                      <input type="password" id="confirmPassword" class="pl-4 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required/>
                    </div>
                  </div>
                  <button type="submit" class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Reset Password
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

export default ResetPassword;