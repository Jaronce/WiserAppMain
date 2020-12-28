import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDbo0k30pZhD7fKvNmeONGktSMErAb3sWA",
    authDomain: "wiser-platform.firebaseapp.com",
    databaseURL: "https://wiser-platform.firebaseio.com",
    projectId: "wiser-platform",
    storageBucket: "wiser-platform.appspot.com",
    messagingSenderId: "954950128219",
    appId: "1:954950128219:web:421e16c3ae0dcf8152257e",
    measurementId: "G-T3D7C5LXPG"
  };

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase