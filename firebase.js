// =====================================
// Firebase
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// -------------------------------------
// Config
// -------------------------------------

const firebaseConfig = {
    apiKey: "AIzaSyCJFP0Bo2f3CUCs_YmrT5wWUFzLbnBIXVk",
    authDomain: "iokigames.firebaseapp.com",
    projectId: "iokigames",
    storageBucket: "iokigames.firebasestorage.app",
    messagingSenderId: "801522202722",
    appId: "1:801522202722:web:cd78c84f55858313af393b",
    measurementId: "G-NPJZSDCGBN"
};

// -------------------------------------
// Firebase starten
// -------------------------------------

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();

// -------------------------------------
// Exports
// -------------------------------------

export {

    signInWithPopup,
    signOut,
    onAuthStateChanged,

    doc,
    getDoc,
    setDoc,
    updateDoc,

    serverTimestamp

};
