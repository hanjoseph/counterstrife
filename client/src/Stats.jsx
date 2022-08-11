import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatsTile from './StatsTile';

function Stats({ allUsers, setShowStats, sort, setAllUsers }) {
  const handleBgClick = (e) => {
    if (e.target.id === 'stats-bg') {
      setShowStats(false);
    }
  };

  const goBack = () => {
    setShowStats(false);
  };

  const handleSort = (e) => {
    const method = e.target.id.slice(2);
    sort(method);
  };

  return (
    <StyledForm id="stats-bg" onClick={handleBgClick}>
      <StyledInner>
        <P>Stats.</P>
        <UsersContainer>
          <StatsHeader>
            <Name onClick={handleSort} id="s-email">User</Name>
            <Numbers onClick={handleSort} id="s-wins">Wins</Numbers>
            <Numbers onClick={handleSort} id="s-games_played">Games</Numbers>
            <Numbers onClick={handleSort} id="s-wp">Win%</Numbers>
            <Numbers onClick={handleSort} id="s-highest_count">Best</Numbers>
            <Right onClick={handleSort} id="s-last_login">last login</Right>
          </StatsHeader>
          {allUsers.map((user) => <StatsTile key={user._id} user={user} />)}
        </UsersContainer>
        <Button1 onClick={goBack}>back</Button1>
      </StyledInner>
    </StyledForm>
  );
}

export default Stats;

const Input = styled.textarea`
  width: 90%;
  height: 20px;
  font: inherit;
  font-style: italic;
  background: transparent;
  resize: none;
  border: none;
  border-bottom: .2px solid black;
  margin-left: 1%;
  outline: none;
  opacity: 80%;
  padding: none;
  &:focus{
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
`;

const Button1 = styled.button`
  background: #e7e7e7;
  opacity: 80%;
  width: 60px;
  height: 30px;
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

const StatsHeader = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 2%;
`;

const P = styled.p`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: -2px;
  margin: 0px;
`;

const UsersContainer = styled.div`
  width: 90%;
  height: 350px;
  overflow-y: auto;
  overflow-x: none;
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
`;

const StyledInner = styled.div`
  display: flex;
  z-index: 201;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 500px;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: white;
  border: .5px solid black;
  border-radius: 10px;
`;

const Name = styled.div`
  width: 20%;
  text-align: center;
  &:hover{
    opacity: 60%;
    cursor: pointer;
    background: #efefef;
    transition: 0.3s;
  }
`;

const Numbers = styled.div`
  width: 10%;
  text-align: center;
  &:hover{
    opacity: 60%;
    cursor: pointer;
    background: #efefef;
    transition: 0.3s;
  }
`;
const Right = styled.div`
  width: 15%;
  text-align: center;
  &:hover{
    opacity: 60%;
    cursor: pointer;
    background: #efefef;
    transition: 0.3s;
  }
`;
