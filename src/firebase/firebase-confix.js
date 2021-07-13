import firebases from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCEvuConUcmHV9g05YqbgmfBYAVGzDCzVk",
  authDomain: "toeic-seb.firebaseapp.com",
  databaseURL: "https://toeic-seb.firebaseio.com",
  projectId: "toeic-seb",
  storageBucket: "toeic-seb.appspot.com",
  messagingSenderId: "457126058033",
  appId: "1:457126058033:web:51a8057ef3cae8561bdd10",
  measurementId: "G-G639GXRM9D"
}

firebases.initializeApp(firebaseConfig);

export const firebase = firebases;