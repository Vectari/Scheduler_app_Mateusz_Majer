import "devextreme/dist/css/dx.light.css";
import { Editing, Scheduler } from "devextreme-react/scheduler";
import { locale, loadMessages } from "devextreme/localization";
import plMessages from "devextreme/localization/messages/pl.json";
import { appointments } from "./data.js";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

function App() {
  locale("pl");
  loadMessages(plMessages);
  locale(navigator.locale);

  const views = ["day", "week", "month"];

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyB_NCNNCPcB14FygD_0yiyaeMrAvujF4y4",
    authDomain: "schedulerappmateuszmajer.firebaseapp.com",
    projectId: "schedulerappmateuszmajer",
    storageBucket: "schedulerappmateuszmajer.appspot.com",
    messagingSenderId: "167844971416",
    appId: "1:167844971416:web:1788605f57ff5edac8e1ed",
    measurementId: "G-YPPBLXVH4K",
  });

  const firestore = getFirestore(firebaseApp);

  const appointmentsDB = doc(firestore, "appointments/appointments");
  function handleAppointmentAdd() {
    const docData = {
      title: "Dodawanie do firestore!!!",
    };
    setDoc(appointmentsDB, docData)
      .then(() => {
        console.log("Add new appointment");
      })
      .catch((error) => {
        console.log(`Adding error: ${error}`);
      });
  }

  // Update an existing appointment
  // const handleAppointmentUpdate = async (e) => {
  //   try {
  //     const appointmentRef = doc(db, "appointments", e.appointmentData.id);
  //     await updateDoc(appointmentRef, e.appointmentData);
  //   } catch (error) {
  //     console.error("Error updating document: ", error);
  //   }
  // };

  // Delete an appointment
  // const handleAppointmentDelete = async (e) => {
  //   try {
  //     const appointmentRef = doc(db, "appointments", e.appointmentData.id);
  //     await deleteDoc(appointmentRef);
  //   } catch (error) {
  //     console.error("Error deleting document: ", error);
  //   }
  // };

  return (
    <>
      <h2>Scheduler App - Mateusz Majer</h2>
      <Scheduler
        views={views}
        useDropDownViewSwitcher={true}
        defaultCurrentView="month"
        height={730}
        width={1700}
        dataSource={appointments}
        textExpr="title"
        allDayExpr="dayLong"
        recurrenceRuleExpr="recurrence"
        onAppointmentAdded={handleAppointmentAdd}
        // onAppointmentUpdated={handleAppointmentUpdate}
        // onAppointmentDeleted={handleAppointmentDelete}
      >
        <Editing allowAdding={true} />
      </Scheduler>
      <h3>Instrukcja:</h3>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </>
  );
}

export default App;
