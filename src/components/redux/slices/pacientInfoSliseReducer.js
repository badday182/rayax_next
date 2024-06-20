import { createSlice } from "@reduxjs/toolkit";
import { initialExamNumber } from "../../../data/initialExamNumber";
import { initialPatientName } from "../../../data/initialPatientName";
import { initialPatientBirthYear } from "../../../data/initialPatientBirthYear";

const initialState = {
  examNumber: initialExamNumber,
  examDate: new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("."),
  examName: initialPatientName,
  examBirthYear: initialPatientBirthYear,
};

export const pacientInfoSliseReducer = createSlice({
  name: "documentText",
  initialState,
  reducers: {
    editExamNumber: (state, action) => {
      // state.documentText = [...state.documentText, action.payload];
      state.examNumber = action.payload
// if (state.examNumber === initialExamNumber) {
//   state.examNumber = action.payload} else {
//     state.examNumber = +state.examNumber + 1
//   }

      // console.log(action.payload)
      // console.log(action)
    },
    editExamDate: (state, action) => {
      state.examDate = action.payload;
      // console.log(action.payload)
    },
    editExamName: (state, action) => {
      state.examName = action.payload;
      // console.log(action.payload)
    },
    editExamBirthYear: (state, action) => {
      state.examBirthYear = action.payload;
      // console.log(action.payload)
    },
    resetPacientInfoSliseReducer: (state) => {
      // state.examNumber = initialExamNumber;
      state.examDate = new Date()
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join(".");
        state.examName = "_____________________";
      state.examBirthYear = "______";
      // console.log(action.payload)
    },
  },
});

export const {
  editExamNumber,
  editExamDate,
  editExamName,
  editExamBirthYear,
  resetPacientInfoSliseReducer,
} = pacientInfoSliseReducer.actions;

export default pacientInfoSliseReducer.reducer;
