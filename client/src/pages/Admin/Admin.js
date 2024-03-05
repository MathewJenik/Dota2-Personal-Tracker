import React from 'react'
import ContentContainer from '../../components/ContentContainer/ContentContainer'



const Admin = () => {
  return (
    <div>
            
        <h1>Admin</h1>
        <ul className='admin-options'>
          <ContentContainer urlTo={'/admin/heroes'} heading={'Heroes'}/>
          <ContentContainer urlTo={'/admin/Items'} heading={'Items'}/>
          <ContentContainer urlTo={'/admin/Abilities'} heading={'Abilities'}/>

          <ContentContainer urlTo={'/admin/users'} heading={'Users'}/>
        </ul>
    </div>
  )
}

export default Admin