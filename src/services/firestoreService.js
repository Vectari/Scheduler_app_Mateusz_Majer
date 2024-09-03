import { getFirestore, collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

import firebaseApp from "../config/firebaseConfig";

const firestore = getFirestore(firebaseApp);

export async function addAppointment(appointment) {
  const appointmentsCol = collection(firestore, "appointments");
  const docRef = await addDoc(appointmentsCol, {
    title: appointment.title || "",
    startDate: appointment.startDate ? Timestamp.fromDate(appointment.startDate) : null,
    endDate: appointment.endDate ? Timestamp.fromDate(appointment.endDate) : null,
    dayLong: typeof appointment.dayLong === "boolean" ? appointment.dayLong : false,
    recurrence: appointment.recurrence || "",
    description: appointment.description || "",
  });

  return docRef.id;
}

export async function updateAppointment(appointment) {
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

export async function deleteAppointment(appointmentId) {
  const appointmentRef = doc(firestore, "appointments", appointmentId);

  try {
    await deleteDoc(appointmentRef);
    console.log("Appointment deleted successfully");
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
}

export function listenToAppointments(callback) {
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
    callback(appointmentsList);
  });
}
