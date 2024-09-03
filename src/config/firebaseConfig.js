import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_NCNNCPcB14FygD_0yiyaeMrAvujF4y4",
  authDomain: "schedulerappmateuszmajer.firebaseapp.com",
  projectId: "schedulerappmateuszmajer",
  storageBucket: "schedulerappmateuszmajer.appspot.com",
  messagingSenderId: "167844971416",
  appId: "1:167844971416:web:1788605f57ff5edac8e1ed",
  measurementId: "G-YPPBLXVH4K",

  // apiKey: import.meta.env.API_KEY,
  // authDomain: import.meta.env.AUTH_DOMAIN,
  // projectId: import.meta.env.PROJECT_ID,
  // storageBucket: import.meta.env.STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  // appId: import.meta.env.APP_ID,
  // measurementId: import.meta.env.MEASUREMENT_ID,
};

// const firebaseApp = initializeApp({
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// });

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
