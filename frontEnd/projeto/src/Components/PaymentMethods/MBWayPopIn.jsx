export default function MBWayPopIn({ setPaymentType }) {
  const handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    const isValid = keyCode >= 48 && keyCode <= 57;
    const isMaxLengthReached = event.target.value.length >= 9;
    const isBackspace = keyCode === 8;

    if ((!isValid && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentType("");
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
        </form>
      </div>
    </div>
  );
}
