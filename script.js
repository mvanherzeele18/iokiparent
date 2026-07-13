// =====================================
// Ioki Parent
// Home
// =====================================

import {

    db,

    auth,

    collection,
    query,
    where,
    getDocs,

    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged

} from "./firebase.js";

// -------------------------------------
// Elementen
// -------------------------------------

const loginCard =
    document.getElementById("login-card");

const parentCard =
    document.getElementById("parent-card");

const loginButton =
    document.getElementById("google-login");

const logoutButton =
    document.getElementById("logout");

const addChildButton =
    document.getElementById("add-child");

const parentEmail =
    document.getElementById("parent-email");

const childrenList =
    document.getElementById("children-list");

// -------------------------------------
// Google Provider
// -------------------------------------

const provider =
    new GoogleAuthProvider();

// -------------------------------------
// Login
// -------------------------------------

loginButton.addEventListener("click", async () => {

    try{

        await signInWithPopup(

            auth,

            provider

        );

    }

    catch(error){

        console.error(error);

        alert(

            "Inloggen mislukt."

        );

    }

});

// -------------------------------------
// Logout
// -------------------------------------

logoutButton.addEventListener("click", async()=>{

    await signOut(auth);

});

// -------------------------------------
// Auth Listener
// -------------------------------------

onAuthStateChanged(

    auth,

    async(user)=>{

        if(!user){

            loginCard.classList.remove("hidden");

            parentCard.classList.add("hidden");

            return;

        }

        loginCard.classList.add("hidden");

        parentCard.classList.remove("hidden");

        parentEmail.textContent =
            user.email;

        loadChildren(user);

    }

);

// -------------------------------------
// Kinderen laden
// -------------------------------------

async function loadChildren(user){

    childrenList.innerHTML = "";

    const q = query(

        collection(db,"users"),

        where(

            "parentUid",

            "==",

            user.uid

        )

    );

    const snapshot =
        await getDocs(q);

    if(snapshot.empty){

        childrenList.innerHTML =

        `
        <p>

            Nog geen gekoppelde kinderen.

        </p>
        `;

        return;

    }

    // -------------------------------------
    // Kinderen tonen
    // -------------------------------------

    snapshot.forEach(docSnap => {

        const data =
            docSnap.data();

        const child =
            document.createElement("div");

        child.className =
            "child";

        child.innerHTML =

        `
            <div class="child-name">

                ${data.name || data.profileId}

            </div>

            <button>

                Dashboard

            </button>

        `;

        child.querySelector("button")

            .addEventListener("click",()=>{

                sessionStorage.setItem(

                    "userId",

                    docSnap.id

                );

                window.location.href =

                    "dashboard.html";

            });

        childrenList.appendChild(child);

    });

}

// -------------------------------------
// Kind koppelen
// -------------------------------------

addChildButton.addEventListener("click",()=>{

    const profileId = prompt(

        "Voer het Profile-ID van je kind in."

    );

    if(!profileId) return;

    connectChild(

        profileId
            .trim()
            .toUpperCase()

    );

});

// -------------------------------------
// Profiel zoeken
// -------------------------------------

async function connectChild(profileId){

    const q = query(

        collection(db,"users"),

        where(

            "profileId",

            "==",

            profileId

        )

    );

    const snapshot =
        await getDocs(q);

    if(snapshot.empty){

        alert(

            "Profile-ID niet gevonden."

        );

        return;

    }

    const userDoc =
        snapshot.docs[0];

    const data =
        userDoc.data();

    // ---------------------------------
    // Heeft al een ouder?
    // ---------------------------------

    if(

        data.parentUid

        &&

        data.parentUid !== auth.currentUser.uid

    ){

        alert(

            "Dit account heeft al een ouder."

        );

        return;

    }

    // ---------------------------------
    // Tijdelijk bewaren
    // ---------------------------------

    sessionStorage.setItem(

        "userId",

        userDoc.id

    );

    sessionStorage.setItem(

        "profileId",

        profileId

    );

    sessionStorage.setItem(

        "email",

        data.email

    );

    // ---------------------------------
    // Naar verificatie
    // ---------------------------------

    window.location.href =

        "verify.html";

}
