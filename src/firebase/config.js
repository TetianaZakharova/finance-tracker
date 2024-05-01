// import { initializeApp } from 'firebase/app';
// import { auth } from 'firebase/auth'

import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSpOxUqpM6w8XaDCnnIF4j74FqctEkbVA",
  authDomain: "financetracker-81392.firebaseapp.com",
  projectId: "financetracker-81392",
  storageBucket: "financetracker-81392.appspot.com",
  messagingSenderId: "674561150849",
  appId: "1:674561150849:web:2652a0cd13a1a32ac2e280"
};

// init firebase
// firebase.initializeApp(firebaseConfig)
initializeApp(firebaseConfig)

  //init firebase auth
  const projectAuth = getAuth()

  // init firestore
  const projectFirestore = getFirestore()


//   const db = getFirestore()
// export { db }

// timestamp 

const timestamp = Timestamp;

export { projectFirestore, projectAuth, timestamp }