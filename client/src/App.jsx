import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './Login';
import Home from './Home';

function App() {
  // const [showing, setShowing] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    setPhoto(user?.photoURL);
  }, [user]);

  if (loading) {
    return (
      <LoadPage>
        <LoadContent>
          <p>LOADING</p>
          <Spinner id="spinner" src="public/icons/spinner.gif" />
        </LoadContent>
      </LoadPage>
    );
  }
  return (
    <MainDiv>
      {!user ? (
        <Login />
      )
        : (
          <HomeContainer>
            <Home photo={photo} user={user} />
          </HomeContainer>
        )}
    </MainDiv>
  );
}

const HomeContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vh;
  background-color: #ffffff;
`;

const Spinner = styled.img`
  size: auto;
  max-height: 100px;
  background-color: transparent;
`;

const LoadPage = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: white;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const LoadContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default App;
