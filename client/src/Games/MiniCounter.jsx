/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import getGmailUsername from '../lib/getGmailUsername';

function MiniCounter({ owner, socket, clicker }) {
  const increment = () => {
    socket.emit('clickmad', owner); // emits owner.
  };

  return (
    <CounterInner clicker={clicker} owner={owner}>
      <Left>
        <Img
          src={owner.photoURL}
          alt={owner.email}
          onError={(e) => { e.target.onerror = null; e.target.src = 'public/icons/guest.png'; }}
          referrerPolicy="no-referrer"
        />
        <P>{getGmailUsername(owner.email)}</P>
      </Left>
      <Div>
        <Q>{owner.count}</Q>
      </Div>
      <Div>
        <Button
          variant="contained"
          size="large"
          onClick={increment}
          sx={{ width: 60, height: 60 }}
        >
          smash
        </Button>
      </Div>
    </CounterInner>
  );
}

export default MiniCounter;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
`;
const Left = styled(Div)`
  margin-left: 2%;
  justify-content: flex-start;
`;
const P = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  margin-left: 2%;
`;
const Q = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin: 0;
  margin-left: 2%;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 3%;
`;

const CounterInner = styled.div`
  width: 96%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index:101;
  border: ${(props) => (props.clicker.email === props.owner.email ? 2 : 0.3)}px solid;
  margin-bottom: 2px;
`;
