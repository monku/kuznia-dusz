
import * as types from './actions/types'
import firebase from './firebase'
import fbase from 'firebase'
require('firebase/firestore')

// START POC code

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("UID:", user.uid)
      localStorage.setItem('authId', user.uid)
  
      const firestore = firebase.firestore();
      let fetchId = '0EusMqJ3veoyImGhrET3'
      firestore.collection('games').doc(fetchId)
      .onSnapshot((doc)=>{
        console.log(fetchId,doc.data())
        // doc.docChanges.forEach(function (change) {
        //   if (change.type === "added") {
        //     console.log("New doc: ", change.doc.data());
        //   }
        //   if (change.type === "modified") {
        //     console.log("Modified doc: ", change.doc.data());
        //   }
        //   if (change.type === "removed") {
        //     console.log("Removed doc: ", change.doc.data());
        //   }
        // });
    })
      firestore.collection('games/0EusMqJ3veoyImGhrET3/characters')
      .onSnapshot((doc)=>{
        doc.docChanges.forEach(function (change) {
          if (change.type === "added") {
            console.log("New doc: ", change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified doc: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed doc: ", change.doc.data());
          }
        });
    })
      firestore.collection("games")
      // .where('owners.'+user.uid, '==','ADMIN')
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot)
        querySnapshot.docChanges.forEach(function (change) {
          if (change.type === "added") {
            console.log("New doc: ", change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified doc: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed doc: ", change.doc.data());
          }
          store.dispatch({
            type: types.SAVE_GAME,
            payload: {
              ...change.doc.data(),
              id: change.doc.id
            }
          });
        });
      }, (error)=>{
        console.log("on snapshot error: ", error)
      });
    } else {
      console.log("No logged in user");
      let provider = new fbase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
  
    }
  
    // querySnapshot.forEach(function(doc) {
  
    //     console.log(doc.id, " => ", doc.data());
    // });
  })
  // .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  // });
  
  // END POC code