import React, {useEffect, useState} from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {FirebaseAuth} from "react-firebaseui";

export const firebaseUIConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {
      provider: 'apple.com',
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    {
      defaultCountry: 'VN',
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./firebase-config.json').result.sdkConfig;

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp(firebaseConfig);


export const FirebaseUIAuthWeb = () => {

  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    const unregisterAuthObserver = firebaseApp
        .auth()
        .onAuthStateChanged((user: firebase.User |null) => {
          setIsSignedIn(!!user)
        })
    return () => {
      unregisterAuthObserver()
    }
  })

  return (
    <div>
      {isSignedIn !== undefined && !isSignedIn ? (
          <FirebaseAuth
            uiConfig={firebaseUIConfig}
            firebaseAuth={firebaseApp.auth()}
          />
      ) : null}
      {isSignedIn ? <div>
        <div>{firebaseApp.auth().currentUser?.displayName}</div>
        <a onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
      </div>: null}
    </div>
  )
}
