import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function GameControl({ start, socket, game }) {
  const toggle = () => {
    if (game === 'normal') {
      socket.emit('switchGame', 'madness')
    };
    if (game === 'madness') socket.emit('switchGame', 'normal');
  };

  return (
    <BottomDiv>
      <Button1 onClick={toggle} game={game}>{game.toUpperCase()}</Button1>
      <Button1 onClick={start}>
        START
      </Button1>
    </BottomDiv>
  );
}

export default GameControl;

const Button1 = styled.button`
  background: ${(props) => (props.game === 'madness' ? '#ff3939' : props.theme.buttonbg)};
  opacity: 80%;
  width: 100px;
  height: 60px;
  border: .5px solid;
  border-radius: 5px;
  margin-right: 1%;
  letter-spacing: 1px;
  transition: 0.3s;
  &:hover{
    opacity: 60%;
    cursor: pointer;
    letter-spacing: 2px;
    transition: 0.3s;
  }
`;

const BottomDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 2%;
`;
