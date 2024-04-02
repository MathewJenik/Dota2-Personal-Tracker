import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ContentContainer.css'

const ContentContainer = ({urlTo, heading}) => {

    
    const navigate = useNavigate()
    const handleEdit = () => navigate(`${urlTo}`);

  return (
    <li onClick={handleEdit} className='content-container'>
        <div > 
            <button>
                <h1>{heading}</h1>
            </button>

        </div>
    </li>
  )
}

export default ContentContainer