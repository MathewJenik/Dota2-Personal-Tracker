import React, { useEffect } from 'react'
import Link, { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';

import { Cookies } from 'react-cookie';
import useAuth from '../../hooks/useAuth';

const DashboardHeader = () => {


  const {username, status} = useAuth()
  console.log("STatus", status)

  const navigate = useNavigate()
  const {pathname} = useLocation()
  

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  /*
  useEffect(() => {
    console.log("isSuccess:", isSuccess);
    if (isSuccess) {
      navigate('/');
    } else {
      console.log("NOTHING");
    }
  }, [isSuccess, navigate]);
*/

  const onLogoutClick = () => {
    sendLogout();
    navigate('/')
  }

  if (isLoading) {
    return <p>Currentling Logging Out.</p>
  }

  if (isError) {
    return <p>Error: {error.data?.message}</p>
  }



  const content = (
    <div className='dashboard-heading'>
        <p>asdasdasd</p>
        <div>
        </div>
    </div>
  );

  return content;
}
export default DashboardHeader