import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(null);
  const navigate = useNavigate();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data.login.success) {
        sessionStorage.setItem('sessionKey', data.login.key);
        sessionStorage.setItem('userId', data.login.userId);
        navigate('/home');
      } else {
        console.log('Login failed:', data.login.message);
        setLogin(false);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {/* Input fields */}
              <button type="submit">Submit</button>
            </form>
          </div>
          <div>
            {login === false && (
              <p>User was not found.</p>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>An error occurred during login.</p>}
          </div>
        </header>
      </div>
    </>
  );
};

export default Login;