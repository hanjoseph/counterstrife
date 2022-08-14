/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import MiniCounter from './MiniCounter';

function CounterMad({
  socket, user, users,
}) {
  return (
    <CounterContainer>
      <CounterInner>
        <small><em>click on other buttons to decrement!</em></small>
        {users.map((item, index) => <MiniCounter key={`${item.socket}-${index}`} owner={item} socket={socket} clicker={user} />)}
      </CounterInner>
    </CounterContainer>
  );
}

export default CounterMad;

const CounterInner = styled.div`
  width: 95vw;
  max-width: 700px
  min-height: 500px;
  text-align: center;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  z-index:101;
`;

const CounterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background: white;
  z-index: 100;
`;
