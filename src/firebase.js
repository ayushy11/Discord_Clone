import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBo1UE3QrSFrHdeMqrgpqQnbZYOB777i40",
    authDomain: "discord-clone-2cd76.firebaseapp.com",
    projectId: "discord-clone-2cd76",
    storageBucket: "discord-clone-2cd76.appspot.com",
    messagingSenderId: "516942966468",
    appId: "1:516942966468:web:f02d245ac6cd8f8288a391",
    measurementId: "G-HQ0JWDGRCP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
