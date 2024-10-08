import "devextreme/dist/css/dx.light.css";
import { locale, loadMessages } from "devextreme/localization";
import { useEffect, useState } from "react";
import { Scheduler, Editing } from "devextreme-react/scheduler";

import plMessages from "devextreme/localization/messages/pl.json";

import {
  listenToAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/firestoreService";

const views = ["day", "week", "month"]; // Array of available views for the Scheduler

const SchedulerComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  useEffect(() => {
    locale("pl");
    loadMessages(plMessages);
    setIsLocaleLoaded(true);

    const unsubscribe = listenToAppointments((appointmentsList) => {
      setAppointments(appointmentsList); // Update appointments list when changes occur
    });

    return () => unsubscribe();
  }, []);

  // Event handlers for Scheduler actions
  const handleAppointmentUpdate = async (e) => {
    await updateAppointment(e.appointmentData);
  };

  const handleAppointmentDelete = async (e) => {
    await deleteAppointment(e.appointmentData.id);
  };

  const handleAppointmentAdd = async (e) => {
    await addAppointment(e.appointmentData);
  };

  if (!isLocaleLoaded) {
    return <div>Loading...</div>; // Show loading until locale is set
  }

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
        recurrenceRuleExpr="recurrence"
        onAppointmentAdding={handleAppointmentAdd}
        onAppointmentUpdated={handleAppointmentUpdate}
        onAppointmentDeleted={handleAppointmentDelete}
      >
        <Editing allowAdding={true} allowUpdating={true} allowDeleting={true} />
      </Scheduler>
    </>
  );
};

export default SchedulerComponent;
