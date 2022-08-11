/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import ScoreBoard from './ScoreBoard';

function Counter({
  socket, user, count, setCount, scores,
}) {
  const increment = () => {
    setCount(count + 1);
    socket.emit('click', user); // emits myself.
  };

  return (
    <CounterContainer>
      <CounterInner>
        <InnerTop>
          <Button
            variant="contained"
            size="large"
            onClick={increment}
            sx={{ width: 300, height: 200, mb: 10 }}
          >
            I N C R E M E N T
          </Button>
        </InnerTop>
        <ScoreBoard scores={scores} />
      </CounterInner>
    </CounterContainer>
  );
}

const P = styled.p`
  font-size: ${(props) => (props.count + 15)}px;
  font-weight: bold;
  color: grey;
  padding: 0;
  margin: 0;
  position: relative;

  z-index: 300;
`;

const InnerTop = styled.div`
  display: grid;
  width: 100%;
  height: auto;
  place-items: center;
  margin-bottom: 5%px;
`

const Button1 = styled.button`
  width: 200px;
  height: 100px;
  padding: 3px;
  font-size: 50px;
  text-align: center;
`;

const CounterInner = styled.div`
  width: 70%;
  min-height: 500px;
  border: .5px solid black;
  text-align: center;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  z-index:101;
`;

const CounterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: white;
  z-index: 100;
`;

export default Counter;
