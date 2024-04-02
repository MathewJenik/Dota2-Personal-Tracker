import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useNavigate } from 'react-router-dom'
import { useAddNewUserMutation } from '../users/UsersApiSlice'


const Register = () => {

  const userRef = useRef();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const [addNewUser, {isLoading}] = useAddNewUserMutation()

  

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleUsernameInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const DotaID = '0'
      const roles = ["User"]
      await addNewUser({username, password, DotaID, roles})
      setUsername('');
      setPassword('');
      navigate('/dashboard');
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

    }

  }

  const content = (
    <div>
      <section>
        <header>
          <h1 className='primary-heading'>Register</h1>
        </header>
        <main>

          <form className='form-centre' onSubmit={handleSubmit}>
            
            <label htmlFor='username'>Email: </label>
            <input id='username' placeholder='Email' onChange={handleUsernameInput} required></input>
            

            
            <label htmlFor='password'>Password: </label>
            <input id='password' placeholder='Password' onChange={handlePasswordInput}  required></input>

            <button>Sign In</button>
          </form>

        </main>
      </section>
    </div>
  )

  return content
}
export default Register;