/* =========================================================
   DoorDash AM Training Academy
   i18n.js
   Languages: English / Español / Français
   ========================================================= */

(function () {
  "use strict";

  const LANGUAGES = {
    en: "English",
    es: "Español",
    fr: "Français"
  };

  const STORAGE_KEY = "training_language";

  /* =========================================================
     TRANSLATIONS
     ========================================================= */

  const TRANSLATIONS = {

    /* =========================
       COMMON
       ========================= */

    "common.language": {
      en: "Language",
      es: "Idioma",
      fr: "Langue"
    },

    "common.back": {
      en: "Back",
      es: "Volver",
      fr: "Retour"
    },

    "common.backAcademy": {
      en: "Back to Academy",
      es: "Volver a la Academia",
      fr: "Retour à l'Académie"
    },

    "common.next": {
      en: "Next",
      es: "Siguiente",
      fr: "Suivant"
    },

    "common.previous": {
      en: "Previous",
      es: "Anterior",
      fr: "Précédent"
    },

    "common.start": {
      en: "Start",
      es: "Comenzar",
      fr: "Commencer"
    },

    "common.continue": {
      en: "Continue",
      es: "Continuar",
      fr: "Continuer"
    },

    "common.continueTraining": {
      en: "Continue training",
      es: "Continuar entrenamiento",
      fr: "Continuer la formation"
    },

    "common.logout": {
      en: "Sign out",
      es: "Cerrar sesión",
      fr: "Se déconnecter"
    },

    "common.admin": {
      en: "Administration",
      es: "Administración",
      fr: "Administration"
    },

    "common.academy": {
      en: "Academy",
      es: "Academia",
      fr: "Académie"
    },

    "common.open": {
      en: "Open",
      es: "Abrir",
      fr: "Ouvrir"
    },

    "common.practice": {
      en: "Practice",
      es: "Practicar",
      fr: "Pratiquer"
    },

    "common.review": {
      en: "Review",
      es: "Repasar",
      fr: "Réviser"
    },

    "common.viewCases": {
      en: "View cases",
      es: "Ver casos",
      fr: "Voir les cas"
    },

    "common.completed": {
      en: "Completed",
      es: "Completado",
      fr: "Terminé"
    },

    "common.pending": {
      en: "Pending",
      es: "Pendiente",
      fr: "En attente"
    },

    "common.assigned": {
      en: "Assigned",
      es: "Asignado",
      fr: "Attribué"
    },

    "common.save": {
      en: "Save changes",
      es: "Guardar cambios",
      fr: "Enregistrer les modifications"
    },

    "common.cancel": {
      en: "Cancel",
      es: "Cancelar",
      fr: "Annuler"
    },

    "common.search": {
      en: "Search",
      es: "Buscar",
      fr: "Rechercher"
    },

    "common.all": {
      en: "All",
      es: "Todos",
      fr: "Tous"
    },

    "common.create": {
      en: "Create",
      es: "Crear",
      fr: "Créer"
    },

    "common.assign": {
      en: "Assign",
      es: "Asignar",
      fr: "Attribuer"
    },

    "common.exportCsv": {
      en: "Export CSV",
      es: "Exportar CSV",
      fr: "Exporter CSV"
    },

    /* =========================
       LOGIN
       ========================= */

    "login.welcome": {
      en: "Welcome to Training",
      es: "Bienvenido al entrenamiento",
      fr: "Bienvenue dans la formation"
    },

    "login.subtitle": {
      en:
        "Sign in once. Your profile is created automatically and your progress is synchronized with the Academy and administration console.",

      es:
        "Inicia sesión una sola vez. Tu perfil se crea automáticamente y tu progreso se sincroniza con la Academia y la consola administrativa.",

      fr:
        "Connectez-vous une seule fois. Votre profil est créé automatiquement et votre progression est synchronisée avec l'Académie et la console d'administration."
    },

    "login.access": {
      en: "Training access",
      es: "Acceso al entrenamiento",
      fr: "Accès à la formation"
    },

    "login.noProfile": {
      en:
        "You do not need to create a manual profile or store a password inside the platform.",

      es:
        "No necesitas crear un perfil manual ni guardar una contraseña dentro de la plataforma.",

      fr:
        "Vous n'avez pas besoin de créer un profil manuellement ni de stocker un mot de passe dans la plateforme."
    },

    "login.google": {
      en: "Continue with Google",
      es: "Continuar con Google",
      fr: "Continuer avec Google"
    },

    "login.autoProfile": {
      en: "Automatic profile",
      es: "Perfil automático",
      fr: "Profil automatique"
    },

    "login.autoProfileBody": {
      en:
        "Your name and email come from your authenticated account.",

      es:
        "Tu nombre y correo vienen de tu cuenta autenticada.",

      fr:
        "Votre nom et votre adresse e-mail proviennent de votre compte authentifié."
    },

    "login.cloudProgress": {
      en: "Synchronized progress",
      es: "Progreso sincronizado",
      fr: "Progression synchronisée"
    },

    "login.cloudProgressBody": {
      en:
        "Cases, quizzes and activity are synchronized with Firestore.",

      es:
        "Los casos, cuestionarios y actividad se sincronizan con Firestore.",

      fr:
        "Les cas, questionnaires et activités sont synchronisés avec Firestore."
    },

    "login.presence": {
      en: "Real-time presence",
      es: "Presencia en tiempo real",
      fr: "Présence en temps réel"
    },

    "login.presenceBody": {
      en:
        "The administration console can see who is currently connected.",

      es:
        "La consola administrativa puede ver quién está conectado.",

      fr:
        "La console d'administration peut voir qui est actuellement connecté."
    },

    /* =========================
       ACADEMY
       ========================= */

    "academy.learningPath": {
      en: "YOUR LEARNING PATH",
      es: "TU RUTA DE APRENDIZAJE",
      fr: "VOTRE PARCOURS DE FORMATION"
    },

    "academy.greeting": {
      en: "Hi",
      es: "Hola",
      fr: "Bonjour"
    },

    "academy.summary": {
      en:
        "Keep building your skills through real Merchant Portal cases.",

      es:
        "Continúa desarrollando tus habilidades con casos reales del Merchant Portal.",

      fr:
        "Continuez à développer vos compétences grâce à des cas réels du Merchant Portal."
    },

    "academy.generalProgress": {
      en: "Overall progress",
      es: "Progreso general",
      fr: "Progression générale"
    },

    "academy.casesApproved": {
      en: "Approved cases",
      es: "Casos aprobados",
      fr: "Cas approuvés"
    },

    "academy.completedCases": {
      en: "Completed cases",
      es: "Casos completados",
      fr: "Cas terminés"
    },

    "academy.mainLibrary": {
      en: "Main library",
      es: "Biblioteca principal",
      fr: "Bibliothèque principale"
    },

    "academy.average": {
      en: "Average",
      es: "Promedio",
      fr: "Moyenne"
    },

    "academy.bestScores": {
      en: "Best scores",
      es: "Mejores puntuaciones",
      fr: "Meilleurs scores"
    },

    "academy.activeTime": {
      en: "Active time",
      es: "Tiempo activo",
      fr: "Temps actif"
    },

    "academy.sessions": {
      en: "Recorded sessions",
      es: "Sesiones registradas",
      fr: "Sessions enregistrées"
    },

    "academy.streak": {
      en: "Streak",
      es: "Racha",
      fr: "Série"
    },

    "academy.consecutiveDays": {
      en: "Consecutive days",
      es: "Días consecutivos",
      fr: "Jours consécutifs"
    },

    "academy.learningRoute": {
      en: "Learning path",
      es: "Ruta de aprendizaje",
      fr: "Parcours de formation"
    },

    "academy.assignments": {
      en: "Assigned training",
      es: "Entrenamientos asignados",
      fr: "Formations attribuées"
    },

    "academy.assignmentSub": {
      en: "Manager assignments and due dates",
      es: "Asignaciones de managers y fechas límite",
      fr: "Attributions des managers et dates limites"
    },

    "academy.certification": {
      en: "Certification",
      es: "Certificación",
      fr: "Certification"
    },

    "academy.notTaken": {
      en: "You have not completed the certification yet.",
      es: "Aún no has realizado la certificación.",
      fr: "Vous n'avez pas encore effectué la certification."
    },

    "academy.openCertification": {
      en: "Open certification",
      es: "Abrir certificación",
      fr: "Ouvrir la certification"
    },

    "academy.myProfile": {
      en: "My profile",
      es: "Mi perfil",
      fr: "Mon profil"
    },

    /* =========================
       PROFILE
       ========================= */

    "profile.team": {
      en: "Team",
      es: "Equipo",
      fr: "Équipe"
    },

    "profile.role": {
      en: "Role",
      es: "Rol",
      fr: "Rôle"
    },

    "profile.language": {
      en: "Language",
      es: "Idioma",
      fr: "Langue"
    },

    "profile.lastAccess": {
      en: "Last access",
      es: "Último acceso",
      fr: "Dernier accès"
    },

    /* =========================
       CERTIFICATION
       ========================= */

    "cert.final": {
      en: "FINAL CERTIFICATION",
      es: "CERTIFICACIÓN FINAL",
      fr: "CERTIFICATION FINALE"
    },

    "cert.title": {
      en: "Account Manager Certification",
      es: "Certificación de Account Manager",
      fr: "Certification Account Manager"
    },

    "cert.description": {
      en:
        "Formal assessment with no hints or immediate feedback. Your result is saved to your profile and can be downloaded as an official PDF.",

      es:
        "Evaluación formal sin pistas ni retroalimentación inmediata. Tu resultado queda guardado en tu perfil y puedes descargar un PDF oficial.",

      fr:
        "Évaluation formelle sans indices ni retour immédiat. Votre résultat est enregistré dans votre profil et peut être téléchargé en PDF officiel."
    },

    "cert.questions": {
      en: "Questions",
      es: "Preguntas",
      fr: "Questions"
    },

    "cert.passMark": {
      en: "Passing score",
      es: "Nota mínima",
      fr: "Note minimale"
    },

    "cert.time": {
      en: "Time",
      es: "Tiempo",
      fr: "Temps"
    },

    "cert.whatEvaluated": {
      en: "What is evaluated",
      es: "Qué se evalúa",
      fr: "Ce qui est évalué"
    },

    "cert.skills": {
      en:
        "Discovery, root-cause diagnosis, Portal navigation, solution design and verifiable close.",

      es:
        "Discovery, diagnóstico de causa raíz, navegación del Portal, diseño de solución y cierre verificable.",

      fr:
        "Discovery, diagnostic de cause racine, navigation du Portal, conception de solution et clôture vérifiable."
    },

    "cert.start": {
      en: "Start certification",
      es: "Comenzar certificación",
      fr: "Commencer la certification"
    },

    "cert.question": {
      en: "Question",
      es: "Pregunta",
      fr: "Question"
    },

    "cert.timeRemaining": {
      en: "Time remaining",
      es: "Tiempo restante",
      fr: "Temps restant"
    },

    "cert.progressSaved": {
      en: "Your progress is saved automatically.",
      es: "Tu progreso se guarda automáticamente.",
      fr: "Votre progression est enregistrée automatiquement."
    },

    "cert.submit": {
      en: "Submit certification",
      es: "Enviar certificación",
      fr: "Envoyer la certification"
    },

    "cert.saving": {
      en: "Saving your certification",
      es: "Guardando tu certificación",
      fr: "Enregistrement de votre certification"
    },

    "cert.savingBody": {
      en:
        "Your result is being sent and stored securely.",

      es:
        "Tu resultado se está enviando y guardando de forma segura.",

      fr:
        "Votre résultat est envoyé et enregistré de manière sécurisée."
    },

    "cert.approved": {
      en: "Certification approved",
      es: "Certificación aprobada",
      fr: "Certification réussie"
    },

    "cert.notApproved": {
      en: "Certification not approved",
      es: "Certificación no aprobada",
      fr: "Certification non réussie"
    },

    "cert.approvedBadge": {
      en: "APPROVED",
      es: "APROBADO",
      fr: "RÉUSSI"
    },

    "cert.failedBadge": {
      en: "NOT APPROVED",
      es: "NO APROBADO",
      fr: "NON RÉUSSI"
    },

    "cert.correct": {
      en: "Correct",
      es: "Correctas",
      fr: "Correctes"
    },

    "cert.total": {
      en: "Total",
      es: "Total",
      fr: "Total"
    },

    "cert.date": {
      en: "Date",
      es: "Fecha",
      fr: "Date"
    },

    "cert.download": {
      en: "Download certificate PDF",
      es: "Descargar certificado PDF",
      fr: "Télécharger le certificat PDF"
    },

    "cert.downloadResult": {
      en: "Download result PDF",
      es: "Descargar resultado PDF",
      fr: "Télécharger le PDF du résultat"
    },

    "cert.retry": {
      en: "Try again",
      es: "Intentar nuevamente",
      fr: "Réessayer"
    },

    /* =========================
       ADMIN
       ========================= */

    "admin.title": {
      en: "Training administration",
      es: "Administración de capacitación",
      fr: "Administration de la formation"
    },

    "admin.subtitle": {
      en:
        "Users, teams, assignments, certification, presence and real-time analytics.",

      es:
        "Usuarios, equipos, asignaciones, certificación, presencia y analítica en tiempo real.",

      fr:
        "Utilisateurs, équipes, attributions, certification, présence et analytique en temps réel."
    },

    "admin.overview": {
      en: "Overview",
      es: "Resumen",
      fr: "Vue d'ensemble"
    },

    "admin.users": {
      en: "Users",
      es: "Usuarios",
      fr: "Utilisateurs"
    },

    "admin.teams": {
      en: "Teams",
      es: "Equipos",
      fr: "Équipes"
    },

    "admin.assignments": {
      en: "Assignments",
      es: "Asignaciones",
      fr: "Attributions"
    },

    "admin.analytics": {
      en: "Analytics",
      es: "Analítica",
      fr: "Analytique"
    },

    "admin.participants": {
      en: "Participants",
      es: "Participantes",
      fr: "Participants"
    },

    "admin.online": {
      en: "Online",
      es: "En línea",
      fr: "En ligne"
    },

    "admin.offline": {
      en: "Offline",
      es: "Desconectado",
      fr: "Hors ligne"
    },

    "admin.avgProgress": {
      en: "Average progress",
      es: "Progreso medio",
      fr: "Progression moyenne"
    },

    "admin.certRate": {
      en: "Certification pass rate",
      es: "Tasa de aprobación",
      fr: "Taux de réussite"
    },

    "admin.totalTime": {
      en: "Total time",
      es: "Tiempo total",
      fr: "Temps total"
    },

    "admin.recentUsers": {
      en: "Recent users",
      es: "Usuarios recientes",
      fr: "Utilisateurs récents"
    },

    "admin.assignTraining": {
      en: "Assign training",
      es: "Asignar entrenamiento",
      fr: "Attribuer une formation"
    },

    "admin.newAssignment": {
      en: "New assignment",
      es: "Nueva asignación",
      fr: "Nouvelle attribution"
    },

    "admin.export": {
      en: "Export CSV",
      es: "Exportar CSV",
      fr: "Exporter CSV"
    },

    "admin.manage": {
      en: "Manage",
      es: "Administrar",
      fr: "Gérer"
    },

    "admin.createTeam": {
      en: "Create team",
      es: "Crear equipo",
      fr: "Créer une équipe"
    },

    "admin.resetProfile": {
      en: "Reset profile and progress",
      es: "Reiniciar perfil y progreso",
      fr: "Réinitialiser le profil et la progression"
    },

    "admin.userBase": {
      en: "Participant database",
      es: "Base de participantes",
      fr: "Base des participants"
    },

    "admin.progressModule": {
      en: "Progress by module",
      es: "Progreso por módulo",
      fr: "Progression par module"
    },

    "admin.mostErrors": {
      en: "Questions with most errors",
      es: "Preguntas con más errores",
      fr: "Questions avec le plus d'erreurs"
    },

    /* =========================
       SIMULATOR
       ========================= */

    "sim.title": {
      en: "Merchant Portal Simulator",
      es: "Simulador del Merchant Portal",
      fr: "Simulateur du Merchant Portal"
    },

    "sim.intact": {
      en: "The large simulator file remains intact",
      es: "El archivo grande permanece intacto",
      fr: "Le fichier principal du simulateur reste intact"
    },

    "sim.syncing": {
      en: "Syncing progress...",
      es: "Sincronizando progreso...",
      fr: "Synchronisation de la progression..."
    },

    "sim.synced": {
      en: "Progress synchronized",
      es: "Progreso sincronizado",
      fr: "Progression synchronisée"
    },

    "sim.syncError": {
      en: "Synchronization error",
      es: "Error de sincronización",
      fr: "Erreur de synchronisation"
    },

    /* =========================
       MERCHANT PORTAL
       ========================= */

    "portal.home": {
      en: "Home",
      es: "Inicio",
      fr: "Accueil"
    },

    "portal.orders": {
      en: "Orders",
      es: "Pedidos",
      fr: "Commandes"
    },

    "portal.menu": {
      en: "Menu",
      es: "Menú",
      fr: "Menu"
    },

    "portal.financials": {
      en: "Financials",
      es: "Finanzas",
      fr: "Finances"
    },

    "portal.performance": {
      en: "Performance",
      es: "Rendimiento",
      fr: "Performance"
    },

    "portal.marketing": {
      en: "Marketing",
      es: "Marketing",
      fr: "Marketing"
    },

    "portal.settings": {
      en: "Settings",
      es: "Configuración",
      fr: "Paramètres"
    },

    "portal.onlineOrdering": {
      en: "Online Ordering",
      es: "Pedidos en línea",
      fr: "Commande en ligne"
    },

    "portal.capital": {
      en: "Capital",
      es: "Capital",
      fr: "Capital"
    },

    "portal.pos": {
      en: "POS tool",
      es: "Herramienta POS",
      fr: "Outil POS"
    },

    "portal.training": {
      en: "Training Center",
      es: "Centro de entrenamiento",
      fr: "Centre de formation"
    },

    /* =========================
       EMPTY STATES
       ========================= */

    "empty.noUsers": {
      en: "No users.",
      es: "No hay usuarios.",
      fr: "Aucun utilisateur."
    },

    "empty.noAssignments": {
      en: "No assignments.",
      es: "No hay asignaciones.",
      fr: "Aucune attribution."
    },

    "empty.noTeams": {
      en: "No teams have been created.",
      es: "No hay equipos creados.",
      fr: "Aucune équipe n'a été créée."
    },

    /* =========================
       SYSTEM MESSAGES
       ========================= */

    "messages.userUpdated": {
      en: "User updated",
      es: "Usuario actualizado",
      fr: "Utilisateur mis à jour"
    },

    "messages.teamCreated": {
      en: "Team created.",
      es: "Equipo creado.",
      fr: "Équipe créée."
    },

    "messages.assignmentCreated": {
      en: "Training assigned",
      es: "Entrenamiento asignado",
      fr: "Formation attribuée"
    },

    "messages.profileReset": {
      en:
        "Profile reset. The person can sign in again with Google.",

      es:
        "Perfil reiniciado. La persona puede volver a entrar con Google.",

      fr:
        "Profil réinitialisé. La personne peut se reconnecter avec Google."
    }
  };

  /* =========================================================
     LANGUAGE HELPERS
     ========================================================= */

  function normalizeLanguage(value) {
    const language =
      String(value || "")
        .trim()
        .toLowerCase();

    if (
      language === "es" ||
      language === "spanish" ||
      language === "español"
    ) {
      return "es";
    }

    if (
      language === "fr" ||
      language === "french" ||
      language === "français"
    ) {
      return "fr";
    }

    return "en";
  }

  function browserLanguage() {
    const language =
      String(
        navigator.language ||
        navigator.userLanguage ||
        "en"
      ).toLowerCase();

    if (language.startsWith("es")) {
      return "es";
    }

    if (language.startsWith("fr")) {
      return "fr";
    }

    return "en";
  }

  function getLanguage() {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      return normalizeLanguage(
        saved
      );
    }

    return browserLanguage();
  }

  function getText(
    key,
    language = getLanguage(),
    fallback = ""
  ) {
    const item =
      TRANSLATIONS[key];

    if (!item) {
      return fallback || key;
    }

    const lang =
      normalizeLanguage(
        language
      );

    return (
      item[lang] ||
      item.en ||
      item.es ||
      fallback ||
      key
    );
  }

  /* =========================================================
     APPLY TRANSLATIONS
     ========================================================= */

  function translateElement(
    element,
    language
  ) {
    if (!element) {
      return;
    }

    const textKey =
      element.getAttribute(
        "data-i18n"
      );

    if (textKey) {
      element.textContent =
        getText(
          textKey,
          language,
          element.textContent
        );
    }

    const htmlKey =
      element.getAttribute(
        "data-i18n-html"
      );

    if (htmlKey) {
      element.innerHTML =
        getText(
          htmlKey,
          language,
          element.innerHTML
        );
    }

    const placeholderKey =
      element.getAttribute(
        "data-i18n-placeholder"
      );

    if (placeholderKey) {
      element.setAttribute(
        "placeholder",
        getText(
          placeholderKey,
          language,
          element.getAttribute(
            "placeholder"
          ) || ""
        )
      );
    }

    const titleKey =
      element.getAttribute(
        "data-i18n-title"
      );

    if (titleKey) {
      element.setAttribute(
        "title",
        getText(
          titleKey,
          language,
          element.getAttribute(
            "title"
          ) || ""
        )
      );
    }

    const ariaKey =
      element.getAttribute(
        "data-i18n-aria-label"
      );

    if (ariaKey) {
      element.setAttribute(
        "aria-label",
        getText(
          ariaKey,
          language,
          element.getAttribute(
            "aria-label"
          ) || ""
        )
      );
    }
  }

  function applyTranslations(
    root = document
  ) {
    const language =
      getLanguage();

    document.documentElement.lang =
      language;

    if (
      root instanceof Element
    ) {
      translateElement(
        root,
        language
      );
    }

    if (
      root.querySelectorAll
    ) {
      root
        .querySelectorAll(
          [
            "[data-i18n]",
            "[data-i18n-html]",
            "[data-i18n-placeholder]",
            "[data-i18n-title]",
            "[data-i18n-aria-label]"
          ].join(",")
        )
        .forEach(
          element => {
            translateElement(
              element,
              language
            );
          }
        );
    }

    updateSelectors();
  }

  /* =========================================================
     LANGUAGE SELECTOR
     ========================================================= */

  function createSelector() {
    if (
      document.getElementById(
        "languageSwitcher"
      )
    ) {
      updateSelectors();
      return;
    }

    const wrapper =
      document.createElement(
        "div"
      );

    wrapper.id =
      "languageSwitcher";

    wrapper.className =
      "training-language-switcher";

    wrapper.innerHTML = `
      <span
        class="training-language-icon"
        aria-hidden="true"
      >
        🌐
      </span>

      <select
        id="languageSelector"
        class="training-language-select"
        aria-label="Language"
      >
        <option value="en">
          English
        </option>

        <option value="es">
          Español
        </option>

        <option value="fr">
          Français
        </option>
      </select>
    `;

    const target =
      document.querySelector(
        ".top-actions"
      ) ||
      document.querySelector(
        ".topbar"
      ) ||
      document.querySelector(
        "header"
      ) ||
      document.body;

    if (
      target.classList &&
      target.classList.contains(
        "top-actions"
      )
    ) {
      target.prepend(
        wrapper
      );
    } else {
      target.appendChild(
        wrapper
      );
    }

    const selector =
      wrapper.querySelector(
        "#languageSelector"
      );

    selector.value =
      getLanguage();

    selector.addEventListener(
      "change",
      event => {
        setLanguage(
          event.target.value
        );
      }
    );
  }

  function updateSelectors() {
    const language =
      getLanguage();

    document
      .querySelectorAll(
        "#languageSelector"
      )
      .forEach(
        selector => {
          selector.value =
            language;
        }
      );
  }

  /* =========================================================
     SET LANGUAGE
     ========================================================= */

  function setLanguage(
    language,
    dispatch = true
  ) {
    const normalized =
      normalizeLanguage(
        language
      );

    localStorage.setItem(
      STORAGE_KEY,
      normalized
    );

    document.documentElement.lang =
      normalized;

    applyTranslations(
      document
    );

    if (dispatch) {
      window.dispatchEvent(
        new CustomEvent(
          "training-language-change",
          {
            detail: {
              language:
                normalized
            }
          }
        )
      );
    }

    return normalized;
  }

  /* =========================================================
     FIRESTORE LANGUAGE RESTORE SUPPORT
     ========================================================= */

  function adoptRemoteLanguage(
    language
  ) {
    const existing =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (existing) {
      return getLanguage();
    }

    return setLanguage(
      normalizeLanguage(
        language
      ),
      false
    );
  }

  /* =========================================================
     DYNAMIC CONTENT OBSERVER
     ========================================================= */

  function observeDynamicContent() {
    if (!document.body) {
      return;
    }

    const observer =
      new MutationObserver(
        mutations => {
          for (
            const mutation
            of mutations
          ) {
            for (
              const node
              of mutation.addedNodes
            ) {
              if (
                node.nodeType ===
                Node.ELEMENT_NODE
              ) {
                applyTranslations(
                  node
                );
              }
            }
          }
        }
      );

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true
      }
    );

    window.TRAINING_I18N_OBSERVER =
      observer;
  }

  /* =========================================================
     IFRAME SUPPORT
     ========================================================= */

  function translateIframe(
    frame
  ) {
    if (!frame) {
      return;
    }

    try {
      const iframeDocument =
        frame.contentDocument;

      if (!iframeDocument) {
        return;
      }

      iframeDocument
        .documentElement
        .setAttribute(
          "lang",
          getLanguage()
        );

      /*
       * Later we will connect the large Merchant Portal
       * simulator to the same translation dictionary.
       *
       * For now this establishes the shared language state
       * without modifying the large simulator file.
       */
    } catch (error) {
      console.warn(
        "[i18n] Could not access iframe:",
        error
      );
    }
  }

  function watchIframes() {
    document
      .querySelectorAll(
        "iframe"
      )
      .forEach(
        frame => {
          frame.addEventListener(
            "load",
            () => {
              translateIframe(
                frame
              );
            }
          );

          translateIframe(
            frame
          );
        }
      );
  }

  /* =========================================================
     STYLE
     ========================================================= */

  function injectStyles() {
    if (
      document.getElementById(
        "trainingLanguageStyles"
      )
    ) {
      return;
    }

    const style =
      document.createElement(
        "style"
      );

    style.id =
      "trainingLanguageStyles";

    style.textContent = `
      .training-language-switcher {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        min-height: 38px;
        padding: 0 11px;
        border: 1px solid #dfe2e8;
        border-radius: 999px;
        background: #ffffff;
        color: #1b1c20;
        box-shadow: 0 2px 8px rgba(20, 22, 30, 0.04);
        flex: 0 0 auto;
      }

      .training-language-icon {
        font-size: 14px;
        line-height: 1;
      }

      .training-language-select {
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        outline: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
        padding: 0 17px 0 0;
        min-width: 76px;
        background-image:
          linear-gradient(
            45deg,
            transparent 50%,
            #555 50%
          ),
          linear-gradient(
            135deg,
            #555 50%,
            transparent 50%
          );
        background-position:
          calc(100% - 8px) 50%,
          calc(100% - 4px) 50%;
        background-size:
          4px 4px,
          4px 4px;
        background-repeat:
          no-repeat;
      }

      .training-language-select option {
        color: #16171b;
        background: #ffffff;
      }

      @media (max-width: 720px) {
        .training-language-switcher {
          min-height: 36px;
          padding: 0 9px;
        }

        .training-language-icon {
          display: none;
        }

        .training-language-select {
          min-width: 70px;
        }
      }
    `;

    document.head.appendChild(
      style
    );
  }

  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function init() {
    injectStyles();

    document.documentElement.lang =
      getLanguage();

    createSelector();

    applyTranslations(
      document
    );

    observeDynamicContent();

    watchIframes();
  }

  /* =========================================================
     PUBLIC API
     ========================================================= */

  window.TRAINING_I18N = {
    LANGUAGES,
    TRANSLATIONS,
    STORAGE_KEY,

    getLanguage,
    setLanguage,
    getText,
    applyTranslations,
    normalizeLanguage,
    adoptRemoteLanguage,
    translateIframe
  };

  window.addEventListener(
    "training-language-change",
    () => {
      applyTranslations(
        document
      );

      document
        .querySelectorAll(
          "iframe"
        )
        .forEach(
          frame => {
            translateIframe(
              frame
            );
          }
        );
    }
  );

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );
  } else {
    init();
  }

})();
