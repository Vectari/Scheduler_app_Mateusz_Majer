import "devextreme/dist/css/dx.light.css";
import { Editing, Scheduler } from "devextreme-react/scheduler";
import { locale, loadMessages } from "devextreme/localization";
import plMessages from "devextreme/localization/messages/pl.json";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  Timestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

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

  // const appointmentsDB = doc(firestore, "appointments/appointments");
  // function handleAppointmentAdd() {
  //   const docData = {
  //     title: "Dodawanie do firestore!!!",
  //   };
  //   setDoc(appointmentsDB, docData)
  //     .then(() => {
  //       console.log("Add new appointment");
  //     })
  //     .catch((error) => {
  //       console.log(`Adding error: ${error}`);
  //     });
  // }

  // const appointmentsDB = doc(firestore, "appointments/appointments");
  // function handleAppointmentAdd() {
  //   const docData = {
  //     title: "Dodawanie do firestore!!!",
  //     title2: "Title 1"
  //   };
  //   setDoc(appointmentsDB, docData)
  //     .then(() => {
  //       console.log("Add new appointment");
  //     })
  //     .catch((error) => {
  //       console.log(`Adding error: ${error}`);
  //     });
  // }

  // async function handleAppointmentAdd(appointment) {
  //   const appointmentsCol = collection(firestore, "appointments");
  //   await addDoc(appointmentsCol, {
  //     title: appointment.title,
  //     startDate: appointment.startDate, // should be a Firestore Timestamp
  //     endDate: appointment.endDate, // should be a Firestore Timestamp
  //     dayLong: appointment.dayLong || false,
  //     recurrence: appointment.recurrence || "",
  //   });
  // }

  async function handleAppointmentUpdate(e) {
    const appointment = e.appointmentData; // Extract appointment data from the event
    const appointmentRef = doc(firestore, "appointments", appointment.id); // Create a reference to the specific appointment document

    try {
      await updateDoc(appointmentRef, {
        title: appointment.title,
        startDate: Timestamp.fromDate(new Date(appointment.startDate)), // Converting to Firestore Timestamp
        endDate: Timestamp.fromDate(new Date(appointment.endDate)),
        dayLong: appointment.dayLong || false,
        recurrence: appointment.recurrence || "",
      });
      console.log("Appointment updated successfully");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  }

  async function handleAppointmentDelete(e) {
    const appointment = e.appointmentData; // Extract appointment data from the event
    const appointmentRef = doc(firestore, "appointments", appointment.id); // Create a reference to the specific appointment document

    try {
      await deleteDoc(appointmentRef);
      console.log("Appointment deleted successfully");
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  }

  async function handleAppointmentAdd(e) {
    const appointment = e.appointmentData; // Extract appointment data from the event
    const appointmentsCol = collection(firestore, "appointments");
    await addDoc(appointmentsCol, {
      title: appointment.title,
      startDate: Timestamp.fromDate(appointment.startDate),
      endDate: Timestamp.fromDate(appointment.endDate),
      dayLong: appointment.dayLong || false,
      recurrence: appointment.recurrence || "",
    });
  }

  // handleAppointmentAdd({
  //   title: "Coś do zrobienia",
  //   startDate: new Date("2024-09-10T08:45:00.000Z"),
  //   endDate: new Date("2024-09-10T10:45:00.000Z")
  // });

  async function getAppointments() {
    const appointmentsCol = collection(firestore, "appointments");
    const appointmentsSnapshot = await getDocs(appointmentsCol);
    const appointmentsList = appointmentsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.title, // text is used for event title
        startDate: data.startDate.toDate(), // Scheduler requires JavaScript Date objects
        endDate: data.endDate.toDate(), // Convert Firestore Timestamps
        allDay: data.dayLong || false, // Optional field for all-day events
        recurrenceRule: data.recurrence || "", // Optional recurrence rule
        id: doc.id,
      };
    });
    console.log(appointmentsList);

    return appointmentsList;
  }
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAppointments();
      setAppointments(data);
    }

    fetchData();
  }, []);

  // addAppointment({
  //   title: "New Appointment",
  //   startDate: new Date("2024-08-30T08:45:00.000Z"),
  //   endDate: new Date("2024-08-30T09:45:00.000Z")
  // });

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
