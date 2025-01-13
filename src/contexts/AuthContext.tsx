// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  userRoles: string[];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userRoles: [], loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/auth/user-info`, {
            headers: { Authorization: `Bearer ${idToken}` }
          });
          setUserRoles(response.data.roles);
        } catch (error) {
          console.error('Error fetching user roles:', error);
          setUserRoles([]);
        }
      } else {
        setUserRoles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRoles, loading }}>
      {children}
    </AuthContext.Provider>
  );
};