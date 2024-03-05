import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { selectItemById } from './ItemsApiSlice'


import React from 'react'

const Item = ({itemId, adminMode}) => {
  const item = useSelector(state =>
      selectItemById(state, itemId)
   )
  console.log(item)

  const navigate = useNavigate()

  if (item) {

    const handleEdit = () => navigate(`/admin/item/edit/${itemId}`);

    const itemsDesc = item.description.toString()
    const itemImageLoc = item.imageLoc.toString()
    const cellStatus = item.active ? '' : 'table__cell--inactive'

    return(
        <li className='item-container'>
            <div className='item-heading'>
              <h3 className=''>{item.name}</h3>
              <h3 className='gold'>{item.cost}</h3>
            </div>
            <img src={"/"+itemImageLoc}  />
            <p>{itemsDesc}</p>
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

export default Item