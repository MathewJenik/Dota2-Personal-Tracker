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
            setKeyValueArray(Object.entries(data));
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
        // Construct JSON body including the id and input values
        const formData = Object.fromEntries(keyValueArray);

        // Add the id to the formData object
        formData.id = id;
    
        // Construct JSON body including the id and input values
        const requestBody = JSON.stringify(formData);
        console.log("ASDASD", keyValueArray);
        console.log("REQ: ", requestBody)
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