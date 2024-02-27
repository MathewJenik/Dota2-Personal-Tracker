import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { selectHeroById } from './HeroesApiSlice'

import React, { useEffect, useState } from 'react'

const Hero = ({heroId}) => {
  const hero = useSelector(state => selectHeroById(state, heroId))

  const [iconToDisplay, setIconToDisplay] = useState('');

  const navigate = useNavigate()


  useEffect(() => {
    
    switch(hero.primaryAttribute.toString()) {
      case "Strength":
        setIconToDisplay('assets/images/general/Strength_attribute_symbol.webp');
      break;
      case "Agility":
        setIconToDisplay('assets/images/general/Agility_attribute_symbol.webp');
      break;
      case "Intelligence":
        setIconToDisplay('assets/images/general/Intelligence_attribute_symbol.webp');
      break;
      case "Universal":
        setIconToDisplay('assets/images/general/Universal_attribute_symbol.webp');
      break;
    }
  })

  if (hero) {

    const handleEdit = () => navigate(`/admin/hero/${heroId}`)

    const heroesPrimaryAttribute = hero.primaryAttribute.toString()
    const cellStatus = hero.active ? '' : 'table__cell--inactive'


    const itemImageLoc = hero.imageLoc.toString()


    return(
        <li className='hero-container'>
          <div className='hero-heading'>
            <h3 className=''>{hero.name}</h3>
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

export default Hero