import React, { useEffect, useState } from 'react'

const Create = (props) => {
  const [keyValueArray, setKeyValueArray] = useState(
      props.inputs.map(input => [input, ''])
    );

    function handleInputChange(event) {
      const { name, value } = event.target;
      // Update the corresponding key-value pair in keyValueArray
      const updatedKeyValueArray = [...keyValueArray];
      updatedKeyValueArray.find(pair => pair[0] === name)[1] = value;
      setKeyValueArray(updatedKeyValueArray);
    
  }

  function saveChanges() {// Cast values to their correct types based on inputsType
    const formattedData = keyValueArray.reduce((acc, [key, value], index) => {
      let formattedValue = value;
      switch (props.inputsType[index]) {
        case 'Number':
          formattedValue = parseFloat(value); // Parsing to float assuming numbers
          break;
        case 'Boolean':
          formattedValue = value === 'true'; // Convert string 'true' to boolean true
          break;
        case 'ArrayS':
          formattedValue = Array(value.split("|")); // Ensure proper formatting
          break;
        case 'ArrayN':
          formattedValue = Array(value.split("|"))
          for (var index in formattedValue) {
            formattedValue[index] = parseFloat(formattedValue[index]);
          }
          //formattedValue = Array(parseFloat(value)); // Ensure proper formatting
          break;
        default:
          formattedValue = value;
      }
      acc[key] = formattedValue;
      return acc;
    }, {});
      console.log(formattedData)
      // Construct JSON body including the id and input values
      const requestBody = JSON.stringify(formattedData);

      // Send the request to the API endpoint
      fetch(`${props.createUrl}`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
      },
          body: requestBody
      })
      .then(async response => {
          // Handle response here
          const data = await response.json();
          console.log(data);
      })
      .catch(error => {
          // Handle error here
      });
  }

  return (
    <div>
      {
      
      props.inputs.map((input, index) => (
          <div key={index}>
              {/* Render each input element here */}
              <label>{input}</label>
              <input 
              name={input} 
              placeholder={input} 
              value={(keyValueArray[index] && keyValueArray[index][1]) || ''} 
              onChange={handleInputChange} 
              />
          </div>
      )
      )
  }
      <button onClick={saveChanges}>Save Changes</button>
  </div>
  )
}

export default Create