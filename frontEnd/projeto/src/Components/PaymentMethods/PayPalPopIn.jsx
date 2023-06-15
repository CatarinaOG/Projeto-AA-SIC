export default function PayPalPopIn({ setPaymentType }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentType("");
  };

  return (
    <div className="PayPalPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>Enter your email:</h2>
      </div>
      <div className="listing-elem-3-Payment">
        <form onSubmit={handleSubmit}>
          <label>
            <input type="email" className="MBWayInput" />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
