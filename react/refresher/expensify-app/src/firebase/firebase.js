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

  database.ref().set({
      name: 'Rado',
      age: 44,
      stressLevel: 66,
      job: {
          title: 'developer',
          company: 'Google'
      },
      location: {
          city: 'Los Angeles',
          country: 'USA'
      }
  }).then(() => {
      console.log('data is saved')
  }).catch((e) => {
      console.log('error', e)
  });

  database.ref('age').set('35');
  database.ref('location/city').set('dge')

//   database.ref('/attributes').set({
//       height: 100,
//       wight: 100
//   })

  const attr = database.ref('attributes11111');
  attr.remove()
    .then(() => {
        console.log('removed')
    })
    .catch((err) => {
        console.log('error', err)
    })

    const db = database.ref('/');
    db.update({
        stressLevel: 100,
        'job/company': 'Amazon',
        'location/city': 'Seattle'
    })