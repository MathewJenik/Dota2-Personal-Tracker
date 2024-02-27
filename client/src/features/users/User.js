import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { selectUserById } from './UsersApiSlice'


import React from 'react'

const User = ({userId}) => {
  const user = useSelector(state => selectUserById(state, userId))

  const navigate = useNavigate()

  if (user) {

    const handleEdit = () => navigate('/dash/users/${userId}')

    const userRolesString = user.roles.toString().replaceAll(',', ', ')
    const cellStatus = user.active ? '' : 'table__cell--inactive'

    return(
        <tr>
            <td>{user.username}</td>
            <td>{userRolesString}</td>
            <td>
                <button onclick={handleEdit}>Edit</button>
            </td>
        </tr>
    )


} else {
    return null;
  }
}

export default User