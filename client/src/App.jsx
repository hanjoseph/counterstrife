import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';
import GlobalStyle from './Theme/GlobalStyle';
import { lightTheme, darkTheme } from './Theme/Themes';
import useDarkMode from './Theme/useDarkMode';
import Login from './Login';
import Home from './Home';

function App() {
  const [user, loading] = useAuthState(auth);
  const [photo, setPhoto] = useState('');
  const [theme, setTheme] = useDarkMode(); // custom hook!

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  useEffect(() => {
    setPhoto(user?.photoURL);
  }, [user]);

  if (loading) {
    return (
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyle />
          <LoadPage>
            <LoadContent>
              <p>LOADING</p>
              <Spinner id="spinner" src="public/icons/spinner.gif" />
            </LoadContent>
          </LoadPage>
        </>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyle />
        <MainDiv>
          {!user ? (
            <Login />
          )
            : (
              <HomeContainer>
                <Home photo={photo} user={user} themeToggler={themeToggler} />
              </HomeContainer>
            )}
        </MainDiv>
      </>
    </ThemeProvider>
  );
}

const HomeContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

const Spinner = styled.img`
  size: auto;
  max-height: 100px;
  background-color: transparent;
`;

const LoadPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  /* background: white; */
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default App;
