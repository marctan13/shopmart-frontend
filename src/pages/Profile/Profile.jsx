import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import "../../colors.css";
import useUserStore from "../../store/user-store";

function Profile() {
  const navigate = useNavigate();
  const { user, fetchUser, logout, updateFirstName, updateLastName, deleteUser } =
    useUserStore();
  const [logoutError, setLogoutError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Trying to log out");
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
      setLogoutError("Failed to log out. Please try again.");
    }
  };

  const handleUpdateFirstName = async () => {
    try {
      await updateFirstName(firstName);
      setSuccessMessage("First name updated successfully!");
      // await fetchUser(); 
    } catch (error) {
      console.error("Failed to update first name", error);
    }
  };

  const handleUpdateLastName = async () => {
    try {
      await updateLastName(lastName);
      setSuccessMessage("Last name updated successfully!");
    } catch (error) {
      console.error("Failed to update last name", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account", error);
    }
  };

  console.log("User", user)

  return (
    <div className="profile">
      <div className="profile-header">
        <p>
          Welcome,{" "}
          <span className="username">
            {user && user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : "Guest"}
            !
          </span>
        </p>
      </div>

      <div className="settings">
        <div className="setting-item">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter new first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <button onClick={handleUpdateFirstName}>Update First Name</button>
        </div>
        <div className="setting-item">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter new last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button onClick={handleUpdateLastName}>Update Last Name</button>
        </div>
        {successMessage && <p>{successMessage}</p>}
      </div>

      <div className="sign-out">
        <button onClick={handleLogout}>Sign Out</button>
        {logoutError && <p className="error-message">{logoutError}</p>}
      </div>
      <div className="setting-item">
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default Profile;
