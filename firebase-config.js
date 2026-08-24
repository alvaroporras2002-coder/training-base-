window.TRAINING_FIREBASE_CONFIG = Object.freeze({
  apiKey: "AIzaSyC4hGg_9MFMBOMtb0_A01Tv9nWyKAJNye0",
  authDomain: "training-simulator-214c4.firebaseapp.com",
  projectId: "training-simulator-214c4",
  storageBucket: "training-simulator-214c4.firebasestorage.app",
  messagingSenderId: "619140038475",
  appId: "1:619140038475:web:27d064058cde85f62cf2ce"
});

window.TRAINING_APP_SETTINGS = Object.freeze({
  appName: "DoorDash AM Training Academy",
  appVersion: "15.1-certification",

  // Debe coincidir con el nombre utilizado por el simulador.
  firebaseAppName: "training-simulator-v14-cloud",

  // Déjalo vacío para permitir cualquier cuenta Google.
  // Para limitarlo, por ejemplo:
  // allowedEmailDomain: "ext.doordash.com",
  allowedEmailDomain: "",

  supportEmail: "",

  // =====================================================
  // PÁGINAS
  // =====================================================

  loginUrl: "./index.html",
  academyUrl: "./academy.html",
  simulatorWrapperUrl: "./simulator.html",

  // Archivo principal del Merchant Portal Simulator.
  simulatorFile: "./training-simulator-v14%20(1).html",

  certificationUrl: "./certification.html",
  adminUrl: "./admin.html",

  // =====================================================
  // FIRESTORE COLLECTIONS
  // =====================================================

  registrationsCollection: "trainingRegistrations",
  accessCollection: "trainingAccess",
  adminNotesCollection: "trainingAdminNotes",
  adminsCollection: "trainingAdmins",
  presenceCollection: "trainingPresence",
  teamsCollection: "trainingTeams",
  assignmentsCollection: "trainingAssignments",
  certificationAttemptsCollection: "trainingCertificationAttempts",
  certificationDraftsCollection: "trainingCertificationDrafts",
  sessionsCollection: "trainingSessions",

  // =====================================================
  // TRAINING
  // =====================================================

  defaultRole: "Account Manager",

  registrationVersion: 4,

  caseCount: 20,

  // Cada caso se aprueba con 80%.
  quizPassPercent: 80,

  // =====================================================
  // REAL-TIME PRESENCE
  // =====================================================

  presenceHeartbeatMs: 20000,

  presenceOnlineWindowMs: 70000,

  sessionHeartbeatMs: 30000,

  // =====================================================
  // FINAL CERTIFICATION
  // =====================================================

  // El banco contiene 100 preguntas.
  // La certificación selecciona 40.
  certificationQuestionCount: 40,

  // IMPORTANTE:
  // 80% es la nota mínima para obtener APPROVED.
  certificationPassPercent: 80,

  // Tiempo máximo.
  certificationMinutes: 60
});
