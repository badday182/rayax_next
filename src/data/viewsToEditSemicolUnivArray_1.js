
import { cherepViews } from "../data/Cherep/cherepViews";

import { ppnViews } from "../data/PPN/ppnViews";

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


const viewsToEditSemicolUnivArray_1 = [
  cherepViews,
  ppnViews,
  ochpViews,
  plechovyiSuhlobViews,
  kliuchytsiaViews,
  rebraViews,
  liktovyiSuhlobViews,
  promenevoZapIastkovyiSuhlobViews,
  kystViews,
  kistokTazuViews,
  kulshovyiSuhlobViews,
  kolinnyiSuhlobViews,
  homilkovoStopnyiSuhlobViews,
  stopaViews,
  peredniViddilyStopyViews,
];
export const firstElements = viewsToEditSemicolUnivArray_1.map(viewsArray => viewsArray[0]);