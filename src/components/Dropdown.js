// Create a dropdown that accepts an array of options and displays them as a list int eh dropdown
// Each option should be selectable by the user
// When a user selects an option, display the selected option somewhere on the page
// An optional callback function called "onSelect" that can be passed to the component and is triggered when the option is selected
// Allow users to navigate through the dropdown using the keyboard (up/down arrows)
// Can make a selection by clicking, pressing Enter, or pressing Spacebar
// Props are:
//  -options: an array of strings representing the dropdown options
//  -placeholder: a string to display when no options is selected ("Select an option")
//  -onSelect: an optional callback function that is triggered when an option is selected, receiving the selected option as an argument
// Testing:
//  -Dropdown renders with the correct placeholder and options
//  -Dropdown correctly handles user interactions (click and keyboard)
//  -The onSelect callback is triggered with the correct selected option
//  -The selection option is displayed correctly in the UI

import React, { useState } from "react";

function Dropdown(props) {
  const { options = [], placeholder, onSelect } = props;

  // state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // handlers
  const handleClickDropdownButton = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOption = (option, index) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option);
    }

    setHighlightedIndex(index);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    const { key } = event;

    if (isOpen) {
      if (key === "ArrowDown") {
        setHighlightedIndex((prevState) =>
          prevState === options.length - 1 ? 0 : prevState + 1
        );
      }
      if (key === "ArrowUp") {
        setHighlightedIndex((prevState) =>
          prevState === 0 ? options.length - 1 : prevState - 1
        );
      }
      if (key === "Enter" || key === " ") {
        handleClickOption(options[highlightedIndex], highlightedIndex);
      }
    } else if (key === "ArrowDown" || key === "Enter" || key === " ") {
      setIsOpen(true);
    }
  };

  // return statement
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        onClick={handleClickDropdownButton}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {selectedOption || placeholder}
      </button>
      {isOpen ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {options.map((option, index) => {
            return (
              <button
                key={index}
                onClick={() => handleClickOption(option, index)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    highlightedIndex === index ? "#ddd" : "transparent",
                  padding: "5px",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
      <span style={{ marginTop: "50px" }}>
        Selected Option: {selectedOption}
      </span>
    </div>
  );
}

export default Dropdown;
