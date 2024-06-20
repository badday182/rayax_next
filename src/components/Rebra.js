import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { rebraViews } from "../data/REBRA/rebraViews";
import { AddOptionBlock } from "./AddOptionBlock";
import { useDispatch } from "react-redux";
import { deleteIdSemicolonUniversalArray_1 } from "./redux/slices/universalSliceReducer";

export const Rebra = () => {
  const [selectedRebraViews, setSelectedRebraViews] = useState(
    rebraViews[0]
  );
  const [rebraCounter, setRebraCounter] = useState([{ id: uuidv4() }]);

  const handleAddOption = (setter, counter, setCounter) => {
  // const handleAddOption = (setter, counter) => {
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
      <AddOptionBlock
        items={rebraViews}
        onZoneSelect={setSelectedRebraViews}
        label="Норма/Не норма"
        counter={rebraCounter}
        onAddClick={() => handleAddOption(setRebraCounter, rebraCounter)}
        onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [rebraCounter, setRebraCounter])}
      />
    </div>
  );
};
