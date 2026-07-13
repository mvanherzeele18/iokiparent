// =====================================
// Ioki Parent
// Confirm
// =====================================

import {

    db,

    doc,
    getDoc,
    updateDoc

} from "./firebase.js";

const title =
    document.getElementById("title");

const message =
    document.getElementById("message");

// -------------------------------------
// UID uit URL halen
// -------------------------------------

const params =

    new URLSearchParams(

        window.location.search

    );

const uid =
    params.get("uid");

// -------------------------------------
// Geen UID
// -------------------------------------

if(!uid){

    title.textContent =

        "Ongeldige link";

    message.textContent =

        "Deze bevestigingslink is ongeldig.";

    throw new Error("Geen uid.");

}

// -------------------------------------
// Bevestigen
// -------------------------------------

confirmParent();

async function confirmParent(){

    try{

        const userRef =

            doc(

                db,

                "users",

                uid

            );

        const snapshot =

            await getDoc(

                userRef

            );

        if(!snapshot.exists()){

            title.textContent =

                "Profiel niet gevonden";

            message.textContent =

                "Dit profiel bestaat niet.";

            return;

        }

        await updateDoc(

            userRef,

            {

                parentUid = auth.currentUser.uid,
                emailParent = auth.currentUser.email,
                parentVerified = true

            }

        );

        title.textContent =

            "Gelukt!";

        message.textContent =

            "De ouderaccount is succesvol gekoppeld. Je mag dit venster sluiten.";

    }

    catch(error){

        console.error(error);

        title.textContent =

            "Er ging iets mis";

        message.textContent =

            "Probeer het later opnieuw.";

    }

}
