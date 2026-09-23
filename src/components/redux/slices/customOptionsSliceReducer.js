import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSupabase } from "@/lib/supabaseClient";

const initialState = {
  byKey: {},
  status: "idle",
};

export const fetchCustomOptions = createAsyncThunk(
  "customOptions/fetchAll",
  async (userId) => {
    const supabase = await getSupabase();
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
    const supabase = await getSupabase();
    const { error } = await supabase
      .from("custom_options")
      .insert({ user_id: userId, field_key: fieldKey, value });

    if (error) throw error;
    return { fieldKey, value };
  }
);

export const updateCustomOption = createAsyncThunk(
  "customOptions/update",
  async ({ userId, fieldKey, oldValue, newValue }) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("custom_options")
      .update({ value: newValue })
      .eq("user_id", userId)
      .eq("field_key", fieldKey)
      .eq("value", oldValue)
      .select();

    if (error) throw error;
    if (!data?.length) {
      throw new Error(
        "Варіант не знайдено (можливо, вже змінений в іншій вкладці)"
      );
    }
    return { fieldKey, oldValue, newValue };
  }
);

export const deleteCustomOption = createAsyncThunk(
  "customOptions/delete",
  async ({ userId, fieldKey, value }) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("custom_options")
      .delete()
      .eq("user_id", userId)
      .eq("field_key", fieldKey)
      .eq("value", value)
      .select();

    if (error) throw error;
    if (!data?.length) {
      throw new Error(
        "Варіант не знайдено (можливо, вже видалений в іншій вкладці)"
      );
    }
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
      })
      .addCase(updateCustomOption.fulfilled, (state, action) => {
        const { fieldKey, oldValue, newValue } = action.payload;
        state.byKey[fieldKey] = (state.byKey[fieldKey] ?? []).map((v) =>
          v === oldValue ? newValue : v
        );
      })
      .addCase(deleteCustomOption.fulfilled, (state, action) => {
        const { fieldKey, value } = action.payload;
        state.byKey[fieldKey] = (state.byKey[fieldKey] ?? []).filter(
          (v) => v !== value
        );
      });
  },
});

export const { clearCustomOptions } = customOptionsSlice.actions;

export default customOptionsSlice.reducer;
