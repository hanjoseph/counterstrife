import React from 'react';
import styled, { keyframes } from 'styled-components';

function About({ setShowAbout }) {
  const back = () => {
    setShowAbout(false);
  };
  return (

    <StyledForm>
      <StyledInner>
        <h1 id="about-title">Counterstrife.</h1>
        <CD>
          <Q><b>how to play:</b></Q>
          <Q>NORMAL: 7 seconds, click your own, highest count wins.</Q>
          <Q>MADNESS: 10 seconds, click yours to increment, others to decrement.</Q>
          <br />
          <Q><b>change log:</b></Q>
          <Q>v1.1: added hosting. only host can start the game.</Q>
          <Q>v1.01: added ABOUT, win only counts when 2 or more players</Q>
          <Q>v1.0: launch</Q>
        </CD>
        <P>may the fastest counter win.</P>
        <Button1 onClick={back}>back</Button1>
      </StyledInner>
    </StyledForm>
  );
}

export default About;

const Button1 = styled.button`
  background: #e7e7e7;
  opacity: 80%;
  width: 100px;
  height: 60px;
  border: .5px solid black;
  border-radius: 5px;
  margin-right: 1%;
  letter-spacing: 1px;
  &:hover{
    opacity: 60%;
    cursor: pointer;
    letter-spacing: 2px;
    transition: 0.3s;
  }
`;

const P = styled.p`
  margin: 0px;
  font-weight: 300;
  text-align: left;
`;
const Q = styled.p`
  margin: 0px;
  font-size: small;
  font-weight: 300;
  text-align: left;
`;

const CD = styled.div`
  text-align: left;
  height: 150px;
  overflow-y: auto;
`;

const CDContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: white;
  z-index: 100;
`;

const CDInner = styled.div`
  width: 95vw;
  max-width: 700px;
  height: 90vh;
  /* max-height: 700px; */
  /* min-height: 500px; */
  /* border: .5px solid black; */
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:101;
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: none;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.2);
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;

const StyledInner = styled.div`
  display: flex;
  z-index: 201;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 500px;
  max-height: 500px;
  width: 99vw;
  height: 99vw;
  overflow-y: auto;
  overflow-x: hidden;
  background: white;
  border: .5px solid black;
  border-radius: 10px;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;
