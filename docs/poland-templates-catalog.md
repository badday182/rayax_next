# Каталог шаблонів опису рентгенівських знімків — Польща

Аналог [templates-catalog.md](templates-catalog.md) для польської практики. Позначки —
ті самі, що в [usa-templates-catalog.md](usa-templates-catalog.md):

- **`[S]`** — sourced, дослівно з цитованого джерела;
- **`[R]`** — реконструкція, **потребує валідації польським радіологом**.

> Польща — найкращий випадок серед трьох за **покриттям зон**: у бібліотеці RSNA є п'ять
> польських RTG-шаблонів, і чотири з них прямо відповідають зонам вашого застосунку
> (череп, ППН, ОЧП, суглоб). Але є суттєве застереження щодо їхнього походження — див.
> розділ 2.

## TODO: незакрита прогалина — ОГК (RTG klatki piersiowej)

**Статус: не закрито. Блокує запуск польського режиму.**

Попри непогане покриття інших зон, **найчастіше дослідження — ОГК — не закрите жодним
джерелом**. Вмикати польський режим без нього не можна.

**Що вже перевірено (не шукати вдруге):**

| Джерело | Результат |
| --- | --- |
| RadReport, `language=pl` (19 шаблонів) | RTG лише: czaszki, zatoki przynosowe, jamy brzusznej (×3), nadgarstka, stawu skokowego (×2). Klatki piersiowej немає |
| RadReport, `searchText=klatki&language=pl` | нічого нового — той самий список |
| Польські шаблони хребта/коліна | є, але це `MR kręgosłupa lędźwiowego`, `MR prawego stawu kolanowego`, `Kręgosłup szyjny TK` — МРТ і КТ, не рентген |
| Rozporządzenia MZ | дають вимоги до документації й дози, але **не містять формулювань опису** |

**Що ще не перевірено (наступні кроки):**

1. Publikacje Polskiego Lekarskiego Towarzystwa Radiologicznego (PLTR) — чи є
   рекомендації щодо стандартних опису́в.
2. Матеріали польських медичних університетів (CMUJ, WUM) — навчальні набори
   `wzory opisów`.
3. Перевірити, чи не існує польський аналог DRG-репозиторію (у Німеччині такий є —
   структуровані шаблони на GitHub).

**Чим закривається остаточно:** залученням польського радіолога до **складання** фраз.
Це той самий висновок, що й для Німеччини, з додатковою підставою: наявні польські
шаблони виявилися перекладами англомовних (розділ 2), тож носій потрібен не лише для
ОГК, а й щоб підтвердити природність уже зібраних формулювань.

**Definition of done:** поля для `Pola płucne` / `Sylwetka serca` / `Kąty
przeponowo-żebrowe` / `Struktury kostne` (або структура, підтверджена носієм) плюс
`Wniosek`, усі з позначкою `[S]`, та відповідь на питання про дозу з розділу 6.

## 1. Каркас звіту

Із шаблону `Ogólny wynik badania (badanie diagnostyczne)` (50039) — польського
загального шаблону діагностичного звіту **[S]**:

| # | Ключ | Заголовок | Дефолт |
| --- | --- | --- | --- |
| 1 | `pl.section.wykonane_badanie` | `Wykonane badanie` | — |
| 2 | `pl.section.dane_kliniczne` | `Dane kliniczne` | — |
| 3 | `pl.section.porownanie` | `Porównano z badaniem z dnia` | `Brak.` |
| 4 | `pl.section.wynik` | `Wynik badania` | — |
| 5 | `pl.section.wniosek` | `Wniosek` | — |

У частині шаблонів заголовки трапляються в коротших варіантах: `Procedura`,
`Porównanie`, `Wynik`. Для продакшну треба обрати один канонічний набір — рекомендую
довгі форми з 50039, бо це шаблон загального призначення.

Структурно це та сама п'ятичастинна схема, що й у США (procedure → clinical → comparison
→ findings → impression), і так само **без секції дози**.

### 1.1 Дозові вимоги — але не в тексті опису

Польське законодавство вимагає документувати параметри опромінення: згідно з
rozporządzenie Ministra Zdrowia z 11.01.2023 r. w sprawie warunków bezpiecznego
stosowania promieniowania jonizującego (тексти єдн. Dz.U. 2025 poz. 1288), у медичній
документації пацієнта записуються фізичні параметри експозиції так, щоб можна було
відтворити умови дослідження й дозу, яку отримав пацієнт.

**Ключовий нюанс для нас:** вимога стосується **медичної документації**, а не
обов'язкового рядка в тексті опису. Тобто, як і в США/Німеччині, український рядок
`ЕЕД: X мЗв` у польському режимі за замовчуванням **не відтворюється**. Але, на відміну
від США, тут є законна підстава для опційного поля дози — це варто уточнити в польського
радіолога (див. розділ 6).

## 2. Застереження про походження польських шаблонів

Порівняння структури польських шаблонів з англомовними показує, що більшість із них —
**переклади шаблонів RSNA, а не польські оригінали**. Докази:

- `Struktury kostne` / `Mineralizacja` / `Stawy` / `Inne ustalenia` — послівна калька
  полів `Bones` / `Mineralization` / `Joints` / `Other findings` з англомовних шаблонів
  кінцівок;
- `Inne ustalenia` — це калька `Other findings`; природніше польською було б
  `Pozostałe odchylenia` або `Uwagi`;
- у 50117 дефолти полів **зміщені** (у полі `Struktury kostne` стоїть `Brak.`, а текст про
  відсутність перелому опинився в полі `Mineralizacja`) — типовий артефакт перенесення;
- 50039 структурно дублює англомовний `Generic Report (Diagnostic)` (id 1).

Що з цього випливає: фрази нижче **достовірні як польський текст** (вони польською і
опубліковані в бібліотеці RSNA), але **не є доказом польської національної традиції
звітування**. Національним якорем для Польщі лишається законодавство (розділ 1.1) і
рев'ю носія. Німецький файл у цьому сенсі має міцнішу основу — там є DIN 25300-1.

## 3. Наскрізні елементи

### 3.1 Сторона (`pl.side.*`) **[S]**

| Ключ | Текст | Джерело |
| --- | --- | --- |
| `pl.side.prawa` | `Prawa` | 50117 |
| `pl.side.lewa` | `Lewa` | 50117 |
| `pl.side.dwustronne` | `Dwustronne` | 50117 |

Для парних органів у називному відмінку трапляється й узгоджена форма:
`Prawy nadgarstek` / `Lewy nadgarstek` / `Oba nadgarstki` (50110) **[S]**.

> **Граматична пастка для імплементації.** На відміну від англійської (`Left knee`) і
> подібно до української, польська вимагає **узгодження роду**: `Prawy nadgarstek`
> (чол.), `Prawa ręka` (жін.), `Prawe kolano` (сер.). Зберігати сторону одним рядком
> `Prawa` і клеїти з назвою зони — **зламається**. Потрібно або зберігати повні
> узгоджені форми на зону, або тримати рід зони в даних. Українська база обходить це
> тим, що ставить `справа/зліва` окремим хвостом, — у польській так не вийде.

### 3.2 Порожній/вільний варіант

Прямого аналога `svoiVaryant` у польських шаблонах немає, але роль «інше» виконує
літеральне `Inne` (50174) **[S]** — ключ `pl.common.inne`.

---

## 4. Зони з джерельним покриттям

### 4.1 Череп / RTG czaszki (50042) — відповідає укр. зоні «Череп»

Усе **[S]**:

| Ключ | Секція | Текст |
| --- | --- | --- |
| `pl.skull.procedura.ap_bok` | Procedura | `RTG czaszki w projekcji AP oraz bocznej.` |
| `pl.skull.porownanie.brak` | Porównano z badaniem z dnia | `Brak.` |
| `pl.skull.wynik.prawidlowy` | Wynik badania | `Nie uwidoczniono złamań lub innych zmian. Czaszka oraz podstawa czaszki prawidłowe.` |
| `pl.skull.wniosek.prawidlowy` | Wniosek | `Obraz prawidłowy.` |

Порівняйте з українським `cherepViews.js`, де перший пункт —
`Грубих кістково-травматичних змін не визначається`. Польський еквівалент
(`Nie uwidoczniono złamań lub innych zmian`) **окремо згадує основу черепа**
(`podstawa czaszki`), чого українська фраза не робить.

### 4.2 ППН / Zatoki przynosowe (50045) — відповідає укр. зоні «ППН»

Усе **[S]**:

| Ключ | Секція | Текст |
| --- | --- | --- |
| `pl.sinus.wynik.prawidlowy` | Wynik badania | `Zatoki przynosowe bez zmian. Nie uwidoczniono poziomów płynu.` |
| `pl.sinus.wniosek.ujemne` | Wniosek | `Badanie ujemne w kierunku zapalenia zatok.` |

Помітна різниця в логіці заключення: українська норма ППН —
`Пневматизація видимих придаткових пазух носа задовільна` (констатація стану), польський
`Wniosek` — `Badanie ujemne w kierunku zapalenia zatok` (**відповідь на клінічне
питання**, «негативне щодо синуситу»). Це той самий зсув, що в США: заключення
відповідає на питання скерування, а не переказує опис.

### 4.3 ОЧП / RTG jamy brzusznej (50174) — відповідає укр. зоні «ОЧП»

Найструктурованіший із польських шаблонів. Усе **[S]**:

**Procedura** (`pl.abdomen.procedura.*`):

| Ключ | Текст |
| --- | --- |
| `.jedna_pozycja` | `Jama brzuszna 1 pozycja` |
| `.ostry_brzuch` | `Protokół "ostry brzuch"` |
| `.stojaca_lezaca` | `Jama brzuszna w pozycji stojącej i leżącej` |
| `pl.common.inne` | `Inne` |

**Dane kliniczne** (`pl.abdomen.klinika.*`) — поля, якого в українській моделі немає:

| Ключ | Текст |
| --- | --- |
| `.bole` | `Bóle brzucha` |
| `.wzdety` | `Wzdęty brzuch` |
| `.sonda` | `Umieszczenie sondy nosowo-żołądkowej` |
| `.pooperacyjne` | `Badanie pooperacyjne` |
| `pl.common.inne` | `Inne` |

**Wynik** (`pl.abdomen.wynik.*`):

| Ключ | Підпис поля | Дефолт |
| --- | --- | --- |
| `.gazy` | `Ułożenie gazów jelitowych` | — |
| `.zwapnienia` | `Zwapnienia nieprawidłowe` | `Brak` |
| `.kosci` | `Kości` | `Prawidłowe` |
| `.inne` | `Inne` | `Brak` |

**Wniosek**: `Prawidłowe`.

Зверніть увагу: польський шаблон розбиває ОЧП на **чотири окремі поля**, тоді як
український `ochpViews.js` — це один плоский список готових речень. Ще один доказ, що
«прості зони» з української архітектури не переносяться напряму.

### 4.4 Суглоби / RTG stawu skokowego (50117), RTG nadgarstka (50110)

Відповідають укр. зонам «Гомілковостопний суглоб» і «Променево-зап'ястковий суглоб».

Гомілковостопний (50117) **[S]**:

| Ключ | Підпис | Дефолт |
| --- | --- | --- |
| `pl.ankle.wynik.kosci` | `Struktury kostne` | `Brak.` |
| `pl.ankle.wynik.mineralizacja` | `Mineralizacja` | `Ułożenie kości prawidłowe. Nie uwidoczniono złamania lub zwichnięcia.` |
| `pl.ankle.wynik.stawy` | `Stawy` | `Prawidłowa.` |
| `pl.ankle.wynik.inne` | `Inne ustalenia` | `Prawidłowe. Bez cech zapalenia.` |
| `pl.ankle.wniosek.prawidlowy` | `Wniosek` | `Obraz prawidłowy. Nie uwidoczniono złamania lub zwichnięcia.` |

Зап'ясток (50110) **[S]**:

| Ключ | Підпис | Дефолт |
| --- | --- | --- |
| `pl.wrist.wynik.kosci` | `Struktury kostne` | `Struktury kostne bez cech złamania` |
| `pl.wrist.wynik.stawy` | `Stawy` | — |
| `pl.wrist.wynik.tkanki` | `Tkanki miękkie` | `Prawidłowe. Bez cech zmian zwyrodnieniowych.` |
| `pl.wrist.wniosek.prawidlowe` | `Wniosek` | `Badanie prawidłowe.` |

> У 50117 дефолти зміщені між полями (див. розділ 2). **Перед використанням це треба
> виправити**, спираючись на послідовнішу розкладку з 50110: текст про відсутність
> перелому належить полю `Struktury kostne`, а не `Mineralizacja`.

---

## 5. Прогалина: ОГК, хребет, коліно

Польськомовних RTG-шаблонів для грудної клітки, хребта й колінного суглоба в бібліотеці
немає (є лише `MR kręgosłupa lędźwiowego` і `MR prawego stawu kolanowego` — МРТ, не
рентген; і `Kręgosłup szyjny TK` — КТ). Тобто **найчастіша зона взагалі (ОГК) для Польщі
не закрита жодним джерелом**.

Орієнтири термінології для подальшої роботи **[R]**, не для продакшну:
`RTG klatki piersiowej w projekcji PA`, `Pola płucne bez zmian ogniskowych`,
`Sylwetka serca w normie`, `Kąty przeponowo-żebrowe wolne`, `Zmiany zwyrodnieniowe`,
`Obniżenie wysokości trzonu`, `Zwężenie szpar stawowych`.

## 6. Відкриті питання для польського радіолога

1. **Канонічні заголовки секцій**: `Wykonane badanie` vs `Procedura`,
   `Porównano z badaniem z dnia` vs `Porównanie`, `Wynik badania` vs `Wynik`. Який набір
   вживається в реальних описах?
2. **Чи вносять дозу в текст опису** (з огляду на вимогу документування параметрів
   експозиції), чи вона лишається лише в системній документації дослідження?
3. **Чи природно звучать поля** `Inne ustalenia`, `Mineralizacja` — чи це кальки, які
   варто замінити.
4. **Рід зон для узгодження сторони** (розділ 3.1) — потрібен список
   зона → рід → узгоджені форми.

## 7. Джерела

- [RSNA RadReport Template Library](https://radreport.org/), польські шаблони: 50039 `Ogólny wynik badania (badanie diagnostyczne)`, 50042 `RTG czaszki`, 50045 `Zatoki przynosowe`, 50110 `RTG nadgarstka`, 50117 `RTG stawu skokowego`, 50174 `RTG jamy brzusznej`. Доступ: `https://api3.rsna.org/radreport/v1/templates/{id}/details`
- [Rozporządzenie Ministra Zdrowia z dnia 11 stycznia 2023 r. w sprawie warunków bezpiecznego stosowania promieniowania jonizującego dla wszystkich rodzajów ekspozycji medycznej](https://serwiszoz.pl/personel-w-podmiotach-leczniczych/rozporzadzenie-ministra-zdrowia-z-dnia-11-stycznia-2023-r.-w-sprawie-warunkow-bezpiecznego-stosowania-promieniowania-jonizujacego-dla-wszystkich-rodzajow-ekspozycji-medycznej-tekst-jedn.-dz.u.-z-2025-r.-poz.-1288-7640.html) (тексти єдн. Dz.U. 2025 poz. 1288) — документування фізичних параметрів експозиції
- [Rozporządzenie Ministra Zdrowia z dnia 11 kwietnia 2019 r. w sprawie standardów organizacyjnych opieki zdrowotnej w dziedzinie radiologii i diagnostyki obrazowej wykonywanej za pośrednictwem systemów teleinformatycznych](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20190000834) (Dz.U. 2019 poz. 834; змінене з 02.04.2026)
- [Rozporządzenie MZ z 18.10.2021 r. w sprawie wzorcowych medycznych procedur radiologicznych](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20210001920) (Dz.U. 2021 poz. 1920)
