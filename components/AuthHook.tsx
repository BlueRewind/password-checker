// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log("CURRENT USER", currentUser);
        setUser(currentUser); // Set user state with current user details
      } catch (err) {
        setUser(null); // No user logged in
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
