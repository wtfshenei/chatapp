import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDq6--7v5ISU77foZNkfRbDUseRKM4BcQo",
    authDomain: "fftchatapp.firebaseapp.com",
    projectId: "fftchatapp",
    storageBucket: "fftchatapp.appspot.com",
    messagingSenderId: "640047362339",
    appId: "1:640047362339:web:f60e57ffa57d5433c0dc96"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()