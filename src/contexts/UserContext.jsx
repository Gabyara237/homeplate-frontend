import { createContext, useState, useEffect } from 'react';
import * as userService from '../services/userService';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        
        const payload = JSON.parse(atob(token.split('.')[1])).payload;
        const fullUser = await userService.getById(payload._id); 
        setUser(fullUser);
      } catch (err) {
        console.error("Error fetching user on load:", err);
      }
    };

    fetchUser();
  }, []);

  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
