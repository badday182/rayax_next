import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  descriptionState: "ОГК",
  };

export const descriptionOnlyReducer = createSlice({
  name: "descriptionOnly",
  initialState,
  reducers: {
    editDescriptionOnly: (state, action) => {
      // const { selectedZone } = action.payload;
      // state.cherepNormaNenorma = selectedZone
      // console.log('selectedZone', selectedZone);
      state.descriptionState = action.payload;
    },
    resetDescriptionOnly: (state) => {
      state.descriptionState = "ОГК";  },
   
    
  },
});

export const {
  editDescriptionOnly, resetDescriptionOnly
 
} = descriptionOnlyReducer.actions;

export default descriptionOnlyReducer.reducer;
