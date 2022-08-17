// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVARI7c80MC8ZHwOD4LHaYZWl0tJZiCpw',
  authDomain: 'mvp-game-d7936.firebaseapp.com',
  projectId: 'mvp-game-d7936',
  storageBucket: 'mvp-game-d7936.appspot.com',
  messagingSenderId: '985042263370',
  appId: '1:985042263370:web:1c1737c602a9c7bde1b5b3',
  measurementId: 'G-ETJS255CE3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
