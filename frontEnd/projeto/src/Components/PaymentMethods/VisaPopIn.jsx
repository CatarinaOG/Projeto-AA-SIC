import { useState } from "react";

export default function VisaPopIn({ setPaymentType }) {
  const [ccv, setCCV] = useState(123);
  const [number, setNumber] = useState(123456789011);
  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentType("");
  };

  const handleCCVChange = (event) => {
    const inputValue = event.target.value;
    const cappedValue = inputValue.slice(0, 3);
    event.target.value = cappedValue;
    setCCV(event.target.value);
  };

  const handleNumberChange = (event) => {
    const inputValue = event.target.value;
    const cappedValue = inputValue.slice(0, 12);
    event.target.value = cappedValue;
    setNumber(event.target.value);
  };

  return (
    <div className="VisaPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>Enter your data:</h2>
      </div>
      <div className="listing-elem-3-Payment">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="number"
              className="creditNumberInput"
              pattern="[0-9]*"
              inputMode="numeric"
              value={number}
              onInput={handleNumberChange}
            />{" "}
            <input
              type="number"
              className="creditCCVInput"
              pattern="[0-9]*"
              inputMode="numeric"
              value={ccv}
              onInput={handleCCVChange}
            ></input>
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
