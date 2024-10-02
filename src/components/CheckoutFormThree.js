/*
  FORM REQUIREMENTS:
    -Name (required field)
    -Email (required and must validate email format)
    -Credit card type (dropdown with Visa, Mastercard, American Express). Default placeholder of "Select Credit Card Type"
    -Credit Card Number (required and must be 16 digits)
    -CVV (required and must be 3 digits)
    -Expiration date (required fields, must validate expriation date)

  BEHAVIOR:
    -On form submission, validate all required fields
    -If any field is invalid, focus on the first invalid input using useRef and show an error message below the field
    -If all inputs are valid, display a success message
    -Ensure that the form is accessible
    -Use proper aria attributes where appropriate (e.g. aria-required for required fields)

  -Form data should be stored in the component's state and reset after a successful submission

  -TESTING:
    -Form renders correctly with all fields
    -Form shows error messages for invalid fields and focuses on teh firt invalid input
    -Successful submission displays the success message

  -BONUS:
    -Add a "Save payment information" checkbox
    -When checked, saves data to local storage
    -Should pre-populate fields with the saved data
*/

import React, { useState, useRef, useEffect } from "react";

// Helper functions to validate email and expiration date
const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email); // Simple email regex
};

const validateExpirationDate = (expirationDate) => {
  const [month, year] = expirationDate.split("/");
  return month?.length === 2 && year?.length === 4;
};

const CheckoutFormThree = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    creditCardType: "",
    creditCardNumber: "",
    cvv: "",
    expirationDate: "",
  });

  // State to hold error messages
  const [errorMessages, setErrorMessages] = useState({});

  // State to track successful submission
  const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);

  // State to track if the "Save Payment Data" checkbox is checked
  const [saveFormData, setSaveFormData] = useState(false);

  // Refs to input fields for focusing on the first invalid input
  const nameField = useRef(null);
  const emailField = useRef(null);
  const creditCardTypeField = useRef(null);
  const creditCardNumberField = useRef(null);
  const cvvField = useRef(null);
  const expirationDateField = useRef(null);

  // Load saved form data when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
      setSaveFormData(true); // If there's saved data, check the checkbox by default
    }
  }, []);

  // Handle form input changes and optionally save data to localStorage
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [name]: value,
      };
      if (saveFormData) {
        localStorage.setItem("formData", JSON.stringify(updatedFormData)); // Save the updated formData to localStorage
      }
      return updatedFormData;
    });

    setErrorMessages((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  // Handle checkbox changes for saving form data
  const handleSaveData = () => {
    setSaveFormData((prevState) => {
      const newSaveState = !prevState;
      if (!newSaveState) {
        localStorage.removeItem("formData"); // If unchecked, clear the saved data
      }
      return newSaveState;
    });
  };

  // Handle form submission and validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      creditCardType,
      creditCardNumber,
      cvv,
      expirationDate,
    } = formData;

    const newErrorMessages = {};

    if (!name.trim()) {
      newErrorMessages.name = "Please enter a valid name";
      nameField.current.focus();
    } else if (!validateEmail(email)) {
      newErrorMessages.email = "Please enter a valid email";
      emailField.current.focus();
    } else if (!creditCardType.trim()) {
      newErrorMessages.creditCardType = "Please select a credit card type";
      creditCardTypeField.current.focus();
    } else if (creditCardNumber.trim().length !== 16) {
      newErrorMessages.creditCardNumber =
        "Please enter a 16-digit credit card number";
      creditCardNumberField.current.focus();
    } else if (cvv.trim().length !== 3) {
      newErrorMessages.cvv = "Please enter a 3-digit CVV";
      cvvField.current.focus();
    } else if (!validateExpirationDate(expirationDate)) {
      newErrorMessages.expirationDate = "Please enter a valid expiration date";
      expirationDateField.current.focus();
    }

    setErrorMessages(newErrorMessages);

    if (Object.keys(newErrorMessages).length === 0) {
      setIsSuccessfulSubmission(true);
      setFormData({
        name: "",
        email: "",
        creditCardType: "",
        creditCardNumber: "",
        cvv: "",
        expirationDate: "",
      });
      if (!saveFormData) {
        localStorage.removeItem("formData"); // Clear the form data if the checkbox is unchecked after submission
      }
    } else {
      setIsSuccessfulSubmission(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Name field */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder="Enter Name"
          onChange={handleInputChange}
          ref={nameField}
          aria-required="true"
        />
        {errorMessages.name && (
          <p style={{ color: "red" }}>{errorMessages.name}</p>
        )}

        {/* Email field */}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Enter Email"
          onChange={handleInputChange}
          ref={emailField}
          aria-required="true"
        />
        {errorMessages.email && (
          <p style={{ color: "red" }}>{errorMessages.email}</p>
        )}

        {/* Credit Card Type dropdown */}
        <label htmlFor="creditCardType">Credit Card Type</label>
        <select
          id="creditCardType"
          name="creditCardType"
          value={formData.creditCardType}
          onChange={handleInputChange}
          ref={creditCardTypeField}
          aria-required="true"
        >
          <option value="">Select Credit Card Type</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="americanExpress">American Express</option>
        </select>
        {errorMessages.creditCardType && (
          <p style={{ color: "red" }}>{errorMessages.creditCardType}</p>
        )}

        {/* Credit Card Number field */}
        <label htmlFor="creditCardNumber">Credit Card Number</label>
        <input
          type="text"
          id="creditCardNumber"
          name="creditCardNumber"
          value={formData.creditCardNumber}
          placeholder="Enter Credit Card Number"
          onChange={handleInputChange}
          ref={creditCardNumberField}
          aria-required="true"
          maxLength={16}
        />
        {errorMessages.creditCardNumber && (
          <p style={{ color: "red" }}>{errorMessages.creditCardNumber}</p>
        )}

        {/* CVV field */}
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          placeholder="Enter CVV"
          onChange={handleInputChange}
          ref={cvvField}
          aria-required="true"
          maxLength={3}
        />
        {errorMessages.cvv && (
          <p style={{ color: "red" }}>{errorMessages.cvv}</p>
        )}

        {/* Expiration Date field */}
        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          type="text"
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          placeholder="MM/YYYY"
          onChange={handleInputChange}
          ref={expirationDateField}
          aria-required="true"
        />
        {errorMessages.expirationDate && (
          <p style={{ color: "red" }}>{errorMessages.expirationDate}</p>
        )}

        {/* Submit button */}
        <button type="submit">Submit Payment</button>
      </form>

      <div style={{ marginTop: "25px" }}>
        <label htmlFor="save">Save Payment Data</label>
        <input
          type="checkbox"
          id="save"
          name="save"
          checked={saveFormData}
          onChange={handleSaveData}
        />
      </div>

      {/* Success message */}
      {isSuccessfulSubmission && (
        <p style={{ color: "green" }}>Payment Submitted Successfully!</p>
      )}
    </div>
  );
};

export default CheckoutFormThree;
