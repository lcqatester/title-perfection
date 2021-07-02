import { useState } from "react";
import "./styles.css";
import "./perfection-style.scss";
import { states } from "./states";
import StateRequirments from "./state-requirments";
const stateCodeList = Object.keys(states);

export default function App() {
  const [selectedStates, setSelectedStates] = useState({});

  const handleChange = (e) => {
    const selectedObject = {};
    if (e.target.checked) {
      selectedObject[e.target.value] = true;
    } else {
      selectedObject[e.target.value] = undefined;
    }
    const newSelectedStates = { ...selectedStates, ...selectedObject };
    const cleanSelectedStates = {};
    for (const state in newSelectedStates) {
      if (newSelectedStates[state]) {
        cleanSelectedStates[state] = true;
      }
    }
    setSelectedStates(cleanSelectedStates);
  };
  const selectedCodeList = Object.keys(selectedStates);
  return (
    <div className="perfection">
      <h1>Title Perfection by Borrower</h1>
      <div className="stateListContainer">
        {stateCodeList.map((stateAb) => {
          return (
            <label key={`${stateAb}Label`} className="stateCheckbox">
              <input
                key={stateAb}
                type="checkbox"
                value={stateAb}
                onChange={handleChange}
              />
              {states[stateAb]}
            </label>
          );
        })}
      </div>
      {selectedCodeList.map((stateAb) => {
        return (
          <StateRequirments key={stateAb} states={states} stateAb={stateAb} />
        );
      })}
    </div>
  );
}
