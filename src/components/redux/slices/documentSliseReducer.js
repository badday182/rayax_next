import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  textFromEditor: null,
  documentText: '',
  // documentText: localStorage.getItem('textToDoc'),
};

export const documentSliseReducer = createSlice({
  name: "documentText",
  initialState,
  reducers: {
    setDocumentText: (state, action) => {
      state.documentText = action.payload;
    },
    addDocText: (state, action) => {
      // const { formattedDate, naprav, name, birthYear } = action.payload;
      const { textToDoc } = action.payload;
      // const { PacientInfoPattern } = action.payload;
      // state.documentText = [...state.documentText, action.payload];

      state.documentText += `${textToDoc}`

      // state.documentText = state.textFromEditor + textToDoc



      // console.log(action.payload.naprav)
    },
    addTextFromEditor: (state, action) => {
      // const { textFromEditor } = action.payload;
      // state.textFromEditor += textFromEditor
      // console.log(state.textFromEditor)
      // console.log(action.payload)

      // state.documentText = state.documentText + action.payload
      state.documentText = action.payload

    },

    doubleAddPatientAndZoneDocText: (state, action) => {
      // const { formattedDate, naprav, name, birthYear } = action.payload;
      const { textToDocPacientInfo, textToDoc } = action.payload;
      // const { PacientInfoPattern } = action.payload;
      // state.documentText = [...state.documentText, action.payload];

      // state.documentText += `${textToDoc}`
      state.documentText += textToDocPacientInfo + textToDoc

      // state.documentText = state.textFromEditor + textToDoc



      // console.log(action.payload.naprav)
    },
  },
});

export const { addDocText, addTextFromEditor, doubleAddPatientAndZoneDocText, setDocumentText } = documentSliseReducer.actions;

export default documentSliseReducer.reducer;
