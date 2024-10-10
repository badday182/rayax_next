import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {gvhNormaNenorma} from "../../data/GVH/gvhNormaNenorma";

import { fiziologKifos } from "../../data/GVH/GVH_notNorma/fiziologKifos";
import { seredynnaVis } from "../../data/universal_notNorma/seredynnaVis";
import { vysotaTilHrebtsivGvh } from "../../data/GVH/GVH_notNorma/vysotaTilHrebtsivGvh";
import { mizhkhrebtseviPromizhky } from "../../data/universal_notNorma/mizhkhrebtseviPromizhky";
import { zamykaiuchiPlastynkyTilKhrebtsiv } from "../../data/universal_notNorma/zamykaiuchiPlastynkyTilKhrebtsiv";
import { fasetkoviUnkovertSuhlShchelyny } from "../../data/universal_notNorma/fasetkoviUnkovertSuhlShchelyny";

import { AddOptionBlock } from "../AddOptionBlock";
import { gvhNenormaItems } from "../../data/GVH/gvhNenormaItems";
import { zakliuchenniaGvh } from "../../data/GVH/GVH_notNorma/zakliuchenniaGvh";

import { useDispatch } from "react-redux";
import {
  deleteIdSemicolonUniversalArray_1,
  deleteIdCommaUniversalArray_1,
  deleteIdCommaUniversalArray_2,
  deleteIdCommaUniversalArray_4,
  deleteIdCommaUniversalArray_5,
  deleteIdCommaUniversalArray_6,
  deleteIdSvhVysotaTilHrebtsivArray,
} from "../redux/slices/universalSliceReducer";

export const Gvh = () => {
  const [selectedGvhViews, setSelectedGvhViews] = useState("");
  const [selectednormaNenorma, setSelectednormaNenorma] = useState(
    gvhNormaNenorma[0]
  );

  const [fiziologKifosCounter, setfiziologKifosCounter] = useState([
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
  const [zakliuchenniaGvhCounter, setZakliuchenniaGvhCounter] = useState([
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
      <FormFloatingSelec
        items={gvhNormaNenorma}
        onZoneSelect={setSelectednormaNenorma}
        label="Норма/Не норма"
      />
      {selectednormaNenorma === "Не норма" ? (
        <div className=" ">
          <AddOptionBlock
            items={fiziologKifos}
            onZoneSelect={setSelectedGvhViews}
            label={gvhNenormaItems[0]}
            counter={fiziologKifosCounter}
            onAddClick={() =>
              handleAddOption(
                setfiziologKifosCounter,
                fiziologKifosCounter,
                setfiziologKifosCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                fiziologKifosCounter,
                setfiziologKifosCounter,
              ])
            }
          />
          <AddOptionBlock
            items={seredynnaVis}
            onZoneSelect={setSelectedGvhViews}
            label={gvhNenormaItems[1]}
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
            items={vysotaTilHrebtsivGvh}
            onZoneSelect={setSelectedGvhViews}
            // label="Висота тіл хребців"
            label={gvhNenormaItems[2]}
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
            onZoneSelect={setSelectedGvhViews}
            // label="Міжхребцеві проміжки"
            label={gvhNenormaItems[3]}
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
            onZoneSelect={setSelectedGvhViews}
            // label="Замикаючі пластинки тіл хребців"
            label={gvhNenormaItems[4]}
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
            onZoneSelect={setSelectedGvhViews}
            // label="Фасеткові та унковертебральні суглобові щілини"
            label={gvhNenormaItems[5]}
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
            items={zakliuchenniaGvh}
            onZoneSelect={setSelectedGvhViews}
            label={gvhNenormaItems[6]} // Заключення:
            counter={zakliuchenniaGvhCounter}
            onAddClick={() =>
              handleAddOption(
                setZakliuchenniaGvhCounter,
                zakliuchenniaGvhCounter,
                setZakliuchenniaGvhCounter
              )
            }
            onDeleteClick={(deleteId) =>
              handleDeleteOption(deleteId, [
                zakliuchenniaGvhCounter,
                setZakliuchenniaGvhCounter,
              ])
            }
          />
        </div>
      ) : null}
    </div>
  );
};
