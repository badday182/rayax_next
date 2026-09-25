import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSupabase } from "@/lib/supabaseClient";

export const fetchUserSettings = createAsyncThunk(
  "settings/fetchUserSettings",
  async (userId, { rejectWithValue }) => {
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase
        .from("user_settings")
        .select("empty_lines_count")
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") { // No rows found
          return { emptyLinesCount: 3 }; // Default
        }
        throw error;
      }

      return { emptyLinesCount: data.empty_lines_count ?? 3 };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  "settings/updateUserSettings",
  async ({ userId, emptyLinesCount }, { rejectWithValue }) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from("user_settings")
        .upsert({ user_id: userId, empty_lines_count: emptyLinesCount });

      if (error) throw error;
      return { emptyLinesCount };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState = {
  emptyLinesCount: 3,
  loading: false,
  error: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setEmptyLinesCount: (state, action) => {
      state.emptyLinesCount = action.payload;
    },
    clearSettings: (state) => {
      state.emptyLinesCount = 3;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.emptyLinesCount = action.payload.emptyLinesCount;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.emptyLinesCount = action.payload.emptyLinesCount;
      });
  },
});

export const { setEmptyLinesCount, clearSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
