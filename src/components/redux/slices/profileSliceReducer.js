import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSupabase } from "@/lib/supabaseClient";

const initialState = {
  isPremium: false,
  status: "idle",
};

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (userId) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("profiles")
      .select("is_premium")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data?.is_premium ?? false;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.isPremium = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isPremium = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isPremium = false;
        state.status = "idle";
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
