import React, { useState, useRef } from 'react';
import styled from 'styled-components';

function ChatBar({ user, socket }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const val = e.target.value;
    if (name === 'message') setMessage(val);
  };

  const sendMessage = () => {
    const messageObj = {
      username: user.displayName,
      message,
      timestamp: new Date(),
      userID: user.email,
      photoURL: user.photoURL,
    };
    if (message.length > 0) {
      socket.emit('SendMessage', messageObj);
    }
    inputRef.current.value = '';
    inputRef.current.select();
    setMessage('');
  };
  const enter = (e) => {
    if (e.key === 'Enter') {
      const messageObj = {
        username: user.displayName,
        message,
        timestamp: new Date(),
        userID: user.email,
        photoURL: user.photoURL,
      };
      if (message.length > 0) {
        socket.emit('SendMessage', messageObj);
      }
      e.preventDefault();
      e.target.select();
      e.target.value = '';
      setMessage('');
    }
  };
  return (
    <ChatBarDiv>
      <Input onChange={handleChange} ref={inputRef} placeholder="say something" name="message" onKeyPress={enter} />
      <Button message={message} onClick={sendMessage}>send</Button>
    </ChatBarDiv>
  );
}

export default ChatBar;

const Button = styled.button`
  background: #f0f0f0;
  opacity: ${(props) => (props.message.length > 0 ? 80 : 0)}%;
  width: 60px;
  height: 30px;
  border: .5px solid;
  border-radius: 5px;
  margin-right: 1%;
  &:hover{
    opacity: ${(props) => (props.message.length > 0 ? 60 : 0)}%;
    cursor: ${(props) => (props.message.length > 0 ? 'pointer' : 'default')};
    letter-spacing: 2px;
    transition: 0.3s;
  }
  transition: 0.3s;
`;

const Input = styled.textarea`
  width: 100%;
  font: inherit;
  background: transparent;
  resize:none;
  border: none;
  margin-left: 1%;
  outline: none;
  color: ${(props) => props.theme.text};
  &:focus{
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
`

const ChatBarDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
`;
