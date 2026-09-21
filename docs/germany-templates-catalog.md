# Каталог шаблонів опису рентгенівських знімків — Німеччина

Аналог [templates-catalog.md](templates-catalog.md) для німецької практики. Позначки
походження — ті самі, що в [usa-templates-catalog.md](usa-templates-catalog.md):

- **`[S]`** — sourced, дослівно з цитованого джерела;
- **`[R]`** — реконструкція, **потребує валідації німецьким радіологом**.

> Німеччина — випадок, протилежний США: **каркас звіту задокументований сильніше, ніж
> будь-де** (є національний стандарт DIN), але **вільної бібліотеки готових фраз для
> конвенційного рентгену майже немає**. Тому цей файл дає надійний скелет і лише один
> повністю джерельний набір полів (кульшовий суглоб).

## TODO: незакрита прогалина — ОГК (Röntgen Thorax)

**Статус: не закрито. Блокує запуск німецького режиму.**

ОГК — найчастіше рентгенологічне дослідження, і саме для нього в німецьких відкритих
джерелах **немає жодного шаблону конвенційного рентгену**. Без цієї зони німецький режим
не має сенсу вмикати: користувач обере країну й не знайде головного дослідження.

**Що вже перевірено (не шукати вдруге):**

| Джерело | Результат |
| --- | --- |
| DRG `ak_befundung`, каталог `templates_final` | 26 шаблонів, конвенційний рентген лише один — `cr_hueftendoprothetik` (кульшовий суглоб). Thorax немає. |
| RadReport, `language=de` | 9 шаблонів, з рентгену лише `Knöchel Xray` (50124), та й той перекладний |
| DIN 25300-1 | дає каркас звіту, але **не містить формулювань** — стандарт описує процес і мінімальний склад, а не текст знахідок |

**Що ще не перевірено (наступні кроки):**

1. Каталоги DRG поза `templates_final`: `templates_development_html`,
   `templates_development_word`, `templates_conrad` — можливо, шаблон Thorax у розробці.
   Ліцензія репозиторію CC-BY-4.0 дозволяє використання.
2. Портал [befundung.drg.de](https://www.befundung.drg.de/) — там може бути ширша
   колекція, ніж у GitHub-репозиторії.
3. Університетські клініки Німеччини (Charité, LMU, UKE) — інституційні набори
   `Befundbausteine`, які іноді публікуються.

**Чим закривається остаточно:** залученням німецького радіолога до **складання** фраз,
а не лише до рев'ю. Для ОГК це, найімовірніше, єдиний надійний шлях — готових
опублікованих формулювань німецькою для оглядової рентгенографії грудної клітки у
вільному доступі, схоже, просто немає.

**Definition of done:** поля `Lunge` / `Herz` / `Mediastinum` / `Skelett` (або та
структура, яку підтвердить носій) із набором градацій у стилі DRG (категоріальний, не
реченнєвий — див. розділ 2), плюс `Beurteilung`, усі з позначкою `[S]`.

## 1. Каркас звіту: DIN 25300-1

Німеччина має власний стандарт процесу звітування — **DIN 25300-1:2018 «Prozesse in der
Radiologie — Teil 1: Befundung eines bildgebenden oder bildgestützten Verfahrens»**
(замінив DIN 6827-5:2004). Deutsche Röntgengesellschaft (DRG) опублікувала офіційний
шаблон за цим стандартом — `Befundbericht nach DIN25300-1`.

Секції шаблону DIN 25300-1 **[S]**, у документному порядку, із зазначенням обов'язковості:

| # | Ключ | Заголовок | Обов'язковість |
| --- | --- | --- | --- |
| 1 | `de.section.klinische_angaben` | `Klinische Angaben` | **обов'язкова** |
| 2 | `de.section.med_fragestellung` | `Medizinische Fragestellung` | опційна |
| 3 | `de.section.befundungsfragestellung` | `Befundungsfragestellung` | **обов'язкова** |
| 4 | `de.section.beschreibung` | `Beschreibung` | опційна |
| 5 | `de.section.beurteilung` | `Beurteilung` | **обов'язкова** |
| 6 | `de.section.empfehlung` | `Empfehlung` | опційна |

Мінімальний набір даних звіту за стандартом (ширше за секції тексту): дані пацієнта
(ім'я, дата народження), правові аспекти (показання, вагітність, хто виконав), технічні
деталі (ділянка тіла, методика, дата), клінічне питання, медична оцінка, підпис і дата.

### Чому це важливо і що ламає

1. **`Beurteilung` обов'язкова, а `Beschreibung` — ні.** Це дзеркальне відображення
   української моделі, де описова частина є тілом звіту, а «Заключення» — необов'язкове
   під-поле. Для Німеччини мінімально валідний звіт може складатися з клінічних даних,
   питання і оцінки — **без описової частини взагалі**.
2. **Дві різні «постановки питання».** `Medizinische Fragestellung` (навіщо скерували) і
   `Befundungsfragestellung` (на що саме відповідає радіолог) — це два окремі поля, і
   друге обов'язкове. В українській моделі немає жодного з них.
3. **`Empfehlung` — окрема секція.** Рекомендація («рекомендована КТ ГМ») в українській
   базі зашита як варіант усередині списку знахідок черепа
   (`Рекомендована КТ ГМ / кісток лицьового черепа`). У Німеччині це структурно окреме
   поле.
4. **Дози в структурі звіту немає.** Параметри опромінення підлягають окремому
   документуванню за приписами радіаційного захисту, але секцією `Befundbericht` вони не
   є. Як і для США, рядок `ЕЕД: X мЗв` тут **прибирається, а не перекладається**.

## 2. Головна стилістична відмінність: категоріальний, а не реченнєвий стиль

Це найважливіше відкриття щодо Німеччини, і воно змінює вигляд UI.

Американські шаблони RSNA дають **готові речення** (`The lungs are clear.`). Офіційні
німецькі шаблони DRG дають **марковані категоріальні значення** — поле з підписом і
градацією ступеня. Приклад із реального шаблону DRG `CR Hüftendoprothetik` **[S]**:

```text
Subchondrale Sklerosierung: keine | gering | mittelgradig | ausgeprägt
Artikuläre Osteophyten:     keine | gering | mittelgradig | ausgeprägt
Kellgren-Score:             0 | 1 | 2 | 3 | 4
```

Тобто німецький звіт часто збирається як **рядки «підпис: значення»**, а не як суцільний
абзац. Ваш `zoneInfoPattern.js` уміє лише друге. Для Німеччини потрібен режим рендеру
«label: value», плюс підтримка **градаційних шкал** (`keine/gering/mittelgradig/ausgeprägt`)
і **числових класифікацій** (Kellgren), яких в українській базі немає як типу поля взагалі.

### 2.1 Наскрізна шкала ступеня (`de.scale.severity.*`) **[S]**

| Ключ | Текст |
| --- | --- |
| `.keine` | `keine` |
| `.gering` | `gering` |
| `.mittelgradig` | `mittelgradig` |
| `.ausgeprägt` | `ausgeprägt` |

Ця шкала повторюється в кількох полях одразу — на відміну від українських даних, де для
кожного поля свій плоский список фраз.

### 2.2 Якість зображення (`de.common.bildqualitaet.*`) **[S]**

| Ключ | Текст |
| --- | --- |
| `.gut` | `gut` |
| `.ausreichend` | `ausreichend` |
| `.eingeschraenkt` | `eingeschränkt` |

Поля «якість знімка» в українській базі немає. У німецькій структурованій практиці воно
стандартне.

### 2.3 Сторона (`de.side.*`)

| Ключ | Текст | Джерело |
| --- | --- | --- |
| `de.side.rechts` | `rechts` | **[S]** (DRG) |
| `de.side.links` | `links` | **[S]** (DRG) |
| `de.side.bilateral` | `Bilateral` | **[S]** (RadReport 50124) |

---

## 3. Зона: Кульшовий суглоб / Hüftgelenk (єдина повністю джерельна)

Джерело: **DRG `CR Hüftendoprothetik`** (`041807.1.2202101552`, CC BY-NC-ND 4.0) — єдиний
шаблон конвенційного рентгену (`CR`) у фінальній колекції DRG. Усе нижче — **[S]**.

Секції: `Klinische Angaben` → `Klinische Fragestellung` → `Befund` → `Beurteilung`.

### 3.1 Befund (`de.hip.befund.*`)

| Ключ | Підпис поля | Варіанти |
| --- | --- | --- |
| `.bildqualitaet` | `Bildqualität:` | `gut` / `ausreichend` / `eingeschränkt` |
| `.seite` | `Beurteiltes Hüftgelenk:` | `rechts` / `links` |
| `.gelenkstellung` | `Gelenkstellung:` | `regelrecht` / `gering inkongruent (varisch)` / `mittelgradig inkongruent (varisch)` / `ausgeprägt inkongruent (varisch)` |
| `.sklerosierung` | `Subchondrale Sklerosierung:` | шкала `de.scale.severity.*` |
| `.osteophyten` | `Artikuläre Osteophyten:` | шкала `de.scale.severity.*` |
| `.deformierungen` | `Deformierungen der Gelenkpartner:` | шкала `de.scale.severity.*` |
| `.spongiosa` | `Spongiosa (zystische Deformierungen in Gelenkpfanne und Hüftkopf):` | шкала `de.scale.severity.*` |
| `.beckenarchitektur` | `Beckenarchitektur (Dysplasien):` | `nein` / `ja` |
| `.weichteile` | `Paraartikuläre Weichteile (Kalzifikationen):` | `keine` / `vereinzelt` / `ankylosierend` |
| `.sonstiges` | `Sonstiges:` | вільний текст |

### 3.2 Beurteilung (`de.hip.beurteilung.*`)

| Ключ | Підпис | Варіанти |
| --- | --- | --- |
| `.coxarthrose` | `Coxarthrose:` | `keine` / `dysplastisch` / `degenerativ` / `posttraumatisch` |
| `.kellgren` | `Kellgren-Score:` | `0` / `1` / `2` / `3` / `4` |
| `.sonstiges` | `Sonstiges:` | вільний текст |

Зверніть увагу: заключення тут — **не фраза, а набір класифікацій**. Український аналог
(`Щіл. звуж., пласт. склероз., із кіст. та остеоф. ... R-ознаки двобіч. коксар-зу.`) —
це один злитий рядок тексту. Німецький — структуровані поля з кодованою шкалою Kellgren.
`Sonstiges:` виконує роль вашого `svoiVaryant` (`Пустий варіант`): ключ
`de.common.sonstiges`.

---

## 4. Зона: Гомілковостопний суглоб / Knöchel — з важливим застереженням

Джерело: RadReport **50124 «Knöchel Xray»**.

> **Застереження про якість джерела.** Цей шаблон — **машинний/ручний переклад
> англомовного шаблону RSNA**, а не німецький оригінал. Ознаки: підпис поля `Bones:`
> лишився англійською; Impression перекладено як `Eindruck`, хоча в німецькій радіології
> усталений термін — `Beurteilung` (як у DIN 25300-1 і в шаблонах DRG). Тобто цей файл
> документує **структуру RSNA німецькими словами**, а не німецьку традицію.
> Використовувати з обережністю і обов'язково показати носію.

Секції в шаблоні: `Klinische Information` → `Vergleich` → `Befund` → `Eindruck`.

| Ключ | Підпис | Дефолт **[S]** |
| --- | --- | --- |
| `de.ankle.befund.knochen` | `Bones:` (sic) | `Keine.` |
| `de.ankle.befund.mineralisierung` | `Die Mineralisierung:` | `Normale anatomische Ausrichtung. Kein Bruch oder Dislokation.` |
| `de.ankle.befund.gelenke` | `Gelenke:` | `Normal.` |
| `de.ankle.befund.weitere` | `Weitere Ergebnisse:` | `Normal. Keine Arthritis.` |
| `de.ankle.beurteilung.normal` | `Eindruck` | `Normal. Kein Bruch oder Dislokation.` |

Рекомендація: у продакшні замінити заголовок `Eindruck` на `Beurteilung` і підпис
`Bones:` на `Knöcherne Strukturen:` — але це вже **[R]**, тож лише після підтвердження.

---

## 5. Зони ОГК, хребет, коліно — прогалина

У вільних німецьких джерелах (DRG `templates_final`, RadReport `language=de`) **немає**
шаблонів конвенційного рентгену для грудної клітки, хребта та колінного суглоба.
Колекція DRG складається переважно з КТ/МРТ/УЗД.

Це означає: три зони, якими ми закрили пілот США, для Німеччини джерельно не закриваються.
Варіанти дій, у порядку надійності:

1. Залучити німецького радіолога до **складання**, а не лише рев'ю (для цих зон це єдиний
   спосіб отримати автентичні формулювання).
2. Перевірити повну колекцію DRG поза `templates_final` (каталоги
   `templates_development_html`, `templates_conrad`) — можливо, конвенційні шаблони є в
   роботі. Ліцензія CC-BY-4.0 на репозиторій це дозволяє.
3. Взяти категоріальні поля зі спорідненої зони (кульшовий суглоб) як зразок стилю і
   скласти аналогічні для коліна — це буде **[R]** у повному обсязі.

Термінологічні орієнтири для майбутньої роботи **[R]**: `Röntgen Thorax in zwei Ebenen`,
`Herzgröße regelrecht`, `keine Infiltrate`, `keine Ergüsse`, `Gonarthrose`,
`Gelenkspaltverschmälerung`, `Degenerative Veränderungen`. **Це орієнтири, а не готові
фрази для продакшну.**

## 6. Що це означає для коду (додатково до висновків по США)

1. **Режим рендеру «label: value».** Для Німеччини звіт складається з маркованих полів, а
   не суцільних речень. Це окремий рендерер, а не інший набір рядків.
2. **Новий тип поля — градаційна шкала.** `keine/gering/mittelgradig/ausgeprägt`
   перевикористовується в багатьох полях. В українській базі кожне поле має власний
   плоский список; тут потрібна спільна шкала, що підключається до кількох полів.
3. **Новий тип поля — кодована класифікація.** Kellgren-Score (0–4) — числова шкала зі
   значенням, а не текст.
4. **Обов'язковість полів на рівні країни.** DIN розрізняє обов'язкові й опційні секції;
   для Німеччини звіт без `Beurteilung` не має бути можливим. Українська модель поняття
   обов'язковості не має взагалі.
5. **Поле «якість зображення»** треба додати як загальний елемент для німецького режиму.

## 7. Джерела

- [DIN 25300-1:2018 «Prozesse in der Radiologie — Teil 1: Befundung eines bildgebenden oder bildgestützten Verfahrens»](https://webstore.ansi.org/standards/din/din253002018de) — національний стандарт, замінив DIN 6827-5:2004
- [DRG `ak_befundung` — офіційний репозиторій шаблонів Deutsche Röntgengesellschaft](https://github.com/DRGagit/ak_befundung) (ліцензія CC-BY-4.0): шаблони `041807.5.1806281203-din25300.html` (`Befundbericht nach DIN25300-1`) і `041807.1.2202101552-cr_hueftendoprothetik.html` (`CR Hüftendoprothetik`, CC BY-NC-ND 4.0)
- [befundung.drg.de — портал структурованого звітування DRG](https://www.befundung.drg.de/de-DE/2908/strukturierte-befundung/) — три рівні структурування (розділи → текстові блоки → контрольовані словники)
- [DRG: Strukturierte Befundung](https://drg.de/fokusthemen/strukturierte-befundung/)
- [RSNA RadReport, шаблон 50124 «Knöchel Xray»](https://radreport.org/) — **перекладний**, не німецький оригінал
