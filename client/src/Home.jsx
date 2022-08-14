/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import socketIOClient from 'socket.io-client';
import { auth } from './lib/firebase';
import Header from './Header';
import ChatList from './Chat/ChatList';
import Menu from './Menu/Menu';
import Counter from './Games/Counter';
import CounterMad from './Games/CounterMad';
import GameControl from './Games/GameControl';
import FinalScore from './Games/FinalScore';
import Users from './Users/Users';
import UserInfo from './Users/UserInfo';

const ENDPOINT = 'http://127.0.0.1:3000';

const socket = socketIOClient(ENDPOINT);

function Home({ photo, user }) {
  const [chatRoomData, setChatRoomData] = useState([]);
  const [gameShowing, setGameShowing] = useState(false);
  const [count, setCount] = useState(0);
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [users, setUsers] = useState([]);
  const [scoreShowing, setScoreShowing] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userForModal, setUserForModal] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [game, setGame] = useState('');
  const [showMenu, setShowMenu] = useState(true);
  const [host, setHost] = useState({});

  const checkinUser = (user_obj) => {
    axios.post('/users', user_obj)
      .then((response) => {
        // console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((err) => console.log(err, 'error checking in user'));
  };

  useEffect(() => {
    const userObj = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      last_login: new Date(),
    };
    checkinUser(userObj);
  }, []);

  useEffect(() => {
    socket.on('getChatRoomData', (data) => {
      setChatRoomData(data);
    });
    socket.on('startcountdown', () => {
      setCountdown(3);
    });
    socket.on('gameStart', () => {
      setGameShowing(true);
      setCount(0);
    });
    socket.on('gameEnd', () => {
      setGameShowing(false);
      setScoreShowing(true);
    });
    socket.on('getScores', (data) => {
      const sorted = Object.values(data).sort((score1, score2) => score2.count - score1.count);
      setScores(sorted);
    });
    socket.on('getConnectedClients', (data) => {
      setUsers(Object.values(data));
    });
    socket.on('getGame', (data) => {
      setGame(data);
    });
    socket.on('getHost', (data) => {
      setHost(data);
    });
  }, [socket]);

  const updateWin = (user_obj) => {
    axios.put('/userswin', user_obj)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => console.log('error', err));
  };
  const updateGamesPlayed = (user_obj) => {
    axios.put('/usersgame', user_obj)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => console.log('error', err));
  };

  const updateHighScore = (user_obj) => {
    axios.put('/usersscore', user_obj)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => console.log('error', err));
  };

  // when game ends

  useEffect(() => {
    if (!gameShowing && scoreShowing) {
      const userScoreEmail = { email: userInfo.email, score: count };
      // update high score for EVERYONe, if game is not madness.
      if (game !== 'madness') updateHighScore(userScoreEmail);
      // update win for winner, if there's more than 1 person in play.
      if (scores.length > 1) {
        if (winner.email === userInfo.email) {
          updateWin(userInfo);
          alert('congrats YOU are the winner');
        } else if (count > 0) {
          updateGamesPlayed(userInfo);
        }
      }
    }
  }, [gameShowing]);

  useEffect(() => {
    if (scores.length > 1) {
      setWinner(scores[0]);
    } // only set winner if more than 1 person.
  }, [scores]);

  useEffect(() => {
    socket.emit('load');
  }, []);

  useEffect(() => { // right after log in.
    const userObject = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    };
    socket.emit('userEnteredRoom', userObject);
  }, []);

  const signOut = () => {
    const result = confirm('signing out?');
    if (result) {
      auth.signOut()
        .then(() => {
          alert('sign out successful');
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    }
  };

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const resetUsers = () => {
    const temp = [];
    users.forEach((connectedUser) => {
      const temps = connectedUser;
      temps.count = 0;
      temp.push(temps);
    });
    setUsers(temp);
  };
  const emails = [
    'central21@gmail.com',
    'josephkhhan@gmail.com',
    'joemelohan@gmail.com',
    'joemelohan1@gmail.com',
  ];
  // game control
  const start = () => {
    if (userInfo.email === host.email || emails.indexOf(userInfo.email) !== -1 ) {  // only if you are the host. or if you are me :)
      resetUsers();
      socket.emit('startcountdown');
      setTimeout(() => {
        socket.emit('gameStart');
        console.log('game starts in 3');
      }, 3000);
      setCount(0);
      setCountdown(3);
      let time = 10000;
      if (game === 'madness') time = 13000;
      setTimeout(() => {
        console.log('game should end in', time / 1000);
        socket.emit('gameEnd');
      }, time);
    } else {
      alert('only the host can start the game.');
    }
  };

  const getUserInfo = (email) => {
    axios.get(`/users?email=${email}`)
      .then((response) => {
        console.log(response.data);
        setUserForModal(response.data);
        setShowUserModal(true);
      })
      .catch((err) => console.log(err));
  };

  // render below

  if (gameShowing && game === 'normal') {
    return (
      <Counter
        socket={socket}
        user={user}
        count={count}
        setCount={setCount}
        scores={scores}
      />

    );
  }
  if (gameShowing && game === 'madness') {
    return (
      <CounterMad
        socket={socket}
        user={user}
        count={count}
        setCount={setCount}
        scores={scores}
        users={users}
      />
    );
  }
  if (countdown > 0) {
    return (
      <CDContainer>
        <CDInner>
          <CD>{countdown}</CD>
        </CDInner>
      </CDContainer>
    );
  }
  if (scoreShowing) {
    return (
      <CDContainer>
        <CDInner>
          <FinalScore scores={scores} setScoreShowing={setScoreShowing} />
        </CDInner>
      </CDContainer>
    );
  }
  return (
    <HomeDiv>
      <Header user={user} photo={photo} signOut={signOut} showMenu={showMenu} setShowMenu={setShowMenu} />
      <Menu showMenu={showMenu} signOut={signOut} />
      <Users users={users} host={host} getUserInfo={getUserInfo} winner={winner} />
      {showUserModal
        && (<UserInfo userForModal={userForModal} setShowUserModal={setShowUserModal} />)}
      <ChatList
        chatRoomData={chatRoomData}
        user={user}
        socket={socket}
        userForModal={userForModal}
        setShowUserModal={setShowUserModal}
        getUserInfo={getUserInfo}
      />
      <GameControl
        start={start}
        socket={socket}
        game={game}
        setGame={setGame}
      />
    </HomeDiv>
  );
}

export default Home;

const Button1 = styled.button`
  background: #e7e7e7;
  opacity: 80%;
  width: 60px;
  height: 30px;
  border: .5px solid black;
  border-radius: 5px;
  margin-right: 1%;
  &:hover{
    opacity: 60%;
    cursor: pointer;
    letter-spacing: 2px;
    transition: 0.3s;
  }
`;
const CDContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: white;
  z-index: 100;
`;

const fadeIn = keyframes`
  0% { opacity: 0.3; }
  33% { opacity: 1; }
  34% { opacity: 0.3; }
  66% { opacity: 1; }
  67% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const CD = styled.p`
  font-size: 10em;
  font-weight: bold;
  animation-name: ${fadeIn};
  animation-duration: 3s;
`;

const CDInner = styled.div`
  width: 95vw;
  max-width: 700px;
  height: 90vh;
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:101;
`;

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 95vw;
  height: 80vh;
  max-width: 700px;
  height: auto;
  border: .5px solid black;
  border-radius: 5px;
`;
