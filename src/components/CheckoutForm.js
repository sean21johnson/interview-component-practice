/*
  REQUIREMENTS
  1. Build a basic form component
  2. Validate the inputs (e.g., ensure the email is valid, the credit card number has the correct length)
  3. If inputs are valid, submit the form and show a success message; otherwise, display error messages next to the relevant inputs.
  4. Allow the user to save the form data in local storage for future use
*/

import React, { useState, useEffect } from 'react';

const isOddIndex = (index) => index % 2 === 1;

const subtractNine = (number) => number - 9;

const doubleNumber = (number) => number * 2;

const checkModuloTen = (number) => number % 10 === 0;

const updateNumber = (number) => {
  const doubleValue = doubleNumber(number);

  if (doubleValue > 9) {
    console.log('triggered')
    return subtractNine(doubleValue);
  }

  return doubleValue;
}

const sumNumbers = (numbers) => {
  return numbers.reduce((sum, number) => {
    return sum += number;
  }, 0)
}

const sanitizeCreditCardInput = (creditCardNumber) => {
  /*
   - DELIMITER: / is a delimiter. It indicates the start and end of the regular expression pattern. In this case, '/\D/'
   - PATTERN: \D is a pattern in regex that matches any character that is NOT a digit
   - ESCAPE CHARACTER: The "\" here is an escape character. It tells the JS engine to treat the character after it in a special way. 
   - FLAGS (OPTIONAL): g is the global flag. This ensures that the regex is applied to the entire string, not just the first match. Goes after the pattern
  */

  // We use replace to find all the matches to non-numbers and then replace them with an empty string which is the equivalent of nothing
  return creditCardNumber.replace(/\D/g, '');
}

function CheckoutForm() {
  // Set state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    creditCard: ''
  })
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    // Remember that localStorage only stores string values
    // We need to parse the string and turn it back into an object
    const stringified = JSON.parse(savedData);

    console.log({stringified})

    console.log({savedData})
  })

    // Validate using the Luhn algorithm
    const validateCreditCardNumber = () => {
      const { creditCard } = formData;

      const sanitizedCard = sanitizeCreditCardInput(creditCard);

      if (sanitizedCard.length !== 16) {
        setErrorMessage('Credit card number must be 16 digits')
        return false;
      }
      // Remember that the creditCardNumber is a string originally
      // Reverse the digits of the credit card number
      const reversedNumbers = sanitizedCard.split('').reverse().map(number => Number(number));
  
      const updatedNumbers = [];
  
      reversedNumbers.forEach((number, index) => {
        const isSecondIndex = isOddIndex(index);
        let updatedNumber = number;
  
        if (isSecondIndex) {
          updatedNumber = updateNumber(number)
        }
  
        updatedNumbers.push(updatedNumber);
      })
  
      const sum = sumNumbers(updatedNumbers);
  
      const isDivisibleByTen = checkModuloTen(sum);
  
      return isDivisibleByTen;
    }

  // Handlers
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => {
      const updatedFormData = {...prevState, [name]: value};
      // Local storage only stores string values so we need to use stringify here to convert it
      localStorage.setItem('formData', JSON.stringify(updatedFormData))
      return updatedFormData;
    })
  }

  const handleSubmit = (event) => {
    // Default behavior is for the browser to reload the page and send the form data to a server
    event.preventDefault();

    const { name, email } = formData;

    if (!name.length || !email.length || !validateCreditCardNumber()) {
      setErrorMessage('Invalid input, please try again.')
    } else {
      setErrorMessage('');
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
      <input type='text' name='creditCard' onChange={handleInputChange} value={formData.creditCard} minLength={16} maxLength={16}/>
      {errorMessage && <div style={{ margin: '25px', color: 'red' }}>
        {errorMessage}</div>}
      <button type='submit'>
        Submit
      </button>

    </form>
  )
};

export default CheckoutForm;