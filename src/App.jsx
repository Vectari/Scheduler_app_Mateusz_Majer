import "devextreme/dist/css/dx.light.css";
import { appointments } from "./data.js";
import { Scheduler } from "devextreme-react/scheduler";

function App() {
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
