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

  export {firebase, database as default};

//   const onValueChange = database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });

// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

//   database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     });

//   database.ref('expenses').push({
//       description: 'Rent',
//       amount: '45656',
//       createdAt: 0
//   });

//   database.ref('expenses').push({
//       description: 'Mortgaage',
//       amount: 4456,
//       createdAt: 1
//   });

//   database.ref('expenses').push({
//     description: 'bored',
//     amount: 454566,
//     createdAt:34
//   });


//   database.ref('notes/-M-xBeZmTWBzyW_jkv5l').remove()

//   database.ref('notes').push({
//       title: 'Course topics',
//       body: 'react native, angular, python'
//   });


//   const firebasseNotes = {
//       notes: {
//           '12': {
//             title: 'first note',
//             body: 'this is my note'
//           }, 
//           '1234': {
//             title: 'another note',
//             body: 'this is my note'
//           }
//       }
//   }

//   const notes = [{
//       id: '12',
//       title: 'first note',
//       body: 'this is my note'
//   }, {
//       id: '3435',
//       title: 'another note',
//       body: 'this is my note'
//   }];

//   database.ref('notes').set(notes);

//   database.ref().on('value', (snapshot) => {
//       const val = snapshot.val();
//       console.log(`${val.name} is a ${val.job.title} at ${val.job.company }`)
//   })

//   setTimeout(() => {
//       database.ref('job/company').set('Amazon')
//   }, (3000));

//   const onValueChange = database.ref().on('value', (snapshot) => {
//         console.log(snapshot.val());
//     }, (e) => {
//         console.log('error with data fetching', e)
//     });
    
//     setTimeout(() => {
//         database.ref('age').set(29);
//     }, 3500);

//     setTimeout(() => {
//         database.ref().off('value', onValueChange);
//     }, 7000);

//     setTimeout(() => {
//         database.ref('age').set(30);
//     }, 10500);

//   database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('error fetching data', e)
//     })

//   database.ref().set({
//       name: 'Rado',
//       age: 44,
//       stressLevel: 66,
//       job: {
//           title: 'developer',
//           company: 'Google'
//       },
//       location: {
//           city: 'Los Angeles',
//           country: 'USA'
//       }
//   }).then(() => {
//       console.log('data is saved')
//   }).catch((e) => {
//       console.log('error', e)
//   });

//   database.ref('age').set('35');
//   database.ref('location/city').set('dge')

// //   database.ref('/attributes').set({
// //       height: 100,
// //       wight: 100
// //   })

//   const attr = database.ref('attributes11111');
//   attr.remove()
//     .then(() => {
//         console.log('removed')
//     })
//     .catch((err) => {
//         console.log('error', err)
//     })

//     const db = database.ref('/');
//     db.update({
//         stressLevel: 100,
//         'job/company': 'Amazon',
//         'location/city': 'Seattle'
//     })