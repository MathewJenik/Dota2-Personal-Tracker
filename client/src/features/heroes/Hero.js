import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { selectHeroById } from './HeroesApiSlice'

import React, { useEffect, useState } from 'react'
import { LoadAbility } from '../api/apiFunctions'


const Hero = ({heroId, adminMode}) => {
  const hero = useSelector(state => selectHeroById(state, heroId))

  const [iconToDisplay, setIconToDisplay] = useState('');

  const navigate = useNavigate()

  const [abilityImageLocs, setAbilityImageLocs] = useState([]);
  
  const [abilityIDs, setAbilityIDs] = useState([]);


  useEffect(() => {
    if (hero) {
      
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
      
    }

  }, [hero])


  useEffect(() => {
    const fetchAbilityImages = async () => {

      const imageLocs = [];
      const imageIDs = [];
      console.log("SERVER IMAGES FOR HERO ABILITIES: ", JSON.parse(hero.abilities))

      // OLD WAY
      const abilString = JSON.parse(hero.abilities);
      for (const ability in abilString) {
        console.log("EACH ABILITY FOUND: ", abilString[ability]._id)
        const imgLoc = await LoadAbility(abilString[ability]._id);
        imageLocs.push(imgLoc.imageLoc);
        imageIDs.push(imgLoc._id);
      }
      setAbilityImageLocs(imageLocs);
      setAbilityIDs(imageIDs);

    }

    if (hero) {
      fetchAbilityImages();

    }
  
  }, [hero]);

  if (hero) {

    const handleEdit = () => navigate(`/admin/hero/edit/${heroId}`)

    

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
          <div className='hero-abilities'>
            {abilityImageLocs.map((image, index) => <img className="hero-ability-image" src={"/"+image} onClick={() => 
              navigate(`/ability/${abilityIDs[index]}`)
            } />)
            }
          </div>
          <p>{hero.description}</p>



          {adminMode && (
              <button className='edit-button' onClick={handleEdit}>Edit</button>
          )}
            
        </li>
    )


} else {
    return null;
  }
}

export default Hero