import React, {useEffect, useState} from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email can`t be empty');
  const [passwordError, setPasswordError] = useState('Password can`t be empty');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Email is not valid')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);

    if(e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('The password should be longer than 3 symbols')

      if(!e.target.value) {
        setPasswordError("The password can't be empty")
      }
    } else {
      setPasswordError('')
    }
  }

  const BlurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true)
        break;
     default:
    }
  }

  return (
    <div className="app">
      <form>
        <h1>Registration</h1>

        {(emailDirty && emailError) &&
        <div style={{ color:'red' }}>{emailError}</div>}

      <input
        name="email"
        type="text" 
        placeholder="enter your e-mail"
        onBlur={e => BlurHandler(e)}
        value={email}
        onChange={(e) => emailHandler(e)}
      />

      {(passwordDirty && passwordError) &&
        <div style={{ color:'red' }}>{passwordError}</div>}
        
      <input
        name="password"
        type="password"
        placeholder='Enter your password'
        onBlur={e => BlurHandler(e)}
        onChange={(e) => passwordHandler(e)}
        value={password}
      />

      <button
        type="submit"
        disabled={!formValid}
      >
        Registration
      </button>
      </form>
    </div>
  )
}

export default App;
