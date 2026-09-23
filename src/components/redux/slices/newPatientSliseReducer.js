import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  patientCounter: [{ id: 0o0 }],
};

export const newPatientSlise = createSlice({
  name: "newPatient",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patientCounter = [...state.patientCounter, action.payload];
      // state.zoneCounter.push(action.payload);
    },
    deletePatient: (state, action) => {
      if (state.patientCounter.length !== 1) {
        state.patientCounter = state.patientCounter.filter(
          (option) => option.id !== action.payload.id
        );
      }
    },
    resetPatient: (state) => {
      state.patientCounter = [{ id: crypto.randomUUID() }];
      // state.zoneCounter.push(action.payload);
    },
  },
});

export const { addPatient, deletePatient, resetPatient } =
  newPatientSlise.actions;

export default newPatientSlise.reducer;
