import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(null);
  const [login, setLogin] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success && data.key) {
        sessionStorage.setItem('sessionKey', data.key);
        navigate('/');
      } else {
        console.log('Signup failed:', data.Message);
        setSignup(false);
      }

    const loginResponse = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

      const loginData = await loginResponse.json();

      if (loginData.success) {
        sessionStorage.setItem('sessionKey', loginData.key);
        sessionStorage.setItem('userId', loginData.userId);
        navigate('/');
      } else {
        console.log('Login after sign-up failed:', loginData.Message);
        setLogin(false);
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
                        <div class="mb-8">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required/>
                        </div>
                        <div class="mb-8">
                            <label for="password" class="block mb-2 text-sm font-medium text-white">Your password</label>
                            <input type="password" id="password" class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Password" required/>
                            <p class="mt-2 text-sm text-gray-400">Already have an account? <a href="/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login</a></p>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
                <div>
                  {signup === false && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> There was an error signing you up.</p>
                  )}
                  {login === false && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> There was an error logining you in.</p>
                  )}
                </div>
            </header>
        </div>
        </>
    )
}

export default Signup