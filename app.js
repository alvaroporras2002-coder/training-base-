import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut,
  onAuthStateChanged, setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc,
  collection, query, where, onSnapshot, getDocs, writeBatch,
  serverTimestamp, increment
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
  CASES,
  MODULES,
  getCase,
  getModule,
  buildCertificationBank
} from "./academy-data.js";

const config = window.TRAINING_FIREBASE_CONFIG || {};
const settings = window.TRAINING_APP_SETTINGS || {};
const page = document.body.dataset.page || "";
const appName = settings.firebaseAppName || "training-simulator-v14-cloud";

if (!config.apiKey || !config.projectId || !config.appId) {
  throw new Error("Falta la configuración de Firebase en firebase-config.js");
}

const app = initializeApp(config, appName);
const auth = getAuth(app);
const db = getFirestore(app);

await setPersistence(auth, browserLocalPersistence);

const names = {
  registrations: settings.registrationsCollection || "trainingRegistrations",
  access: settings.accessCollection || "trainingAccess",
  notes: settings.adminNotesCollection || "trainingAdminNotes",
  admins: settings.adminsCollection || "trainingAdmins",
  presence: settings.presenceCollection || "trainingPresence",
  teams: settings.teamsCollection || "trainingTeams",
  assignments: settings.assignmentsCollection || "trainingAssignments",
  attempts: settings.certificationAttemptsCollection || "trainingCertificationAttempts",
  drafts: settings.certificationDraftsCollection || "trainingCertificationDrafts",
  sessions: settings.sessionsCollection || "trainingSessions"
};

const $ = id => document.getElementById(id);

const esc = value =>
  String(value ?? "").replace(
    /[&<>"']/g,
    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char])
  );

const clamp = value =>
  Math.max(0, Math.min(100, Math.round(Number(value) || 0)));

const nowIso = () => new Date().toISOString();

const dateKey = value => {
  const d = value instanceof Date
    ? value
    : new Date(value || Date.now());

  return d.toISOString().slice(0, 10);
};

const dateOf = value => {
  if (!value) return null;

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  const d = new Date(value);

  return Number.isNaN(d.getTime())
    ? null
    : d;
};

const fmtDate = value => {
  const d = dateOf(value);

  return d
    ? new Intl.DateTimeFormat(
        "es",
        {
          dateStyle: "medium",
          timeStyle: "short"
        }
      ).format(d)
    : "—";
};

const fmtDay = value => {
  const d = dateOf(value);

  return d
    ? new Intl.DateTimeFormat(
        "es",
        {
          dateStyle: "medium"
        }
      ).format(d)
    : "Sin fecha";
};

const fmtDuration = seconds => {
  seconds = Math.max(
    0,
    Math.round(Number(seconds) || 0)
  );

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  if (h) {
    return `${h} h ${m} min`;
  }

  return `${m} min`;
};

const initials = (name, email) => {
  const parts = String(
    name || email || "?"
  )
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return `${parts[0]?.[0] || "?"}${parts[1]?.[0] || ""}`.toUpperCase();
};

const toast = text => {
  const el = $("toast");

  if (!el) return;

  el.textContent = text;
  el.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(
    () => el.classList.remove("show"),
    2800
  );
};

const setMessage = (
  el,
  text = "",
  type = "error"
) => {
  if (!el) return;

  el.textContent = text;

  el.className =
    `message${text ? ` show ${type}` : ""}`;
};

const busy = (
  button,
  on,
  label = "Procesando..."
) => {
  if (!button) return;

  if (on) {
    button.dataset.old = button.textContent;
    button.textContent = label;
  } else {
    button.textContent =
      button.dataset.old ||
      button.textContent;
  }

  button.disabled = on;
};

const errorText = error => {
  const code = String(error?.code || "");

  if (code.includes("popup-closed-by-user")) {
    return "Se cerró la ventana de Google antes de completar el acceso.";
  }

  if (code.includes("popup-blocked")) {
    return "El navegador bloqueó la ventana de Google. Permite ventanas emergentes.";
  }

  if (code.includes("unauthorized-domain")) {
    return "Este dominio no está autorizado en Firebase Authentication.";
  }

  if (code.includes("permission-denied")) {
    return "Firestore rechazó la operación. Revisa las reglas de seguridad v15.";
  }

  if (code.includes("invalid-credential")) {
    return "Las credenciales no son válidas.";
  }

  return error?.message ||
    "Ocurrió un error inesperado.";
};

function authReady() {
  return new Promise(resolve => {
    const unsub =
      onAuthStateChanged(
        auth,
        user => {
          unsub();
          resolve(user);
        }
      );
  });
}

function allowedEmail(email) {
  const domain = String(
    settings.allowedEmailDomain || ""
  )
    .trim()
    .toLowerCase()
    .replace(/^@/, "");

  return !domain ||
    String(email || "")
      .toLowerCase()
      .endsWith(`@${domain}`);
}

function languageFromBrowser() {
  const code = String(
    navigator.language || "en"
  ).toLowerCase();

  if (code.startsWith("es")) {
    return "Spanish";
  }

  if (code.startsWith("fr")) {
    return "French";
  }

  return "English";
}

async function adminRecord(user) {
  if (!user) return null;

  const snap = await getDoc(
    doc(
      db,
      names.admins,
      user.uid
    )
  );

  return snap.exists() &&
    snap.data().active === true
    ? {
        uid: user.uid,
        ...snap.data()
      }
    : null;
}

async function ensureRegistration(user) {
  if (!user) {
    throw new Error(
      "Sesión no disponible."
    );
  }

  if (!allowedEmail(user.email)) {
    await signOut(auth);

    throw new Error(
      `Tu cuenta no pertenece al dominio autorizado (${settings.allowedEmailDomain}).`
    );
  }

  const accessRef = doc(
    db,
    names.access,
    user.uid
  );

  const accessSnap =
    await getDoc(accessRef);

  if (accessSnap.exists()) {
    const access =
      accessSnap.data();

    if (
      String(access.status || "") ===
      "blocked"
    ) {
      const err = new Error(
        access.message ||
        "Tu acceso al entrenamiento está bloqueado."
      );

      err.name =
        "AccessBlockedError";

      throw err;
    }

    if (
      String(access.status || "") ===
      "archived"
    ) {
      try {
        await deleteDoc(accessRef);
      } catch (error) {
        console.warn(
          "Could not remove old archived access",
          error
        );
      }
    }
  }

  const regRef = doc(
    db,
    names.registrations,
    user.uid
  );

  const snap =
    await getDoc(regRef);

  const old =
    snap.exists()
      ? snap.data()
      : {};

  const visitKey =
    `dd_academy_visit_${user.uid}`;

  const countVisit =
    !sessionStorage.getItem(
      visitKey
    );

  if (countVisit) {
    sessionStorage.setItem(
      visitKey,
      "1"
    );
  }

  const payload = {
    uid: user.uid,

    fullName:
      old.fullName ||
      user.displayName ||
      String(user.email || "")
        .split("@")[0] ||
      "Trainee",

    email:
      String(
        user.email ||
        old.email ||
        ""
      ).toLowerCase(),

    emailLower:
      String(
        user.email ||
        old.email ||
        ""
      ).toLowerCase(),

    photoURL:
      user.photoURL ||
      old.photoURL ||
      "",

    country:
      old.country || "",

    language:
      old.language ||
      languageFromBrowser(),

    status:
      "active",

    authProvider:
      "google.com",

    source:
      "training-academy-v15",

    registrationVersion:
      settings.registrationVersion ||
      4,

    lastLoginAt:
      serverTimestamp(),

    lastSeenAt:
      serverTimestamp(),

    updatedAt:
      serverTimestamp()
  };

  if (!snap.exists()) {
    payload.role =
      settings.defaultRole ||
      "Account Manager";

    payload.employeeId = "";
    payload.teamId = "";
    payload.team = "";

    payload.createdAt =
      serverTimestamp();

    payload.registeredAt =
      serverTimestamp();

    payload.progress = {
      progress: 0,
      score: 0,
      casesCompleted: 0,
      quizAttempts: 0,
      quizPassed: 0
    };

    payload.academyProgress = {
      caseBest: {},
      completedCaseIds: [],
      moduleProgress: {},
      updatedAt: nowIso()
    };
  }

  if (countVisit) {
    payload.visitCount =
      increment(1);
  }

  await setDoc(
    regRef,
    payload,
    {
      merge: true
    }
  );

  return {
    ...old,
    ...payload,
    uid: user.uid
  };
}

async function requireUser() {
  const user =
    await authReady();

  if (!user) {
    location.replace(
      settings.loginUrl ||
      "./index.html"
    );

    throw new Error("NO_AUTH");
  }

  const reg =
    await ensureRegistration(user);

  return {
    user,
    reg
  };
}

function startTracking(
  user,
  pageName,
  registration = {}
) {
  const presenceRef = doc(
    db,
    names.presence,
    user.uid
  );

  const sessionId =
    `${user.uid}_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}`;

  const sessionRef = doc(
    db,
    names.sessions,
    sessionId
  );

  const presenceMs =
    Math.max(
      10000,
      Number(
        settings.presenceHeartbeatMs ||
        20000
      )
    );

  const sessionMs =
    Math.max(
      15000,
      Number(
        settings.sessionHeartbeatMs ||
        30000
      )
    );

  let activeSeconds = 0;
  let stopped = false;
  let sessionStarted = false;

  const base = {
    userId: user.uid,
    uid: user.uid,

    email:
      user.email ||
      registration.email ||
      "",

    displayName:
      user.displayName ||
      registration.fullName ||
      "",

    teamId:
      registration.teamId ||
      "",

    team:
      registration.team ||
      "",

    page:
      pageName,

    sessionId,

    dateKey:
      dateKey(),

    updatedAt:
      serverTimestamp()
  };

  const identityUnsub =
    onSnapshot(
      doc(
        db,
        names.registrations,
        user.uid
      ),
      snap => {
        if (!snap.exists()) {
          return;
        }

        const current =
          snap.data();

        base.teamId =
          current.teamId || "";

        base.team =
          current.team || "";

        base.displayName =
          current.fullName ||
          base.displayName;

        base.email =
          current.email ||
          base.email;
      },
      () => {}
    );

  const writePresence =
    async online => {
      if (
        stopped &&
        online
      ) {
        return;
      }

      try {
        await setDoc(
          presenceRef,
          {
            ...base,
            online: !!online,

            heartbeatAt:
              serverTimestamp(),

            lastSeenAt:
              serverTimestamp(),

            visibility:
              document.visibilityState
          },
          {
            merge: true
          }
        );
      } catch (error) {
        console.warn(
          "Presence sync failed",
          error
        );
      }
    };

  const writeSession =
    async ending => {
      try {
        const payload = {
          ...base,

          activeSeconds,

          lastHeartbeatAt:
            serverTimestamp()
        };

        if (!sessionStarted) {
          payload.startedAt =
            serverTimestamp();

          sessionStarted = true;
        }

        if (ending) {
          payload.endedAt =
            serverTimestamp();
        }

        await setDoc(
          sessionRef,
          payload,
          {
            merge: true
          }
        );
      } catch (error) {
        console.warn(
          "Session sync failed",
          error
        );
      }
    };

  writePresence(true);
  writeSession(false);

  const pTimer =
    setInterval(
      () =>
        writePresence(true),
      presenceMs
    );

  const sTimer =
    setInterval(
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          activeSeconds +=
            Math.round(
              sessionMs / 1000
            );
        }

        writeSession(false);
      },
      sessionMs
    );

  const visibility =
    () =>
      writePresence(true);

  document.addEventListener(
    "visibilitychange",
    visibility
  );

  const stop =
    async () => {
      if (stopped) return;

      stopped = true;

      clearInterval(pTimer);
      clearInterval(sTimer);

      document.removeEventListener(
        "visibilitychange",
        visibility
      );

      try {
        identityUnsub();
      } catch (error) {}

      await Promise.allSettled([
        writeSession(true),
        writePresence(false)
      ]);
    };

  window.addEventListener(
    "pagehide",
    stop,
    {
      once: true
    }
  );

  window.__academyStopTracking =
    stop;

  return {
    sessionId,
    stop
  };
}

function caseBestFrom(reg) {
  const value =
    reg?.academyProgress
      ?.caseBest || {};

  return Object.fromEntries(
    Object.entries(value)
      .map(
        ([k, v]) => [
          String(k),
          Number(v) || 0
        ]
      )
  );
}

function moduleProgress(
  module,
  caseBest
) {
  if (
    !module?.caseIds?.length
  ) {
    return 0;
  }

  const passed =
    module.caseIds.filter(
      id =>
        Number(
          caseBest[
            String(id)
          ] || 0
        ) >=
        Number(
          settings.quizPassPercent ||
          80
        )
    ).length;

  return Math.round(
    passed /
    module.caseIds.length *
    100
  );
}

function moduleProgressMap(
  caseBest
) {
  return Object.fromEntries(
    MODULES.map(
      module => [
        module.id,
        moduleProgress(
          module,
          caseBest
        )
      ]
    )
  );
}

function latestAttempt(
  attempts
) {
  return [...attempts]
    .sort(
      (a, b) =>
        (
          dateOf(
            b.completedAt
          )?.getTime() ||
          0
        ) -
        (
          dateOf(
            a.completedAt
          )?.getTime() ||
          0
        )
    )[0] || null;
}

function streakFromSessions(
  sessions
) {
  const days =
    new Set(
      sessions
        .map(
          s =>
            s.dateKey ||
            dateKey(
              s.startedAt
            )
        )
        .filter(Boolean)
    );

  let count = 0;
  const d = new Date();

  for (;;) {
    const key =
      d
        .toISOString()
        .slice(0, 10);

    if (!days.has(key)) {
      break;
    }

    count++;

    d.setUTCDate(
      d.getUTCDate() - 1
    );
  }

  return count;
}

function targetCaseForModule(
  module,
  caseBest
) {
  return (
    module.caseIds.find(
      id =>
        Number(
          caseBest[
            String(id)
          ] || 0
        ) <
        Number(
          settings.quizPassPercent ||
          80
        )
    ) ||
    module.caseIds[0]
  );
}

function assignmentComplete(
  item,
  caseBest,
  attempts
) {
  if (
    item.type ===
    "certification"
  ) {
    return attempts.some(
      a =>
        a.passed === true
    );
  }

  if (
    item.type ===
    "case"
  ) {
    return Number(
      caseBest[
        String(item.caseId)
      ] || 0
    ) >=
    Number(
      settings.quizPassPercent ||
      80
    );
  }

  if (
    item.type ===
    "module"
  ) {
    return moduleProgress(
      getModule(
        item.moduleId
      ),
      caseBest
    ) >= 100;
  }

  return false;
}

async function initLogin() {
  const status =
    $("status");

  const button =
    $("googleButton");

  const checking =
    $("checking");

  const panel =
    $("signInPanel");

  const user =
    await authReady();

  if (user) {
    try {
      await ensureRegistration(
        user
      );

      location.replace(
        settings.academyUrl ||
        "./academy.html"
      );

      return;
    } catch (error) {
      checking.hidden = true;
      panel.hidden = false;

      setMessage(
        status,
        errorText(error),
        "error"
      );
    }
  } else {
    checking.hidden = true;
    panel.hidden = false;
  }

  button?.addEventListener(
    "click",
    async () => {
      busy(
        button,
        true,
        "Conectando..."
      );

      setMessage(
        status,
        "Abriendo Google...",
        "info"
      );

      try {
        const provider =
          new GoogleAuthProvider();

        provider.setCustomParameters({
          prompt:
            "select_account"
        });

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        await ensureRegistration(
          result.user
        );

        location.replace(
          settings.academyUrl ||
          "./academy.html"
        );
      } catch (error) {
        setMessage(
          status,
          errorText(error),
          "error"
        );

        busy(
          button,
          false
        );
      }
    }
  );
}

async function initAcademy(){
  const {user,reg:initialReg} = await requireUser();

  startTracking(
    user,
    "academy",
    initialReg
  );

  $("userName").textContent =
    initialReg.fullName ||
    user.displayName ||
    "Trainee";

  $("userEmail").textContent =
    user.email || "";

  $("logoutButton").onclick =
    async()=>{
      await window
        .__academyStopTracking?.();

      await signOut(auth);

      location.replace(
        settings.loginUrl ||
        "./index.html"
      );
    };

  const admin =
    await adminRecord(user);

  if(admin){
    $("adminLink").hidden = false;
  }

  const state = {
    reg:
      initialReg,

    assignments:
      [],

    attempts:
      [],

    sessions:
      []
  };

  const regRef =
    doc(
      db,
      names.registrations,
      user.uid
    );

  onSnapshot(
    regRef,
    snap=>{
      if(
        snap.exists()
      ){
        state.reg = {
          uid:
            user.uid,
          ...snap.data()
        };

        renderAcademy();
      }
    }
  );

  onSnapshot(
    query(
      collection(
        db,
        names.assignments
      ),
      where(
        "userId",
        "==",
        user.uid
      )
    ),
    snap=>{
      state.assignments =
        snap.docs.map(
          d=>({
            id:
              d.id,
            ...d.data()
          })
        );

      renderAcademy();
    }
  );

  onSnapshot(
    query(
      collection(
        db,
        names.attempts
      ),
      where(
        "userId",
        "==",
        user.uid
      )
    ),
    snap=>{
      state.attempts =
        snap.docs.map(
          d=>({
            id:
              d.id,
            ...d.data()
          })
        );

      renderAcademy();
    }
  );

  onSnapshot(
    query(
      collection(
        db,
        names.sessions
      ),
      where(
        "userId",
        "==",
        user.uid
      )
    ),
    snap=>{
      state.sessions =
        snap.docs.map(
          d=>({
            id:
              d.id,
            ...d.data()
          })
        );

      renderAcademy();
    }
  );

  async function autoCompleteAssignments(
    caseBest
  ){
    for(
      const item
      of state.assignments
    ){
      if(
        item.status ===
        "completed"
      ){
        continue;
      }

      if(
        assignmentComplete(
          item,
          caseBest,
          state.attempts
        )
      ){
        try{
          await updateDoc(
            doc(
              db,
              names.assignments,
              item.id
            ),
            {
              status:
                "completed",

              completedAt:
                serverTimestamp(),

              updatedAt:
                serverTimestamp()
            }
          );
        }catch(error){
          console.warn(
            error
          );
        }
      }
    }
  }

  function renderAcademy(){
    const reg =
      state.reg ||
      {};

    const caseBest =
      caseBestFrom(
        reg
      );

    const moduleMap =
      moduleProgressMap(
        caseBest
      );

    const completed =
      Object.values(
        caseBest
      ).filter(
        score =>
          score >=
          Number(
            settings.quizPassPercent ||
            80
          )
      ).length;

    const cloudProgress =
      Math.max(
        clamp(
          reg.progress
            ?.progress
        ),
        Math.round(
          completed /
          Number(
            settings.caseCount ||
            20
          ) *
          100
        )
      );

    const avgScore =
      Object.keys(
        caseBest
      ).length
        ? Math.round(
            Object.values(
              caseBest
            ).reduce(
              (
                a,
                b
              ) =>
                a +
                Number(
                  b ||
                  0
                ),
              0
            ) /
            Object.keys(
              caseBest
            ).length
          )
        : clamp(
            reg.progress
              ?.score
          );

    const activeSeconds =
      state.sessions.reduce(
        (
          sum,
          s
        ) =>
          sum +
          Number(
            s.activeSeconds ||
            0
          ),
        0
      );

    const streak =
      streakFromSessions(
        state.sessions
      );

    const cert =
      latestAttempt(
        state.attempts
      );

    const pending =
      state.assignments.filter(
        a =>
          a.status !==
          "completed"
      ).length;

    $("welcomeName").textContent =
      reg.fullName ||
      user.displayName ||
      "Trainee";

    $("statProgress").textContent =
      `${cloudProgress}%`;

    $("statCases").textContent =
      `${completed}/${settings.caseCount || 20}`;

    $("statScore").textContent =
      `${avgScore}%`;

    $("statTime").textContent =
      fmtDuration(
        activeSeconds
      );

    $("statStreak").textContent =
      `${streak} día${streak === 1 ? "" : "s"}`;

    $("heroSummary").textContent =
      pending
        ? `Tienes ${pending} asignación${pending === 1 ? "" : "es"} pendiente${pending === 1 ? "" : "s"}.`
        : "Continúa desarrollando tus habilidades con casos reales del Merchant Portal.";

    const nextModule =
      MODULES.find(
        (
          m,
          index
        ) =>
          moduleMap[
            m.id
          ] <
            100 &&
          (
            index === 0 ||
            moduleMap[
              MODULES[
                index -
                1
              ].id
            ] >=
              100
          )
      ) ||
      MODULES.find(
        m =>
          moduleMap[
            m.id
          ] <
          100
      ) ||
      MODULES[0];

    const nextCase =
      targetCaseForModule(
        nextModule,
        caseBest
      );

    $("continueTraining").href =
      `${
        settings.simulatorWrapperUrl ||
        "./simulator.html"
      }?case=${nextCase}`;

    $("moduleGrid").innerHTML =
      MODULES
        .map(
          (
            module,
            index
          )=>{
            const pct =
              moduleMap[
                module.id
              ] ||
              0;

            const assigned =
              state.assignments.some(
                a =>
                  a.status !==
                    "completed" &&
                  a.moduleId ===
                    module.id
              );

            const unlocked =
              index === 0 ||
              moduleMap[
                MODULES[
                  index -
                  1
                ].id
              ] >=
                100 ||
              assigned;

            const target =
              targetCaseForModule(
                module,
                caseBest
              );

            const scores =
              module.caseIds.map(
                id =>
                  Number(
                    caseBest[
                      String(
                        id
                      )
                    ] ||
                    0
                  )
              );

            const average =
              scores.some(
                Boolean
              )
                ? Math.round(
                    scores.reduce(
                      (
                        a,
                        b
                      ) =>
                        a +
                        b,
                      0
                    ) /
                    scores.filter(
                      Boolean
                    ).length
                  )
                : 0;

            return `
            <article
              class="module ${
                unlocked
                  ? ""
                  : "locked"
              }"
              data-color="${
                module.color
              }"
            >

              <div class="module-icon">
                ${
                  esc(
                    module.icon
                  )
                }
              </div>

              <h3>
                ${
                  esc(
                    module.title
                  )
                }
              </h3>

              <p>
                ${
                  esc(
                    module.subtitle
                  )
                }
              </p>

              <div class="module-meta">

                <span>
                  ${
                    module.caseIds.length
                  } casos
                </span>

                <b>
                  ${pct}%
                </b>

              </div>

              <div class="progress">
                <i
                  style="width:${pct}%"
                ></i>
              </div>

              <div class="module-meta">

                <span>
                  Promedio
                </span>

                <b>
                  ${
                    average ||
                    "—"
                  }
                </b>

              </div>

              <div class="module-actions">

                <a
                  class="btn small ${
                    unlocked
                      ? "red"
                      : ""
                  }"
                  ${
                    unlocked
                      ? `href="${
                          settings.simulatorWrapperUrl ||
                          "./simulator.html"
                        }?case=${target}"`
                      : `aria-disabled="true"`
                  }
                >
                  ${
                    pct === 100
                      ? "Repasar"
                      : "Continuar"
                  }
                </a>

                <button
                  class="btn small"
                  data-module-details="${
                    module.id
                  }"
                >
                  Ver casos
                </button>

              </div>

            </article>
            `;
          }
        )
        .join("");

    $("assignmentList").innerHTML =
      state.assignments.length
        ? [
            ...state.assignments
          ]
            .sort(
              (
                a,
                b
              ) =>
                (
                  dateOf(
                    a.dueAt
                  )?.getTime() ||
                  Infinity
                ) -
                (
                  dateOf(
                    b.dueAt
                  )?.getTime() ||
                  Infinity
                )
            )
            .map(
              item=>{
                const complete =
                  item.status ===
                    "completed" ||
                  assignmentComplete(
                    item,
                    caseBest,
                    state.attempts
                  );

                let href =
                  settings.simulatorWrapperUrl ||
                  "./simulator.html";

                if(
                  item.type ===
                  "certification"
                ){
                  href =
                    settings.certificationUrl ||
                    "./certification.html";
                }
                else if(
                  item.type ===
                  "case"
                ){
                  href +=
                    `?case=${item.caseId}`;
                }
                else if(
                  item.type ===
                  "module"
                ){
                  href +=
                    `?case=${
                      targetCaseForModule(
                        getModule(
                          item.moduleId
                        ),
                        caseBest
                      )
                    }`;
                }

                return `
                <div class="list-row">

                  <div class="list-main">

                    <b>
                      ${
                        esc(
                          item.title ||
                          "Entrenamiento asignado"
                        )
                      }
                    </b>

                    <span>
                      ${
                        esc(
                          item.type ||
                          "training"
                        )
                      }

                      · Vence

                      ${
                        fmtDay(
                          item.dueAt
                        )
                      }
                    </span>

                  </div>

                  <span
                    class="badge ${
                      complete
                        ? "green"
                        : "amber"
                    }"
                  >
                    ${
                      complete
                        ? "Completado"
                        : "Pendiente"
                    }
                  </span>

                  <a
                    class="btn small"
                    href="${href}"
                  >
                    Abrir
                  </a>

                </div>
                `;
              }
            )
            .join("")
        : `
          <div class="empty">
            No tienes entrenamientos asignados.
          </div>
        `;

    $("certStatus").textContent =
      cert
        ? `${
            cert.passed
              ? "Aprobado"
              : "No aprobado"
          }: ${cert.score}%`
        : "Aún no has realizado la certificación.";

    $("certBadge").className =
      `badge ${
        cert
          ? (
              cert.passed
                ? "green"
                : "red"
            )
          : "amber"
      }`;

    $("certBadge").textContent =
      cert
        ? (
            cert.passed
              ? "APROBADO"
              : "NO APROBADO"
          )
        : "PENDIENTE";

    $("profileDetails").innerHTML =
      `
      <div class="list-row">

        <div class="list-main">
          <b>Equipo</b>

          <span>
            ${
              esc(
                reg.team ||
                "Sin asignar"
              )
            }
          </span>
        </div>

      </div>

      <div class="list-row">

        <div class="list-main">
          <b>Rol</b>

          <span>
            ${
              esc(
                reg.role ||
                settings.defaultRole ||
                "Account Manager"
              )
            }
          </span>
        </div>

      </div>

      <div class="list-row">

        <div class="list-main">
          <b>Idioma</b>

          <span>
            ${
              esc(
                reg.language ||
                "English"
              )
            }
          </span>
        </div>

      </div>

      <div class="list-row">

        <div class="list-main">
          <b>Último acceso</b>

          <span>
            ${
              fmtDate(
                reg.lastSeenAt ||
                reg.lastLoginAt
              )
            }
          </span>
        </div>

      </div>
      `;

    autoCompleteAssignments(
      caseBest
    );
  }

  $("moduleGrid")
    .addEventListener(
      "click",
      event=>{
        const button =
          event.target.closest(
            "[data-module-details]"
          );

        if(
          !button
        ){
          return;
        }

        const module =
          getModule(
            button.dataset
              .moduleDetails
          );

        const caseBest =
          caseBestFrom(
            state.reg
          );

        $("moduleModalTitle")
          .textContent =
            module.title;

        $("moduleModalBody")
          .innerHTML =
            module.caseIds
              .map(
                id=>{
                  const c =
                    getCase(id);

                  const score =
                    Number(
                      caseBest[
                        String(id)
                      ] ||
                      0
                    );

                  return `
                  <div class="list-row">

                    <div class="list-main">

                      <b>
                        Caso ${id}:
                        ${
                          esc(
                            c.es.title
                          )
                        }
                      </b>

                      <span>
                        ${
                          esc(
                            c.es.context
                          )
                        }
                      </span>

                    </div>

                    <span
                      class="badge ${
                        score >= 80
                          ? "green"
                          : ""
                      }"
                    >
                      ${
                        score ||
                        0
                      }%
                    </span>

                    <a
                      class="btn small"
                      href="${
                        settings.simulatorWrapperUrl ||
                        "./simulator.html"
                      }?case=${id}"
                    >
                      Practicar
                    </a>

                  </div>
                  `;
                }
              )
              .join("");

        $("moduleModal").hidden =
          false;
      }
    );

  $("moduleModalClose").onclick =
    () =>
      $("moduleModal").hidden =
        true;

  $("moduleModal")
    .addEventListener(
      "click",
      event=>{
        if(
          event.target ===
          $("moduleModal")
        ){
          $("moduleModal").hidden =
            true;
        }
      }
    );
}

async function initAdmin(){

  const user =
    await authReady();

  if(!user){

    $("adminLogin").hidden =
      false;

    $("adminApp").hidden =
      true;

    $("adminGoogle").onclick =
      async()=>{

        try{

          const provider =
            new GoogleAuthProvider();

          provider.setCustomParameters({
            prompt:
              "select_account"
          });

          await signInWithPopup(
            auth,
            provider
          );

          location.reload();

        }catch(error){

          setMessage(
            $("adminLoginMessage"),
            errorText(error),
            "error"
          );
        }
      };

    return;
  }

  const admin =
    await adminRecord(
      user
    );

  if(!admin){

    $("adminLogin").hidden =
      true;

    $("adminApp").hidden =
      true;

    $("adminDenied").hidden =
      false;

    $("deniedUid").textContent =
      user.uid;

    $("deniedLogout").onclick =
      async()=>{
        await signOut(
          auth
        );

        location.reload();
      };

    return;
  }

  $("adminLogin").hidden =
    true;

  $("adminDenied").hidden =
    true;

  $("adminApp").hidden =
    false;

  $("adminName").textContent =
    admin.name ||
    user.displayName ||
    "Administrador";

  $("adminEmail").textContent =
    user.email ||
    user.uid;

  $("adminRole").textContent =
    admin.role ||
    "admin";

  $("adminLogout").onclick =
    async()=>{
      await signOut(
        auth
      );

      location.reload();
    };

  const superAdmin =
    [
      "admin",
      "superadmin"
    ].includes(
      String(
        admin.role ||
        "admin"
      ).toLowerCase()
    );

  const managerTeams =
    Array.isArray(
      admin.teamIds
    )
      ? admin.teamIds.filter(
          Boolean
        )
      : [];

  const state = {

    users:
      new Map(),

    access:
      new Map(),

    presence:
      new Map(),

    teams:
      new Map(),

    assignments:
      new Map(),

    attempts:
      new Map(),

    sessions:
      new Map(),

    notes:
      new Map(),

    unsubs:
      [],

    selected:
      null,

    tab:
      "overview"
  };

  function scoped(
    name,
    target,
    teamField = "teamId"
  ){

    let ref =
      collection(
        db,
        name
      );

    if(!superAdmin){

      if(
        !managerTeams.length
      ){

        target.clear();

        renderAdmin();

        return;
      }

      ref =
        query(
          ref,
          managerTeams.length ===
            1

            ? where(
                teamField,
                "==",
                managerTeams[0]
              )

            : where(
                teamField,
                "in",
                managerTeams.slice(
                  0,
                  10
                )
              )
        );
    }

    const unsub =
      onSnapshot(
        ref,

        snap=>{

          target.clear();

          snap.forEach(
            d =>
              target.set(
                d.id,
                {
                  id:
                    d.id,
                  ...d.data()
                }
              )
          );

          renderAdmin();
        },

        error =>
          toast(
            errorText(error)
          )
      );

    state.unsubs.push(
      unsub
    );
  }

  scoped(
    names.registrations,
    state.users
  );

  scoped(
    names.access,
    state.access
  );

  scoped(
    names.presence,
    state.presence
  );

  scoped(
    names.assignments,
    state.assignments
  );

  scoped(
    names.attempts,
    state.attempts
  );

  scoped(
    names.sessions,
    state.sessions
  );

  scoped(
    names.notes,
    state.notes
  );

  if(
    superAdmin ||
    managerTeams.length
  ){

    const teamRef =
      superAdmin

        ? collection(
            db,
            names.teams
          )

        : query(
            collection(
              db,
              names.teams
            ),

            managerTeams.length ===
              1

              ? where(
                  "id",
                  "==",
                  managerTeams[0]
                )

              : where(
                  "id",
                  "in",
                  managerTeams.slice(
                    0,
                    10
                  )
                )
          );

    state.unsubs.push(
      onSnapshot(
        teamRef,

        snap=>{

          state.teams.clear();

          snap.forEach(
            d =>
              state.teams.set(
                d.id,
                {
                  id:
                    d.id,
                  ...d.data()
                }
              )
          );

          renderAdmin();
        }
      )
    );
  }

  const onlineWindow =
    Math.max(
      30000,
      Number(
        settings.presenceOnlineWindowMs ||
        70000
      )
    );

  function mergedUsers(){

    return [
      ...state.users.values()
    ]
      .map(
        reg=>{

          const uid =
            reg.uid ||
            reg.id;

          const presence =
            state.presence.get(
              uid
            ) ||
            {};

          const access =
            state.access.get(
              uid
            ) ||
            {};

          const caseBest =
            caseBestFrom(
              reg
            );

          const onlineDate =
            dateOf(
              presence.heartbeatAt ||
              presence.lastSeenAt
            );

          const online =
            !!(
              presence.online !==
                false &&
              onlineDate &&
              Date.now() -
                onlineDate.getTime() <=
                onlineWindow
            );

          return {
            ...reg,

            uid,

            presence,

            access,

            online,

            caseBest,

            moduleProgress:
              moduleProgressMap(
                caseBest
              ),

            certAttempts:
              [
                ...state.attempts.values()
              ].filter(
                a =>
                  a.userId ===
                  uid
              ),

            sessions:
              [
                ...state.sessions.values()
              ].filter(
                s =>
                  s.userId ===
                  uid
              ),

            assignments:
              [
                ...state.assignments.values()
              ].filter(
                a =>
                  a.userId ===
                  uid
              ),

            notes:
              state.notes.get(
                uid
              )?.notes ||
              ""
          };
        }
      )
      .sort(
        (a,b)=>
          (
            b.online -
            a.online
          ) ||
          (
            (
              dateOf(
                b.lastSeenAt
              )?.getTime() ||
              0
            ) -
            (
              dateOf(
                a.lastSeenAt
              )?.getTime() ||
              0
            )
          )
      );
  }

  function currentList(){

    const q =
      String(
        $("adminSearch")
          ?.value ||
        ""
      ).toLowerCase();

    const team =
      $("adminTeamFilter")
        ?.value ||
      "all";

    const status =
      $("adminStatusFilter")
        ?.value ||
      "all";

    return mergedUsers()
      .filter(
        u=>{

          const hay =
            `${u.fullName || ""} ${u.email || ""} ${u.employeeId || ""} ${u.team || ""} ${u.uid}`
              .toLowerCase();

          const s =
            u.access.status ||
            "active";

          return (
            (
              !q ||
              hay.includes(q)
            ) &&
            (
              team ===
                "all" ||
              u.teamId ===
                team
            ) &&
            (
              status ===
                "all" ||
              s ===
                status
            )
          );
        }
      );
  }

  function renderAdmin(){

    const users =
      mergedUsers();

    const list =
      currentList();

    const online =
      users.filter(
        u =>
          u.online
      );

    const avg =
      users.length
        ? Math.round(
            users.reduce(
              (
                s,
                u
              ) =>
                s +
                Math.max(
                  clamp(
                    u.progress
                      ?.progress
                  ),
                  Object.keys(
                    u.caseBest
                  ).length /
                    20 *
                    100
                ),
              0
            ) /
            users.length
          )
        : 0;

    const certs =
      [
        ...state.attempts.values()
      ];

    const passRate =
      certs.length
        ? Math.round(
            certs.filter(
              a =>
                a.passed
            ).length /
            certs.length *
            100
          )
        : 0;

    const totalSeconds =
      [
        ...state.sessions.values()
      ].reduce(
        (
          s,
          x
        ) =>
          s +
          Number(
            x.activeSeconds ||
            0
          ),
        0
      );

    $("aRegistered")
      .textContent =
        users.length;

    $("aOnline")
      .textContent =
        online.length;

    $("aProgress")
      .textContent =
        `${avg}%`;

    $("aCertRate")
      .textContent =
        `${passRate}%`;

    $("aTime")
      .textContent =
        fmtDuration(
          totalSeconds
        );

    const teamSelects = [
      $("adminTeamFilter"),
      $("editTeam"),
      $("managerTeams")
    ].filter(
      Boolean
    );

    const teams =
      [
        ...state.teams.values()
      ].sort(
        (
          a,
          b
        ) =>
          String(
            a.name ||
            a.id
          ).localeCompare(
            String(
              b.name ||
              b.id
            )
          )
      );

    teamSelects.forEach(
      select=>{

        const current =
          select.value;

        const multiple =
          select.multiple;

        const selectedBefore =
          multiple
            ? [
                ...select
                  .selectedOptions
              ].map(
                o =>
                  o.value
              )
            : [];

        select.innerHTML =
          (
            multiple
              ? ""
              : '<option value="all">Todos / Sin asignar</option>'
          ) +
          teams
            .map(
              t =>
                `<option value="${esc(t.id)}">${esc(t.name || t.id)}</option>`
            )
            .join("");

        if(
          multiple
        ){

          [
            ...select.options
          ].forEach(
            o =>
              o.selected =
                selectedBefore.includes(
                  o.value
                )
          );

        }else if(
          [
            ...select.options
          ].some(
            o =>
              o.value ===
              current
          )
        ){

          select.value =
            current;
        }
      }
    );

    $("adminUserCount")
      .textContent =
        `${list.length} usuarios`;

    const userRowsHtml =
      list
        .map(
          u=>{

            const progress =
              Math.max(
                clamp(
                  u.progress
                    ?.progress
                ),
                Math.round(
                  Object.keys(
                    u.caseBest
                  ).length /
                  20 *
                  100
                )
              );

            const score =
              Object.keys(
                u.caseBest
              ).length

                ? Math.round(
                    Object.values(
                      u.caseBest
                    ).reduce(
                      (
                        a,
                        b
                      ) =>
                        a +
                        b,
                      0
                    ) /
                    Object.keys(
                      u.caseBest
                    ).length
                  )

                : clamp(
                    u.progress
                      ?.score
                  );

            const cert =
              latestAttempt(
                u.certAttempts
              );

            return `
            <tr>

              <td>

                <div class="person">

                  <div class="avatar">
                    ${
                      initials(
                        u.fullName,
                        u.email
                      )
                    }
                  </div>

                  <div>

                    <b>
                      ${
                        esc(
                          u.fullName ||
                          "Sin nombre"
                        )
                      }
                    </b>

                    <span>
                      ${
                        esc(
                          u.email ||
                          u.uid
                        )
                      }
                    </span>

                  </div>

                </div>

              </td>

              <td>
                ${
                  esc(
                    u.team ||
                    "Sin equipo"
                  )
                }
              </td>

              <td>

                <span
                  class="presence ${
                    u.online
                      ? "online"
                      : ""
                  }"
                >

                  <i></i>

                  ${
                    u.online
                      ? "En línea"
                      : "Offline"
                  }

                </span>

              </td>

              <td>
                ${progress}%
              </td>

              <td>
                ${score}%
              </td>

              <td>
                ${
                  Object.keys(
                    u.caseBest
                  ).length
                }/20
              </td>

              <td>
                ${
                  cert
                    ? `${cert.score}%`
                    : "—"
                }
              </td>

              <td>
                ${
                  fmtDuration(
                    u.sessions.reduce(
                      (
                        s,
                        x
                      ) =>
                        s +
                        Number(
                          x.activeSeconds ||
                          0
                        ),
                      0
                    )
                  )
                }
              </td>

              <td>
                ${
                  fmtDate(
                    u.presence
                      .heartbeatAt ||
                    u.lastSeenAt
                  )
                }
              </td>

              <td>

                <button
                  class="btn small"
                  data-user="${
                    u.uid
                  }"
                >
                  Administrar
                </button>

              </td>

            </tr>
            `;
          }
        )
        .join("") ||
        `
        <tr>

          <td
            colspan="10"
          >

            <div class="empty">
              No hay usuarios.
            </div>

          </td>

        </tr>
        `;

    $("adminUserRows")
      .innerHTML =
        userRowsHtml;

    if(
      $("adminUserRowsMirror")
    ){
      $("adminUserRowsMirror")
        .innerHTML =
          userRowsHtml;
    }

    $("teamRows")
      .innerHTML =
        teams
          .map(
            t =>
              `
              <tr>

                <td>
                  <b>
                    ${
                      esc(
                        t.name ||
                        t.id
                      )
                    }
                  </b>
                </td>

                <td>
                  ${
                    esc(
                      t.cohort ||
                      "—"
                    )
                  }
                </td>

                <td>
                  ${
                    users.filter(
                      u =>
                        u.teamId ===
                        t.id
                    ).length
                  }
                </td>

                <td>
                  ${
                    fmtDate(
                      t.createdAt
                    )
                  }
                </td>

              </tr>
              `
          )
          .join("") ||
        `
        <tr>

          <td
            colspan="4"
          >

            <div class="empty">
              No hay equipos creados.
            </div>

          </td>

        </tr>
        `;

    $("assignmentRows")
      .innerHTML =
        [
          ...state.assignments
            .values()
        ]
          .sort(
            (
              a,
              b
            ) =>
              (
                dateOf(
                  b.createdAt
                )?.getTime() ||
                0
              ) -
              (
                dateOf(
                  a.createdAt
                )?.getTime() ||
                0
              )
          )
          .map(
            a =>
              `
              <tr>

                <td>
                  ${
                    esc(
                      a.title ||
                      "Asignación"
                    )
                  }
                </td>

                <td>
                  ${
                    esc(
                      state.users.get(
                        a.userId
                      )?.fullName ||
                      a.userName ||
                      a.userId
                    )
                  }
                </td>

                <td>
                  ${
                    esc(
                      a.type
                    )
                  }
                </td>

                <td>
                  ${
                    fmtDay(
                      a.dueAt
                    )
                  }
                </td>

                <td>

                  <span
                    class="badge ${
                      a.status ===
                      "completed"
                        ? "green"
                        : "amber"
                    }"
                  >
                    ${
                      esc(
                        a.status ||
                        "assigned"
                      )
                    }
                  </span>

                </td>

              </tr>
              `
          )
          .join("") ||
        `
        <tr>

          <td
            colspan="5"
          >

            <div class="empty">
              No hay asignaciones.
            </div>

          </td>

        </tr>
        `;

    const moduleAvg =
      MODULES.map(
        m=>{

          const vals =
            users.map(
              u =>
                moduleProgress(
                  m,
                  u.caseBest
                )
            );

          return {
            id:
              m.id,

            title:
              m.title,

            avg:
              vals.length
                ? Math.round(
                    vals.reduce(
                      (
                        a,
                        b
                      ) =>
                        a +
                        b,
                      0
                    ) /
                    vals.length
                  )
                : 0
          };
        }
      );

    const moduleAnalyticsHtml =
      moduleAvg
        .map(
          m =>
            `
            <div class="analytics-box">

              <span
                class="muted tiny"
              >
                ${
                  esc(
                    m.title
                  )
                }
              </span>

              <b>
                ${m.avg}%
              </b>

              <div class="progress">
                <i
                  style="width:${m.avg}%"
                ></i>
              </div>

            </div>
            `
        )
        .join("");

    $("moduleAnalytics")
      .innerHTML =
        moduleAnalyticsHtml;

    if(
      $("moduleAnalyticsMirror")
    ){
      $("moduleAnalyticsMirror")
        .innerHTML =
          moduleAnalyticsHtml;
    }

    const qStats =
      {};

    certs.forEach(
      a =>
        (
          a.answers ||
          []
        ).forEach(
          ans=>{

            const key =
              ans.questionId ||
              "unknown";

            qStats[key] ??= {
              id:
                key,

              total:
                0,

              wrong:
                0
            };

            qStats[key]
              .total++;

            if(
              !ans.correct
            ){
              qStats[key]
                .wrong++;
            }
          }
        )
    );

    const bank =
      buildCertificationBank(
        "es"
      );

    const bankMap =
      new Map(
        bank.map(
          q => [
            q.id,
            q
          ]
        )
      );

    const missed =
      Object.values(
        qStats
      )
        .filter(
          x =>
            x.total
        )
        .map(
          x => ({
            ...x,

            rate:
              Math.round(
                x.wrong /
                x.total *
                100
              ),

            q:
              bankMap.get(
                x.id
              )
          })
        )
        .sort(
          (
            a,
            b
          ) =>
            b.rate -
            a.rate
        )
        .slice(
          0,
          10
        );

    $("questionAnalytics")
      .innerHTML =
        missed
          .map(
            x =>
              `
              <div class="list-row">

                <div class="list-main">

                  <b>
                    ${
                      esc(
                        x.q?.title ||
                        x.id
                      )
                    }
                  </b>

                  <span>
                    ${
                      esc(
                        x.q?.skill ||
                        ""
                      )
                    }
                    ·
                    ${
                      x.wrong
                    }/${
                      x.total
                    }
                    incorrectas
                  </span>

                </div>

                <span
                  class="badge ${
                    x.rate >=
                    50
                      ? "red"
                      : "amber"
                  }"
                >
                  ${
                    x.rate
                  }%
                </span>

              </div>
              `
          )
          .join("") ||
        `
        <div class="empty">
          Todavía no hay datos de certificación.
        </div>
        `;
  }

  $("adminTabs")
    .addEventListener(
      "click",
      e=>{

        const b =
          e.target.closest(
            "[data-tab]"
          );

        if(!b){
          return;
        }

        state.tab =
          b.dataset.tab;

        document
          .querySelectorAll(
            "[data-tab]"
          )
          .forEach(
            x =>
              x.classList.toggle(
                "active",
                x === b
              )
          );

        document
          .querySelectorAll(
            "[data-panel]"
          )
          .forEach(
            x =>
              x.hidden =
                x.dataset.panel !==
                state.tab
          );
      }
    );

  [
    $("adminSearch"),
    $("adminTeamFilter"),
    $("adminStatusFilter")
  ]
    .forEach(
      el=>{

        if(!el){
          return;
        }

        el.addEventListener(
          el.tagName ===
            "INPUT"
            ? "input"
            : "change",
          renderAdmin
        );
      }
    );

  const userRowHandler =
    e=>{

      const b =
        e.target.closest(
          "[data-user]"
        );

      if(!b){
        return;
      }

      openUser(
        b.dataset.user
      );
    };

  $("adminUserRows")
    .addEventListener(
      "click",
      userRowHandler
    );

  $("adminUserRowsMirror")
    ?.addEventListener(
      "click",
      userRowHandler
    );

  function openUser(
    uid
  ){

    const u =
      mergedUsers()
        .find(
          x =>
            x.uid ===
            uid
        );

    if(!u){
      return;
    }

    state.selected =
      u;

    $("userModalTitle")
      .textContent =
        u.fullName ||
        "Administrar usuario";

    $("userModalSubtitle")
      .textContent =
        `${
          u.email ||
          uid
        } · ${
          uid
        }`;

    $("editName")
      .value =
        u.fullName ||
        "";

    $("editEmail")
      .value =
        u.email ||
        "";

    $("editRole")
      .value =
        u.role ||
        settings.defaultRole ||
        "Account Manager";

    $("editEmployee")
      .value =
        u.employeeId ||
        "";

    $("editCountry")
      .value =
        u.country ||
        "";

    $("editLanguage")
      .value =
        u.language ||
        "English";

    $("editTeam")
      .value =
        u.teamId ||
        "all";

    $("editAccess")
      .value =
        u.access.status ===
        "blocked"
          ? "blocked"
          : "active";

    $("editMessage")
      .value =
        u.access.message ||
        "";

    $("editNotes")
      .value =
        u.notes ||
        "";

    $("userDetailStats")
      .innerHTML =

      `
      <div class="analytics-box">

        <span>
          Progreso
        </span>

        <b>
          ${
            Math.round(
              Object.keys(
                u.caseBest
              ).length /
              20 *
              100
            )
          }%
        </b>

      </div>

      <div class="analytics-box">

        <span>
          Casos
        </span>

        <b>
          ${
            Object.keys(
              u.caseBest
            ).length
          }/20
        </b>

      </div>

      <div class="analytics-box">

        <span>
          Tiempo
        </span>

        <b>
          ${
            fmtDuration(
              u.sessions.reduce(
                (
                  s,
                  x
                ) =>
                  s +
                  Number(
                    x.activeSeconds ||
                    0
                  ),
                0
              )
            )
          }
        </b>

      </div>
      `;

    $("userModal").hidden =
      false;
  }

  $("userModalClose")
    .onclick =
      () =>
        $("userModal").hidden =
          true;

  $("userModalCancel")
    .onclick =
      () =>
        $("userModal").hidden =
          true;

  $("userModal")
    .addEventListener(
      "click",
      e=>{
        if(
          e.target ===
          $("userModal")
        ){
          $("userModal").hidden =
            true;
        }
      }
    );

  $("saveUser").onclick =
    async()=>{

      const u =
        state.selected;

      if(!u){
        return;
      }

      const b =
        $("saveUser");

      busy(
        b,
        true,
        "Guardando..."
      );

      try{

        const teamId =
          $("editTeam")
            .value ===
          "all"
            ? ""
            : $("editTeam")
                .value;

        const team =
          state.teams.get(
            teamId
          )?.name ||
          "";

        await setDoc(
          doc(
            db,
            names.registrations,
            u.uid
          ),
          {
            fullName:
              $("editName")
                .value
                .trim(),

            email:
              $("editEmail")
                .value
                .trim()
                .toLowerCase(),

            emailLower:
              $("editEmail")
                .value
                .trim()
                .toLowerCase(),

            role:
              $("editRole")
                .value
                .trim(),

            employeeId:
              $("editEmployee")
                .value
                .trim(),

            country:
              $("editCountry")
                .value
                .trim(),

            language:
              $("editLanguage")
                .value,

            teamId,

            team,

            adminUpdatedAt:
              serverTimestamp(),

            adminUpdatedBy:
              user.uid
          },
          {
            merge:
              true
          }
        );

        if(
          $("editAccess")
            .value ===
          "blocked"
        ){

          await setDoc(
            doc(
              db,
              names.access,
              u.uid
            ),
            {
              status:
                "blocked",

              message:
                $("editMessage")
                  .value
                  .trim(),

              teamId,

              updatedAt:
                serverTimestamp(),

              updatedBy:
                user.uid
            },
            {
              merge:
                true
            }
          );

        }else{

          await deleteDoc(
            doc(
              db,
              names.access,
              u.uid
            )
          ).catch(
            () =>
              {}
          );
        }

        const note =
          $("editNotes")
            .value
            .trim();

        if(note){

          await setDoc(
            doc(
              db,
              names.notes,
              u.uid
            ),
            {
              notes:
                note,

              teamId,

              updatedAt:
                serverTimestamp(),

              updatedBy:
                user.uid
            },
            {
              merge:
                true
            }
          );

        }else{

          await deleteDoc(
            doc(
              db,
              names.notes,
              u.uid
            )
          ).catch(
            () =>
              {}
          );
        }

        toast(
          "Usuario actualizado"
        );

        $("userModal").hidden =
          true;

      }catch(error){

        setMessage(
          $("userModalMessage"),
          errorText(error),
          "error"
        );

      }finally{

        busy(
          b,
          false
        );
      }
    };

  $("resetUser").onclick =
    async()=>{

      const u =
        state.selected;

      if(
        !u ||
        !confirm(
          `Se eliminará todo el progreso de ${
            u.fullName ||
            u.email
          }. La persona podrá volver a entrar con Google y empezar desde cero. ¿Continuar?`
        )
      ){
        return;
      }

      const b =
        $("resetUser");

      busy(
        b,
        true,
        "Reiniciando..."
      );

      try{

        await deleteQueryDocs(
          query(
            collection(
              db,
              names.assignments
            ),
            where(
              "userId",
              "==",
              u.uid
            )
          )
        );

        await deleteQueryDocs(
          query(
            collection(
              db,
              names.attempts
            ),
            where(
              "userId",
              "==",
              u.uid
            )
          )
        );

        await deleteQueryDocs(
          query(
            collection(
              db,
              names.sessions
            ),
            where(
              "userId",
              "==",
              u.uid
            )
          )
        );

        const batch =
          writeBatch(
            db
          );

        batch.delete(
          doc(
            db,
            names.registrations,
            u.uid
          )
        );

        batch.delete(
          doc(
            db,
            names.access,
            u.uid
          )
        );

        batch.delete(
          doc(
            db,
            names.presence,
            u.uid
          )
        );

        batch.delete(
          doc(
            db,
            names.notes,
            u.uid
          )
        );

        await batch.commit();

        toast(
          "Perfil reiniciado. Puede volver a entrar con Google."
        );

        $("userModal").hidden =
          true;

      }catch(error){

        setMessage(
          $("userModalMessage"),
          errorText(error),
          "error"
        );

      }finally{

        busy(
          b,
          false
        );
      }
    };

  $("createTeam").onclick =
    async()=>{

      const name =
        $("teamName")
          .value
          .trim();

      if(!name){

        return setMessage(
          $("teamMessage"),
          "Escribe un nombre para el equipo.",
          "error"
        );
      }

      const id =
        name
          .toLowerCase()
          .normalize(
            "NFD"
          )
          .replace(
            /[\u0300-\u036f]/g,
            ""
          )
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-|-$/g,
            ""
          ) +
        "-" +
        Date.now()
          .toString()
          .slice(
            -5
          );

      try{

        await setDoc(
          doc(
            db,
            names.teams,
            id
          ),
          {
            id,

            name,

            cohort:
              $("teamCohort")
                .value
                .trim(),

            active:
              true,

            createdAt:
              serverTimestamp(),

            createdBy:
              user.uid
          }
        );

        $("teamName")
          .value =
            "";

        $("teamCohort")
          .value =
            "";

        setMessage(
          $("teamMessage"),
          "Equipo creado.",
          "success"
        );

      }catch(error){

        setMessage(
          $("teamMessage"),
          errorText(error),
          "error"
        );
      }
    };

  function populateAssignmentUsers(){

    const users =
      mergedUsers();

    $("assignmentUser")
      .innerHTML =
        '<option value="">Seleccionar usuario</option>' +
        users
          .map(
            u =>
              `<option value="${u.uid}">${esc(u.fullName || u.email || u.uid)}</option>`
          )
          .join("");

    $("assignmentModule")
      .innerHTML =
        MODULES
          .map(
            m =>
              `<option value="${m.id}">${esc(m.title)}</option>`
          )
          .join("");
  }

  $("newAssignmentButton")
    .onclick =
      ()=>{
        populateAssignmentUsers();

        $("assignmentModal")
          .hidden =
            false;
      };

  $("assignmentModalClose")
    .onclick =
      () =>
        $("assignmentModal")
          .hidden =
            true;

  $("assignmentModalCancel")
    .onclick =
      () =>
        $("assignmentModal")
          .hidden =
            true;

  $("assignmentType")
    .onchange =
      ()=>{

        $("assignmentModuleField")
          .hidden =
            $("assignmentType")
              .value !==
            "module";

        $("assignmentCaseField")
          .hidden =
            $("assignmentType")
              .value !==
            "case";
      };

  $("saveAssignment")
    .onclick =
      async()=>{

        const uid =
          $("assignmentUser")
            .value;

        const u =
          mergedUsers()
            .find(
              x =>
                x.uid ===
                uid
            );

        if(!u){

          return setMessage(
            $("assignmentMessage"),
            "Selecciona un usuario.",
            "error"
          );
        }

        const type =
          $("assignmentType")
            .value;

        const moduleId =
          $("assignmentModule")
            .value;

        const caseId =
          Number(
            $("assignmentCase")
              .value ||
            0
          ) ||
          null;

        let title =
          $("assignmentTitle")
            .value
            .trim();

        if(!title){

          title =
            type ===
            "certification"

              ? "Certificación final"

              : type ===
                "module"

              ? getModule(
                  moduleId
                ).title

              : `Caso ${caseId}: ${
                  getCase(
                    caseId
                  ).es.title
                }`;
        }

        try{

          const ref =
            doc(
              collection(
                db,
                names.assignments
              )
            );

          await setDoc(
            ref,
            {
              userId:
                uid,

              userName:
                u.fullName ||
                u.email ||
                uid,

              teamId:
                u.teamId ||
                "",

              team:
                u.team ||
                "",

              type,

              moduleId:
                type ===
                "module"
                  ? moduleId
                  : null,

              caseId:
                type ===
                "case"
                  ? caseId
                  : null,

              title,

              dueAt:
                $("assignmentDue")
                  .value
                  ? new Date(
                      $("assignmentDue")
                        .value +
                      "T23:59:59"
                    ).toISOString()
                  : null,

              status:
                "assigned",

              assignedBy:
                user.uid,

              createdAt:
                serverTimestamp(),

              updatedAt:
                serverTimestamp()
            }
          );

          $("assignmentModal")
            .hidden =
              true;

          toast(
            "Entrenamiento asignado"
          );

        }catch(error){

          setMessage(
            $("assignmentMessage"),
            errorText(error),
            "error"
          );
        }
      };

  if(
    !superAdmin
  ){

    $("superAdminTools")
      .hidden =
        true;

    $("createTeamTools")
      .hidden =
        true;
  }

  $("saveManager")
    .onclick =
      async()=>{

        if(!superAdmin){
          return;
        }

        const uid =
          $("managerUid")
            .value
            .trim();

        if(!uid){

          return setMessage(
            $("managerMessage"),
            "Pega el UID del manager.",
            "error"
          );
        }

        const teamIds =
          [
            ...$("managerTeams")
              .selectedOptions
          ].map(
            o =>
              o.value
          );

        try{

          await setDoc(
            doc(
              db,
              names.admins,
              uid
            ),
            {
              active:
                true,

              name:
                $("managerName")
                  .value
                  .trim() ||
                "Manager",

              role:
                "manager",

              teamIds,

              updatedAt:
                serverTimestamp(),

              updatedBy:
                user.uid
            },
            {
              merge:
                true
            }
          );

          setMessage(
            $("managerMessage"),
            "Manager guardado.",
            "success"
          );

        }catch(error){

          setMessage(
            $("managerMessage"),
            errorText(error),
            "error"
          );
        }
      };

  $("exportAdmin")
    .onclick =
      ()=>{

        const headers = [
          "UID",
          "Nombre",
          "Correo",
          "Equipo",
          "Online",
          "Progreso",
          "Casos",
          "Score",
          "Certificación",
          "Tiempo"
        ];

        const rows =
          currentList()
            .map(
              u=>{

                const cert =
                  latestAttempt(
                    u.certAttempts
                  );

                const score =
                  Object.keys(
                    u.caseBest
                  ).length

                    ? Math.round(
                        Object.values(
                          u.caseBest
                        ).reduce(
                          (
                            a,
                            b
                          ) =>
                            a +
                            b,
                          0
                        ) /
                        Object.keys(
                          u.caseBest
                        ).length
                      )

                    : 0;

                return [
                  u.uid,
                  u.fullName,
                  u.email,
                  u.team,
                  u.online
                    ? "Sí"
                    : "No",
                  Math.round(
                    Object.keys(
                      u.caseBest
                    ).length /
                    20 *
                    100
                  ),
                  Object.keys(
                    u.caseBest
                  ).length,
                  score,
                  cert?.score ??
                    "",
                  u.sessions.reduce(
                    (
                      s,
                      x
                    ) =>
                      s +
                      Number(
                        x.activeSeconds ||
                        0
                      ),
                    0
                  )
                ];
              }
            );

        const csv =
          [
            headers,
            ...rows
          ]
            .map(
              r =>
                r.map(
                  v =>
                    `"${String(
                      v ??
                      ""
                    ).replaceAll(
                      '"',
                      '""'
                    )}"`
                )
                .join(",")
            )
            .join(
              "\r\n"
            );

        const blob =
          new Blob(
            [
              "\ufeff" +
              csv
            ],
            {
              type:
                "text/csv;charset=utf-8"
            }
          );

        const url =
          URL.createObjectURL(
            blob
          );

        const a =
          document.createElement(
            "a"
          );

        a.href =
          url;

        a.download =
          `training-academy-${dateKey()}.csv`;

        a.click();

        setTimeout(
          () =>
            URL.revokeObjectURL(
              url
            ),
          1000
        );
      };

  setInterval(
    renderAdmin,
    10000
  );

  renderAdmin();
}

try{

  if(
    page ===
    "login"
  ){

    await initLogin();

  }
  else if(
    page ===
    "academy"
  ){

    await initAcademy();

  }
  else if(
    page ===
    "simulator"
  ){

    await initSimulator();

  }
  else if(
    page ===
    "certification"
  ){

    await initCertification();

  }
  else if(
    page ===
    "admin"
  ){

    await initAdmin();

  }

}catch(error){

  if(
    error?.message !==
    "NO_AUTH"
  ){

    console.error(
      error
    );

    const fatal =
      $("fatalMessage");

    if(fatal){

      setMessage(
        fatal,
        errorText(
          error
        ),
        "error"
      );
    }
  }
}
