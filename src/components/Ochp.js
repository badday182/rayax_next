import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ochpViews } from "../data/OCHP/ochpViews";
import { AddOptionBlock } from "./AddOptionBlock";
import { useDispatch } from "react-redux";
import { deleteIdSemicolonUniversalArray_1 } from "./redux/slices/universalSliceReducer";

export const Ochp = () => {
  const [selectedOchpViews, setSelectedOchpViews] = useState(
    ochpViews[0]
  );
  const [ochpCounter, setOchpCounter] = useState([{ id: uuidv4() }]);

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
        items={ochpViews}
        onZoneSelect={setSelectedOchpViews}
        label="Норма/Не норма"
        counter={ochpCounter}
        onAddClick={() => handleAddOption(setOchpCounter, ochpCounter)}
        // onAddClick={() => handleAddOption(setSelectedOchpViews, ochpCounter)}
        onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [ochpCounter, setOchpCounter])}

      />
    </div>
  );
};
