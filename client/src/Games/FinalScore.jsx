/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import getGmailUsername from '../lib/getGmailUsername';

function FinalScore({ scores, setScoreShowing }) {
  const back = () => {
    setScoreShowing(false);
  };
  return (
    <ScoreContainer>
      <Title>final scores.</Title>
      {scores.map((score, index) => (
        <Score key={`${score.displayName}-${index}`}>
          <Left>
            <Img
              src={score.photoURL}
              alt={score.email}
              onError={(e) => { e.target.onerror = null; e.target.src = 'public/icons/guest.png'; }}
              referrerPolicy="no-referrer"
            />
            <P>{getGmailUsername(score.email)}</P>
          </Left>
          <Div>
            <Q>{score.count}</Q>
          </Div>
        </Score>
      ))}
      <Button onClick={back}>back</Button>
    </ScoreContainer>
  );
}

export default FinalScore;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
`;
const Left = styled(Div)`
  margin-left: 20px;
  justify-content: flex-start;
`;
const P = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  margin-left: 20px;
`;
const Q = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin: 0;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 30px;
`;

const Score = styled.div`
  width: 96%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index:101;
  border: .3px solid;
  margin-bottom: 2px;
`;

const Title = styled.p`
  font-weight: bold;
  letter-spacing: -1px;
  font-size: 40px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top:1%;
  width: 96%;
  overflow-y: auto;
  align-items: center;
  cursor: default;

  > button {
    margin-top: 3%;
    background-color: gainsboro !important;
    color: black;
    border: none;
  }
  > button:hover {
    opacity: 70%;
  }
`;
