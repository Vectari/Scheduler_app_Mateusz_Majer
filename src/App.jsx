import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";
import { locale, loadMessages } from "devextreme/localization";
import plMessages from "devextreme/localization/messages/pl.json";
import { appointments } from "./data.js";

function App() {
  locale("pl");
  loadMessages(plMessages);
  locale(navigator.locale);

  return (
    <>
      <h1>Hello</h1>
      <Scheduler
        dataSource={appointments}
        textExpr="title"
        allDayExpr="dayLong"
        recurrenceRuleExpr="recurrence"
      ></Scheduler>
    </>
  );
}

export default App;
