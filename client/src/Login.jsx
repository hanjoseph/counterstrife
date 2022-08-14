/* eslint-disable no-alert */
import React from 'react';
import styled from 'styled-components';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './lib/firebase';

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <div>
          <h1 id="login-title">Counterstrife.</h1>
          <p id="subtitle">are you tired of counters yet?</p>
        </div>
        <Button1 onClick={signIn}>
          Sign in with Google.
        </Button1>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const Button1 = styled.button`
    margin-top: 50px;
    padding: 5%;
    font-size: 16px;
    font-weight: 100;
    border-radius: 5px;
    background: #00a941;
    border: 1px solid transparent;
    width: 50%;
    /* color: #ffffff; */
    &:hover{
    opacity: 70%;
    cursor: pointer;
  }
`;
const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  /* background-color: #ffffff; */
`;

const LoginInnerContainer = styled.div`
  padding: 50px;
  height: 70vh;
  width: 70vw;
  max-width: 500px;
  max-height: 500px;
  text-align: center;
  /* background-color: white; */
  border-radius: 10px;
  border: .5px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

`;
