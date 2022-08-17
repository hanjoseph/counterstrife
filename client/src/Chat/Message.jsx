/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';

function Message({ message, user, getUserInfo }) {
  const handleUserClick = () => {
    getUserInfo(message?.userID);
  };

  return (
    <>
      {(message.username && message.userID !== user?.email) && (
        <MessageTile>
          <Img
            src={message.photoURL}
            alt={message.username}
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.onerror = null; e.target.src = 'public/icons/guest.png'; }}
            onClick={handleUserClick}
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

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    opacity: 70%;
  }

`;

const MyMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 1%;
`;

const UserJoinMsg = styled.div`
  /* align-self: center; */
  font-style: italic;
  font-size: small;
  color: #6d6d6d;
  width: 100%;
  text-align: center;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.msgusername};
  font-weight: 100px;
  margin-left: .5em;
`;
const ChatBubble = styled.div`
  margin: .5%;
  margin-top: 1%;
  margin-left: .5em;
  padding: .35em .5em .35em .5em;
  width: auto;
  max-width: 90%;
  height: auto;
  background: ${(props) => props.theme.chatbubble};
  border-radius: 5px;
  overflow-wrap: break-word;
  text-align: left;
`;

const MyBubble = styled.div`
  margin: .5%;
  margin-top: 1%;
  margin-left: .5em;
  padding: .35em .5em .35em .5em;
  width: auto;
  max-width: 90%;
  background: ${(props) => props.theme.hostring};
  color: ${(props) => props.theme.msg};
  border-radius: 5px;
  white-space: pre-line;
  text-align: right;
`;

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
