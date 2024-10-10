import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { kolinnyiSuhlobViews } from "../../data/KOLINNYISUHLOB/kolinnyiSuhlobViews";
import { AddOptionBlock } from "../AddOptionBlock";
import { useDispatch } from "react-redux";
import { deleteIdSemicolonUniversalArray_1 } from "../redux/slices/universalSliceReducer";

export const KolinnyiSuhlob = () => {
  const [selectedKolinnyiSuhlobViews, setSelectedKolinnyiSuhlobViews] = useState(
    kolinnyiSuhlobViews[0]
  );
  const [kolinnyiSuhlobCounter, setKolinnyiSuhlobCounter] = useState([{ id: uuidv4() }]);

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
        items={kolinnyiSuhlobViews}
        onZoneSelect={setSelectedKolinnyiSuhlobViews}
        label="Норма/Не норма"
        counter={kolinnyiSuhlobCounter}
        onAddClick={() => handleAddOption(setKolinnyiSuhlobCounter, kolinnyiSuhlobCounter)}
        onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [kolinnyiSuhlobCounter, setKolinnyiSuhlobCounter])}
      />
    </div>
  );
};
