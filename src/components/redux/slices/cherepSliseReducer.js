import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Для корректного обновления использовать useEffect с dispatch в ImagineOptions
  cherepNormaNenormaText: "",
  cherepNormaNenormaArray: [],
  };

export const cherepSliseReducer = createSlice({
  name: "cherepNormaNenorma",
  initialState,
  reducers: {
    editCherepNormaNenormaArray: (state, action) => {
      // const { selectedZone } = action.payload;
      // state.cherepNormaNenorma = selectedZone
      const { floatingId, selectedZone } = action.payload;
      const index0 = state.cherepNormaNenormaArray.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.cherepNormaNenormaArray[index0][1] = selectedZone;
      } else {
        state.cherepNormaNenormaArray.push([floatingId, selectedZone]);
      }
      state.cherepNormaNenormaText = state.cherepNormaNenormaArray
        .map((item) => item[1])
        .join("; ");

    },
    resetCherepSliseReducer: (state) => {
            state.cherepNormaNenormaText = ""
            state.cherepNormaNenormaArray = []      
    },
   
    
  },
});

export const {
  editCherepNormaNenormaArray, resetCherepSliseReducer
 
} = cherepSliseReducer.actions;

export default cherepSliseReducer.reducer;
