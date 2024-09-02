import "devextreme/dist/css/dx.light.css";
import { Editing, Scheduler } from "devextreme-react/scheduler";
import { locale, loadMessages } from "devextreme/localization";
import plMessages from "devextreme/localization/messages/pl.json";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot, // Import onSnapshot
} from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  locale("pl");
  loadMessages(plMessages);
  locale(navigator.locale);

  const views = ["day", "week", "month"];

  const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  });

  // const firebaseApp = initializeApp({
  //   apiKey: "AIzaSyB_NCNNCPcB14FygD_0yiyaeMrAvujF4y4",
  //   authDomain: "schedulerappmateuszmajer.firebaseapp.com",
  //   projectId: "schedulerappmateuszmajer",
  //   storageBucket: "schedulerappmateuszmajer.appspot.com",
  //   messagingSenderId: "167844971416",
  //   appId: "1:167844971416:web:1788605f57ff5edac8e1ed",
  //   measurementId: "G-YPPBLXVH4K",
  // });

  const firestore = getFirestore(firebaseApp);

  async function handleAppointmentUpdate(e) {
    const appointment = e.appointmentData;
    const appointmentRef = doc(firestore, "appointments", appointment.id);

    try {
      await updateDoc(appointmentRef, {
        title: appointment.title,
        startDate: Timestamp.fromDate(new Date(appointment.startDate)),
        endDate: Timestamp.fromDate(new Date(appointment.endDate)),
        dayLong: appointment.dayLong || false,
        recurrence: appointment.recurrence || "",
        description: appointment.description,
        id: appointment.id,
      });
      console.log("Appointment updated successfully");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  }

  async function handleAppointmentDelete(e) {
    const appointment = e.appointmentData;
    const appointmentRef = doc(firestore, "appointments", appointment.id);

    try {
      await deleteDoc(appointmentRef);
      console.log("Appointment deleted successfully");
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  }

  async function handleAppointmentAdd(e) {
    const appointment = e.appointmentData;
    const appointmentsCol = collection(firestore, "appointments");
    const docRef = await addDoc(appointmentsCol, {
      title: appointment.title || "",
      startDate: appointment.startDate
        ? Timestamp.fromDate(appointment.startDate)
        : null,
      endDate: appointment.endDate
        ? Timestamp.fromDate(appointment.endDate)
        : null,
      dayLong:
        typeof appointment.dayLong === "boolean" ? appointment.dayLong : false,
      recurrence: appointment.recurrence || "",
      description: appointment.description || "",
    });

    console.log("Document added with ID:", docRef.id);
    return docRef.id;
  }

  function listenToAppointments() {
    const appointmentsCol = collection(firestore, "appointments");
    return onSnapshot(appointmentsCol, (snapshot) => {
      const appointmentsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          title: data.title,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
          allDay: data.dayLong || false,
          recurrenceRule: data.recurrence || "",
          id: doc.id,
          description: data.description,
        };
      });
      console.log(appointmentsList);
      setAppointments(appointmentsList);
    });
  }

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToAppointments();
    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

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
        onAppointmentAdding={handleAppointmentAdd}
        onAppointmentUpdated={handleAppointmentUpdate}
        onAppointmentDeleted={handleAppointmentDelete}
      >
        <Editing allowAdding={true} allowUpdating={true} allowDeleting={true} />
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
