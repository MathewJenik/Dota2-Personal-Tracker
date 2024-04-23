import React from 'react'
import ContentContainer from '../../components/ContentContainer/ContentContainer'



const Admin = () => {
  return (
    <div>
            
        <h1 className='primary-heading'>Admin</h1>
        
        <ul className='admin-options'>
          <ContentContainer urlTo={'heroes'} heading={'Heroes'}/>
          <ContentContainer urlTo={'items'} heading={'Items'}/>
          <ContentContainer urlTo={'abilities'} heading={'Abilities'}/>

          <ContentContainer urlTo={'users'} heading={'Users'}/>
        </ul>
    </div>
  )
}

export default Admin