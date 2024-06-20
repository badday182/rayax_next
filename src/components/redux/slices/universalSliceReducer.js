import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Для корректного обновления использовать useEffect с dispatch в ImagineOptions
  commaUniversalText_1: "",
  commaUniversalArray_1: [],
  commaUniversalText_2: "",
  commaUniversalArray_2: [],
  commaUniversalText_3: "",
  commaUniversalArray_3: [],
  commaUniversalText_4: "",
  commaUniversalArray_4: [],
  commaUniversalText_5: "",
  commaUniversalArray_5: [],
  commaUniversalText_6: "",
  commaUniversalArray_6: [],

  svhVysotaTilHrebtsivText:'',
  svhVysotaTilHrebtsivArray:[],

  semicolonUniversalText_1: "",
  semicolonUniversalArray_1: [],

 
};

export const universalSliceReducer = createSlice({
  name: "documentText",
  initialState,
  reducers: {
    editCommaUniversalArray_1: (state, action) => {
      // state.documentText = [...state.documentText, action.payload];
      const { floatingId, selectedZone } = action.payload;

      // Проверяем, есть ли в CommaUniversalArray_1 подмассив с первым элементом равным floatingId
      const index0 = state.commaUniversalArray_1.findIndex(
        (item) => item[0] === floatingId
      );
      // Если есть, подмассив с первым элементом равным floatingId то изменяем значение второго элемента подмассива на selectedZone
      if (index0 !== -1) {
        state.commaUniversalArray_1[index0][1] = selectedZone;
      } else {
        state.commaUniversalArray_1.push([floatingId, selectedZone]);
        // Если нет, то добавляем новый подмассив с парой [floatingId, selectedZone]
      }

      state.commaUniversalText_1 = state.commaUniversalArray_1
        .map((item) => item[1])
        .join(", ");
// console.log('state.commaUniversalText_1',state.commaUniversalText_1);
    },
    deleteIdCommaUniversalArray_1: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.commaUniversalArray_1 = state.commaUniversalArray_1.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.commaUniversalText_1 = state.commaUniversalArray_1
        .map((item) => item[1])
        .join(", ");
    },
    editCommaUniversalArray_2: (state, action) => {
      // state.documentText = [...state.documentText, action.payload];
      const { floatingId, selectedZone } = action.payload;

      // Проверяем, есть ли в CommaUniversalArray_1 подмассив с первым элементом равным floatingId
      const index0 = state.commaUniversalArray_2.findIndex(
        (item) => item[0] === floatingId
      );
      // Если есть, подмассив с первым элементом равным floatingId то изменяем значение второго элемента подмассива на selectedZone
      if (index0 !== -1) {
        state.commaUniversalArray_2[index0][1] = selectedZone;
      } else {
        state.commaUniversalArray_2.push([floatingId, selectedZone]);
        // Если нет, то добавляем новый подмассив с парой [floatingId, selectedZone]
      }

      state.commaUniversalText_2 = state.commaUniversalArray_2
        .map((item) => item[1])
        .join(", ");
// console.log('state.commaUniversalText_1',state.commaUniversalText_1);
    },
    deleteIdCommaUniversalArray_2: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.commaUniversalArray_2 = state.commaUniversalArray_2.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.commaUniversalText_2 = state.commaUniversalArray_2
        .map((item) => item[1])
        .join(", ");
    },
    editCommaUniversalArray_3: (state, action) => {
      const { floatingId, selectedZone } = action.payload;

      const index0 = state.commaUniversalArray_3.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.commaUniversalArray_3[index0][1] = selectedZone;
      } else {
        state.commaUniversalArray_3.push([floatingId, selectedZone]);
      }

      state.commaUniversalText_3 = state.commaUniversalArray_3
        .map((item) => item[1])
        .join(", ");
    },
    deleteIdCommaUniversalArray_3: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.commaUniversalArray_3 = state.commaUniversalArray_3.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.commaUniversalText_3 = state.commaUniversalArray_3
        .map((item) => item[1])
        .join(", ");
    },
    editCommaUniversalArray_4: (state, action) => {
      const { floatingId, selectedZone } = action.payload;

      const index0 = state.commaUniversalArray_4.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.commaUniversalArray_4[index0][1] = selectedZone;
      } else {
        state.commaUniversalArray_4.push([floatingId, selectedZone]);
      }

      state.commaUniversalText_4 = state.commaUniversalArray_4
        .map((item) => item[1])
        .join(", ");
    },
    deleteIdCommaUniversalArray_4: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.commaUniversalArray_4 = state.commaUniversalArray_4.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.commaUniversalText_4 = state.commaUniversalArray_4
        .map((item) => item[1])
        .join(", ");
    },
    editCommaUniversalArray_5: (state, action) => {
      const { floatingId, selectedZone } = action.payload;

      const index0 = state.commaUniversalArray_5.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.commaUniversalArray_5[index0][1] = selectedZone;
      } else {
        state.commaUniversalArray_5.push([floatingId, selectedZone]);
      }

      state.commaUniversalText_5 = state.commaUniversalArray_5
        .map((item) => item[1])
        .join(", ");
    },
    deleteIdCommaUniversalArray_5: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.commaUniversalArray_5 = state.commaUniversalArray_5.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.commaUniversalText_5 = state.commaUniversalArray_5
        .map((item) => item[1])
        .join(", ");
    },
    editCommaUniversalArray_6: (state, action) => {
      const { floatingId, selectedZone } = action.payload;

      const index0 = state.commaUniversalArray_6.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.commaUniversalArray_6[index0][1] = selectedZone;
      } else {
        state.commaUniversalArray_6.push([floatingId, selectedZone]);
      }

      state.commaUniversalText_6 = state.commaUniversalArray_6
        .map((item) => item[1])
        .join(", ");
    },
    deleteIdCommaUniversalArray_6: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.commaUniversalArray_6 = state.commaUniversalArray_6.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.commaUniversalText_6 = state.commaUniversalArray_6
        .map((item) => item[1])
        .join(", ");
    },
    editSvhVysotaTilHrebtsivArray: (state, action) => {
      const { floatingId, selectedZone } = action.payload;

      const index0 = state.svhVysotaTilHrebtsivArray.findIndex(
        (item) => item[0] === floatingId
      );
      if (index0 !== -1) {
        state.svhVysotaTilHrebtsivArray[index0][1] = selectedZone;
      } else {
        state.svhVysotaTilHrebtsivArray.push([floatingId, selectedZone]);
      }

      state.svhVysotaTilHrebtsivText = state.svhVysotaTilHrebtsivArray
      .map((item) => item[1])
      .join(", ");
  
    // Добавляем проверку и удаляем запятую перед 'в передньому/задньому відділі С'
    if (state.svhVysotaTilHrebtsivText.includes(', в передньому/задньому відділі С')) {
      state.svhVysotaTilHrebtsivText = state.svhVysotaTilHrebtsivText.replace(', в передньому/задньому відділі С', ' в передньому/задньому відділі С');
    }
    },
    deleteIdSvhVysotaTilHrebtsivArray: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.svhVysotaTilHrebtsivArray = state.svhVysotaTilHrebtsivArray.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.svhVysotaTilHrebtsivText = state.svhVysotaTilHrebtsivArray
        .map((item) => item[1])
        .join(", ");
        // Добавляем проверку и удаляем запятую перед 'в передньому/задньому відділі С'
    if (state.svhVysotaTilHrebtsivText.includes(', в передньому/задньому відділі С')) {
      state.svhVysotaTilHrebtsivText = state.svhVysotaTilHrebtsivText.replace(', в передньому/задньому відділі С', ' в передньому/задньому відділі С');
    }
    },
    editSemicolonUniversalArray_1: (state, action) => {
      // state.documentText = [...state.documentText, action.payload];
      const { floatingId, selectedZone } = action.payload;

      // Проверяем, есть ли в SemicolonUniversalArray_1 подмассив с первым элементом равным floatingId
      const index0 = state.semicolonUniversalArray_1.findIndex(
        (item) => item[0] === floatingId
      );
      // Если есть, подмассив с первым элементом равным floatingId то изменяем значение второго элемента подмассива на selectedZone
      if (index0 !== -1) {
        state.semicolonUniversalArray_1[index0][1] = selectedZone;
      } else {
        state.semicolonUniversalArray_1.push([floatingId, selectedZone]);
        // Если нет, то добавляем новый подмассив с парой [floatingId, selectedZone]
      }

      state.semicolonUniversalText_1 = state.semicolonUniversalArray_1
        .map((item) => item[1])
        .join("; ");
// console.log('state.semicolonUniversalText_1', state.semicolonUniversalText_1);
    },
    deleteIdSemicolonUniversalArray_1: (state, action) => {
      const { floatingId } = action.payload;
      // Фильтруем массив, оставляя только те подмассивы, у которых первый элемент не равен floatingId
      state.semicolonUniversalArray_1 = state.semicolonUniversalArray_1.filter(
        (item) => item[0] !== floatingId
      );

      // Обновляем legenRusynokText
      state.semicolonUniversalText_1 = state.semicolonUniversalArray_1
        .map((item) => item[1])
        .join("; ");
    },
   
    
    resetUniversalSliceReducer: (state) => {

      state.commaUniversalText_1 = "";
      state.commaUniversalArray_1 = [];
      state.commaUniversalText_2 = "";
      state.commaUniversalArray_2 = [];
      state.commaUniversalText_3 = "";
      state.commaUniversalArray_3 = [];
      state.commaUniversalText_4 = "";
      state.commaUniversalArray_4 = [];
      state.commaUniversalText_5 = "";
      state.commaUniversalArray_5 = [];
      state.commaUniversalText_6 = "";
      state.commaUniversalArray_6 = [];

      state.svhVysotaTilHrebtsivText = "";
      state.svhVysotaTilHrebtsivArray = [];

      state.semicolonUniversalText_1 = "";
      state.semicolonUniversalArray_1 = [];
    },
  },
});

export const {
  editCommaUniversalArray_1,
  deleteIdCommaUniversalArray_1,
  editCommaUniversalArray_2,
  deleteIdCommaUniversalArray_2,
  editCommaUniversalArray_3,
  deleteIdCommaUniversalArray_3,
  editCommaUniversalArray_4,
  deleteIdCommaUniversalArray_4,
  editCommaUniversalArray_5,
  deleteIdCommaUniversalArray_5,
  editCommaUniversalArray_6,
  deleteIdCommaUniversalArray_6,

  editSemicolonUniversalArray_1,
  deleteIdSemicolonUniversalArray_1,
  editSvhVysotaTilHrebtsivArray,
  deleteIdSvhVysotaTilHrebtsivArray,
  resetUniversalSliceReducer,
} = universalSliceReducer.actions;

export default universalSliceReducer.reducer;
