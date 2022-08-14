/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import getGmailUsername from '../lib/getGmailUsername';
import getWinPerc from '../lib/getWinPerc';
import UserInfo from '../Users/UserInfo';

function StatsTile({ user }) {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <User onClick={handleClick}>
        <Name>{getGmailUsername(user.email)}</Name>
        <Numbers>{user.wins}</Numbers>
        <Numbers>{user.games_played}</Numbers>
        <Numbers>{getWinPerc(user.wins, user.games_played)}</Numbers>
        <Numbers>{user.highest_count}</Numbers>
        <Right>{format(parseISO(user.last_login), 'MM/dd/yy')}</Right>
      </User>
      {showModal && <UserInfo userForModal={user} setShowUserModal={setShowModal} />}
    </>
  );
}

export default StatsTile;

const User = styled.div`
  width: 97%;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  &:hover {
    opacity: 90%;
    border: .1px solid black;
    cursor: pointer;
    background: #efefef;
    transition: 0.3s;
  }
  margin-top: 1%;
  overflow: none;
`;

const Name = styled.div`
  width: 32%;
  text-align: center;
`;

const Numbers = styled.div`
  width: 10%;
  text-align: center;
`;
const Right = styled.div`
  width: 18%;
  text-align: center;
`;
