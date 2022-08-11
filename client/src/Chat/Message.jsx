/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';


function Message({ message, user }) {
  return (
    <>
      {(message.username && message.userID !== user?.email) && (
        <MessageTile>
          <Avatar
            src={message.photoURL}
            alt={message.username}
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.onerror = null; e.target.src = 'public/icons/guest.png'; }}
            sx={{ width: 40, height: 40 }}
          />
          <MsgRight>
            <UserName>{`${message.username}`}</UserName>
            <ChatBubble>{`${message.message}`}</ChatBubble>
          </MsgRight>
        </MessageTile>
      )}
      {(message.username && message.userID === user.email) && (
        <MyMsg>
          <MyBubble>{`${message.message}`}</MyBubble>
        </MyMsg>
      )}
      {!message.username && (
        <UserJoinMsg>
          {`${message.message}`}
        </UserJoinMsg>
      )}
    </>
  );
}

const MyMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 1%;
`

const UserJoinMsg = styled.div`
  /* align-self: center; */
  font-style: italic;
  font-size: small;
  color: #6d6d6d;
  width: 100%;
  text-align: center;
`

const UserName = styled.div`
  color: darkslategrey;
  font-weight: 100px;
  margin-left: .5em;
`
const ChatBubble = styled.div`
  margin: .5%;
  margin-top: 1%;
  margin-left: .5em;
  padding: .35em .5em .35em .5em;
  width: auto;
  /* max-width: 100px; */
  background: lightgrey;
  border-radius: 5px;
  white-space: nowrap;
  text-align: center;
`
const MyBubble = styled.div`
  margin: .5%;
  margin-top: 1%;
  margin-left: .5em;
  padding: .35em .5em .35em .5em;
  width: auto;
  /* max-width: 100px; */
  background: #b39bff;
  border-radius: 5px;
  white-space: nowrap;
  text-align: center;
`

const MsgRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MessageTile = styled.div`
  margin-bottom: .5%;
  display:flex;
  flex-direction: row;
  width: 95%;
  padding-left: .5%;
  margin-left: 1%;
  margin-top: .5%;

`;

export default Message;