/* =========================================================
   DoorDash AM Training Academy
   academy-data-i18n.js
   Multilingual bridge for Academy + Certification
   ========================================================= */

import {
  CASES as BASE_CASES,
  MODULES as BASE_MODULES
} from "./academy-data.js";

import {
  FR_CASES
} from "./academy-fr.js";

/* =========================================================
   LANGUAGE
   ========================================================= */

function getLanguage() {

  const saved =
    localStorage.getItem(
      "training_language"
    );

  if (
    saved === "fr" ||
    saved === "en" ||
    saved === "es"
  ) {
    return saved;
  }

  return "en";
}

/* =========================================================
   FRENCH CASES
   ========================================================= */

export const CASES =
  BASE_CASES.map(
    item => {

      const french =
        FR_CASES[item.id];

      return {
        ...item,

        fr:
          french ||
          item.en
      };
    }
  );

/* =========================================================
   MODULES
   ========================================================= */

export const MODULES =
  BASE_MODULES.map(
    item => ({
      ...item
    })
  );

/* =========================================================
   MODULE TRANSLATIONS
   ========================================================= */

const MODULE_TRANSLATIONS = {

  foundations: {

    en: {
      title:
        "Foundations & Diagnosis",

      subtitle:
        "Learn to investigate before recommending changes."
    },

    es: {
      title:
        "Fundamentos y diagnóstico",

      subtitle:
        "Aprende a investigar antes de recomendar cambios."
    },

    fr: {
      title:
        "Fondamentaux et diagnostic",

      subtitle:
        "Apprenez à enquêter avant de recommander des changements."
    }
  },

  operations: {

    en: {
      title:
        "Operations & Quality",

      subtitle:
        "Orders, preparation, inventory, tablet and daily execution."
    },

    es: {
      title:
        "Operaciones y calidad",

      subtitle:
        "Pedidos, preparación, inventario, tablet y ejecución diaria."
    },

    fr: {
      title:
        "Opérations et qualité",

      subtitle:
        "Commandes, préparation, inventaire, tablette et exécution quotidienne."
    }
  },

  "menu-brand": {

    en: {
      title:
        "Menu, Reputation & Brand",

      subtitle:
        "Menu optimization, ratings, profitability and premium experience."
    },

    es: {
      title:
        "Menú, reputación y marca",

      subtitle:
        "Optimización de menú, ratings, rentabilidad y experiencia premium."
    },

    fr: {
      title:
        "Menu, réputation et marque",

      subtitle:
        "Optimisation du menu, notes, rentabilité et expérience premium."
    }
  },

  "growth-marketing": {

    en: {
      title:
        "Marketing & Growth",

      subtitle:
        "Promotions, Sponsored Listings, launches and multi-location strategy."
    },

    es: {
      title:
        "Marketing y crecimiento",

      subtitle:
        "Promociones, Sponsored Listings, lanzamientos y estrategia multitienda."
    },

    fr: {
      title:
        "Marketing et croissance",

      subtitle:
        "Promotions, Sponsored Listings, lancements et stratégie multi-sites."
    }
  },

  "commercial-retention": {

    en: {
      title:
        "Commercial & Retention",

      subtitle:
        "Commissions, competition and churn risk."
    },

    es: {
      title:
        "Comercial y retención",

      subtitle:
        "Comisiones, competencia y riesgo de abandono."
    },

    fr: {
      title:
        "Commercial et fidélisation",

      subtitle:
        "Commissions, concurrence et risque de départ."
    }
  },

  "support-risk": {

    en: {
      title:
        "Support, Risk & Compliance",

      subtitle:
        "Escalations, refunds and high-risk conversations."
    },

    es: {
      title:
        "Soporte, riesgo y cumplimiento",

      subtitle:
        "Escalaciones, reembolsos y conversaciones de alto riesgo."
    },

    fr: {
      title:
        "Support, risques et conformité",

      subtitle:
        "Escalades, remboursements et conversations à haut risque."
    }
  }

};

/* =========================================================
   APPLY MODULE LANGUAGE
   ========================================================= */

function applyModuleLanguage() {

  const language =
    getLanguage();

  MODULES.forEach(
    module => {

      const translation =
        MODULE_TRANSLATIONS[
          module.id
        ]?.[
          language
        ];

      if (!translation) {
        return;
      }

      module.title =
        translation.title;

      module.subtitle =
        translation.subtitle;
    }
  );
}

applyModuleLanguage();

window.addEventListener(
  "training-language-change",
  () => {

    applyModuleLanguage();

  }
);

/* =========================================================
   GET CASE
   ========================================================= */

export function getCase(
  caseId
) {

  const id =
    Number(
      caseId
    );

  const base =
    CASES.find(
      item =>
        Number(
          item.id
        ) === id
    ) ||
    CASES[0];

  const language =
    getLanguage();

  const active =
    base[
      language
    ] ||
    base.es ||
    base.en;

  return {

    ...base,

    activeLanguage:
      language,

    active,

    /*
      Compatibility:
      existing app.js uses:
      c.es.title
      c.es.context
      etc.

      We will later update app.js to use
      c.active instead.
    */

    es:
      base.es ||
      base.en,

    en:
      base.en ||
      base.es,

    fr:
      base.fr ||
      base.en
  };
}

/* =========================================================
   GET MODULE
   ========================================================= */

export function getModule(
  moduleId
) {

  return (
    MODULES.find(
      module =>
        module.id ===
        moduleId
    ) ||
    MODULES[0]
  );
}

/* =========================================================
   MODULE FOR CASE
   ========================================================= */

export function moduleForCase(
  caseId
) {

  const id =
    Number(
      caseId
    );

  return (
    MODULES.find(
      module =>
        module.caseIds.includes(
          id
        )
    ) ||
    MODULES[0]
  );
}

/* =========================================================
   MERCHANT PORTAL LABELS
   ========================================================= */

export const PAGE_LABELS = {

  home: {
    en:
      "Home",

    es:
      "Inicio",

    fr:
      "Accueil"
  },

  orders: {
    en:
      "Orders",

    es:
      "Pedidos",

    fr:
      "Commandes"
  },

  menu: {
    en:
      "Menu",

    es:
      "Menú",

    fr:
      "Menu"
  },

  financials: {
    en:
      "Financials",

    es:
      "Finanzas",

    fr:
      "Finances"
  },

  performance: {
    en:
      "Performance",

    es:
      "Rendimiento",

    fr:
      "Performance"
  },

  marketing: {
    en:
      "Marketing",

    es:
      "Marketing",

    fr:
      "Marketing"
  },

  settings: {
    en:
      "Settings",

    es:
      "Configuración",

    fr:
      "Paramètres"
  },

  onlineOrdering: {
    en:
      "Online Ordering",

    es:
      "Pedidos en línea",

    fr:
      "Commande en ligne"
  },

  capital: {
    en:
      "Capital",

    es:
      "Capital",

    fr:
      "Capital"
  },

  pos: {
    en:
      "POS",

    es:
      "POS",

    fr:
      "POS"
  },

  training: {
    en:
      "Training Center",

    es:
      "Centro de entrenamiento",

    fr:
      "Centre de formation"
  }

};

/* =========================================================
   CERTIFICATION BANK
   ========================================================= */

function shuffleOptions(
  options,
  seed
) {

  const result =
    [...options];

  let x =
    Math.abs(
      Number(
        seed
      ) ||
      1
    ) +
    17;

  for (
    let i =
      result.length -
      1;
    i >
    0;
    i--
  ) {

    x =
      (
        x *
        9301 +
        49297
      ) %
      233280;

    const j =
      Math.floor(
        x /
        233280 *
        (
          i +
          1
        )
      );

    [
      result[i],
      result[j]
    ] = [
      result[j],
      result[i]
    ];

  }

  return result;
}

function certificationOption(
  id,
  text
) {

  return {
    id,
    text
  };
}

function makeQuestion(
  caseItem,
  module,
  language,
  type,
  question,
  correctText,
  wrong1,
  wrong2,
  wrong3,
  explanation
) {

  const options =
    shuffleOptions(
      [
        certificationOption(
          "correct",
          correctText
        ),

        certificationOption(
          "d1",
          wrong1
        ),

        certificationOption(
          "d2",
          wrong2
        ),

        certificationOption(
          "d3",
          wrong3
        )
      ],
      (
        Number(
          caseItem.id
        ) *
        97
      ) +
      type.length
    );

  return {

    id:
      `case-${caseItem.id}-${type}`,

    caseId:
      caseItem.id,

    moduleId:
      module.id,

    moduleTitle:
      module.title,

    skill:
      type,

    difficulty:
      caseItem.difficulty,

    title:
      caseItem[
        language
      ]?.title ||
      caseItem.en.title,

    context:
      caseItem[
        language
      ]?.context ||
      caseItem.en.context,

    question,

    options,

    answer:
      "correct",

    explanation

  };
}

export function buildCertificationBank(
  preferredLanguage
) {

  const language =
    (
      preferredLanguage === "fr" ||
      preferredLanguage === "en" ||
      preferredLanguage === "es"
    )
      ? preferredLanguage
      : getLanguage();

  const bank =
    [];

  const explanations = {

    discovery: {
      en:
        "The strongest opening acknowledges the concern and discovers facts before recommending an action.",

      es:
        "La mejor apertura reconoce la preocupación y busca datos antes de recomendar una acción.",

      fr:
        "La meilleure ouverture reconnaît la préoccupation et cherche les faits avant de recommander une action."
    },

    rootCause: {
      en:
        "The correct answer connects the symptom with the underlying operational cause.",

      es:
        "La respuesta correcta conecta el síntoma con la causa operativa subyacente.",

      fr:
        "La bonne réponse relie le symptôme à la cause opérationnelle sous-jacente."
    },

    navigation: {
      en:
        "The correct Portal area is the place where the primary evidence can be verified.",

      es:
        "El área correcta del Portal es donde puedes verificar la evidencia principal.",

      fr:
        "La bonne zone du Portal est l’endroit où les principaux éléments peuvent être vérifiés."
    },

    solution: {
      en:
        "The best solution addresses the root cause with a measurable and controlled action.",

      es:
        "La mejor solución trata la causa raíz con una acción controlada y medible.",

      fr:
        "La meilleure solution traite la cause racine avec une action contrôlée et mesurable."
    },

    verification: {
      en:
        "A strong close verifies the change, defines success metrics and establishes follow-up.",

      es:
        "Un cierre sólido verifica el cambio, define métricas de éxito y establece seguimiento.",

      fr:
        "Une bonne clôture vérifie le changement, définit les métriques de réussite et établit le suivi."
    }

  };

  /*
    Five questions per case.
    20 cases x 5 questions = 100-question bank.
  */

  CASES.forEach(
    caseItem => {

      const module =
        moduleForCase(
          caseItem.id
        );

      const content =
        caseItem[
          language
        ] ||
        caseItem.en ||
        caseItem.es;

      const allCases =
        CASES.filter(
          item =>
            item.id !==
            caseItem.id
        );

      const alternate =
        index => {

          const item =
            allCases[
              (
                caseItem.id +
                index
              ) %
              allCases.length
            ];

          return (
            item[
              language
            ] ||
            item.en ||
            item.es
          );
        };

      /* ==============================================
         QUESTION 1 — DISCOVERY
         ============================================== */

      bank.push(
        makeQuestion(
          caseItem,
          module,
          language,
          "discovery",

          {
            en:
              `In the "${content.title}" case, what is the best way to open the conversation?`,

            es:
              `En el caso "${content.title}", ¿cuál es la mejor forma de iniciar la conversación?`,

            fr:
              `Dans le cas « ${content.title} », quelle est la meilleure façon d’ouvrir la conversation ?`
          }[
            language
          ],

          content.first,

          alternate(
            1
          ).first,

          {
            en:
              "Immediately offer a broad discount without asking diagnostic questions.",

            es:
              "Ofrecer inmediatamente un descuento general sin hacer preguntas de diagnóstico.",

            fr:
              "Proposer immédiatement une remise générale sans poser de questions de diagnostic."
          }[
            language
          ],

          alternate(
            2
          ).first,

          {
            en:
              "Tell the merchant the situation is normal and end the discussion.",

            es:
              "Decirle al merchant que la situación es normal y terminar la conversación.",

            fr:
              "Dire au commerçant que la situation est normale et terminer la conversation."
          }[
            language
          ],

          explanations.discovery[
            language
          ]
        )
      );

      /* ==============================================
         QUESTION 2 — ROOT CAUSE
         ============================================== */

      bank.push(
        makeQuestion(
          caseItem,
          module,
          language,
          "root-cause",

          {
            en:
              `What is the most likely root cause in "${content.title}"?`,

            es:
              `¿Cuál es la causa raíz más probable en "${content.title}"?`,

            fr:
              `Quelle est la cause racine la plus probable dans « ${content.title} » ?`
          }[
            language
          ],

          content.root,

          alternate(
            3
          ).root,

          alternate(
            4
          ).root,

          {
            en:
              "The only cause is that customers do not like DoorDash.",

            es:
              "La única causa es que a los clientes no les gusta DoorDash.",

            fr:
              "La seule cause est que les clients n’aiment pas DoorDash."
          }[
            language
          ],

          explanations.rootCause[
            language
          ]
        )
      );

      /* ==============================================
         QUESTION 3 — NAVIGATION
         ============================================== */

      const activePages =
        caseItem.pages ||
        [];

      const correctPage =
        activePages[0] ||
        "home";

      const pageLabels =
        PAGE_LABELS;

      const correctLabel =
        pageLabels[
          correctPage
        ]?.[
          language
        ] ||
        correctPage;

      const wrongKeys =
        Object.keys(
          pageLabels
        ).filter(
          key =>
            !activePages.includes(
              key
            )
        );

      const wrongLabel1 =
        pageLabels[
          wrongKeys[
            caseItem.id %
            wrongKeys.length
          ]
        ]?.[
          language
        ] ||
        "Other area";

      const wrongLabel2 =
        pageLabels[
          wrongKeys[
            (
              caseItem.id +
              3
            ) %
            wrongKeys.length
          ]
        ]?.[
          language
        ] ||
        "Other area";

      const wrongLabel3 =
        pageLabels[
          wrongKeys[
            (
              caseItem.id +
              5
            ) %
            wrongKeys.length
          ]
        ]?.[
          language
        ] ||
        "Other area";

      bank.push(
        makeQuestion(
          caseItem,
          module,
          language,
          "navigation",

          {
            en:
              `Which Portal area should you review first for "${content.title}"?`,

            es:
              `¿Qué área del Portal deberías revisar primero para "${content.title}"?`,

            fr:
              `Quelle zone du Portal devriez-vous examiner en premier pour « ${content.title} » ?`
          }[
            language
          ],

          correctLabel,

          wrongLabel1,

          wrongLabel2,

          wrongLabel3,

          explanations.navigation[
            language
          ]
        )
      );

      /* ==============================================
         QUESTION 4 — SOLUTION
         ============================================== */

      bank.push(
        makeQuestion(
          caseItem,
          module,
          language,
          "solution",

          {
            en:
              `What is the best solution for "${content.title}"?`,

            es:
              `¿Cuál es la mejor solución para "${content.title}"?`,

            fr:
              `Quelle est la meilleure solution pour « ${content.title} » ?`
          }[
            language
          ],

          content.action,

          alternate(
            5
          ).action,

          alternate(
            6
          ).action,

          {
            en:
              "Apply a large change immediately without measuring the result.",

            es:
              "Aplicar un cambio grande inmediatamente sin medir el resultado.",

            fr:
              "Appliquer immédiatement un changement important sans mesurer le résultat."
          }[
            language
          ],

          explanations.solution[
            language
          ]
        )
      );

      /* ==============================================
         QUESTION 5 — VERIFICATION / CLOSE
         ============================================== */

      bank.push(
        makeQuestion(
          caseItem,
          module,
          language,
          "verification",

          {
            en:
              `What is the best verifiable close for "${content.title}"?`,

            es:
              `¿Cuál es el mejor cierre verificable para "${content.title}"?`,

            fr:
              `Quelle est la meilleure clôture vérifiable pour « ${content.title} » ?`
          }[
            language
          ],

          content.close,

          alternate(
            7
          ).close,

          {
            en:
              "Close the case after making the change without setting a follow-up.",
            es:
              "Cerrar el caso después del cambio sin establecer seguimiento.",
            fr:
              "Clore le dossier après le changement sans organiser de suivi."
          }[
            language
          ],

          alternate(
            8
          ).close,

          explanations.verification[
            language
          ]
        )
      );

    }
  );

  return bank;
}

/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default {
  CASES,
  MODULES,
  PAGE_LABELS,
  getCase,
  getModule,
  moduleForCase,
  buildCertificationBank
};
