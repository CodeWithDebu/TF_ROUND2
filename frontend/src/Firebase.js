
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD7-rEXbcOqcky8vDr0Mv63kz38RMr6L2c",
  authDomain: "django-react-2c041.firebaseapp.com",
  projectId: "django-react-2c041",
  storageBucket: "django-react-2c041.appspot.com",
  messagingSenderId: "751215742459",
  appId: "1:751215742459:web:2862d5972a11ef6f8b0f5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
}

export const signInwithoutPopup = () => {
    signInWithRedirect(auth, provider)
    .then((result) => {
        console.log(result)
        // window.open(result.url, '_blank')
    })
    .catch((error) => {
        console.log(error)
    })
}