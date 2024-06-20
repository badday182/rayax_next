import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { kistokTazuViews } from "../data/KISTOKTAZU/kistokTazuViews";
import { AddOptionBlock } from "./AddOptionBlock";
import { FormFloatingSelect } from "./FloatingLabel";

import { useDispatch } from "react-redux";
import { deleteIdSemicolonUniversalArray_1 } from "./redux/slices/universalSliceReducer";

export const KistokTazu = () => {
  const [selectedKistokTazuViews, setSelectedKistokTazuViews] = useState(
    kistokTazuViews[0]
  );
  const [kistokTazuCounter, setKistokTazuCounter] = useState([{ id: uuidv4() }]);

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

//   return (
//     <div className="">
//       <AddOptionBlock
//         items={kistokTazuViews}
//         onZoneSelect={setSelectedKistokTazuViews}
//         label="Норма/Не норма"
//         counter={kistokTazuCounter}
//         onAddClick={() => handleAddOption(setKistokTazuCounter, kistokTazuCounter)}
//         onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [kistokTazuCounter, setKistokTazuCounter])}
//       />
//     </div>
//   );
// };
return (
  <div className="b1">
    <div className="mb-2 w-100">
      {kistokTazuCounter.map((option) => (
        <div key={option.id} className="itemZones addOption">
          <FormFloatingSelect
            key={option.id}
            id={option.id}
            items={kistokTazuViews}
            onZoneSelect={setSelectedKistokTazuViews}
            label={"Норма/Не норма"}
          />
        </div>
      ))}
    </div>
     </div>
);
};