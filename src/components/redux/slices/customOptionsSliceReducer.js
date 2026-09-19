import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = {
  byKey: {},
  status: "idle",
};

export const fetchCustomOptions = createAsyncThunk(
  "customOptions/fetchAll",
  async (userId) => {
    const { data, error } = await supabase
      .from("custom_options")
      .select("field_key, value")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const byKey = {};
    for (const row of data) {
      if (!byKey[row.field_key]) byKey[row.field_key] = [];
      byKey[row.field_key].push(row.value);
    }
    return byKey;
  }
);

export const addCustomOption = createAsyncThunk(
  "customOptions/add",
  async ({ userId, fieldKey, value }) => {
    const { error } = await supabase
      .from("custom_options")
      .insert({ user_id: userId, field_key: fieldKey, value });

    if (error) throw error;
    return { fieldKey, value };
  }
);

export const customOptionsSlice = createSlice({
  name: "customOptions",
  initialState,
  reducers: {
    clearCustomOptions: (state) => {
      state.byKey = {};
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomOptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomOptions.fulfilled, (state, action) => {
        state.byKey = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCustomOptions.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(addCustomOption.fulfilled, (state, action) => {
        const { fieldKey, value } = action.payload;
        const existing = state.byKey[fieldKey] ?? [];
        if (!existing.includes(value)) {
          state.byKey[fieldKey] = [value, ...existing];
        }
      });
  },
});

export const { clearCustomOptions } = customOptionsSlice.actions;

export default customOptionsSlice.reducer;
