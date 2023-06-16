import { useState } from "react";

export default function PayPalPopIn({
  setPaymentType,
  setPaymentInfo,
  setMessage,
}) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentType("");
    setPaymentInfo({ email: email });
  };

  return (
    <div className="PayPalPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>Enter your email:</h2>
      </div>
      <div className="listing-elem-3-Payment">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              className="MBWayInput"
              onChange={handleEmailChange}
            />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
