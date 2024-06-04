// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";
// import "../../colors.css";

// function Profile() {
//   const [user, setUser] = useState({ firstName: "", lastName: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/user", {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Ensure token is sent in the header
//           }
//         });
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         // navigate('/login'); // Redirect to login if there's an error fetching user details
//       }
//     };

//     fetchUserDetails();
//   }, [navigate]);

//   const handleSignOut = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       if (data.success) {
//         navigate('/login'); // Redirect to login page after successful logout
//       } else {
//         console.error('Sign out failed');
//       }
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <div className="profile">
//       <div className="profile-header">
//         <p>
//           Welcome, <span className="username">{(user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : 'Guest'}!</span>
//         </p>
//       </div>

//       <div className="settings">
//         <div className="setting-item">
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             id="firstName"
//             placeholder="Enter new first name"
//           />
//           <button>Update First Name</button>
//         </div>
//         <div className="setting-item">
//           <label htmlFor="lastName">Last Name</label>
//           <input type="text" id="lastName" placeholder="Enter new last name" />
//           <button>Update Last Name</button>
//         </div>
//       </div>

//       <div className="sign-out">
//         <button onClick={handleSignOut}>Sign Out</button>
//       </div>
//     </div>
//   );
// }

// export default Profile;

//session based
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import "../../colors.css";

function Profile() {
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          method: 'GET',
          credentials: 'include', // Include cookies with the request
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate('/login'); // Redirect to login if there's an error fetching user details
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies with the request
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        navigate('/login'); // Redirect to login page after successful logout
      } else {
        console.error('Sign out failed');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <p>
          Welcome, <span className="username">{(user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : 'Guest'}!</span>
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
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Profile;
