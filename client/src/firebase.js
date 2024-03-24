// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-8fb6c.firebaseapp.com',
  projectId: 'mern-blog-8fb6c',
  storageBucket: 'mern-blog-8fb6c.appspot.com',
  messagingSenderId: '661289596308',
  appId: '1:661289596308:web:f1c62870f4646ef22d4b81'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

