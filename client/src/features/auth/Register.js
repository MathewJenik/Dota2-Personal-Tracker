import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const [login, {isLoading}] = useLoginMutation()

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleUsernameInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const {accessToken} = await login({username, password}).unwrap()
      dispatch(setCredentials({accessToken}));
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

      errRef.current.focus();
    }

  }

  const content = (
    <div>
      <section>
        <header>
          <h1>User Register</h1>
        </header>
        <main>

          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username: </label>
            <input id='username' placeholder='Username' onChange={handleUsernameInput} required></input>

            
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