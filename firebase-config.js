window.TRAINING_FIREBASE_CONFIG = Object.freeze({
  apiKey: "AIzaSyC4hGg_9MFMBOMtb0_A01Tv9nWyKAJNye0",
  authDomain: "training-simulator-214c4.firebaseapp.com",
  projectId: "training-simulator-214c4",
  storageBucket: "training-simulator-214c4.firebasestorage.app",
  messagingSenderId: "619140038475",
  appId: "1:619140038475:web:27d064058cde85f62cf2ce"
});

window.TRAINING_APP_SETTINGS = Object.freeze({
  appName: "Merchant Portal Training",
  appVersion: "14.0-google-realtime",

  // Dejalo vacio para permitir cualquier cuenta de Google.
  // Si despues quieres permitir SOLO correos @ext.doordash.com:
  // allowedEmailDomain: "ext.doordash.com",
  allowedEmailDomain: "",

  supportEmail: "",

  // Firestore collections
  registrationsCollection: "trainingRegistrations",
  accessCollection: "trainingAccess",
  adminNotesCollection: "trainingAdminNotes",
  adminsCollection: "trainingAdmins",
  presenceCollection: "trainingPresence",

  // Local storage
  registrationStorageKey: "dd_training_registration_v3",
  simulatorProfileKey: "ddmp_training_profile_v14",

  registrationVersion: 3,
  defaultRole: "Account Manager",

  // Realtime presence
  presenceHeartbeatMs: 20000,
  presenceOnlineThresholdMs: 60000
});
