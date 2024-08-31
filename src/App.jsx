import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";
import { locale, loadMessages } from "devextreme/localization";
import plMessages from "devextreme/localization/messages/pl.json";
import { appointments } from "./data.js";

function App() {
  locale("pl");
  loadMessages(plMessages);
  locale(navigator.locale);

  const views = ["day", "week", "month"];

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
      ></Scheduler>
      <h3>Instrukcja:</h3>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </>
  );
}

export default App;
