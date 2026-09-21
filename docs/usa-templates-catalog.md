# Каталог шаблонів опису рентгенівських знімків — США (пілот)

Аналог [templates-catalog.md](templates-catalog.md) для американської практики звітування.
Це **пілот**: три зони (ОГК, поперековий відділ хребта, колінний суглоб), обрані так, щоб
перевірити всі три «форми» наявної української архітектури — складна зона з під-полями,
зона хребта, простий суглоб.

Мета — не переклад українських формулювань, а окрема бібліотека фраз, побудована на
реальній практиці США. Машинний переклад `ogkZagalnaNenorma` дав би текст, якого
американський радіолог не пише.

## Статус і позначки

Кожна фраза має позначку походження:

- **`[S]`** — **sourced**: взято дослівно з цитованого джерела (шаблон RSNA RadReport або
  документ ACR). Можна використовувати як є.
- **`[R]`** — **reconstruction**: реконструкція на основі фахової термінології з цитованих
  оглядових джерел, але **дослівно в стандарті не зафіксована**. Потребує валідації
  американським радіологом перед продакшном.

> **Жодна зона не може бути увімкнена в продакшн без рев'ю носія-радіолога США.**
> Позначки `[R]` — це чернетка, а не готовий діагностичний текст.

## 1. Головна відмінність від української моделі: каркас звіту

Українська шапка `R-графія: ОГК оглядова | ЕЕД: 0,25 мЗв` — пострадянська конвенція.
Американський звіт має інший каркас, зафіксований в ACR Practice Parameter for
Communication of Diagnostic Imaging Findings (ред. 2025), розділ II.B «Components of the
Report». Рекомендований формат (дослівні назви пунктів):

| # | Пункт ACR | Що це в нашій моделі |
| --- | --- | --- |
| 1 | Demographics | блок пацієнта (аналог `pacientInfoPattern.js`) |
| 2 | Relevant clinical information | **нове поле**, в українській версії його немає |
| 3a | Body of the report → Procedures and materials | аналог рядка `R-графія:` (техніка/проекції) |
| 3b | Body of the report → Findings | описова частина |
| 3c | Body of the report → Potential limitations | **нове**, опційне |
| 3d | Body of the report → Clinical issues | **нове**, опційне |
| 3e | Body of the report → Comparison studies and reports | **окрема секція** |
| 4 | Impression (conclusion or diagnosis) | аналог «Заключення», але **обов'язковий** |

Ключові наслідки, кожен із яких ламає поточну логіку `zoneInfoPattern.js`:

1. **Дози в звіті немає.** У переліку компонентів ACR немає жодного пункту про дозове
   навантаження. Рядок `ЕЕД: X мЗв` для США треба **не перекладати, а прибирати** —
   `zoneMappings` з `zoneInfoPattern.js` для цієї країни не застосовується взагалі.
2. **Impression обов'язковий.** ACR: «Unless the report is brief, each report should
   contain an "impression" or "conclusion."», «A specific diagnosis should be given when
   possible.» В українській моделі «Заключення» — одне з під-полів, і його можна лишити
   порожнім. Для США це окрема обов'язкова секція.
3. **Comparison — окрема секція для будь-якого дослідження.** В українській версії контроль
   зашитий як варіант усередині списку ОГК (`Контроль від . R-динаміка позитивна/негативна`).
   У США це окреме поле з дефолтом `None.`
4. **Немає верхнього перемикача «Норма/Не норма».** У шаблонах RSNA кожне під-поле
   незалежно має свій дефолт-норму, а Impression обирається окремо. Тобто для США
   `*NormaNenorma` як конструкція не існує — UI має показувати одразу список полів із
   передобраними нормальними значеннями.
5. **«Прості» зони теж мають під-поля.** Навіть коліно в RSNA має три поля
   (Bones / Joints / Soft tissue). Поділ на «складні» й «прості» зони з
   `templates-catalog.md` для США не працює — під-поля є скрізь.
6. **Аналог сентинела `svoiVaryant`.** У шаблонах RSNA останнім пунктом списків іде
   літеральне `Other.` — та сама ідея «лікар впише вручну». Ключ: `us.common.other`.

## 2. Наскрізні структурні елементи

### 2.1 Секції звіту (`us.section.*`)

| Ключ | Заголовок у звіті | Дефолт |
| --- | --- | --- |
| `us.section.exam` | `EXAM:` | назва дослідження |
| `us.section.clinical` | `CLINICAL INFORMATION:` | — |
| `us.section.technique` | `TECHNIQUE:` | опис проекцій |
| `us.section.comparison` | `COMPARISON:` | `None.` **[S]** |
| `us.section.findings` | `FINDINGS:` | — |
| `us.section.impression` | `IMPRESSION:` | — |

### 2.2 Сторона (`us.side.*`)

З шаблонів Knee Xray (152/153) **[S]**:

| Ключ | Текст | Укр. відповідник |
| --- | --- | --- |
| `us.side.left` | `Left` | Зліва |
| `us.side.right` | `Right` | Справа |
| `us.side.both` | `Both` | Справа та зліва |

Увага: на відміну від української моделі, сторона в США вживається **всередині назви
дослідження і в тексті знахідок** (`Left knee`, `right lung base`), а не окремим хвостом
`справа` в шапці.

### 2.3 Проекції ОГК (`us.chest.technique.*`)

З шаблону Rad Chest 2 Views (50271) **[S]**:

| Ключ | Текст |
| --- | --- |
| `us.chest.technique.two_views` | `Two Views` |
| `us.chest.technique.single_ap` | `Single AP View` |
| `us.chest.technique.ap_portable` | `AP Portable View` |
| `us.chest.technique.single_pa` | `Single PA View` |
| `us.chest.technique.pa_lat_obl` | `PA, lateral, and bilateral oblique views` |
| `us.chest.technique.insp_exp` | `Inspiratory and expiratory views` |

Із шаблону 144 **[S]**: `PA and lateral views of the chest.`

Зверніть увагу: `AP Portable` (палатний знімок) — категорія, якої в українських даних
немає взагалі, і вона впливає на формулювання знахідок (низькі інспіраторні об'єми).

---

## 3. Зона: ОГК / Chest

Джерела: RadReport **50271 «Rad Chest 2 Views»** (основа, найповніший) і **144
«Chest Xray - 2 Views»**. Усі фрази нижче — **[S]**, дослівно з цих шаблонів.

### 3.1 Findings → Lungs (`us.chest.findings.lungs.*`)

| Ключ | Текст |
| --- | --- |
| `.clear` | `The lungs are clear.` |
| `.atx_bibasilar` | `Subsegmental atelectasis is present at both bases.` |
| `.atx_left` | `Subsegmental atelectasis is present at the left base.` |
| `.atx_right` | `Subsegmental atelectasis is present at the right base.` |
| `.effusion_atx_bilateral` | `Bibasilar opacities represent small bilateral pleural effusions with overlying atelectasis.` |
| `.effusion_atx_left` | `An opacity at the left base represents a small pleural effusion with overlying atelectasis.` |
| `.effusion_atx_right` | `An opacity at the right base represents a small pleural effusion with overlying atelectasis.` |
| `.congestion_no_edema` | `Mild pulmonary vascular congestion is present. There is no evidence of associated pulmonary edema.` |
| `.edema_mild` | `Mild diffuse interstitial pulmonary edema is present, likely cardiogenic.` |
| `.edema_moderate` | `Moderate alveolar pulmonary edema is present, likely cardiogenic.` |
| `.edema_marked` | `Marked diffuse pulmonary edema and consolidation are present.` |
| `.effusion_atx_with_edema` | `Small bilateral pleural effusions are present with overlying atelectasis. Mild cardiogenic interstitial edema also is present.` |
| `.low_volumes` | `The inspiratory volumes are small, which probably explains increased interstitial opacity and atelectasis at the bases.` |
| `us.common.other` | `Other.` |

Додатково з шаблону 144 (варіанти, яких немає в 50271):

| Ключ | Текст |
| --- | --- |
| `.consolidation_extensive` | `There is extensive alveolar consolidation in the lungs bilaterally, most likely representing pulmonary edema.` |
| `.consolidation_patchy_multifocal` | `There are multiple patchy areas of consolidation, widely scattered about the lungs bilaterally.` |
| `.engorgement_no_edema` | `There is mild pulmonary vascular engorgement without pulmonary edema.` |

### 3.2 Findings → Pleural Spaces (`us.chest.findings.pleura.*`)

| Ключ | Текст |
| --- | --- |
| `.none` | `No pleural abnormalities are listed.` |
| `.effusion_trace` | `Trace bilateral pleural effusions are present.` |
| `.effusion_small` | `Small bilateral pleural effusions are present.` |
| `.effusion_moderate` | `Moderate bilateral pleural effusions are present.` |
| `.effusion_large` | `Large bilateral pleural effusions are present.` |
| `us.common.other` | `Other.` |

### 3.3 Findings → Heart (`us.chest.findings.heart.*`)

| Ключ | Текст (50271) | Варіант із 144 |
| --- | --- | --- |
| `.normal` | `The heart is normal in size.` | те саме |
| `.top_normal` | — | `The heart is top normal in size.` |
| `.enlarged_mild` | `The heart is mildly enlarged.` | `There is mild cardiomegaly.` |
| `.enlarged_moderate` | `The heart is moderately enlarged.` | `There is moderate cardiomegaly.` |
| `.enlarged_severe` | — | `There is severe cardiomegaly.` |
| `.enlarged_marked` | `The heart is markedly enlarged.` | `There is marked cardiomegaly.` |
| `us.common.other` | `Other.` | — |

Український аналог поля — `cor.js`. Зверніть увагу, що в США **немає** варіанта
«склероз дуги аорти» в полі серця: це йде окремим полем Mediastinum.

### 3.4 Findings → Mediastinum (`us.chest.findings.mediastinum.*`)

| Ключ | Текст |
| --- | --- |
| `.normal` | `The mediastinal contours are normal.` |
| `.aorta_tortuous` | `The thoracic aorta is tortuous.` |
| `.aorta_calcified` | `Calcifications are present in the thoracic aorta.` |
| `.aorta_tortuous_calcified` | `The thoracic aorta is tortuous and calcified.` |
| `us.common.other` | `Other.` |

З шаблону 144 додатково:

| Ключ | Текст |
| --- | --- |
| `.wnl` | `The mediastinum is within normal limits.` |
| `.atherosclerosis` | `Atherosclerotic calcifications are seen in the aorta.` |
| `.aorta_tortuous_explained` | `The aorta appears tortuous, a finding usually associated with either atherosclerosis or systemic hypertension.` |
| `.aneurysm_or_dissection` | `The aortic contour is quite prominent, a finding likely indicating either an aortic aneurysm or dissection.` |
| `.postoperative` | `Post-operative changes are present in the mediastinum.` |

### 3.5 Findings → Osseous Structures (`us.chest.findings.bones.*`)

Поля, якого в українській моделі ОГК немає взагалі.

| Ключ | Текст |
| --- | --- |
| `.normal` | `There are no osseous abnormalities.` |
| `.degenerative_thoracic` | `Degenerative changes are present in the thoracic spine.` |
| `.levoscoliosis` | `A mild thoracic levoscoliosis is present.` |
| `.dextroscoliosis` | `A mild thoracic dextroscoliosis is present.` |
| `.s_scoliosis` | `A mild S-shaped thoracolumbar scoliosis is present.` |
| `us.common.other` | `Other.` |

### 3.6 Impression (`us.chest.impression.*`)

Обов'язкова секція. Всі **[S]**, з 50271:

| Ключ | Текст |
| --- | --- |
| `.normal` | `Normal radiographic examination of the chest.` |
| `.no_acute_cardiopulmonary` | `No acute cardiopulmonary disease.` |
| `.no_interval_change` | `No significant interval change.` |
| `.no_acute_or_metastatic` | `No acute or metastatic disease.` |
| `.bibasilar_opacities_ddx` | `Bibasilar parenchymal opacities consistent with atelectasis, infection, or aspiration.` |
| `.no_pneumothorax` | `No pneumothorax.` |
| `.picc_below_carina` | `PICC tip below the carina.` |
| `.cardiomegaly` | `Cardiomegaly.` |
| `.bibasilar_atelectasis` | `Bibasilar atelectasis.` |
| `.edema_mild` | `Mild cardiogenic edema.` |
| `.edema_moderate` | `Moderate cardiogenic edema.` |
| `.effusions_with_atx` | `Bilateral pleural effusions with overlying atelectasis.` |
| `.no_active_disease` | `No active disease.` |
| `.vascular_congestion` | `Pulmonary vascular congestion.` |
| `us.common.other` | `Other.` |

З шаблону 144 додатково: `Severe edema, probably cardiogenic.`, `Atelectasis.`,
`Satisfactory post-operative status.`, `Low inspiratory volumes.`

---

## 4. Зона: ПВХ / Lumbar Spine

Джерело: RadReport **156 «Lumbar Spine Xray»**. Проблема: шаблон містить **лише норму** —
патологічних варіантів у бібліотеці RSNA для рентгену ПВХ немає. Тому нижче норма — `[S]`,
а патологія — `[R]`.

### 4.1 Findings, нормальні дефолти **[S]**

| Ключ | Поле | Текст |
| --- | --- | --- |
| `us.lspine.findings.count` | Number of lumbar-type vertebrae | числове поле |
| `us.lspine.findings.bodies.normal` | Vertebral bodies | `Normal in height. No vertebral fracture.` |
| `us.lspine.findings.disks.normal` | Disk spaces | `Normal.` |
| `us.lspine.findings.soft_tissues.normal` | Soft tissues | `Normal.` |
| `us.lspine.findings.alignment.normal` | Alignment | `Normal. No scoliosis or kyphosis` |
| `us.lspine.impression.normal` | Impression | `Normal examination.` |

Структурний збіг з українською моделлю тут найбільший: `Висота тіл хребців` ↔
`Vertebral bodies`, `Міжхребцеві проміжки` ↔ `Disk spaces`, `Серединна вісь` ↔ `Alignment`.
Але українських полів `Замикаючі пластинки` і `Фасеткові та унковертебральні суглобові
щілини` в шаблоні RSNA немає як окремих полів — у США це описують усередині
дегенеративного абзацу.

### 4.2 Findings, патологія **[R] — потребує валідації**

Реконструйовано з фахової термінології (RSNA Radiology, «Radiographic Evaluation of
Arthritis»; U of U MSK reference), **дослівних шаблонних формулювань у джерелах немає**:

| Ключ | Чернетка тексту |
| --- | --- |
| `us.lspine.findings.bodies.height_loss` | `There is loss of height of the L_ vertebral body.` |
| `us.lspine.findings.bodies.compression` | `Compression deformity of the L_ vertebral body.` |
| `us.lspine.findings.disks.narrowing` | `There is intervertebral disc space narrowing at L_-L_.` |
| `us.lspine.findings.disks.ddd_multilevel` | `Multilevel intervertebral disc space narrowing with endplate sclerosis and anterior osteophyte formation.` |
| `us.lspine.findings.alignment.straightening` | `Straightening of the normal lumbar lordosis.` |
| `us.lspine.findings.alignment.listhesis` | `Grade 1 anterolisthesis of L_ on L_.` |
| `us.lspine.findings.facets.arthropathy` | `Facet arthropathy is present at the lower lumbar levels.` |
| `us.lspine.impression.ddd` | `Multilevel degenerative disc disease.` |
| `us.lspine.impression.no_acute_fracture` | `No acute fracture or malalignment.` |

> Термінологічна примітка: американський радіолог майже не пише слова «остеохондроз»
> у сенсі, вживаному в українському заключенні (`Остеохондроз, спондильоз,
> спондилоартроз ПВХ`). Прямий переклад `osteochondrosis` буде прочитаний як інша
> нозологія. Найближчий за змістом еквівалент — `degenerative disc disease` (DDD) і
> `facet arthropathy`. **Це приклад, чому переклад української бази неприйнятний.**

---

## 5. Зона: Колінний суглоб / Knee

Джерела: RadReport **152 «Knee Xray - Normal»** і **153 «Knee Xray - Prosthesis»**.

### 5.1 Процедура **[S]**

Поля: laterality (`Left knee` / `Right knee` / `Both knees`), number of views (1–10),
procedure (вільний текст).

### 5.2 Findings, норма **[S]**

| Ключ | Поле | Текст |
| --- | --- | --- |
| `us.knee.findings.bones.normal` | Bones | `No fracture or dislocation is present.` |
| `us.knee.findings.joints.normal` | Joints | `The joint spaces are normal.` |
| `us.knee.findings.soft_tissue.normal` | Soft tissue | `Normal.` |
| `us.knee.impression.normal` | Impression | `Normal.` |

### 5.3 Протез **[S]** (шаблон 153)

| Ключ | Поле | Текст |
| --- | --- | --- |
| `us.knee.findings.arthroplasty.present` | Arthroplasty | `A total knee arthroplasty is present.` |
| `us.knee.findings.arthroplasty.alignment` | Alignment | `The prosthesis is in normal alignment.` |
| `us.knee.findings.arthroplasty.no_complication` | Complication | `There is no evidence of loosening or fracture.` |
| `us.knee.impression.arthroplasty_normal` | Impression | `Total knee arthroplasty in normal alignment.` |
| `us.knee.clinical.tka` | Clinical information | `Total knee arthroplasty.` |

Український аналог — `Ч/з гіпсову пов'язку: стояння уламків задовільне`, але зверніть
увагу: у США окремий шаблон присвячений **ендопротезу**, а не контролю через гіпс.
Контроль через гіпсову пов'язку (`through the cast`) у бібліотеці RSNA окремим шаблоном
не представлений — ще одна відмінність у структурі практики.

### 5.4 Findings, патологія **[R] — потребує валідації**

| Ключ | Чернетка тексту |
| --- | --- |
| `us.knee.findings.bones.fracture` | `There is an acute fracture of the _.` |
| `us.knee.findings.joints.oa_tricompartmental` | `There is tricompartmental joint space narrowing with marginal osteophytes and subchondral sclerosis.` |
| `us.knee.findings.joints.oa_medial` | `Medial compartment joint space narrowing with marginal osteophyte formation.` |
| `us.knee.findings.soft_tissue.effusion` | `A suprapatellar joint effusion is present.` |
| `us.knee.impression.oa` | `Tricompartmental osteoarthritis.` |
| `us.knee.impression.no_acute_fracture` | `No acute fracture or dislocation.` |

Термінологія (компартменти: uni-/bi-/tricompartmental; `marginal osteophytes`,
`joint space narrowing`, `subchondral sclerosis`, `subchondral cysts`) підтверджена
оглядовими джерелами RSNA/AAFP — **[S] на рівні термінів**, але конкретні речення вище
складені мною, тому `[R]`.

---

## 6. Що це означає для коду

Перелік того, що доведеться зробити, коли дійде до імплементації:

1. **Key-based диспетчеризація.** Поточний `FloatingLabel.js` звіряє вибір порівнянням
   рядків (`matches(someArray, selectedZone)`), а `zoneInfoPattern.js` — через
   `norma === ogkNormaNenorma[3]`. З двома мовами це ламається. Потрібен той самий
   рефакторинг, що вже передбачений у `templates-catalog.md` для перекладу: значення
   дропдауна = ключ, видимий текст підставляється окремо.
2. **Скелет звіту на країну.** `zoneInfoPattern.js` зараз має один зашитий каркас
   (таблиця `R-графія` / `ЕЕД` + абзац). Потрібен окремий рендерер на країну:
   для США — секції `EXAM / CLINICAL INFORMATION / TECHNIQUE / COMPARISON / FINDINGS /
   IMPRESSION`, без дози.
3. **UI без «Норма/Не норма».** Для США показувати список під-полів із передобраними
   нормальними значеннями плюс обов'язковий Impression, а не бінарний верхній селектор.
4. **`zoneMappings` (дози) — українсько-специфічні.** Для США не застосовувати.
5. **Кастомні опції користувача** (`custom_options`, `norm_templates`) мають отримати
   вимір країни, інакше збережений українською фрагмент з'явиться в англомовному звіті.
   Найпростіше: додати колонку `country` і фільтрувати на вибірці.

## 7. Відкриті питання

- **Канада** піде окремим файлом: практика близька до США, але є франкомовний Квебек із
  власною традицією (`compte rendu`), тож це фактично дві бібліотеки.
- **Чим закривати прогалини `[R]`.** Бібліотека RSNA не покриває патологію рентгену
  хребта й суглобів. Варіанти: (а) знайти інституційні набори шаблонів університетських
  клінік, (б) взяти формулювання з відкритих корпусів реальних звітів (Open-i / Indiana
  University CXR), (в) залучити радіолога-носія одразу на етапі складання, а не рев'ю.
- **Хто валідує.** Без цього жодна `[R]`-фраза не може потрапити в продакшн.

## 8. Джерела

- [ACR Practice Parameter for Communication of Diagnostic Imaging Findings](https://www.acr.org/-/media/ACR/Files/Practice-Parameters/CommunicationDiag.pdf) (ред. 2025, Resolution 9) — розділ II.B «Components of the Report», розділ II.C «Principles of Reporting»
- [RSNA RadReport Template Library](https://radreport.org/) — шаблони 50271 «Rad Chest 2 Views», 144 «Chest Xray - 2 Views», 156 «Lumbar Spine Xray», 152 «Knee Xray - Normal», 153 «Knee Xray - Prosthesis». Доступ через REST API: `https://api3.rsna.org/radreport/v1/templates/{id}/details`
- [RSNA Radiology: Radiographic Evaluation of Arthritis: Degenerative Joint Disease and Variations](https://pubs.rsna.org/doi/10.1148/radiol.2483062112) — термінологія дегенеративних змін суглобів
- [AAFP: Radiographic Assessment of Osteoarthritis](https://www.aafp.org/pubs/afp/issues/2001/0715/p279.html) — рентгенологічні ознаки остеоартрозу
- [University of Utah MSK Reference: Degenerative Lumbar Spine](https://medicine.utah.edu/radiology/education/msk-ref/lumbar-spine/degen) — дегенеративні зміни ПВХ

> Корисно на майбутнє: бібліотека RadReport містить шаблони **німецькою, французькою,
> італійською та польською** мовами — тобто для решти країн із вашого списку є той самий
> клас першоджерела, що й для США. Це суттєво знижує ризик, що наступні файли доведеться
> будувати на самих реконструкціях.
