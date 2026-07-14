// =====================================
// Ioki Parent - Dashboard
// =====================================

import {

    db,
    auth,

    doc,
    getDoc,

    onAuthStateChanged

} from "./firebase.js";

// -------------------------------------
// Elementen
// -------------------------------------

const childName =
    document.getElementById("child-name");

const profileId =
    document.getElementById("profile-id");

const dailyLimit =
    document.getElementById("daily-limit");

const timeButton =
    document.getElementById("time-button");

const gamesButton =
    document.getElementById("games-button");

const infoButton =
    document.getElementById("info-button");

const contactButton =
    document.getElementById("contact-button");

const backButton =
    document.getElementById("back-button");

// -------------------------------------
// Ingelogde gebruiker
// -------------------------------------

let currentUser = null;

onAuthStateChanged(auth, async user => {

    if(!user){

        window.location.href = "index.html";
        return;

    }

    currentUser = user;

    loadChild();

});

// -------------------------------------
// Kind laden
// -------------------------------------

async function loadChild(){

    const userId =
        sessionStorage.getItem("userId");

    if(!userId){

        window.location.href = "index.html";
        return;

    }

    try{

        const snapshot =

            await getDoc(

                doc(db,"users",userId)

            );

        if(!snapshot.exists()){

            alert("Kind niet gevonden.");

            window.location.href = "index.html";

            return;

        }

        const data =
            snapshot.data();

        // -----------------------------
        // Extra beveiliging
        // -----------------------------

        if(data.parentUid !== currentUser.uid){

            alert(

                "Je hebt geen toegang tot dit profiel."

            );

            window.location.href = "index.html";

            return;

        }

        // -----------------------------
        // Gegevens tonen
        // -----------------------------

        childName.textContent =

            data.name ||

            "Naam onbekend";

        profileId.textContent =

            data.profileId;

        if(data.dailyLimit === -1){
        
            dailyLimit.textContent = "Onbeperkt";
        
        }
        else{
        
            dailyLimit.textContent =
                (data.dailyLimit ?? 60) + " minuten";
        
        }

    }

    catch(error){

        console.error(error);

        alert(

            "Kon gegevens niet laden."

        );

    }

}

// -------------------------------------
// Knoppen
// -------------------------------------

timeButton.addEventListener("click",()=>{

    window.location.href =

        "time.html";

});

gamesButton.addEventListener("click",()=>{

    window.location.href =

        "games.html";

});

infoButton.addEventListener("click",()=>{

    window.location.href =

        "info.html";

});

contactButton.addEventListener("click",()=>{

    window.open(

        "https://docs.google.com/forms/d/e/1FAIpQLSdGwtQ4zVSJop5u3Max_OO9nN5Jo0xFYAaskSFdGKM-78VB_A/viewform?usp=header",

        "_blank"

    );

});

backButton.addEventListener("click",()=>{

    window.location.href =

        "index.html";

});
