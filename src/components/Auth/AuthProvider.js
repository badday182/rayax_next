"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSupabase } from "@/lib/supabaseClient";
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
    let cancelled = false;
    let subscription;

    getSupabase().then((supabase) => {
      if (cancelled) return;

      supabase.auth.getSession().then(({ data: { session } }) => {
        if (cancelled) return;
        setUser(session?.user ?? null);
        setLoading(false);
      });

      ({
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      }));
    });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
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

  const signUp = async (email, password) =>
    (await getSupabase()).auth.signUp({ email, password });

  const signIn = async (email, password) =>
    (await getSupabase()).auth.signInWithPassword({ email, password });

  const signOut = async () => (await getSupabase()).auth.signOut();

  const signInWithGoogle = async () =>
    (await getSupabase()).auth.signInWithOAuth({
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
