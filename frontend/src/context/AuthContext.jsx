import React, { createContext, useState, useEffect } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const [user, setUser] = useState(null); // logged-in user
  const [loading, setLoading] = useState(true);

  // Example: fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${"http://localhost:8000/api/v1/auth/aboutuser"}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [serverUrl]);

  let value = {
    serverUrl,
    user,
    setUser,
    loading,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
