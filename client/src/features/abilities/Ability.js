import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { selectAbilityById } from './AbilitiesApiSlice'

import React, { useEffect, useState } from 'react'

const Ability = ({abilityId}) => {
  const ability = useSelector(state => selectAbilityById(state, abilityId))

  const [iconToDisplay, setIconToDisplay] = useState('');

  const navigate = useNavigate()


  useEffect(() => {
    
  })

  if (ability) {

    const handleEdit = () => navigate(`/admin/ability/${abilityId}`)

    const abilityesPrimaryAttribute = ability.primaryAttribute.toString()
    const cellStatus = ability.active ? '' : 'table__cell--inactive'


    const itemImageLoc = ability.imageLoc.toString()


    return(
        <li className='ability-container'>
          <div className='ability-heading'>
            <h3 className=''>{ability.name}</h3>
            <img src={"/"+iconToDisplay}  />
          </div>
          
          
          <img src={"/"+itemImageLoc}  />
          <button onclick={handleEdit}>Edit</button>
            
        </li>
    )


} else {
    return null;
  }
}

export default Ability