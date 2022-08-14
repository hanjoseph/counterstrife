/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';
import ChatBar from './ChatBar';

function ChatList({
  chatRoomData, user, socket, userForModal, setShowUserModal, getUserInfo,
}) {
  const chatRef = useRef();
  const [message, setMessage] = useState('');

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatRoomData]);

  return (
    <ChatRoomMain>
      <ChatContainer ref={chatRef}>
        {chatRoomData.length > 0
          && chatRoomData.map((message, index) => (
            <Message
              key={`${message?.email}-${message?.timestamp}-${index}`}
              user={user}
              message={message}
              getUserInfo={getUserInfo}
              userForModal={userForModal}
              setShowUserModal={setShowUserModal}
            />
          ))}
      </ChatContainer>
      <ChatBar user={user} socket={socket} />
    </ChatRoomMain>
  );
}

export default ChatList;

const ChatRoomMain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: .5px solid;
`;

const ChatContainer = styled.div`
  height: 350px;
  width: 100%;
  padding-top: 10px;
  overflow-y: auto;
  overflow-x: none;
  border-bottom: .5px solid;
`;
