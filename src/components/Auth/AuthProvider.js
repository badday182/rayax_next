"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "@/lib/supabaseClient";
import {
  fetchCustomOptions,
  clearCustomOptions,
} from "../redux/slices/customOptionsSliceReducer";
import {
  fetchProfile,
  clearProfile,
} from "../redux/slices/profileSliceReducer";
import {
  fetchNormTemplates,
  clearNormTemplates,
} from "../redux/slices/normTemplatesSliceReducer";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchCustomOptions(user.id));
      dispatch(fetchProfile(user.id));
      dispatch(fetchNormTemplates(user.id));
    } else {
      dispatch(clearCustomOptions());
      dispatch(clearProfile());
      dispatch(clearNormTemplates());
    }
  }, [user, dispatch]);

  const signUp = (email, password) => supabase.auth.signUp({ email, password });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
