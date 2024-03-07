import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [userImg, setUserImg] = useState("");
  const userId = sessionStorage.getItem("sessionKey");
  const isAdmin = user && user.Key === "a84640d6-1c42-41aa-a53f-783edd2b4e64";
  const loggedInUserId = sessionStorage.getItem("sessionKey");

  useEffect(() => {
    console.log("Fetching user data...");
    fetch(`http://localhost:3306/user/${userId}`, {
      method: "GET",
      credentials: "include",
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User data:", data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (user && user.Img) {
      setUserImg(`http://localhost:3306${user.Img}`);
    }
  }, [user]);

  return (
    <div className="">
      <header className="App-header">
        <div>
          {user ? (
            <div>
              <div>
                <img src={userImg} alt="Profile" />
                <h3>{user.username}</h3>
                <Link to="/updateUser">
                  <button>Edit Profile</button>
                </Link>
              </div>
              {isAdmin && <div></div>}
              {!isAdmin && <div></div>}
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default Profile;
