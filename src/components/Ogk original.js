import React, { useState, useEffect } from "react";

import { FormFloatingSelect } from "./FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { zones } from "../data/zones";
import { ogkViews } from "../data/ogkViews";
import { ogkNormaNenorma } from "../data/OGK_notNorma/ogkNormaNenorma";
import { legenRysunok } from "../data/OGK_notNorma/legenRysunok";
import { koreni } from "../data/OGK_notNorma/koreni";
import { synusy } from "../data/OGK_notNorma/synusy";
import { kupalaDiadragmy } from "../data/OGK_notNorma/kupalaDiadragmy";
import { cor } from "../data/OGK_notNorma/cor";
import { ogkZakliuchennia } from "../data/OGK_notNorma/ogkZakliuchennia";

import Button from "react-bootstrap/Button";

export const Ogk = () => {
  const [selectedZone, setSelectedZone] = useState("ОГК");

  const [selectedOgkViews, setSelectedOgkViews] = useState("Оглядова");
  const [selectednormaNenorma, setSelectednormaNenorma] = useState("Норма");

  const [legenRysunokCounter, setlegenRysunokCounter] = useState([
    { id: uuidv4() },
  ]);
  const handleAddOptionLegenRysunok = () => {
    setlegenRysunokCounter((prevCounter) => [...prevCounter, { id: uuidv4() }]);
  };

  const [koreniCounter, setKoreniCounter] = useState([{ id: uuidv4() }]);
  const handleAddKoreni = () => {
    setKoreniCounter((prevCounter) => [...prevCounter, { id: uuidv4() }]);
  };

  const [synusyCounter, setSynusyCounter] = useState([{ id: uuidv4() }]);
  const handleAddSynusy = () => {
    setSynusyCounter((prevCounter) => [...prevCounter, { id: uuidv4() }]);
  };
  const [kupalaDiadragmyCounter, setKupalaDiadragmyCounter] = useState([
    { id: uuidv4() },
  ]);
  const handleAddKupalaDiadragmy = () => {
    setKupalaDiadragmyCounter((prevCounter) => [
      ...prevCounter,
      { id: uuidv4() },
    ]);
  };
  const [corCounter, setCorCounter] = useState([{ id: uuidv4() }]);
  const handleAddCor = () => {
    setCorCounter((prevCounter) => [...prevCounter, { id: uuidv4() }]);
  };
  const [ogkZakliuchenniaCounter, setOgkZakliuchenniaCounter] = useState([
    { id: uuidv4() },
  ]);
  const handleAddOgkZakliuchennia = () => {
    setOgkZakliuchenniaCounter((prevCounter) => [
      ...prevCounter,
      { id: uuidv4() },
    ]);
  };
  return (
    <div className="">
      {/* <FormFloatingSelect
        id="zone"
        items={zones}
        onZoneSelect={setSelectedZone}
        label="Зона дослідження"
      /> */}
      <FormFloatingSelect
        items={ogkViews}
        onZoneSelect={setSelectedOgkViews}
        label="Проекція"
      />
      <FormFloatingSelect
        items={ogkNormaNenorma}
        onZoneSelect={setSelectednormaNenorma}
        label="Норма/Не норма"
      />
      {selectedZone === "ОГК" && selectednormaNenorma === "Не норма" ? (
        <div className=" ">
          {/* ------------Легеневий рисунок-start--------- */}
          <div className="itemZones addOption ">
            <div className="">
              <div>
                {legenRysunokCounter.map((option) => (
                  <FormFloatingSelect
                    key={option.id}
                    items={legenRysunok}
                    onZoneSelect={setSelectedOgkViews}
                    label="Легеневий рисунок"
                  />
                ))}
              </div>
            </div>
            <Button
              variant="primary"
              className="zoneAddButton"
              onClick={handleAddOptionLegenRysunok}
            >
              Add
            </Button>{" "}
          </div>
          {/* ------------Легеневий рисунок-end--------- */}
          {/* ------------Корені-start--------- */}
          <div className="itemZones addOption ">
            <div className="">
              <div>
                {koreniCounter.map((option) => (
                  <FormFloatingSelect
                    key={option.id}
                    items={koreni}
                    onZoneSelect={setSelectedOgkViews}
                    label="Корені"
                  />
                ))}
              </div>
            </div>
            <Button
              variant="primary"
              className="zoneAddButton"
              onClick={handleAddKoreni}
            >
              Add
            </Button>{" "}
          </div>
          {/* ------------Корені-end--------- */}
          {/* ------------Синуси-start--------- */}
          <div className="itemZones addOption ">
            <div className="">
              <div>
                {synusyCounter.map((option) => (
                  <FormFloatingSelect
                    key={option.id}
                    items={synusy}
                    onZoneSelect={setSelectedOgkViews}
                    label="Синуси"
                  />
                ))}
              </div>
            </div>
            <Button
              variant="primary"
              className="zoneAddButton"
              onClick={handleAddSynusy}
            >
              Add
            </Button>{" "}
          </div>
          {/* ------------Синуси-end--------- */}
          {/* ------------купола діафрагми-start--------- */}
          <div className="itemZones addOption ">
            <div className="">
              <div>
                {kupalaDiadragmyCounter.map((option) => (
                  <FormFloatingSelect
                    key={option.id}
                    items={kupalaDiadragmy}
                    onZoneSelect={setSelectedOgkViews}
                    label="Купола діафрагми"
                  />
                ))}
              </div>
            </div>
            <Button
              variant="primary"
              className="zoneAddButton"
              onClick={handleAddKupalaDiadragmy}
            >
              Add
            </Button>{" "}
          </div>
          {/* ------------купола діафрагми-end--------- */}
          {/* ------------Cor-start--------- */}
          <div className="itemZones addOption ">
            <div className="">
              <div>
                {corCounter.map((option) => (
                  <FormFloatingSelect
                    key={option.id}
                    items={cor}
                    onZoneSelect={setSelectedOgkViews}
                    label="Cor-"
                  />
                ))}
              </div>
            </div>
            <Button
              variant="primary"
              className="zoneAddButton"
              onClick={handleAddCor}
            >
              Add
            </Button>{" "}
          </div>
          {/* ------------Cor-end--------- */}
          {/* ------------Заключення-start--------- */}
          <div className="itemZones addOption ">
            <div className="">
              <div>
                {ogkZakliuchenniaCounter.map((option) => (
                  <FormFloatingSelect
                    key={option.id}
                    items={ogkZakliuchennia}
                    onZoneSelect={setSelectedOgkViews}
                    label="Заключення"
                  />
                ))}
              </div>
            </div>
            <Button
              variant="primary"
              className="zoneAddButton"
              onClick={handleAddOgkZakliuchennia}
            >
              Add
            </Button>{" "}
          </div>
          {/* ------------Заключення-end--------- */}
        </div>
      ) : null}
    </div>
  );
};
