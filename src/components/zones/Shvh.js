import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { FormFloatingSelect } from "../FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { shvhNormaNenorma } from "../../data/SHVH/shvhNormaNenorma";

import { fiziologLordoz } from "../../data/universal_notNorma/fiziologLordoz";
import { seredynnaVis } from "../../data/universal_notNorma/seredynnaVis";
import { vysotaTilHrebtsivShvh } from "../../data/SHVH/SHNH_notNorma/vysotaTilHrebtsivShvh";
import { mizhkhrebtseviPromizhky } from "../../data/universal_notNorma/mizhkhrebtseviPromizhky";
import { zamykaiuchiPlastynkyTilKhrebtsiv } from "../../data/universal_notNorma/zamykaiuchiPlastynkyTilKhrebtsiv";
import { fasetkoviUnkovertSuhlShchelyny } from "../../data/universal_notNorma/fasetkoviUnkovertSuhlShchelyny";

import { AddOptionBlock } from "../AddOptionBlock";
import { shvhNenormaItems } from "../../data/SHVH/shvhNenormaItems";
import { zakliuchenniaShvh } from "../../data/SHVH/SHNH_notNorma/zakliuchenniaShvh";
import {
  deleteIdSemicolonUniversalArray_1,
  deleteIdCommaUniversalArray_1,
  deleteIdCommaUniversalArray_2,
  deleteIdCommaUniversalArray_4,
  deleteIdCommaUniversalArray_5,
  deleteIdCommaUniversalArray_6,
  deleteIdSvhVysotaTilHrebtsivArray,
} from "../redux/slices/universalSliceReducer";

export const Shvh = () => {
  // const [selectedZone, setSelectedZone] = useState("ОГК");
  const [selectedShvhViews, setSelectedShvhViews] = useState("");
  const [selectednormaNenorma, setSelectednormaNenorma] = useState(
    shvhNormaNenorma[0]
  );

  const [fiziologLordozCounter, setFiziologLordozCounter] = useState([
    { id: uuidv4() },
  ]);
  const [seredynnaVisCounter, setSeredynnaVisCounter] = useState([
    { id: uuidv4() },
  ]);
  const [vysotaTilHrebtsivCounter, setVysotaTilHrebtsivCounter] = useState([
    { id: uuidv4() },
  ]);
  const [mizhkhrebtseviPromizhkyCounter, setMizhkhrebtseviPromizhkyCounter] =
    useState([{ id: uuidv4() }]);
  const [
    zamykaiuchiPlastynkyTilKhrebtsivCounter,
    setZamykaiuchiPlastynkyTilKhrebtsivCounter,
  ] = useState([{ id: uuidv4() }]);
  const [
    fasetkoviUnkovertSuhlShchelynyCounter,
    setFasetkoviUnkovertSuhlShchelynyCounter,
  ] = useState([{ id: uuidv4() }]);
  const [zakliuchenniaShvhCounter, setZakliuchenniaShvhCounter] = useState([
    { id: uuidv4() },
  ]);

  const handleAddOption = (setter, counter, setCounter) => {
    setter([...counter, { id: uuidv4() }]);
  };
  const dispatch = useDispatch();
  const handleDeleteOption = (deleteId, resetCounter) => {
    // Проверяем длину массива, выполняем удаление только если длина не равна 1
    //  console.log('handleDeleteOption deleteId', deleteId);
    if (resetCounter[0].length !== 1) {
      // Фильтруем массив, оставляя только те элементы, у которых id не равен deleteId
      const updatedCounter = resetCounter[0].filter(
        (item) => item.id !== deleteId
      );

      // Устанавливаем обновленное значение состояния
      resetCounter[1](updatedCounter);
      // Удаление айтема из редюсера
      dispatch(deleteIdCommaUniversalArray_1({ floatingId: deleteId }));
      dispatch(deleteIdCommaUniversalArray_2({ floatingId: deleteId }));
      dispatch(deleteIdCommaUniversalArray_4({ floatingId: deleteId }));
      dispatch(deleteIdCommaUniversalArray_5({ floatingId: deleteId }));
      dispatch(deleteIdCommaUniversalArray_6({ floatingId: deleteId }));
      dispatch(deleteIdSvhVysotaTilHrebtsivArray({ floatingId: deleteId }));
      dispatch(deleteIdSemicolonUniversalArray_1({ floatingId: deleteId }));
    }
  };
  return (
    <div className="">
      <FormFloatingSelect
        items={shvhNormaNenorma}
        onZoneSelect={setSelectednormaNenorma}
        label="Норма/Не норма"
      />
      {selectednormaNenorma === "Не норма" ? (
        <div className=" ">
          <AddOptionBlock
            items={fiziologLordoz}
            onZoneSelect={setSelectedShvhViews}
            label={shvhNenormaItems[0]}
            counter={fiziologLordozCounter}
            onAddClick={() =>
              handleAddOption(
                setFiziologLordozCounter,
                fiziologLordozCounter,
                setFiziologLordozCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                fiziologLordozCounter,
                setFiziologLordozCounter,
              ])
            }
          />
          <AddOptionBlock
            items={seredynnaVis}
            onZoneSelect={setSelectedShvhViews}
            label={shvhNenormaItems[1]}
            counter={seredynnaVisCounter}
            onAddClick={() =>
              handleAddOption(
                setSeredynnaVisCounter,
                seredynnaVisCounter,
                setSeredynnaVisCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                seredynnaVisCounter,
                setSeredynnaVisCounter,
              ])
            }
          />
          <AddOptionBlock
            items={vysotaTilHrebtsivShvh}
            onZoneSelect={setSelectedShvhViews}
            // label="Висота тіл хребців"
            label={shvhNenormaItems[2]}
            counter={vysotaTilHrebtsivCounter}
            onAddClick={() =>
              handleAddOption(
                setVysotaTilHrebtsivCounter,
                vysotaTilHrebtsivCounter,
                setVysotaTilHrebtsivCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                vysotaTilHrebtsivCounter,
                setVysotaTilHrebtsivCounter,
              ])
            }
          />
          <AddOptionBlock
            items={mizhkhrebtseviPromizhky}
            onZoneSelect={setSelectedShvhViews}
            // label="Міжхребцеві проміжки"
            label={shvhNenormaItems[3]}
            counter={mizhkhrebtseviPromizhkyCounter}
            onAddClick={() =>
              handleAddOption(
                setMizhkhrebtseviPromizhkyCounter,
                mizhkhrebtseviPromizhkyCounter,
                setMizhkhrebtseviPromizhkyCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                mizhkhrebtseviPromizhkyCounter,
                setMizhkhrebtseviPromizhkyCounter,
              ])
            }
          />
          <AddOptionBlock
            items={zamykaiuchiPlastynkyTilKhrebtsiv}
            onZoneSelect={setSelectedShvhViews}
            // label="Замикаючі пластинки тіл хребців"
            label={shvhNenormaItems[4]}
            counter={zamykaiuchiPlastynkyTilKhrebtsivCounter}
            onAddClick={() =>
              handleAddOption(
                setZamykaiuchiPlastynkyTilKhrebtsivCounter,
                zamykaiuchiPlastynkyTilKhrebtsivCounter,
                setZamykaiuchiPlastynkyTilKhrebtsivCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                zamykaiuchiPlastynkyTilKhrebtsivCounter,
                setZamykaiuchiPlastynkyTilKhrebtsivCounter,
              ])
            }
          />
          <AddOptionBlock
            items={fasetkoviUnkovertSuhlShchelyny}
            onZoneSelect={setSelectedShvhViews}
            // label="Фасеткові та унковертебральні суглобові щілини"
            label={shvhNenormaItems[5]}
            counter={fasetkoviUnkovertSuhlShchelynyCounter}
            onAddClick={() =>
              handleAddOption(
                setFasetkoviUnkovertSuhlShchelynyCounter,
                fasetkoviUnkovertSuhlShchelynyCounter,
                setFasetkoviUnkovertSuhlShchelynyCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                fasetkoviUnkovertSuhlShchelynyCounter,
                setFasetkoviUnkovertSuhlShchelynyCounter,
              ])
            }
          />
          <AddOptionBlock
            items={zakliuchenniaShvh}
            onZoneSelect={setSelectedShvhViews}
            label={shvhNenormaItems[6]} // Заключення:
            counter={zakliuchenniaShvhCounter}
            onAddClick={() =>
              handleAddOption(
                setZakliuchenniaShvhCounter,
                zakliuchenniaShvhCounter,
                setZakliuchenniaShvhCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                zakliuchenniaShvhCounter,
                setZakliuchenniaShvhCounter,
              ])
            }
          />
        </div>
      ) : null}
    </div>
  );
};
