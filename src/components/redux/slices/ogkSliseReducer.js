import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Для корректного обновления использовать useEffect с dispatch в ImagineOptions
  legenRusynokText: "",
  legenRusynokArray: [],
  koreniText: "",
  koreniArray: [],
  synusyText: "",
  synusyArray: [],
  kupalaDiadragmyText: "",
  kupalaDiadragmyArray: [],
  corText: "",
  corArray: [],
  ogkZakliuchenniaText: "",
  ogkZakliuchenniaArray: [],
};

export const ogkSliseReducer = createSlice({
  name: "documentText",
  initialState,
  reducers: {
    editLegenRusynokArray: (state, action) => {
      // state.documentText = [...state.documentText, action.payload];
      const { floatingId, selectedZone } = action.payload;

      // if (state.legenRusynokArray === "") {
      //   // state.legenRusynokArray = action.payload;
      //   // state.legenRusynokArray = selectedZone;
      //   // console.log(selectedZone);
      // }

      // if (!state.legenRusynokArray.includes(action.payload)) {
      //   state.legenRusynokArray = state.legenRusynokArray + ", " + action.payload;
      // }

      // Проверяем, есть ли в legenRusynokArray подмассив с первым элементом равным floatingId
      const index0 = state.legenRusynokArray.findIndex(
        (item) => item[0] === floatingId
      );
      // Проверяем, есть ли в legenRusynokArray подмассив со вторым элементом равным selectedZone
      // const index1 = state.legenRusynokArray.findIndex(
      //   (item) => item[1] === selectedZone
      //   );
      // console.log(index);

      // Если есть, подмассив с первым элементом равным floatingId то изменяем значение второго элемента подмассива на selectedZone
      if (index0 !== -1) {
        state.legenRusynokArray[index0][1] = selectedZone;
      } else {
        //     if (index1 === 0) {
        //   console.log(selectedZone);

        // }
        state.legenRusynokArray.push([floatingId, selectedZone]);
        // Если нет, то добавляем новый подмассив с парой [floatingId, selectedZone]
      }

      state.legenRusynokText = state.legenRusynokArray
        .map((item) => item[1])
        .join(", ");

      // state.legenRusynokArray.push([floatingId, selectedZone]);
      // state.legenRusynokArray.push([floatingId + 2, selectedZone + 2]);
      // state.legenRusynokArray.push({ floatingId, selectedZone });
      // state.legenRusynokArray = [...state.legenRusynokArray, [floatingId, selectedZone]];

      // console.log(state.legenRusynokArray);
      // console.log(selectedZone);
      // console.log(state.legenRusynokArray);
      // console.log(state.legenRusynokArray[0][0]);
      // console.log(state.legenRusynokArray[0][1]);
      // console.log(state.legenRusynokArray[1][0]);
      // console.log(state.legenRusynokArray[1][1]);
    },
    deleteIdLegenRusynokArray: (state, action) => {
      const { floatingId } = action.payload;
      // console.log('state.legenRusynokArray', state.legenRusynokArray);
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.legenRusynokArray = state.legenRusynokArray.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.legenRusynokText = state.legenRusynokArray
        .map((item) => item[1])
        .join(", ");
    },
    resetLegenRusynokArray: (state) => {
      state.legenRusynokArray = [];
      // state.legenRusynokText = ''
    },
    editKoreniArray: (state, action) => {
      const { floatingId, selectedZone } = action.payload;
      const index0 = state.koreniArray.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.koreniArray[index0][1] = selectedZone;
      } else {
        state.koreniArray.push([floatingId, selectedZone]);
      }
      state.koreniText = state.koreniArray.map((item) => item[1]).join(", ");
    },
    deleteIdKoreniArray: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.koreniArray = state.koreniArray.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.koreniText = state.koreniArray.map((item) => item[1]).join(", ");
    },
    resetKoreniArray: (state) => {
      state.koreniArray = [];
    },
    editSynusyArray: (state, action) => {
      const { floatingId, selectedZone } = action.payload;
      const index0 = state.synusyArray.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.synusyArray[index0][1] = selectedZone;
      } else {
        state.synusyArray.push([floatingId, selectedZone]);
      }
      state.synusyText = state.synusyArray.map((item) => item[1]).join(", ");
    },
    deleteIdSynusyArray: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.synusyArray = state.synusyArray.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.synusyText = state.synusyArray.map((item) => item[1]).join(", ");
    },
    resetSynusyArray: (state) => {
      state.synusyArray = [];
    },
    editKupalaDiadragmyArray: (state, action) => {
      const { floatingId, selectedZone } = action.payload;
      const index0 = state.kupalaDiadragmyArray.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.kupalaDiadragmyArray[index0][1] = selectedZone;
      } else {
        state.kupalaDiadragmyArray.push([floatingId, selectedZone]);
      }
      state.kupalaDiadragmyText = state.kupalaDiadragmyArray
        .map((item) => item[1])
        .join(", ");
    },
    deleteIdKupalaDiadragmyArray: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.kupalaDiadragmyArray = state.kupalaDiadragmyArray.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.kupalaDiadragmyText = state.kupalaDiadragmyArray
        .map((item) => item[1])
        .join(", ");
    },
    resetKupalaDiadragmyArray: (state) => {
      state.kupalaDiadragmyArray = [];
    },
    editCorArray: (state, action) => {
      const { floatingId, selectedZone } = action.payload;
      const index0 = state.corArray.findIndex((item) => item[0] === floatingId);
      if (index0 !== -1) {
        state.corArray[index0][1] = selectedZone;
      } else {
        state.corArray.push([floatingId, selectedZone]);
      }
      state.corText = state.corArray.map((item) => item[1]).join(", ");
      if (state.corText.includes(", ;")) {
        // Заменяем ", ;" на ";"
        state.corText = state.corText.replace(", ;", ";");
      }
      // Если в state.corText есть текст "; склероз дуги аорти" и он не в конце строки
      const searchText = "; склероз дуги аорти";
      if (
        state.corText.includes(searchText) &&
        !state.corText.endsWith(searchText)
      ) {
        // Убираем текст из текущего положения
        state.corText = state.corText.replace(searchText, "");
        // Добавляем в конец
        state.corText = state.corText + searchText;
      }
      // Удаляем ", " в начале строки, если есть
      if (state.corText.startsWith(", ")) {
        state.corText = state.corText.slice(2);
      }
    },
    deleteIdCorArray: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.corArray = state.corArray.filter((item) => item[0] !== floatingId);

      // Обновляем legenRusynokText
      state.corText = state.corArray.map((item) => item[1]).join(", ");
      if (state.corText.includes(", ;")) {
        // Заменяем ", ;" на ";"
        state.corText = state.corText.replace(", ;", ";");
      }
       // Если в state.corText есть текст "; склероз дуги аорти" и он не в конце строки
       const searchText = "; склероз дуги аорти";
       if (
         state.corText.includes(searchText) &&
         !state.corText.endsWith(searchText)
       ) {
         // Убираем текст из текущего положения
         state.corText = state.corText.replace(searchText, "");
         // Добавляем в конец
         state.corText = state.corText + searchText;
       }
       // Удаляем ", " в начале строки, если есть
       if (state.corText.startsWith(", ")) {
         state.corText = state.corText.slice(2);
       }
    },
    resetCorArray: (state) => {
      state.corArray = [];
    },
    editOgkZakliuchenniaArray: (state, action) => {
      const { floatingId, selectedZone } = action.payload;
      const index0 = state.ogkZakliuchenniaArray.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.ogkZakliuchenniaArray[index0][1] = selectedZone;
      } else {
        state.ogkZakliuchenniaArray.push([floatingId, selectedZone]);
      }
      state.ogkZakliuchenniaText = state.ogkZakliuchenniaArray
        .map((item) => item[1])
        .join(". ");
    },
    deleteIdOgkZakliuchenniaArray: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.ogkZakliuchenniaArray = state.ogkZakliuchenniaArray.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.ogkZakliuchenniaText = state.ogkZakliuchenniaArray
        .map((item) => item[1])
        .join(", ");
    },
    resetOgkZakliuchenniaArray: (state) => {
      state.ogkZakliuchenniaArray = [];
    },
    resetogkSliseReducer: (state) => {
      state.legenRusynokText = "";
      state.legenRusynokArray = [];
      state.koreniText = "";
      state.koreniArray = [];
      state.synusyText = "";
      state.synusyArray = [];
      state.kupalaDiadragmyText = "";
      state.kupalaDiadragmyArray = [];
      state.corText = "";
      state.corArray = [];
      state.ogkZakliuchenniaText = "";
      state.ogkZakliuchenniaArray = [];
    },
  },
});

export const {
  editLegenRusynokArray,
  deleteIdLegenRusynokArray,
  resetLegenRusynokArray,
  editKoreniArray,
  deleteIdKoreniArray,
  resetKoreniArray,
  editSynusyArray,
  deleteIdSynusyArray,
  resetSynusyArray,
  editKupalaDiadragmyArray,
  deleteIdKupalaDiadragmyArray,
  resetKupalaDiadragmyArray,
  editCorArray,
  deleteIdCorArray,
  resetCorArray,
  editOgkZakliuchenniaArray,
  deleteIdOgkZakliuchenniaArray,
  resetOgkZakliuchenniaArray,
  resetogkSliseReducer,
} = ogkSliseReducer.actions;

export default ogkSliseReducer.reducer;
