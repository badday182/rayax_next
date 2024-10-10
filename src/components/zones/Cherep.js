import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { FormFloatingSelect } from "../../components/FloatingLabel";
import { cherepViews } from "../../data/Cherep/cherepViews";
import { AddOptionBlock } from "../AddOptionBlock";

import { useDispatch } from "react-redux";
import { deleteIdSemicolonUniversalArray_1 } from "../redux/slices/universalSliceReducer";

export const Cherep = () => {

  const [selectedCherepViews, setSelectedCherepViews] = useState(cherepViews[0]);
  const [cherepCounter, setCherepCounter] = useState([{ id: uuidv4() }]);


  // const handleAddOption = (setter, counter, setCounter) => {
  const handleAddOption = (setter, counter) => {
    setter([...counter, { id: uuidv4() }]);
  };
  const dispatch = useDispatch();
  const handleDeleteOption = (deleteId, resetCounter) => {
    // Проверяем длину массива, выполняем удаление только если длина не равна 1
   //  console.log('handleDeleteOption deleteId', deleteId);
    if (resetCounter[0].length !== 1) {
     // Фильтруем массив, оставляя только те элементы, у которых id не равен deleteId
     const updatedCounter = resetCounter[0].filter((item) => item.id !== deleteId);
   
     // Устанавливаем обновленное значение состояния
     resetCounter[1](updatedCounter);
     // Удаление айтема из редюсера       
         dispatch(deleteIdSemicolonUniversalArray_1({ floatingId: deleteId }));   
      }
   }


  return (
    <div className="">
       {/* <FormFloatingSelect
              // key={option.id}
              items={cherepViews}
              onZoneSelect={setSelectedCherepViews}
              label={"Норма/Не норма"}
            /> */}
            <AddOptionBlock
            items={cherepViews}
            onZoneSelect={setSelectedCherepViews}
            label="Норма/Не норма"
            counter={cherepCounter}
            // onAddClick={() => handleAddOption(setCherepCounter, cherepCounter, setCherepCounter)}
            onAddClick={() => handleAddOption(setCherepCounter, cherepCounter)}
            onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [cherepCounter, setCherepCounter])}
          />
    </div>
  );
};
