import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  zoneCounter: [{ id: 0 }],
  zoneDescriptionOnlyCounter: [],
};

export const newZoneSlise = createSlice({
  name: "newZone",
  initialState,
  reducers: {
    // setImagineOptions: (state, action) => {
    //     state.zoneCounter = action.payload
    // }
    addImagineOptions: (state, action) => {
      state.zoneCounter = [...state.zoneCounter, action.payload];
      // state.zoneCounter.push(action.payload);
    },
    addDescriptionOnly: (state, action) => {
      state.zoneDescriptionOnlyCounter = [
        ...state.zoneDescriptionOnlyCounter,
        action.payload,
      ];
      // state.zoneCounter.push(action.payload);
    },
    deleteImagineOptions: (state, action) => {
      if (state.zoneCounter.length !== 1) {
        state.zoneCounter = state.zoneCounter.filter(
          (option) => option.id !== action.payload.id
        );
      }
    },
    resetImagineOptions: (state) => {
      state.zoneCounter = [{ id: uuidv4() }];
    },
    resetDescriptionOnly: (state) => {
      state.zoneDescriptionOnlyCounter = [];
    },
  },
});

export const {
  addImagineOptions,
  deleteImagineOptions,
  resetImagineOptions,
  addDescriptionOnly,
  resetDescriptionOnly,
} = newZoneSlise.actions;

export default newZoneSlise.reducer;
