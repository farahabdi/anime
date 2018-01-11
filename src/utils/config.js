import firebase from 'firebase'
import firestore from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCm8_EYjMmFotdHVS3jUtBfxsZI_RoWwFg",
    authDomain: "tomb-raider-app-34101.firebaseapp.com",
    databaseURL: "https://tomb-raider-app-34101.firebaseio.com",
    projectId: "tomb-raider-app-34101",
    storageBucket: "",
    messagingSenderId: "1086395338760"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth()
export const db = firebase.firestore()
