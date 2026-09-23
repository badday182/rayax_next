import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSupabase } from "@/lib/supabaseClient";

const initialState = {
  byZone: {},
  status: "idle",
};

export const fetchNormTemplates = createAsyncThunk(
  "normTemplates/fetchAll",
  async (userId) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("norm_templates")
      .select("zone, title, description")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const byZone = {};
    for (const row of data) {
      if (!byZone[row.zone]) byZone[row.zone] = [];
      byZone[row.zone].push({ title: row.title, description: row.description });
    }
    return byZone;
  }
);

export const addNormTemplate = createAsyncThunk(
  "normTemplates/add",
  async ({ userId, zone, title, description }) => {
    const supabase = await getSupabase();
    const { error } = await supabase
      .from("norm_templates")
      .insert({ user_id: userId, zone, title, description });

    if (error) throw error;
    return { zone, title, description };
  }
);

export const updateNormTemplate = createAsyncThunk(
  "normTemplates/update",
  async ({ userId, zone, oldTitle, newTitle, newDescription }) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("norm_templates")
      .update({ title: newTitle, description: newDescription })
      .eq("user_id", userId)
      .eq("zone", zone)
      .eq("title", oldTitle)
      .select();

    if (error) throw error;
    if (!data?.length) {
      throw new Error(
        "Шаблон не знайдено (можливо, вже змінений в іншій вкладці)"
      );
    }
    return { zone, oldTitle, newTitle, newDescription };
  }
);

export const deleteNormTemplate = createAsyncThunk(
  "normTemplates/delete",
  async ({ userId, zone, title }) => {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("norm_templates")
      .delete()
      .eq("user_id", userId)
      .eq("zone", zone)
      .eq("title", title)
      .select();

    if (error) throw error;
    if (!data?.length) {
      throw new Error(
        "Шаблон не знайдено (можливо, вже видалений в іншій вкладці)"
      );
    }
    return { zone, title };
  }
);

export const normTemplatesSlice = createSlice({
  name: "normTemplates",
  initialState,
  reducers: {
    clearNormTemplates: (state) => {
      state.byZone = {};
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNormTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNormTemplates.fulfilled, (state, action) => {
        state.byZone = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchNormTemplates.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(addNormTemplate.fulfilled, (state, action) => {
        const { zone, title, description } = action.payload;
        const existing = state.byZone[zone] ?? [];
        if (!existing.some((t) => t.title === title)) {
          state.byZone[zone] = [{ title, description }, ...existing];
        }
      })
      .addCase(updateNormTemplate.fulfilled, (state, action) => {
        const { zone, oldTitle, newTitle, newDescription } = action.payload;
        state.byZone[zone] = (state.byZone[zone] ?? []).map((t) =>
          t.title === oldTitle
            ? { title: newTitle, description: newDescription }
            : t
        );
      })
      .addCase(deleteNormTemplate.fulfilled, (state, action) => {
        const { zone, title } = action.payload;
        state.byZone[zone] = (state.byZone[zone] ?? []).filter(
          (t) => t.title !== title
        );
      });
  },
});

export const { clearNormTemplates } = normTemplatesSlice.actions;

export default normTemplatesSlice.reducer;
