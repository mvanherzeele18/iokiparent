// =====================================
// Ioki Parent - Firebase
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {

    getFirestore,

    collection,
    query,
    where,
    getDocs,

    doc,
    getDoc,
    updateDoc

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// -------------------------------------
// Firebase Config
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

const db = getFirestore(app);

// -------------------------------------
// Exporteren
// -------------------------------------

export {

    db,

    collection,
    query,
    where,
    getDocs,

    doc,
    getDoc,
    updateDoc

};
