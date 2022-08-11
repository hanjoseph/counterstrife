/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';

function Header({
  user, photo, showMenu, setShowMenu,
}) {
  const toggleMenu = () => {
    showMenu ? setShowMenu(false)
      : setShowMenu(true);
  };
  return (
    <HeaderContainer>
      <Title onClick={toggleMenu}>Counterstrife.</Title>
      <HeaderRight>
        {photo?.length > 0
        && <Avatar id="header-icon" onClick={toggleMenu} src={photo} alt={user?.displayName} referrerPolicy="no-referrer" />}
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const P = styled.p`
  font-weight: 200;
  font-size: small;
  margin-right: 1%;
  /* margin-bottom: 2%; */

`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;
  width: 30%;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: .5px solid black;
  cursor: default;
`;

const Title = styled.div`
  font-family: FuturaBCO;
  font-size: 35px;
  letter-spacing: -1.5px;
  margin-left: 2%;
  margin-top:2%;
  display: flex;
  align-items: bottom;
  &: hover{
    opacity: 70%;
    cursor: pointer;
  }
`;

const Button1 = styled.button`
  height: 50px;
  width: 100px;
  margin-top: 3%;
  text-align: center;
  font-size: 20px;
  &: hover{
    opacity: 70%;
    cursor: pointer;
  }
`;