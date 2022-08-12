/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';

function Users({ users, getUserInfo, winner, host }) {
  const handleClick = (e) => {
    const email = e.target.alt;
    getUserInfo(email); // sets which user to show on modal.
  };

  return (
    <UsersBar>
      <Guests>{`👤 ${users?.length}`}</Guests>
      <Icons>
        {users && (
          users.map((user, index) => (
            <Img
              key={`${user.email}-${index}`}
              src={user?.photoURL}
              alt={user.email}
              onError={(e) => { e.target.onerror = null; e.target.src = 'public/icons/guest.png'; }}
              referrerPolicy="no-referrer"
              name={user.email}
              onClick={handleClick}
              winner={winner}
              user={user}
              host={host}
            />
          ))
        )}
      </Icons>
    </UsersBar>
  );
}

const Img = styled.img`
  width: 27px;
  height: 27px;
  margin: 0.5px;
  border-radius: 50%;
  margin-right: 5px;
  border: ${(props) => ((props.host.email === props.user.email) ? 3 : 0)}px solid #efef15;
  /* border: ${(props) => ((props.host.email === props.user.email) ? 3 : 0)}px solid #5196f0; */
  &:hover {
    cursor: pointer;
    opacity: 70%;
  }

`;

const Icons = styled.div`
  margin: 1%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

`;

const Guests = styled.div`
  margin-left: 1%;
  padding: 1%;
  width: 50px;
`;

const UsersBar = styled.div`
  height: auto;
  min-height: 32px;
  width: 100%;
  /* border-top: .5px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: default;
  flex-wrap: wrap;
`;

export default Users;
