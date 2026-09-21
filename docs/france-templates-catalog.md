# Каталог шаблонів опису рентгенівських знімків — Франція

Аналог [templates-catalog.md](templates-catalog.md) для французької практики. Позначки —
як у [usa-templates-catalog.md](usa-templates-catalog.md): **`[S]`** — дослівно з джерела,
**`[R]`** — реконструкція, потребує валідації французьким радіологом.

> Франція ламає висновок, зроблений на США, Німеччині й Польщі: **тут доза
> зобов'язана бути в тексті звіту за законом**. Це єдина країна з досліджених, де
> українська шапка з дозою має прямий юридичний аналог.

## TODO: незакрита прогалина — ОГК (radiographie du thorax)

**Статус: не закрито. Блокує запуск французького режиму.**

**Що вже перевірено (не шукати вдруге):**

| Джерело | Результат |
| --- | --- |
| RadReport, `language=fr` | лише **4 шаблони**, з них єдиний скелетний — `Rachis Cervical` (313 / 50123), і той перекладний. Thorax немає |
| SFR, «Comptes rendus structurés» ([radiologie.fr](https://www.radiologie.fr/comptes-rendus-structures)) | 11 шаблонів, **усі патологія-специфічні КТ/МРТ** (embolie pulmonaire, polytraumatisme, cancers…). Конвенційного рентгену немає |
| Arrêté 22.09.2006 | дає обов'язковий склад CR, але **не містить формулювань знахідок** |

**Не перевірено:** документ SFR «Recommandations générales pour l'élaboration d'un
compte-rendu radiologique» (J Radiol 2007;88:304-6) — доступний через EM-consulte.

> ⚠ **Обережно з джерелом.** PDF цієї рекомендації, який індексується за адресою
> `iradiologie.com/wp-content/uploads/2022/01/Recommandation-a-lelaboration-dun-CRR.pdf`,
> наразі редиректить на сторонній домен `merahtotoresmi.org`, не пов'язаний з
> радіологією. Схоже на перехоплений домен — **не завантажувати звідти**. Брати текст
> через EM-consulte або офіційний сайт SFR.

**Definition of done:** поля `Poumons` / `Cœur` / `Médiastin` / `Structures osseuses`
(або структура, підтверджена носієм) плюс `Conclusion`, усі `[S]`.

## 1. Каркас звіту

### 1.1 Юридичний мінімум (arrêté du 22 septembre 2006)

На відміну від інших країн, склад французького compte rendu (CR) задано **нормативним
актом** — arrêté du 22 septembre 2006 relatif aux informations dosimétriques devant
figurer dans un compte rendu d'acte utilisant les rayonnements ionisants. Стаття 1
вимагає щонайменше **[S]**:

1. `L'identification du patient et du médecin réalisateur`
2. `La date de réalisation de l'acte`
3. `Les éléments de justification de l'acte et la procédure réalisée`
4. елементи ідентифікації обладнання — для найбільш опромінювальних технік
   (інтервенційна радіологія, КТ, променева терапія)
5. `Les informations utiles à l'estimation de la dose reçue par le patient au cours de
   la procédure` — з параметрами, чітко підписаними одиницями вимірювання

### 1.2 Секції CR за SFR

SFR визначає CR як «transcription écrite, en termes clairs et sans ambiguïté, et la
transmission des différentes étapes de l'examen radiologique : **indication, techniques
de réalisation, résultats, synthèse et conclusion médicale**» **[S]**.

| # | Ключ | Заголовок | Призначення |
| --- | --- | --- | --- |
| 1 | `fr.section.indication` | `Indication` | контекст і клінічне питання |
| 2 | `fr.section.technique` | `Technique` | як виконано дослідження |
| 3 | `fr.section.resultats` | `Résultats` | опис побаченого |
| 4 | `fr.section.conclusion` | `Conclusion` | **пряма відповідь на клінічне питання** |
| 5 | `fr.section.dose` | (дозова інформація) | обов'язкова за arrêté 2006 |

Принцип SFR для структурованих CR: «un cœur de compte rendu centré sur la pathologie» —
усі обов'язкові пункти в логічному порядку, стандартизованими термінами **[S]**.

## 2. Доза: Франція перевертає висновок

Зведення по всіх досліджених країнах:

| Країна | Доза в тексті звіту | Форма |
| --- | --- | --- |
| Україна | так (наявна практика) | ефективна доза, `ЕЕД: X мЗв` |
| США | **ні** | у переліку компонентів ACR відсутня |
| Німеччина | **ні** | не є секцією DIN 25300-1 |
| Польща | ні (в документації, не в описі) | параметри експозиції |
| **Франція** | **так, за законом** | «informations utiles à l'estimation de la dose», параметри з одиницями |
| **Італія** | **так, за законом** | клас дози I–IV, див. [italy-templates-catalog.md](italy-templates-catalog.md) |

Тобто рішення «для інших країн прибираємо дозовий рядок», яке випливало з перших трьох
країн, **помилкове як загальне правило**. Правильна модель: дозова поведінка — це
властивість країни з трьома станами (немає / опційна / обов'язкова) і власним форматом.

Для Франції конкретний набір параметрів залежить від модальності; для конвенційного
рентгену це, як правило, добуток доза-площа (PDS), а не ефективна доза в мЗв. **Точний
формат рядка для radiographie — питання до носія** (розділ 5).

## 3. Наявні фрази

### 3.1 Шийний відділ хребта / Rachis Cervical (313)

> **Застереження про джерело.** Шаблон має ті самі ознаки перекладу з англійської, що й
> німецький і польські: секція названа `Impression` (англіцизм; усталено французькою —
> `Conclusion`), а текст знахідок дослівно відповідає англомовному шаблону родини
> `Cervical Spine`. Документує структуру RSNA французькими словами, не французьку
> традицію.

Усе нижче **[S]**:

| Ключ | Секція | Текст |
| --- | --- | --- |
| `fr.cspine.section.clinique` | `Les informations cliniques` | — |
| `fr.cspine.comparaison.aucun` | `Comparaison` | `Aucun.` |
| `fr.cspine.resultats.normal` | `Résultats` | `Il n'y a aucune fracture ou lésion destructive. Les corps vertébraux et éléments postérieurs sont normaux. L'alignement, les disques et les relations discovertébrale sont normaux. Il n'y a aucune preuve de l'instabilité.` |
| `fr.cspine.conclusion.normal` | `Impression` (sic) | `Rachis cervical normal.` |
| `fr.cspine.technique.nb_vues` | `Nombre de vues:` | число 1–8 |

Рекомендація до продакшну: перейменувати секцію на `Conclusion` — але це **[R]**, лише
після підтвердження носієм.

Корисне зіставлення з українським ШВХ: французький текст **одним реченням** покриває те,
що українська модель розбиває на сім під-полів (лордоз, вісь, висота тіл, проміжки,
замикаючі пластинки, суглобові щілини, заключення). Тобто гранулярність полів теж
country-specific, а не універсальна.

## 4. Що це означає для коду

Додатково до висновків із США/Німеччини/Польщі:

1. **Дозовий блок треба не видаляти, а робити конфігурованим.** Три стани на країну:
   відсутній (US, DE), опційний (PL), обов'язковий (FR, IT) — плюс власний формат рядка.
2. **`Conclusion` як обов'язкова відповідь на клінічне питання.** Як і `Impression` у
   США та `Beurteilung` у Німеччині — заключення відповідає на питання скерування, а не
   переказує опис.
3. **Гранулярність полів — властивість країни.** Один і той самий відділ хребта у
   Франції описується одним реченням, в Україні — сімома полями. Модель даних не може
   припускати спільну кількість під-полів між країнами.

## 5. Питання до французького радіолога

1. Який рядок дози реально пишуть у CR для конвенційної радіографії — PDS у µGy·m²,
   dGy·cm², чи інша форма? Дослівне формулювання?
2. `Impression` чи `Conclusion` — підтвердити (у шаблоні RadReport стоїть перше, у
   визначенні SFR — друге).
3. Чи використовується `Synthèse` як окрема секція перед `Conclusion`, чи це частина
   висновку?
4. Стандартні формулювання норми для radiographie du thorax — головна прогалина.

## 6. Джерела

- [Arrêté du 22 septembre 2006 relatif aux informations dosimétriques devant figurer dans un compte rendu d'acte utilisant les rayonnements ionisants](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000608231) (NOR: SANY0623888A, JORF n°226 du 29.09.2006) — [стаття 1 на Légifrance](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000001918511)
- [SFR — Comptes rendus structurés](https://www.radiologie.fr/comptes-rendus-structures) — 11 патологія-специфічних шаблонів
- [SFR — Recommandations, réglementations, décrets, chartes, guides](https://www.radiologie.fr/pratiques-professionnelles/recommandations-reglementations-decrets-chartes-guides)
- [ASNR — Inscrire la dose d'exposition dans les comptes-rendus radiologiques : pourquoi ? comment ?](https://recherche-expertise.asnr.fr/page/inscrire-dose-dexposition-dans-comptes-rendus-radiologiques-pourquoi-comment)
- [RSNA RadReport](https://radreport.org/), шаблон 313 / 50123 `Rachis Cervical` — **перекладний**
- [Recommandations générales pour l'élaboration d'un compte-rendu radiologique (CRR), J Radiol 2007;88:304-6](https://www.em-consulte.com/article/122133/recommandations-generales-pour-l-elaboration-d-un-) — не опрацьовано, див. TODO
