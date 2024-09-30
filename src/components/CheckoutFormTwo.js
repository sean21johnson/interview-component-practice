/*
  Build a checkout form that does the following:
    -Get user input on a name
    -Get user input on an email address
    -Get credit card type with a dropdown: Visa, Mastercard, Debit
    -Gets the credit card number. Must be 16 digits
    -Stores the information in local storage
    -Adds basic testing
*/

import React, { useState, useEffect } from "react";

function CheckoutFormTwo() {
  // Our pieces of state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    creditCardType: "",
    creditCardNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
      return updatedFormData;
    });
    setErrorMessage("");
  };

  const { name, email, creditCardType, creditCardNumber } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();

    const isNameValid = name.trim().length;
    const isEmailValid = email.trim().length;
    const isCreditCardTypeValid = creditCardType.length;
    const isCreditCardNumberValid = creditCardNumber.trim().length === 16;

    if (
      isNameValid &&
      isEmailValid &&
      isCreditCardTypeValid &&
      isCreditCardNumberValid
    ) {
      setErrorMessage("");
      alert("Successfully submitted payment");
    } else {
      setErrorMessage("Invalid payment data. Please try again.");
    }
  };

  // Return statement
  return (
    <>
      <h1>Checkout Form</h1>
      <form onSubmit={handleSubmit} aria-describedby="error-message">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            placeholder="Enter Name"
            onChange={handleInputChange}
            aria-required="true"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={handleInputChange}
            aria-required="true"
            required
          />
        </div>
        <div>
          <label htmlFor="creditCardType">Credit Card Type</label>
          <select
            id="creditCardType"
            value={creditCardType}
            name="creditCardType"
            style={{ margin: "25px" }}
            onChange={handleInputChange}
            aria-required="true"
            required
          >
            <option value="">Credit Card Type</option>
            <option name="visa">Visa</option>
            <option name="mastercard">Mastercard</option>
            <option name="debit">Debit</option>
          </select>
        </div>
        <div>
          <label htmlFor="creditCardNumber">Credit Card Number</label>
          <input
            id="creditCardNumber"
            type="text"
            name="creditCardNumber"
            value={creditCardNumber}
            placeholder="Enter Credit Card Number"
            onChange={handleInputChange}
            aria-required="true"
            maxLength={16}
            minLength={16}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errorMessage && (
        <p id="error-message" aria-live="polite">
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default CheckoutFormTwo;
