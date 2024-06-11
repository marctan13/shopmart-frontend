import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: null,
  fetchUser: async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const { user } = await response.json();
        set({ user });
      } catch (error) {
        console.error(error);
        set({ user: null });
      }
    }
  },
  login: async (email, password) => {
    try {
      console.log("Sending login request", { email, password });

      const response = await fetch("http://localhost:3000/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Ensuring headers are correctly set
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sign in request failed");
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("jwt", data.jwt); // Store JWT in localStorage
        set({ user: data.user }); // Set the user
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
      throw error; // Propagate the error
    }
  },
  logout: async () => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to log out: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        localStorage.removeItem("jwt");
        set({ user: null });
      } else {
        throw new Error("Logout was not successful");
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error; // Propagate the error
    }
  },
  //add the update firstName function endpoint
  updateFirstName: async (firstName) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:3000/user/first-name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ firstName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update first name");
      }

      const result = await response.json();

      // Check if the result.user array has at least one element
      if (result.user && result.user.length > 0) {
        set({ user: result.user[0] }); // Access the first element of the array
      } else {
        console.error("No user data found in the response:", result);
      }
    } catch (error) {
      console.error("Failed to update first name", error);
      throw error;
    }
  },
  //add the update lastName function endpoint
  updateLastName: async (lastName) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:3000/user/last-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ lastName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update first name");
      }

      const result = await response.json();
      if (result.user && result.user.length > 0) {
        set({ user: result.user[0] }); // Access the first element of the array
      } else {
        console.error("No user data found in the response:", result);
      }
    } catch (error) {
      console.error("Failed to update first name", error);
      throw error;
    }
  },
  //add the delete user endpoint
  deleteUser: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:3000/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      set({ user: null });
    } catch (error) {
      console.error("Failed to delete user", error);
      throw error;
    }
  },
}));

export default useUserStore;
