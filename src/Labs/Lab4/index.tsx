import ArrayStateVariable from "./LabComponents/ArrayStateVariable";
import BooleanStateVariables from "./LabComponents/BooleanStateVariables";
import ClickEvent from "./LabComponents/ClickEvent";
import Counter from "./LabComponents/Counter";
import DateStateVariable from "./LabComponents/DateStateVariable";
import EventObject from "./LabComponents/EventObject";
import ObjectStateVariable from "./LabComponents/ObjectStateVariable";
import ParentStateComponent from "./LabComponents/ParentStateComponent";
import PassingDataOnEvent from "./LabComponents/PassingDataOnEvent";
import PassingFunctions from "./LabComponents/PassingFunctions";
import StringStateVariables from "./LabComponents/StringStateVariables";
import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
      function sayHello() {
        alert("Hello");
      }

    return (
        <div className="p-3">
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions theFunction={sayHello} />
            <EventObject />
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ParentStateComponent />
            <ReduxExamples />
        </div>
    );
}