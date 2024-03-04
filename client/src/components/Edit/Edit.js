import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const Edit = (props) => {
    const { id } = useParams();
    const [inputValues, setInputValues] = useState({});
    const [keyValueArray, setKeyValueArray] = useState(
        []
        );

    async function loadCurrentData() {
        // Construct JSON body including the id and input values
        console.log("ID: ", id)

        // Send the request to the API endpoint
        fetch(`${props.recUrl}/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(async response => {
            const data = await response.json();
            //setKeyValueArray(Object.entries(data));

            const kv = Object.entries(data);

            if (kv[0][0] === "_id") {
                kv[0] = ['id', data._id];
                delete data._id;
            }
            setKeyValueArray(kv);
                
            console.log(keyValueArray[1][1])
        })
        .catch(error => {
            // Handle error here
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        // Update the corresponding key-value pair in keyValueArray
        const updatedKeyValueArray = [...keyValueArray];
        updatedKeyValueArray.find(pair => pair[0] === name)[1] = value;
        setKeyValueArray(updatedKeyValueArray);
    }

    function saveChanges() {
        const formattedData = keyValueArray.reduce((acc, [key, value], index) => {
            let formattedValue = value;
            if (index > 0) {
                switch (props.inputsType[index-1]) {
                case 'Number':
                    formattedValue = parseFloat(value); // Parsing to float assuming numbers
                    break;
                case 'Boolean':
                    formattedValue = value === 'true'; // Convert string 'true' to boolean true
                    break;
                case 'ArrayS':
                    formattedValue = Array(value.toString().split("|")); // Ensure proper formatting

                    break;
                case 'ArrayN':
                    formattedValue = Array(value)
                    for (var index in formattedValue) {
                    formattedValue[index] = parseFloat(formattedValue[index]);
                    }
                    //formattedValue = Array(parseFloat(value)); // Ensure proper formatting
                    break;
                default:
                    formattedValue = value;
                }
            }
            acc[key] = formattedValue;
            return acc;
          }, {});
            console.log("FORMATTED DATA: ",formattedData);
            // Construct JSON body including the id and input values
            const requestBody = JSON.stringify(formattedData);
        // Send the request to the API endpoint
        fetch(`${props.editUrl}`, {
            method: 'PATCH',
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

    function deleteFromDB() {
        // Construct JSON body including the id and input values

        // Add the id to the formData object
        const data = {
            id: id
        };
        console.log(data)
        // Send the request to the API endpoint
        fetch(`${props.deleteUrl}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(data)
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

    useEffect(() => {
        loadCurrentData();
    }, [])


    console.log(props.inputs.length)

    return (
        <div>
            {
            (keyValueArray.length>1) ? (
            props.inputs.map((input, index) => (
                <div key={index}>
                    {/* Render each input element here */}
                    <label>{input}</label>
                    <input 
                    name={input} 
                    placeholder={input} 
                    value={(keyValueArray[index] && keyValueArray[index+1][1]) || ''} 
                    onChange={handleInputChange} 
                    />
                </div>
            )
            )) : (
                <div>This Does Not Exist!</div>
            )
        }
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={deleteFromDB}>DELETE</button>
            
        </div>
    );
};

export default Edit