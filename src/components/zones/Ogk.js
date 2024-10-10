import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteIdLegenRusynokArray,
  deleteIdKoreniArray,
  deleteIdSynusyArray,
  deleteIdKupalaDiadragmyArray,
  deleteIdCorArray,
  deleteIdOgkZakliuchenniaArray,
  
} from "../redux/slices/ogkSliseReducer";

import { FormFloatingSelect } from "../FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { ogkViews } from "../../data/ogkViews";
import { ogkNormaNenorma } from "../../data/OGK_notNorma/ogkNormaNenorma";

import { legenRysunok } from "../../data/OGK_notNorma/legenRysunok";
import { koreni } from "../../data/OGK_notNorma/koreni";
import { synusy } from "../../data/OGK_notNorma/synusy";
import { kupalaDiadragmy } from "../../data/OGK_notNorma/kupalaDiadragmy";
import { cor } from "../../data/OGK_notNorma/cor";
import { ogkZakliuchennia } from "../../data/OGK_notNorma/ogkZakliuchennia";

import { AddOptionBlock } from "../AddOptionBlock";

export const Ogk = ({ descriptionOnly }) => {
  const [selectedZone, setSelectedZone] = useState("ОГК");
  const [selectedOgkViews, setSelectedOgkViews] = useState("Оглядова");
  const [selectednormaNenorma, setSelectednormaNenorma] = useState("Норма");

  const [legenRysunokCounter, setlegenRysunokCounter] = useState([{ id: uuidv4() }]);
  const [koreniCounter, setKoreniCounter] = useState([{ id: uuidv4() }]);
  const [synusyCounter, setSynusyCounter] = useState([{ id: uuidv4() }]);
  const [kupalaDiadragmyCounter, setKupalaDiadragmyCounter] = useState([{ id: uuidv4() }]);
  const [corCounter, setCorCounter] = useState([{ id: uuidv4() }]);
  const [ogkZakliuchenniaCounter, setOgkZakliuchenniaCounter] = useState([{ id: uuidv4() }]);

  const handleAddOption = (setter, counter, setCounter) => {
    setter([...counter, { id: uuidv4() }]);
  };
  
  const dispatch = useDispatch();

// const handleDeleteOption = (deleteId) => {
//   // Фильтруем массив, оставляя только те элементы, у которых id не равен deleteId
//   const updatedLegenRysunokCounter = legenRysunokCounter.filter((item) => item.id !== deleteId);
  
//   // Устанавливаем обновленное значение состояния
//   setlegenRysunokCounter(updatedLegenRysunokCounter);

//   const updatedKoreniCounter = koreniCounter.filter((item) => item.id !== deleteId);
//   setKoreniCounter(updatedKoreniCounter);

// }
const handleDeleteOption = (deleteId, resetCounter) => {
 // Проверяем длину массива, выполняем удаление только если длина не равна 1
//  console.log('handleDeleteOption deleteId', deleteId);
 if (resetCounter[0].length !== 1) {
  // Фильтруем массив, оставляя только те элементы, у которых id не равен deleteId
  const updatedCounter = resetCounter[0].filter((item) => item.id !== deleteId);

  // Устанавливаем обновленное значение состояния
  resetCounter[1](updatedCounter);
  // Удаление айтема из редюсера
// -----------ОГК start---------

    
      dispatch(deleteIdLegenRusynokArray({ floatingId: deleteId }));     
      dispatch(deleteIdKoreniArray({ floatingId: deleteId }));
      dispatch(deleteIdSynusyArray({ floatingId: deleteId }));
      dispatch(deleteIdKupalaDiadragmyArray({ floatingId: deleteId }));
      dispatch(deleteIdCorArray({ floatingId: deleteId }));
      dispatch(deleteIdOgkZakliuchenniaArray({ floatingId: deleteId }));
  
      
    // -----------ОГК end---------

}
}
  return (
    <div>
      {/* <FormFloatingSelect items={ogkViews} onZoneSelect={setSelectedOgkViews} label="Проекція" /> */}
      {!descriptionOnly && (
        <FormFloatingSelect items={ogkViews} onZoneSelect={setSelectedOgkViews} label="Проекція" />
      )}
      <FormFloatingSelect items={ogkNormaNenorma} onZoneSelect={setSelectednormaNenorma} label="Норма/Не норма" />
      
      {selectednormaNenorma === "Не норма" ? (
        <div className=" ">
          <AddOptionBlock
            items={legenRysunok}
            onZoneSelect={setSelectedOgkViews}
            label="Легеневий рисунок"
            counter={legenRysunokCounter}
            onAddClick={() => handleAddOption(setlegenRysunokCounter, legenRysunokCounter, setlegenRysunokCounter)}
            // onDeleteClick={(deleteId) => handleDeleteOption(deleteId)}
            onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [legenRysunokCounter, setlegenRysunokCounter])}
          />
          <AddOptionBlock
            items={koreni}
            onZoneSelect={setSelectedOgkViews}
            label="Корені"
            counter={koreniCounter}
            onAddClick={() => handleAddOption(setKoreniCounter, koreniCounter, setKoreniCounter)}
            onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [koreniCounter, setKoreniCounter])}
          />
          <AddOptionBlock
            items={synusy}
            onZoneSelect={setSelectedOgkViews}
            label="Синуси"
            counter={synusyCounter}
            onAddClick={() => handleAddOption(setSynusyCounter, synusyCounter, setSynusyCounter)}
            onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [synusyCounter, setSynusyCounter])}
          />
          <AddOptionBlock
            items={kupalaDiadragmy}
            onZoneSelect={setSelectedOgkViews}
            label="Купола діафрагми"
            counter={kupalaDiadragmyCounter}
            onAddClick={() => handleAddOption(setKupalaDiadragmyCounter, kupalaDiadragmyCounter, setKupalaDiadragmyCounter)}
            onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [kupalaDiadragmyCounter, setKupalaDiadragmyCounter])}
          />
          <AddOptionBlock
            items={cor}
            onZoneSelect={setSelectedOgkViews}
            label="Cor-"
            counter={corCounter}
            onAddClick={() => handleAddOption(setCorCounter, corCounter, setCorCounter)}
            onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [corCounter, setCorCounter])}
          />
          <AddOptionBlock
            items={ogkZakliuchennia}
            onZoneSelect={setSelectedOgkViews}
            label="Заключення"
            counter={ogkZakliuchenniaCounter}
            onAddClick={() => handleAddOption(setOgkZakliuchenniaCounter, ogkZakliuchenniaCounter, setOgkZakliuchenniaCounter)}
            onDeleteClick={(deleteId) => handleDeleteOption(deleteId, [ogkZakliuchenniaCounter, setOgkZakliuchenniaCounter])}
          />
        </div>
      ) : null}
    </div>
  );
};
