import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import "../../colors.css";
import useUserStore from "../../store/user-store";

function Profile() {
  const navigate = useNavigate();
  const {user, logout} = useUserStore();
  const [logoutError, setLogoutError] = useState('');

  const handleLogout = async () => {
    try {
      console.log("Trying to log out");
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
      setLogoutError('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <p>
          Welcome, <span className="username">{(user && user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : 'Guest'}!</span>
        </p>
      </div>

      <div className="settings">
        <div className="setting-item">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter new first name"
          />
          <button>Update First Name</button>
        </div>
        <div className="setting-item">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Enter new last name" />
          <button>Update Last Name</button>
        </div>
      </div>

      <div className="sign-out">
        <button onClick={handleLogout}>Sign Out</button>
        {logoutError && <p className="error-message">{logoutError}</p>}
      </div>
    </div>
  );
}

export default Profile;
