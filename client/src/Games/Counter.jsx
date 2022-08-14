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

const InnerTop = styled.div`
  display: grid;
  width: 100%;
  height: auto;
  place-items: center;
  margin-bottom: 5%px;
`;

const CounterInner = styled.div`
  width: 95vw;
  max-width: 700px;
  min-height: 500px;
  text-align: center;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  z-index:101;
`;

const CounterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  /* background: white; */
  z-index: 100;
`;

export default Counter;
