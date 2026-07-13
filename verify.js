// =====================================
// Ioki Parent
// Verify
// =====================================

import {

    db,

    doc,
    getDoc

} from "./firebase.js";

const status =
    document.getElementById("status");

// -------------------------------------
// Gegevens ophalen
// -------------------------------------

const userId =
    sessionStorage.getItem("userId");

if(!userId){

    window.location.href =
        "index.html";

}

// -------------------------------------
// Controle starten
// -------------------------------------

checkVerification();

setInterval(

    checkVerification,

    2000

);

// -------------------------------------
// Firestore controleren
// -------------------------------------

async function checkVerification(){

    try{

        const snapshot =

            await getDoc(

                doc(db,"users",userId)

            );

        if(!snapshot.exists()){

            status.textContent =

                "Profiel bestaat niet.";

            return;

        }

        const data =
            snapshot.data();

        if(data.parentVerified){

            window.location.href =

                "dashboard.html";

            return;

        }

        status.textContent =

            "We wachten op de bevestiging vanuit het e-mailadres van het kind...";

    }

    catch(error){

        console.error(error);

        status.textContent =

            "Kan geen verbinding maken met Firebase.";

    }

}
