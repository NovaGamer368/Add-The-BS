import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      success
      key
      message
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      key
      userId
      message
    }
  }
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: signupData } = await createUser({ variables: { email, password } });

      if (signupData.createUser.success) {
        sessionStorage.setItem('sessionKey', signupData.createUser.key);
        navigate('/');
      } else {
        console.log('Signup failed:', signupData.createUser.message);
        setSignupError(signupData.createUser.message);
      }

      const { data: loginData } = await loginUser({ variables: { email, password } });

      if (loginData.login.success) {
        sessionStorage.setItem('sessionKey', loginData.login.key);
        sessionStorage.setItem('userId', loginData.login.userId);
        navigate('/');
      } else {
        console.log('Login after sign-up failed:', loginData.login.message);
        setLoginError(loginData.login.message);
      }
    } catch (error) {
      console.error('An error occurred during sign-up:', error);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div>
            <h1 className='text-5xl p-10'>Sign Up</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {/* Input fields */}
              <button type="submit">Submit</button>
            </form>
          </div>
          <div>
            {signupError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">{signupError}</p>
            )}
            {loginError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">{loginError}</p>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Signup;