
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA762Q6Y9hT8trtouQ-o479v9YsGQCJ2hs",
    authDomain: "expensify-8f4aa.firebaseapp.com",
    databaseURL: "https://expensify-8f4aa.firebaseio.com",
    projectId: "expensify-8f4aa",
    storageBucket: "expensify-8f4aa.appspot.com",
    messagingSenderId: "128389466774",
    appId: "1:128389466774:web:d97e6079f496987ea190b7"
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {firebase, googleAuthProvider, database as default};
