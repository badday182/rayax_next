import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  editZone,
  editProaction,
  editSide,
  editNorma,
} from "./redux/slices/zoneInfoSliseReducer";

import {
  editLegenRusynokArray,
  editKoreniArray,
  editSynusyArray,
  editKupalaDiadragmyArray,
  editCorArray,
  editOgkZakliuchenniaArray,
  resetogkSliseReducer,
} from "./redux/slices/ogkSliseReducer";

import {
  editCommaUniversalArray_1,
  editCommaUniversalArray_2,
  editCommaUniversalArray_3,
  editCommaUniversalArray_4,
  editCommaUniversalArray_5,
  editCommaUniversalArray_6,
  editSemicolonUniversalArray_1,
  editSvhVysotaTilHrebtsivArray,
  resetUniversalSliceReducer,
} from "./redux/slices/universalSliceReducer";

import { editCherepNormaNenormaArray } from "./redux/slices/cherepSliseReducer";

import { zones } from "../data/zones";
import { zonesWithOnly2Projection } from "../data/zonesWithOnly2Projection";
import { zonesWithOnlyDirectProjection } from "../data/zonesWithOnlyDirectProjection";
import { sides } from "../data/sides";
import { ogkViews } from "../data/ogkViews";
import { plechKulshSuglobViews } from "../data/plechovuyKulshovuySuglobViews";

import { ogkNormaNenorma } from "../data/OGK_notNorma/ogkNormaNenorma";
import { legenRysunok } from "../data/OGK_notNorma/legenRysunok";
import { koreni } from "../data/OGK_notNorma/koreni";
import { synusy } from "../data/OGK_notNorma/synusy";
import { kupalaDiadragmy } from "../data/OGK_notNorma/kupalaDiadragmy";
import { cor } from "../data/OGK_notNorma/cor";
import { ogkZakliuchennia } from "../data/OGK_notNorma/ogkZakliuchennia";

import { cherepViews } from "../data/Cherep/cherepViews";

import { ogkNenormaItems } from "../data/OGK_notNorma/ogkNenormaItems";
import { ppnViews } from "../data/PPN/ppnViews";

import { fiziologLordoz } from "../data/universal_notNorma/fiziologLordoz";
import { shvhNenormaItems } from "../data/SHVH/shvhNenormaItems";
import { shvhNormaNenorma } from "../data/SHVH/shvhNormaNenorma";
import { seredynnaVis } from "../data/universal_notNorma/seredynnaVis";
import { vysotaTilHrebtsivShvh } from "../data/SHVH/SHNH_notNorma/vysotaTilHrebtsivShvh";
import { mizhkhrebtseviPromizhky } from "../data/universal_notNorma/mizhkhrebtseviPromizhky";
import { zamykaiuchiPlastynkyTilKhrebtsiv } from "../data/universal_notNorma/zamykaiuchiPlastynkyTilKhrebtsiv";
import { fasetkoviUnkovertSuhlShchelyny } from "../data/universal_notNorma/fasetkoviUnkovertSuhlShchelyny";
import { zakliuchenniaShvh } from "../data/SHVH/SHNH_notNorma/zakliuchenniaShvh";

import { gvhNormaNenorma } from "../data/GVH/gvhNormaNenorma";
import { fiziologKifos } from "../data/GVH/GVH_notNorma/fiziologKifos";
import { zakliuchenniaGvh } from "../data/GVH/GVH_notNorma/zakliuchenniaGvh";
import { gvhNenormaItems } from "../data/GVH/gvhNenormaItems";
import { vysotaTilHrebtsivGvh } from "../data/GVH/GVH_notNorma/vysotaTilHrebtsivGvh";
import { pvhNormaNenorma } from "../data/PVH/pvhNormaNenorma";
import { zakliuchenniaPvh } from "../data/PVH/PVH_notNorma/zakliuchenniaPvh";
import { ochpViews } from "../data/OCHP/ochpViews";
import { plechovyiSuhlobViews } from "../data/PLECHOVYISUHLOB/plechovyiSuhlobViews";
import { kliuchytsiaViews } from "../data/KLIUCHYTSIA/kliuchytsiaViews";
import { rebraViews } from "../data/REBRA/rebraViews";
import { liktovyiSuhlobViews } from "../data/LIKTOVYISUHLOB/liktovyiSuhlobViews";
import { promenevoZapIastkovyiSuhlobViews } from "../data/PROMENZAPIaSTKSUHLOB/promenevoZapIastkovyiSuhlobViews";
import { kystViews } from "../data/KYST/kystViews";
import { kistokTazuViews } from "../data/KISTOKTAZU/kistokTazuViews";
import { kulshovyiSuhlobViews } from "../data/KULShOVYISUHLOB/kulshovyiSuhlobViews";
import { kolinnyiSuhlobViews } from "../data/KOLINNYISUHLOB/kolinnyiSuhlobViews";
import { homilkovoStopnyiSuhlobViews } from "../data/HOMILKOVOSTOPNYISUHLOB/homilkovoStopnyiSuhlobViews";
import { stopaViews } from "../data/STOPA/stopaViews";

import { peredniViddilyStopyViews } from "../data/PEREDNIVIDDILYSTOPY/peredniViddilyStopyViews";
import { firstElements } from "../data/viewsToEditSemicolUnivArray_1";
import { vysotaTilHrebtsivPvh } from "../data/PVH/PVH_notNorma/vysotaTilHrebtsivPvh";
import { editDescriptionOnly } from "./redux/slices/descriptionOnlyReducer";

export function FormFloatingSelect({ id, items, label, onZoneSelect }) {
  const [floatingId] = useState(id);
  const [selectedValue, setSelectedValue] = useState('');
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  useEffect(() => {
    // Если значение выбрано, скрываем плейсхолдер
    if (selectedValue !== '') {
      setPlaceholderVisible(false);
    }
  }, [selectedValue]);

  const dispatch = useDispatch();

  const itemGenerator = () => {
    const fixedZone = (item) => {
      return item.replace("$'", "'");
    };

    return items.map((item) => (
      // <option key={fixedZone(item)} value={fixedZone(item)}>
      <option key={`${fixedZone(item)}-${floatingId}`} value={fixedZone(item)}>
        {fixedZone(item)}
      </option>
    ));
  };

  useEffect(() => {
    // Имитация выбора по умолчанию - сразу dispatch текст c id из селекта

    // if (cherepViews[0] === items[0]) {
    //   dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone: items[0] }));
    //   // console.log('floatingId', floatingId);
    //   // console.log('items[0]', items[0]);
    // }
    // if (ppnViews[0] === items[0]) {
    //   dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone: items[0] }));
    // }

    // Создаем массив из всех первых элементов списков, которые перечисляются через ";"
    // const firstElements = viewsToEditSemicolUnivArray_1.map(viewsArray => viewsArray[0]);
    //dispatch текст c id из селекта
    if (firstElements.includes(items[0])) {
      dispatch(
        editSemicolonUniversalArray_1({ floatingId, selectedZone: items[0] })
      );
    }
  }, []);

  const handleZoneSelect = (event) => {
    const selectedZone = event.target.value;
    setSelectedValue(selectedZone); // Если значение выбрано, потом меняем setPlaceholderVisible на false
    onZoneSelect(selectedZone);



    // В случае если пользователь поменяют зону исследования то все Reducerы сбрасываются
    if (zones.includes(selectedZone)) {
      // console.log('selectedZone', selectedZone);
      dispatch(editDescriptionOnly(selectedZone));


      dispatch(resetUniversalSliceReducer());
      dispatch(resetogkSliseReducer());
      dispatch(editZone(selectedZone));
    }

    //Нужно сбросить SemicolonUniversalArray_1 для Того чтобы убрать значение по умолчанию пр
    if (selectedZone === "Не норма") {
      dispatch(resetUniversalSliceReducer());
    }

    if (zonesWithOnly2Projection.includes(selectedZone)) {
      dispatch(editProaction("В 2-х проекціях"));
    }
    if (zonesWithOnlyDirectProjection.includes(selectedZone)) {
      dispatch(editProaction("Пряма"));
    }
    if (selectedZone === "Ребра") {
      dispatch(editProaction("Коса"));
    }
    if (
      selectedZone === "Плечовий суглоб" ||
      selectedZone === "Кульшовий суглоб"
    ) {
      dispatch(editProaction("Пряма"));
    }
    if (ogkViews.includes(selectedZone)) {
      dispatch(editProaction(selectedZone));
    }
    if (sides.includes(selectedZone)) {
      dispatch(editSide(selectedZone));
    }
    if (plechKulshSuglobViews.includes(selectedZone)) {
      dispatch(editProaction(selectedZone));
      // console.log(selectedZone);
    }

    // -----------ОГК start---------

    // if (label === "Легеневий рисунок") {
    //   firstItem = true
    // }
    if (ogkNormaNenorma.includes(selectedZone)) {
      dispatch(editNorma(selectedZone));
      // console.log(selectedZone);
    }
    if (legenRysunok.includes(selectedZone)) {
      // dispatch(editLegenRusynokId({ floatingId }));
      dispatch(editLegenRusynokArray({ floatingId, selectedZone }));
      // console.log(`selectedZone: ${selectedZone}, id: ${floatingId}`);
    }
    if (koreni.includes(selectedZone)) {
      dispatch(editKoreniArray({ floatingId, selectedZone }));
    }
    if (synusy.includes(selectedZone)) {
      dispatch(editSynusyArray({ floatingId, selectedZone }));
    }
    if (kupalaDiadragmy.includes(selectedZone)) {
      dispatch(editKupalaDiadragmyArray({ floatingId, selectedZone }));
    }
    if (cor.includes(selectedZone)) {
      dispatch(editCorArray({ floatingId, selectedZone }));
    }
    if (ogkZakliuchennia.includes(selectedZone)) {
      dispatch(editOgkZakliuchenniaArray({ floatingId, selectedZone }));
    }
    // -----------ОГК end---------

    // -----------Череп start---------
    if (cherepViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Череп end---------

    // -----------ППН start---------
    if (ppnViews.includes(selectedZone)) {
      // dispatch(editPpnNormaNenormaArray({ floatingId, selectedZone }));
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
      // console.log(`selectedZone: ${selectedZone}, id: ${floatingId}`);
    }
    // -----------ППН end---------

    // -----------ШВХ start---------
    if (shvhNormaNenorma.includes(selectedZone)) {
      dispatch(editNorma(selectedZone));
      // console.log(selectedZone);
    }

    if (fiziologLordoz.includes(selectedZone)) {
      // dispatch(editLegenRusynokId({ floatingId }));
      dispatch(editCommaUniversalArray_1({ floatingId, selectedZone }));
      // console.log(`selectedZone: ${selectedZone}, id: ${floatingId}`);
    }
    if (seredynnaVis.includes(selectedZone)) {
      dispatch(editCommaUniversalArray_2({ floatingId, selectedZone }));
    }
    if (vysotaTilHrebtsivShvh.includes(selectedZone)) {
      dispatch(editSvhVysotaTilHrebtsivArray({ floatingId, selectedZone }));
    }
    if (mizhkhrebtseviPromizhky.includes(selectedZone)) {
      dispatch(editCommaUniversalArray_4({ floatingId, selectedZone }));
    }
    if (zamykaiuchiPlastynkyTilKhrebtsiv.includes(selectedZone)) {
      dispatch(editCommaUniversalArray_5({ floatingId, selectedZone }));
    }
    if (fasetkoviUnkovertSuhlShchelyny.includes(selectedZone)) {
      dispatch(editCommaUniversalArray_6({ floatingId, selectedZone }));
    }
    if (zakliuchenniaShvh.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------ШВХ end---------

    // -----------ГВХ start--------
    if (gvhNormaNenorma.includes(selectedZone)) {
      dispatch(editNorma(selectedZone));
      // console.log(selectedZone);
    }
    if (fiziologKifos.includes(selectedZone)) {
      // dispatch(editLegenRusynokId({ floatingId }));
      dispatch(editCommaUniversalArray_1({ floatingId, selectedZone }));
      // console.log(`selectedZone: ${selectedZone}, id: ${floatingId}`);
    }

    //seredynnaVis vysotaTilHrebtsivGvh mizhkhrebtseviPromizhky zamykaiuchiPlastynkyTilKhrebtsiv fasetkoviUnkovertSuhlShchelyny используются из ШВХ ))

    if (zakliuchenniaGvh.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------ГВХ end---------

    // -----------ПВХ start--------
    if (pvhNormaNenorma.includes(selectedZone)) {
      dispatch(editNorma(selectedZone));
      // console.log(selectedZone);
    }

    if (vysotaTilHrebtsivPvh.includes(selectedZone)) {
      dispatch(editSvhVysotaTilHrebtsivArray({ floatingId, selectedZone }));
    }
    //seredynnaVis vysotaTilHrebtsivGvh mizhkhrebtseviPromizhky zamykaiuchiPlastynkyTilKhrebtsiv fasetkoviUnkovertSuhlShchelyny используются из ШВХ ))

    if (zakliuchenniaPvh.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------ПВХ end---------

    // -----------ОЧП start--------
    if (ochpViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------ОЧП end---------

    // -----------плечовийСуглоб start--------
    if (plechovyiSuhlobViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------плечовийСуглоб end---------

    // -----------Ключиця start--------
    if (kliuchytsiaViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Ключиця end---------
    // -----------Ребра start--------
    if (rebraViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Ліктьовий суглоб end---------
    if (liktovyiSuhlobViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Ліктьовий суглоб end---------
    // -----------Променево-зап'ястковий суглоб end---------
    if (promenevoZapIastkovyiSuhlobViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Променево-зап'ястковий суглоб end---------
    // -----------Кисть end---------
    if (kystViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Кисть end---------
    // -----------Кісток тазу end---------
    if (kistokTazuViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Кісток тазу end---------
    // -----------Кульшовий суглоб тазу end---------
    if (kulshovyiSuhlobViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Кульшовий суглоб тазу end---------
    // -----------Колінний суглоб  end---------
    if (kolinnyiSuhlobViews.includes(selectedZone)) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Колінний суглоб end---------

    // -----------Гомілковостопний суглоб end---------
    if (
      homilkovoStopnyiSuhlobViews.includes(selectedZone) ||
      stopaViews.includes(selectedZone) ||
      peredniViddilyStopyViews.includes(selectedZone)
    ) {
      dispatch(editSemicolonUniversalArray_1({ floatingId, selectedZone }));
    }
    // -----------Гомілковостопний суглоб end---------
  };
  return (
    <FloatingLabel className="mb-2" controlId={floatingId} label={label}>
      <Form.Select id={floatingId} onChange={handleZoneSelect}>
        {/* ---------------если выбрано что-то из ненормы ОГК-------------- */}
        {ogkNenormaItems.includes(label) ? (
          // <option value="">--виберіть опцію--</option>
          placeholderVisible && <option value="">--виберіть опцію--</option>
        ) : null}

        {/* --если выбран Череп или ППН (все пришедшие айтемы = айтемам черепа/ппн)--- */}
        {/* {items === ppnViews  ? (
          <option value="">--виберіть опцію--</option>
        ) : null} */}
        {/* --если выбрано что-то из ненормы ШВХ --- */}
        {/* ---------------если выбрано что-то из ненормы ОГК-------------- */}
        {shvhNenormaItems.includes(label) || gvhNenormaItems.includes(label) ? (
          // <option value="">--виберіть опцію--</option>
          placeholderVisible && <option value="">--виберіть опцію--</option>
        ) : null}

        {itemGenerator()}
      </Form.Select>
    </FloatingLabel>
  );
}
