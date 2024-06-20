import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Для корректного обновления использовать useEffect с dispatch в ImagineOptions
  ppnNormaNenormaText: "",
  ppnNormaNenormaArray: [],
  };

export const ppnSliseReducer = createSlice({
  name: "ppnNormaNenormaText",
  initialState,
  reducers: {
    editPpnNormaNenormaArray: (state, action) => {
      // const { selectedZone } = action.payload;
      // state.cherepNormaNenorma = selectedZone
      const { floatingId, selectedZone } = action.payload;
      // console.log(`selectedZone: ${selectedZone}, id: ${floatingId}`);

      const index0 = state.ppnNormaNenormaArray.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.ppnNormaNenormaArray[index0][1] = selectedZone;
      } else {
        state.ppnNormaNenormaArray.push([floatingId, selectedZone]);
      }
      state.ppnNormaNenormaText = state.ppnNormaNenormaArray
        .map((item) => item[1])
        .join("; ");
// console.log(state.ppnNormaNenormaText);
    },
    resetPpnSliseReducer: (state) => {
            state.ppnNormaNenormaText = ""
            state.ppnNormaNenormaArray = []      
    },
   
    
  },
});

export const {
  editPpnNormaNenormaArray, resetPpnSliseReducer
 
} = ppnSliseReducer.actions;

export default ppnSliseReducer.reducer;
