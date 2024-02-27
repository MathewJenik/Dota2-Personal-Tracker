import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNewComponent = () => {

    
    const navigate = useNavigate()
    const handleEdit = () => navigate(`/admin/item/create/`);

  return (
    <li className='create-new-container'>
        <div> 
            <button onClick={handleEdit}>
                Create New
                {/*
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48.467 48.467" space="preserve">
                    <g>
                        <g>
                            <path fill={'white'} d="M0.001,24.233c0,3.584,2.916,6.5,6.5,6.5h11.234v11.234c0,3.584,2.916,6.5,6.5,6.5    s6.5-2.916,6.5-6.5V30.733h11.232c3.584,0,6.5-2.916,6.5-6.5s-2.916-6.5-6.5-6.5H30.736V6.5c0-3.584-2.916-6.5-6.5-6.5    s-6.5,2.916-6.5,6.5v11.233H6.501C2.917,17.733,0.001,20.649,0.001,24.233z M18.236,20.733c1.379,0,2.5-1.122,2.5-2.5V6.5    c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5v11.733c0,1.378,1.121,2.5,2.5,2.5h11.732c1.93,0,3.5,1.57,3.5,3.5s-1.57,3.5-3.5,3.5    H30.236c-1.379,0-2.5,1.122-2.5,2.5v11.734c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5V30.233c0-1.378-1.121-2.5-2.5-2.5H6.501    c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5H18.236z"/>
                        </g>
                    </g>
                </svg>
                */}
            </button>

        </div>
    </li>
  )
}

export default CreateNewComponent