import React, { useEffect, useState } from 'react'

import { useAddNewHeroMutation } from './HeroesApiSlice'
import { useNavigate } from 'react-router-dom';
import { ATTRIBUTES } from '../../config/attributes';
import { selectAllAbilities } from '../abilities/AbilitiesApiSlice';
import { useSelector } from 'react-redux';


const CreateHeroForm = () => {


    const [addNewHero, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewHeroMutation()

    
    const allAbilities = useSelector(selectAllAbilities)
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [primaryAttribute, setPrimaryAttribute] = useState('');
    const [imageLoc, setImageLoc] = useState('');
    const [abilities, setAbilities] = useState(['']);


    const navigate = useNavigate();

    const canSave = !isLoading;

    const attributeOptions = Object.values(ATTRIBUTES).map(attrib => {
        return (
            <option key={attrib} value={attrib}>
                {attrib}
            </option>
        )
    })
    
    let abilityOptions = null;
    if (allAbilities) { // Ensure allAbilities is not null or undefined
        console.log("ASDASDASDASD FOUND : ", allAbilities)
        abilityOptions = allAbilities.map(abil => 
            (
            <option key={abil.name} value={abil.name}>{abil.name}</option>
        ));
    }

    const onSaveClicked = async (e) => {
        e.preventDefault();
        // check if the data can be saved
        if (canSave) {
            await addNewHero({name, description, primaryAttribute, imageLoc, abilities});
        }
    }



    useEffect(() => {
        if (isSuccess) {
            // set the fields to be empty again.
            
            // navigate to the required page
        }
    }, [isSuccess, navigate])


    const content = 
    <div>
        
        <h1>Create Hero:</h1>
        <form>
            <label for={'name'}>Hero Name</label>
            <input id='name' placeholder='Name'></input>
            <br></br>
            <label for={'desc'}>Description</label>
            <input id='desc' placeholder='Description'></input>
            <br></br>
            <label for="attribute">Attribute</label>
            <select id='attribute'>{attributeOptions}</select>
            <br></br>
            <label for={'imageLoc'}>Image Location</label>
            <input id='imageLoc' placeholder='Image Location'></input>
            <br></br>
            <label for={'abilities'}>Abilities</label>
            <select id='abilities'>{abilityOptions}</select>
        </form>

    </div>
  return content;
}

export default CreateHeroForm