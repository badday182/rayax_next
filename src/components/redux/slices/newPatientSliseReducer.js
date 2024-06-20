import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
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
          (option) => option.id !== action.payload.id   );
        }
        
      },
      resetPatient: (state) => {
        state.patientCounter = [{ id: uuidv4() }];
        // state.zoneCounter.push(action.payload);
      },
      
  },
});

export const { addPatient, deletePatient, resetPatient } = newPatientSlise.actions;

export default newPatientSlise.reducer;
