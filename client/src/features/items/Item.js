import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectItemById } from './ItemsApiSlice';
import React, { useEffect, useState } from 'react';

const Item = ({ itemId, adminMode }) => {

  
  const item = useSelector(state =>
    selectItemById(state, itemId)
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item) {
      setLoading(false);
    }
  }, [item]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>Item not found</p>;
  }

  // Add additional checks for item properties
  const itemName = item.name ? item.name : 'Unknown Name';
  const itemCost = item.cost ? item.cost : 'Unknown Cost';
  const itemsDesc = item.description ? item.description.toString() : 'No Description';
  const itemImageLoc = item.imageLoc ? item.imageLoc.toString() : '';
  const cellStatus = item.active ? '' : 'table__cell--inactive';

  const handleEdit = () => navigate(`/admin/item/edit/${itemId}`);

  return (
    <li className='item-container'>
      <div className='item-heading'>
        <h3 className=''>{itemName}</h3>
        <h3 className='gold'>{itemCost}</h3>
      </div>
      {itemImageLoc && <img src={`/${itemImageLoc}`} alt={itemName} />}
      <p>{itemsDesc}</p>
      {adminMode && (
        <button className='edit-button' onClick={handleEdit}>Edit</button>
      )}
    </li>
  );
};

export default Item;
