import { useState } from "react";

export default function MBWayPopIn({
  setPaymentType,
  setPaymentInfo,
  setMessage,
}) {
  const [number, setNumber] = useState(0);

  const handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    const isValid = keyCode >= 48 && keyCode <= 57;
    const isMaxLengthReached = event.target.value.length >= 9;
    const isBackspace = keyCode === 8;

    if ((!isValid && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
      event.preventDefault();
      setNumber(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (number > 100000000) {
      setPaymentInfo({ phoneNumber: number });
      setPaymentType("");
      setMessage("Success");
    } else {
      setMessage("Phone Number isn't valid");
    }
  };

  return (
    <div className="MBWayPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>Enter your phone Number:</h2>
      </div>
      <div className="listing-elem-3-Payment">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="tel"
              className="MBWayInput"
              onKeyDown={handleKeyDown}
            />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
