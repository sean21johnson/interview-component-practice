/*
  REQUIREMENTS
  1. Build a basic form component
  2. Validate the inputs (e.g., ensure the email is valid, the credit card number has the correct length)
  3. If inputs are valid, submit the form and show a success message; otherwise, display error messages next to the relevant inputs.
  4. Allow the user to save the form data in local storage for future use
*/

import React, { useState } from 'react';

const isOddNumber = (number) => {
  if (number === 0) {
    return false;
  } else if (number % 2 > 0) {
    return true;
  }

  return false;
}

const subtractNine = (number) => number - 9;

const doubleNumber = (num) => num * 2;

const updateNumber = (number) => {
  const doubleDigit = doubleNumber(number);

  if (doubleDigit > 9) {
    return subtractNine(doubleDigit);
  }

  return doubleDigit;
}

const sumNumbers = (numbers) => {
  return numbers.reduce((sum, number) => {
    return sum += number;
  }, 0)
}

  // Validate using the Luhn algorithm
  const validateCreditCardNumber = (creditCardNumber) => {
    // Remember that the creditCardNumber is a string originally
    // Reverse the digits of the credit card number
    const reversedNumbers = creditCardNumber.split('').reverse().map(number => Number(number));

    const updatedNumbers = [];

    reversedNumbers.forEach((number, index) => {
      const isSecondIndex = isOddNumber(index);
      let updatedNumber = number;

      if (isSecondIndex) {
        updatedNumber = updateNumber(number)
      }

      updatedNumbers.push(updatedNumber);
    })

    const sum = sumNumbers(updatedNumbers);

    console.log({sum})
  }

function CheckoutForm() {
  // Set state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    creditCard: ''
  })
  const [errorMessage, setErrorMessage] = useState('');

  // Handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => {
      return ({
        ...prevState,
        [name]: value
      })
    })
  }

  const handleSubmit = (event) => {
    // Default behavior is for the browser to reload the page and send the form data to a server
    event.preventDefault();

    const { name, email, creditCard } = formData;

    if (!name.length || !email.length || !validateCreditCardNumber(creditCard)) {
      setErrorMessage('Invalid input, please try again.')
    } else {
      alert('You have successfully bought an item!')
    }
  }

  // Return
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
      </label>
      <input type='text' name='name' onChange={handleInputChange} value={formData.name}/>
      <label>
        Email
      </label>
      <input type='email' name='email' onChange={handleInputChange} value={formData.email}/>
      <label>
        Credit Card
      </label>
      <input type='text' name='creditCard' onChange={handleInputChange} value={formData.creditCard}/>
      {errorMessage && <div style={{ margin: '25px', color: 'red' }}>
        {errorMessage}</div>}
      <button type='submit'>
        Submit
      </button>

    </form>
  )
};

export default CheckoutForm;