import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      UserName
      Name
      Location
      Bio
      Img
      Key
    }
  }
`;

function Profile() {
  const userId = sessionStorage.getItem('userId');
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  const user = data.getUserById;
  const isAdmin = user && user.Key === 'a84640d6-1c42-41aa-a53f-783edd2b4e64'; 
  const userImg = user && user.Img ? `http://localhost:3001${user.Img}` : '';

  return (
    <div>
      <header className="App-header">
        {user ? (
          <div>
            <div>
                <img src={userImg} alt="Profile" />
                <h3>{user.UserName}</h3>
                <p>Pronouns: {user.Name}</p>
                <p>Location: {isAdmin ? user.Location : 'Admin Only'}</p>
                <p>Bio: {user.Bio}</p>
                <Link to='/updateUser'>
                    <button>Edit Profile</button>
                </Link>
            </div>
            {isAdmin && (
              <div>
              </div>
            )}
            {!isAdmin && ( 
              <div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </header>
    </div>
  );
}

export default Profile;