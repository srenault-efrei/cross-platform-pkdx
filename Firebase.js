import React from 'react';
import * as firebase from "firebase";
import { View } from 'react-native';


let firebaseConfig = {
    apiKey: "AIzaSyAa8sMWyLqwuY3eTVyDumn-IJCvZdvGdZI",
    authDomain: "cross-platform-pkdx-4583f.firebaseapp.com",
    databaseURL: "https://cross-platform-pkdx-4583f.firebaseio.com",
    projectId: "cross-platform-pkdx-4583f",
    storageBucket: "cross-platform-pkdx-4583f.appspot.com",
    messagingSenderId: "1028059968366",
    appId: "1:1028059968366:web:216a0feccec26170bf877f",
    measurementId: "G-NGDZ10LSDW"
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);



export default Firebase;
