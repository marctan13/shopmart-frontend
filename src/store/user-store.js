import {create} from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  fetchUser: async () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const { user } = await response.json();
        set({ user });
      } catch (error) {
        console.error(error);
        set({ user: null });
      }
    }
  },
  logout: async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to log out: ${response.statusText}`);
      }
  
      const result = await response.json();
      if (result.success) {
        localStorage.removeItem('jwt');
        set({ user: null });
      } else {
        throw new Error('Logout was not successful');
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error; // Propagate the error
    }
  },
}));

export default useUserStore;
