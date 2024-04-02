import React, { useEffect, useState } from 'react'

import { selectHeroById, useAddNewHeroMutation, useUpdateHeroMutation } from './HeroesApiSlice'
import { useNavigate, useParams } from 'react-router-dom';
import { ATTRIBUTES } from '../../config/attributes';
import { selectAllAbilities } from '../abilities/AbilitiesApiSlice';
import { useSelector } from 'react-redux';


const EditHeroForm = () => {
    
    const { id } = useParams();

    const [updateHero,
        isLoading,
        isSuccess,
        isError,
        error
    ] = useUpdateHeroMutation()


    const hero = useSelector((state) => selectHeroById(state, id));

    console.log("CURRENT HERO: ", hero)
    
    const allAbilities = useSelector(selectAllAbilities)
    
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [primaryAttribute, setPrimaryAttribute] = useState();
    const [imageLoc, setImageLoc] = useState();
    const [abilities, setAbilities] = useState();


    useEffect(() => {
        if (hero) {
            setName(hero.name || '');
            setDescription(hero.description || '');
            setPrimaryAttribute(hero.primaryAttribute || '');
            setImageLoc(hero.imageLoc || '');
            setAbilities(hero.abilities || []);

        }
    }, [hero]);


    const navigate = useNavigate();

    //const canSave = !isLoading;

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
        console.log("SAVING")
        // check if the data can be saved
       // if (canSave) {
            console.log("DID SAVE")
            await updateHero({id, name, description, primaryAttribute, imageLoc, abilities});
            console.log("Saved Abilities: ", abilities)
        //}
    }

    const onAbilitySelect = async (e) => {
        //setAbilities(e.target.value)
        console.log("ABILITY SELECTED: ", e.target.selectedOptions)
        const selectedAbilities = Array.from(e.target.selectedOptions).map(option => option.value)
        const selectedAbilitiesIDs = [];
        // search the ability within the found abilities
        if (allAbilities) { // Ensure allAbilities is not null or undefined


            selectedAbilities.forEach(selectedAbility => {
                const matchingAbility = allAbilities.find(abil => abil.name === selectedAbility);
                if (matchingAbility) {
                    // add the id to setAbilities
                    //selectedAbilitiesIDs.push(matchingAbility._id)
                    selectedAbilitiesIDs.push(matchingAbility)
                    console.log("Abiltiy FOUND!!!: ", matchingAbility);
                }
            })

        }

        console.log("SELECTED ABILITY IDS FOUND: ", selectedAbilitiesIDs)
        setAbilities(selectedAbilitiesIDs)
        
    }

    const onAttributeSelect = async (e) => {
        setPrimaryAttribute(e.target.value)
    }


    useEffect(() => {
        if (isSuccess) {
            // set the fields to be empty again.
            
            // navigate to the required page
        }
    }, [isSuccess, navigate])



    const content = 
    <div>
        
        <h1>Edit Hero:</h1>
        <form>
            <label for={'name'}>Hero Name</label>
            <input id='name' placeholder='Name' onChange={(event) => {setName(event.target.value)}} value={name}></input>
            <br></br>
            <label for={'desc'}>Description</label>
            <input id='desc' placeholder='Description' onChange={(event) => {setDescription(event.target.value)}} value={description}></input>
            <br></br>
            <label for="attribute">Attribute</label>
            <select id='attribute' onChange={onAttributeSelect}>{attributeOptions}</select>
            <br></br>
            <label for={'imageLoc'}>Image Location</label>
            <input id='imageLoc' placeholder='Image Location' onChange={(event) => {setImageLoc(event.target.value)}} value={imageLoc}></input>
            <br></br>
            <label for={'abilities'}>Abilities</label>
            <select multiple id='abilities' onChange={onAbilitySelect}>{abilityOptions}</select>
            <input type='submit' value={"Submit"} onClick={onSaveClicked}></input>
        </form>

    </div>
  return content;
}

export default EditHeroForm