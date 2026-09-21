// Витринні дані для сторінки /account — зіставлення fieldKey (з fieldKeyByArray
// у FloatingLabel.js) з людською назвою зони/поля. Сюди НЕ включено
// kistokTazuViews: цей зональний компонент обходить AddOptionBlock напряму,
// а zoneInfoPattern.js для "Кісток тазу" ігнорує конкретний текст знахідки —
// показувати там кастомні варіанти було б оманливим.
export const customizableFieldsCatalog = [
  { key: "legenRysunok", zone: "ОГК", label: "Легеневий рисунок" },
  { key: "koreni", zone: "ОГК", label: "Корені" },
  { key: "synusy", zone: "ОГК", label: "Синуси" },
  { key: "kupalaDiadragmy", zone: "ОГК", label: "Купола діафрагми" },
  { key: "cor", zone: "ОГК", label: "Cor-" },
  { key: "ogkZakliuchennia", zone: "ОГК", label: "Заключення" },
  { key: "cherepViews", zone: "Череп", label: "Норма/Не норма" },
  { key: "ppnViews", zone: "ППН", label: "Норма/Не норма" },
  { key: "fiziologLordoz", zone: "ШВХ / ПВХ", label: "Фізіологічний лордоз" },
  { key: "seredynnaVis", zone: "ШВХ / ГВХ / ПВХ", label: "Серединна вісь" },
  {
    key: "vysotaTilHrebtsivShvh",
    zone: "ШВХ / ГВХ",
    label: "Висота тіл хребців",
  },
  {
    key: "vysotaTilHrebtsivGvh",
    zone: "ГВХ",
    label: "Висота тіл хребців (Th)",
  },
  {
    key: "mizhkhrebtseviPromizhky",
    zone: "ШВХ / ГВХ / ПВХ",
    label: "Міжхребцеві проміжки",
  },
  {
    key: "zamykaiuchiPlastynkyTilKhrebtsiv",
    zone: "ШВХ / ГВХ / ПВХ",
    label: "Замикаючі пластинки тіл хребців",
  },
  {
    key: "fasetkoviUnkovertSuhlShchelyny",
    zone: "ШВХ / ГВХ / ПВХ",
    label: "Фасеткові та унковертебральні суглобові щілини",
  },
  { key: "zakliuchenniaShvh", zone: "ШВХ", label: "Заключення" },
  { key: "fiziologKifos", zone: "ГВХ", label: "Фізіологічний кіфоз" },
  { key: "zakliuchenniaGvh", zone: "ГВХ", label: "Заключення" },
  { key: "vysotaTilHrebtsivPvh", zone: "ПВХ", label: "Висота тіл хребців" },
  { key: "zakliuchenniaPvh", zone: "ПВХ", label: "Заключення" },
  { key: "ochpViews", zone: "ОЧП", label: "Норма/Не норма" },
  {
    key: "plechovyiSuhlobViews",
    zone: "Плечовий суглоб",
    label: "Норма/Не норма",
  },
  { key: "kliuchytsiaViews", zone: "Ключиця", label: "Норма/Не норма" },
  { key: "rebraViews", zone: "Ребра", label: "Норма/Не норма" },
  {
    key: "liktovyiSuhlobViews",
    zone: "Ліктьовий суглоб",
    label: "Норма/Не норма",
  },
  {
    key: "promenevoZapIastkovyiSuhlobViews",
    zone: "Променево-зап'ястковий суглоб",
    label: "Норма/Не норма",
  },
  { key: "kystViews", zone: "Кисть", label: "Норма/Не норма" },
  {
    key: "kulshovyiSuhlobViews",
    zone: "Кульшовий суглоб",
    label: "Норма/Не норма",
  },
  {
    key: "kolinnyiSuhlobViews",
    zone: "Колінний суглоб",
    label: "Норма/Не норма",
  },
  {
    key: "homilkovoStopnyiSuhlobViews",
    zone: "Гомілковостопний суглоб",
    label: "Норма/Не норма",
  },
  { key: "stopaViews", zone: "Стопа", label: "Норма/Не норма" },
  {
    key: "peredniViddilyStopyViews",
    zone: "Передні відділи стопи",
    label: "Норма/Не норма",
  },
];
