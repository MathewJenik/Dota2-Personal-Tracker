import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useNavigate } from 'react-router-dom'
import usePersist from '../../hooks/usePersist'

import { saveTokenToLocalStorage } from '../api/storage'

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const [login, {isLoading}] = useLoginMutation()

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleUsernameInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const handleToggle = () => setPersist(prev => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const {accessToken} = await login({username, password}).unwrap()
      dispatch(setCredentials({accessToken}));
      setUsername('');
      setPassword('');
      console.log(accessToken);
      if (accessToken) {
        saveTokenToLocalStorage(accessToken)
        navigate('/dashboard');
      }
    } catch (error) {
      if (!error.status) {
        setErrorMessage('No Server Response');
      } else if (error.status === 400) {
        setErrorMessage('Missing Username or Password');
      } else if (error.status === 401) {
        setErrorMessage('Unauthorized');
      } else {
        setErrorMessage(error.data?.message)
      }

      if (errRef.current) { 
        errRef.current.focus();
      }
    }

  }

  const content = (
    <div>
      <section>
        <header>
          <h1 className='primary-heading'>Login</h1>
        </header>
        <main>

          <form className='form-centre' onSubmit={handleSubmit}>
            <label htmlFor='username'>Email: </label>
            <input id='username' placeholder='Email' onChange={handleUsernameInput} required></input>

            
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' placeholder='Password' onChange={handlePasswordInput}  required></input>

            <button>Sign In</button>

            <label htmlFor='persist'
              id="persist"
              onChange={handleToggle}
              checked={persist}>Trust This Device
            </label>
            
            <input type="checkbox">
              </input>

          </form>

        </main>
      </section>
    </div>
  )

  return content
}
export default Login;