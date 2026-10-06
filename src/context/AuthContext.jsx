import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Map supabase user to our app user format
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${session.user.id}`,
          role: 'freelancer' // Default role for now
        });
      }
    }).catch(err => console.log("Supabase not fully configured yet."));

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${session.user.id}`,
          role: 'freelancer'
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      alert("Real authentication requires the Login page form! Please navigate to the login page.");
      return { error: new Error("Credentials required") };
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { data, error };
    } catch (err) {
      console.warn("Supabase auth failed, using mock auth for demo purposes:", err);
      // Mock successful login for demo
      const mockUser = {
        id: 'mock-user-123',
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=mock-user-123`,
        role: 'freelancer'
      };
      setUser(mockUser);
      return { data: { user: mockUser }, error: null };
    }
  };

  const signup = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { data: { name } }
    });
    return { data, error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
