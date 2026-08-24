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
  appVersion: "15.0-academy",

  // IMPORTANTE:
  // Este nombre debe coincidir con el simulador grande
  // para compartir la misma sesion de Google.
  firebaseAppName: "training-simulator-v14-cloud",

  // Dejalo vacio para permitir cualquier cuenta Google.
  // Si luego quieres solo @ext.doordash.com:
  // allowedEmailDomain: "ext.doordash.com",
  allowedEmailDomain: "",

  supportEmail: "",

  // URLs de la plataforma
  loginUrl: "./index.html",
  academyUrl: "./academy.html",
  simulatorWrapperUrl: "./simulator.html",

  // NO vamos a modificar ni renombrar el archivo grande.
  // %20 representa el espacio en el nombre.
  simulatorFile: "./training-simulator-v14%20(1).html",

  certificationUrl: "./certification.html",
  adminUrl: "./admin.html",

  // Colecciones actuales de Firebase
  registrationsCollection: "trainingRegistrations",
  accessCollection: "trainingAccess",
  adminNotesCollection: "trainingAdminNotes",
  adminsCollection: "trainingAdmins",
  presenceCollection: "trainingPresence",

  // Nuevas colecciones de Academy v15
  teamsCollection: "trainingTeams",
  assignmentsCollection: "trainingAssignments",
  certificationAttemptsCollection: "trainingCertificationAttempts",
  certificationDraftsCollection: "trainingCertificationDrafts",
  sessionsCollection: "trainingSessions",

  // Training
  defaultRole: "Account Manager",
  registrationVersion: 4,
  caseCount: 20,
  quizPassPercent: 80,

  // Presencia en tiempo real
  presenceHeartbeatMs: 20000,
  presenceOnlineWindowMs: 70000,

  // Tiempo activo de entrenamiento
  sessionHeartbeatMs: 30000,

  // Certificacion final
  certificationQuestionCount: 40,
  certificationPassPercent: 85,
  certificationMinutes: 60
});
