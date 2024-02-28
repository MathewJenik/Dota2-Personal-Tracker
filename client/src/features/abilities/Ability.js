import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { selectAbilityById } from './AbilitiesApiSlice'

import React, { useEffect, useState } from 'react'


const Ability = ({abilityId, adminMode}) => {
  const ability = useSelector(state => selectAbilityById(state, abilityId))

  const [iconToDisplay, setIconToDisplay] = useState('');

  const navigate = useNavigate()


  useEffect(() => {
    
  })

  if (ability) {

    const handleEdit = () => navigate(`/admin/ability/edit/${abilityId}`)

    const cellStatus = ability.active ? '' : 'table__cell--inactive'

    var healthCostString = "";
    for (var hp in ability.healthCost) {
      healthCostString += ability.healthCost[hp] + "|";
    }
    
    healthCostString = healthCostString.substring(0, healthCostString.length-1)

    var manaCostString = "";
    for (var mp in ability.manaCost) {
      manaCostString += ability.manaCost[mp] + "|";
    }
    
    manaCostString = manaCostString.substring(0, manaCostString.length-1)

    const itemImageLoc = ability.imageLoc.toString()


    return(
        <li className='ability-container'>
          <div className='ability-heading'>
            <h3 className=''>{ability.name}</h3>
            <div>
              <h3 className='healthCost'>{healthCostString}</h3>
              <h3 className='manaCost'>{manaCostString}</h3>
            </div>
          </div>
          
          <img src={"/"+itemImageLoc}  />

          {adminMode && (
              <button className='edit-button' onClick={handleEdit}>Edit</button>
            )
            }
        </li>
    )


} else {
    return null;
  }
}

export default Ability