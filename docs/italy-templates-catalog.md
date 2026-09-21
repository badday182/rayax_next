# Каталог шаблонів опису рентгенівських знімків — Італія

Аналог [templates-catalog.md](templates-catalog.md) для італійської практики. Позначки —
як у [usa-templates-catalog.md](usa-templates-catalog.md): **`[S]`** — дослівно з джерела,
**`[R]`** — реконструкція, потребує валідації італійським радіологом.

> Італія — **найкращий результат із п'яти досліджених країн**. По-перше, це єдина країна
> (крім США), де є джерельний шаблон **рентгену грудної клітки** — зона, якої бракує
> Німеччині, Польщі та Франції. По-друге, тут є **дослівне, законодавчо приписане
> формулювання дозового рядка** — найточніший аналог української шапки з ЕЕД.

## 1. Каркас звіту

З італійських шаблонів RadReport (50289, 50286, 50288, 50293) — стала структура **[S]**:

| # | Ключ | Заголовок | Дефолт |
| --- | --- | --- | --- |
| 1 | `it.section.procedura` | назва дослідження + проекції | — |
| 2 | `it.section.informazioni_cliniche` | `Informazioni cliniche` | — |
| 3 | `it.section.confronto` | `Confronto` | `Nessuno` |
| 4 | `it.section.risultati` | `Risultati` / `I risultati` | — |
| 5 | `it.section.conclusioni` | `Conclusioni` | — |
| 6 | `it.section.dose` | дозовий рядок | обов'язковий, див. розділ 2 |

У 50286 додається сьома секція `Comunicazione dei risultati:` — фіксація факту
повідомлення результатів (аналог американських «nonroutine communications» з ACR).
В українській моделі такого поля немає.

## 2. Доза: дослівний припис закону

Це найцінніша знахідка по Італії для нашої задачі.

Ст. 161 ч. 5 D.Lgs. 101/2020 зобов'язує, щоб «il referto relativo alle procedure
medico-radiologiche sia comprensivo dell'informazione relativa all'esposizione connessa
alla prestazione» **[S]**. Ч. 6 уточнює, що до видання галузевих настанов ця інформація —
це **клас дози (від I до IV)** **[S]**.

Міжтовариський документ AIFM / AIMN / AINR / SIRM (2020) пропонує **дослівне
формулювання рядка у звіті** **[S]**:

```text
Classe di dose secondo l' art.161 del D.Lgs 101/2020: xxx
```

А якщо клас визначено через систему моніторингу дози **[S]**:

```text
Classe di dose secondo l' art.161 del D.Lgs 101/2020, usando sistema di calcolo: xxx
```

Для ядерної медицини додатково **[S]**: `Attività somministrata: xxx MBq`,
`Radiofarmaco: xxx`.

### Нюанси, критичні для реалізації

- Класи виражені **через ефективну дозу (мЗв) за типом дослідження і клінічним
  питанням**, згідно з «Linee guida per la diagnostica per immagini» (Atto rep. n.2113
  від 28.10.2004). Тобто в основі — та сама величина, що в українській ЕЕД, але **в звіт
  потрапляє не число, а клас**.
- **Одне й те саме дослідження може мати різний клас залежно від клінічного питання** —
  бо різне питання означає різні параметри експозиції. Проста таблиця «зона → доза», як
  `zoneMappings` у `zoneInfoPattern.js`, цього не виражає.
- **Якщо в одному сеансі виконано кілька досліджень, вказується клас на одиницю вищий**,
  ніж для окремого дослідження **[S]**. Це правило агрегації, якого українська модель не
  має взагалі — а вона якраз дозволяє додавати кілька зон в один документ.

> **Наслідок для продукту:** не можна просто підставити італійський переклад у наявний
> рядок ЕЕД. Потрібна окрема логіка: клас замість числа, залежність від клінічного
> питання, підвищення класу при кількох зонах в одному сеансі.

## 3. Зона: ОГК / Torace

### 3.1 Базовий шаблон `RADIOGRAFIA DEL TORACE` (50289) **[S]**

| Ключ | Поле | Дефолт |
| --- | --- | --- |
| `it.chest.procedura.frontale_laterale` | проекції | `Frontale e Laterale` |
| `it.chest.confronto.nessuno` | `Confronto` | `Nessuno` |
| `it.chest.risultati.cuore.normale` | `Cuore:` | `Normale.` |
| `it.chest.risultati.polmoni.normale` | `Polmoni:` | `Normale.` |
| `it.chest.risultati.ossa.normale` | `Ossa:` | `Normale.` |
| `it.chest.conclusioni.nessuna_malattia_acuta` | `Conclusioni` | `Nessuna malattia acuta` |

У шаблоні є вбудована клінічна примітка **[S]**: `Attenzione che soprattutto nel piccolo
in fase espiratoria possibile falso ispessimento interstizio` (застереження щодо
хибного потовщення інтерстицію в дітей на видиху). Це ознака **нативного авторства**, а
не перекладу — такі ідіосинкратичні ремарки при перекладі не виникають. Італійські
шаблони в цьому сенсі надійніші за німецькі, польські й французькі.

### 3.2 Розгорнутий категоріальний шаблон `Tubercolosi` (50293) **[S]**

Формально це шаблон під ТБ-скринінг, але фактично — **найповніша італійська сітка полів
для грудної клітки**, з градаціями. Придатний як основа для загального ОГК.

**Polmoni** (`it.chest.polmoni.*`):

| Ключ | Поле | Варіанти |
| --- | --- | --- |
| `.infiltrati` | `Infiltrati:` | `Nessuno` / `destra` / `Sinistra` / `Periilare` / `Diffusi` |
| `.inflazione` | `Inflazione:` | `Normale` / `Iperinflazione` / `ipoinflazione` |
| `.interstiziale` | `Malattia interstiziale:` | `Nessuna` / `destra` / `Sinistra` / `Periilare` / `Diffusa` |
| `.cicatrici_atelettasia` | `Cicatrici o atelettasia del parenchima:` | `Normale` / `Parte superiore destra` / `destra in basso` / `Parte superiore sinistra` / `Sinistra in basso` |
| `.noduli` | `Noduli polmonari:` | `Nessuno` / `Solitario` / `Da due a cinque` / `Più di cinque` / `Opacità Miliari` |

**Mediastino** (`it.chest.mediastino.*`):

| Ключ | Поле | Варіанти |
| --- | --- | --- |
| `.cardiomegalia` | `Cardiomegalia` | `No` / `Lieve` / `Moderato` / `Grave` |
| `.vascolarizzazione` | `Vascolarizzazione polmonare` | `Normale` / `aumentata` / `diminuita` |
| `.adenopatia_paratracheale` | `Adenopatia paratracheale` | `Assente` / `Presente` |
| `.adenopatia_ilare` | `Adenopatia ilare` | `Nessuno` / `destra` / `Sinistra` |
| `.massa` | `Massa mediastinica` | `Assente` / `Presente` |

**Pleura** (`it.chest.pleura.*`):

| Ключ | Поле | Варіанти |
| --- | --- | --- |
| `.versamento_dx` | `Versamento pleurico destro:` | `Nessuno` / `Piccolo` / `Moderato` / `Grande` |
| `.versamento_sx` | `Versamento pleurico sinistro:` | `Nessuno` / `Piccolo` / `Moderato` / `Grande` |
| `.cicatrici` | `Cicatrici pleuriche:` | `nessuna` / `Apicale destra` / `Laterale destro` / `destra basilare` / `Apicale sinistro` / `Laterale sinistro` / `Sinistra basilare` |
| `.pnx_dx` | `Pneumotorace destro:` | `Nessuno` / `Piccolo` / `Moderato` / `Grande` |
| `.pnx_sx` | `Pneumotorace sinistro:` | `Nessuno` / `Piccolo` / `Moderato` / `Grande` |

Плюс `Altri risultati` і `Conclusioni`.

**Стилістичний висновок:** Італія поєднує обидва підходи — 50289 дає **речення**
(як США), 50293 дає **градаційні категорії** (як Німеччина). Отже режим «label: value»,
потрібний для Німеччини, знадобиться і тут. Наскрізні шкали:
`Nessuno/Piccolo/Moderato/Grande` (обсяг) і `No/Lieve/Moderato/Grave` (ступінь) —
ключі `it.scale.volume.*` і `it.scale.gravita.*`.

Зверніть увагу: латералізація тут **вбудована у варіант поля** (`Versamento pleurico
destro` / `sinistro` — два окремі поля), а не винесена окремим селектором сторони, як в
українській моделі.

### 3.3 Контроль положення PICC (50288) **[S]**

| Ключ | Поле | Текст |
| --- | --- | --- |
| `it.chest.picc.clinica` | `Informazioni cliniche` | `Valuta il posizionamento PICC.` |
| `it.chest.picc.lato` | сторона | `Sinistra` / `Destra` |
| `it.chest.picc.punta` | шаблон речення | `[Sinistra\|Destra] PICC, con la punta [alla giunzione cavoatriale].` |

## 4. Зона: скелет / `INDAGINE SCHELETRICA (TRAUMA NON ACCIDENTALE)` (50286) **[S]**

Шаблон скелетного обстеження при підозрі на неакцидентальну травму (жорстоке поводження
з дитиною). Проекції **[S]**: `proiezioni frontali e laterali del cranio, del torace,
dell'addome e della colonna vertebrale, oblique bilaterali delle costole e frontali degli
arti superiori e inferiori ecc`.

| Ключ | Поле | Дефолт |
| --- | --- | --- |
| `it.skeletal.fratture` | `Fratture:` | `Nessuna.` |
| `it.skeletal.altra_anomalia` | `Altra anomalia ossea:` | `Nessuna.` |
| `it.skeletal.tessuti_molli` | `Tessuti molli:` | `Normale.` |
| `it.skeletal.densita` | `Densità ossea:` | `Normale.` |
| `it.skeletal.eta_ossea` | `Età ossea:` | `Normale.` |
| `it.skeletal.conclusioni` | `Conclusioni` | `Normale.` |
| `it.skeletal.comunicazione` | `Comunicazione dei risultati:` | — |

Поля `Densità ossea` та `Età ossea` в українській моделі відсутні як клас.

## TODO: незакриті прогалини — хребет і суглоби

**Статус: не закрито. Не блокує запуск** (ОГК закрита), але звужує покриття.

**Що вже перевірено (не шукати вдруге):**

| Джерело | Результат |
| --- | --- |
| RadReport, `language=it` (26 шаблонів) | рентген: `RADIOGRAFIA DEL TORACE` (50289), `PROIEZIONE AP DEL TORACE (PICC)` (50288), `INDAGINE SCHELETRICA` (50286), `Tubercolosi` (50293), `ESOFAGO STOMACO DUODENO` (50285), `CLISMA NEONATALE`, `Cistouretrografia minzionale`. Окремих RTG хребта, коліна чи інших суглобів **немає** |
| Італійські шаблони хребта/суглобів | є лише КТ/МРТ (`TC Torace`, `RM Addome` тощо) |

**Не перевірено:** власна бібліотека SIRM ([sirm.org/documenti](https://sirm.org/documenti/))
— там публікуються міжтовариські документи, можливо є й шаблони звітів.

**Definition of done:** поля для `Rachide` (з градаціями в стилі 50293) і
`Ginocchio` / суглобів, плюс `Conclusioni`, усі `[S]`.

## 5. Що це означає для коду

Додатково до висновків по попередніх країнах:

1. **Дозовий блок — не рядок, а логіка.** Для Італії: клас I–IV замість числа,
   залежність від клінічного питання, **підвищення класу на одиницю при кількох
   дослідженнях в одному сеансі**. Останнє прямо конфліктує з тим, як ваш застосунок
   додає кілька зон в один документ — доведеться рахувати клас на рівні документа, а не
   зони.
2. **Латералізація як окремі поля.** `Versamento pleurico destro` і `sinistro` — два
   незалежні поля, а не одне поле плюс селектор сторони. Модель «зона + сторона» тут не
   працює.
3. **Поле `Comunicazione dei risultati`** — фіксація повідомлення результатів; потрібне
   для італійського (і, ймовірно, американського) режиму.
4. **Режим «label: value»**, запланований для Німеччини, обов'язково знадобиться й тут.

## 6. Джерела

- [D.Lgs. 31 luglio 2020, n. 101](https://www.tsrm-pstrp.org/wp-content/uploads/2020/08/Decreto-legislativo-31-luglio-2020-n.-101-di-recepimento-direttiva-2013-59-Euratom-Documento-per-TSRM.pdf) — ст. 161 ч. 5-6 (інформація про опромінення в referto)
- [Documento intersocietario AIFM / AIMN / AINR / SIRM 2020 — Raccomandazioni intersocietarie per la comunicazione della classe di dose](https://sirm.org/wp-content/uploads/2021/04/324-Documento-intersocietario-AIFM-AIMN-AINR-SIRM-2020-raccomandazioni-comunicazione-classe-di-dose.pdf) — дослівні формулювання дозового рядка, правило агрегації класів
- [Documento SIRM — D.Lgs. 101/2020, aggiornamenti per il radiologo](https://www.sirm.org/wp-content/uploads/2021/04/323-Documento-SIRM-2020-D.-Lgs.-101-2020-Aggiornamenti-per-il-Radiologo.pdf)
- «Linee guida per la diagnostica per immagini», Atto rep. n.2113 від 28.10.2004 (GU n.100 від 02.05.2005) — таблиця класів дози
- [RSNA RadReport](https://radreport.org/), італійські шаблони 50289, 50293, 50288, 50286. Доступ: `https://api3.rsna.org/radreport/v1/templates/{id}/details`
- [SIRM — Documenti](https://sirm.org/documenti/)
