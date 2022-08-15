/* eslint-disable react/prop-types */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Avatar } from '@mui/material';
import { formatDistanceToNow, parseISO } from 'date-fns';
import getGmailUsername from '../lib/getGmailUsername';
import getWinPerc from '../lib/getWinPerc';

function UserInfo({ userForModal, setShowUserModal }) {
  const handleBgClick = (e) => {
    if (e.target.id === 'userinfo-bg') {
      setShowUserModal(false);
    }
  };

  const goBack = () => {
    setShowUserModal(false);
  };

  return (
    <StyledForm onClick={handleBgClick} id="userinfo-bg">
      <StyledInner>
        <UserInfoInner>
          <Left>
            <Avatar
              src={userForModal.photoURL}
              alt={userForModal?.displayName}
              referrerPolicy="no-referrer"
              sx={{ width: 70, height: 70 }}
            />
            <UsernameP>{`${getGmailUsername(userForModal.email)}.`}</UsernameP>
          </Left>
          <Right>
            <Stats>{userForModal.wins}<Sp>wins</Sp></Stats>
            <Stats>{userForModal.games_played}<Sp>games played</Sp></Stats>
            <Stats>{getWinPerc(userForModal.wins, userForModal.games_played)}<Sd>%</Sd><Sp>win rate</Sp></Stats>
            <Stats>{userForModal.highest_count}<Sp>high score</Sp></Stats>
            <small>last active:</small>
            <small><em>{`${formatDistanceToNow(parseISO(userForModal.last_login))} ago`}</em></small>
          </Right>
        </UserInfoInner>
        <ButtonDiv>
          <Button1 onClick={goBack}>back</Button1>
        </ButtonDiv>
      </StyledInner>
    </StyledForm>
  );
}

export default UserInfo;

const ButtonDiv = styled.div`
  display: grid;
  place-items: center;
`;

const Button1 = styled.button`
  background: ${(props) => props.theme.buttonbg};
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
const Stats = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -1px;
  margin-bottom: 4%;
`;
const Sp = styled.span`
  margin: 0;
  margin-left: 10px;
  font-size: 14px;
  font-weight: normal;
`;
const Sd = styled.span`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
`;
const Right = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  /* padding-left: 25px; */
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  /* text-align: center; */
`;

const UsernameP = styled.p`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: -2px;
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Left = styled.div`
  height: 200px;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: .2px solid;
  margin-right: 25px;
`;

const UserInfoInner = styled.div`
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-evenly;
  width: 100%;
  height: 70%;
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
  overflow: auto;
  background-color: ${(props) => props.theme.bgmodal1};
  background-color: ${(props) => props.theme.bgmodal2};
  animation-name: ${fadeIn};
  animation-duration: 0.5s;

`;

const StyledInner = styled.div`
  display: flex;
  z-index: 201;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 90vw;
  height: 90vw;
  max-width: 400px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${(props) => props.theme.background};
  border: .5px solid;
  border-radius: 10px;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;

`;
