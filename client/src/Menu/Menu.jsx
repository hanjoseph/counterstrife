import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { parseISO } from 'date-fns';
import Stats from './Stats';
import About from './About';
import getWinPerc from '../lib/getWinPerc';

function Menu({ showMenu, signOut, themeToggler }) {
  const [showStats, setShowStats] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  const getAllUsers = () => {
    axios.get('allusers')
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => console.log('error getting users', err));
  };

  const handleClick = () => {
    getAllUsers();
    setShowStats(true);
  };

  const about = () => {
    setShowAbout(true);
  };

  const sort = (sortMethod) => {
    if (sortMethod === 'wp') {
      setAllUsers([...(allUsers.sort((user1, user2) => (
        getWinPerc(user2.wins, user2.games_played) - getWinPerc(user1.wins, user1.games_played))))]);
    } else if (sortMethod === 'last_login') {
      setAllUsers([...(allUsers.sort((user1, user2) => (
        parseISO(user2.last_login) - parseISO(user1.last_login)
      )))]);
    } else {
      setAllUsers([...(allUsers.sort((user1, user2) => user2[sortMethod] - user1[sortMethod]))]);
    }
  };

  return (
    <MenuBar showMenu={showMenu}>
      <Inner><P showMenu={showMenu} onClick={handleClick}>STATS</P></Inner>
      <Middle><P showMenu={showMenu} onClick={about}>ABOUT</P></Middle>
      <Inner><P showMenu={showMenu} onClick={themeToggler}>THEME</P></Inner>
      {showStats && <Stats allUsers={allUsers} setShowStats={setShowStats} sort={sort} setAllUsers={setAllUsers} />}
      {showAbout && <About setShowAbout={setShowAbout} />}
    </MenuBar>
  );
}

export default Menu;

const P = styled.p`
  padding: 0;
  margin: 0;
  font-size: ${(props) => (props.showMenu ? 12 : 0)}px;
  &:hover{
    opacity: 70%;
    cursor: pointer;
    letter-spacing: 4px;
    transition: 0.3s;
  }
  transition: 0.6s;
`;
const Inner = styled.div`
  width: 33.33%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  letter-spacing: 2px;
  font-size: small;
`;

const Middle = styled(Inner)`
  border-left: 0.5px solid black;
  border-right: .5px solid black;
`;

const MenuBar = styled.div`
  height: ${(props) => (props.showMenu ? 35 : 0)}px;
  width: 100%;
  /* border-top: .5px solid black; */
  border-bottom: ${(props) => (props.showMenu ? 0.5 : 0)}px solid black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: default;
  transition: .5s;
`;
