// =====================================
// Ioki Parent - Confirm
// =====================================

import {

    db,
    auth,

    doc,
    getDoc,
    updateDoc,

    onAuthStateChanged

} from "./firebase.js";

// -------------------------------------
// Elementen
// -------------------------------------

const title =
    document.getElementById("title");

const message =
    document.getElementById("message");

// -------------------------------------
// UID uit URL
// -------------------------------------

const params =
    new URLSearchParams(window.location.search);

const childUid =
    params.get("uid");

if(!childUid){

    title.textContent =
        "Ongeldige link";

    message.textContent =
        "Deze bevestigingslink is ongeldig.";

    throw new Error("Geen uid.");

}

// -------------------------------------
// Wachten op Google Login
// -------------------------------------

onAuthStateChanged(auth, async parent => {

    if(!parent){

        title.textContent =
            "Niet ingelogd";

        message.textContent =
            "Log eerst in met hetzelfde Google-account waarmee je de aanvraag hebt gedaan.";

        return;

    }

    try{

        const childRef =
            doc(db,"users",childUid);

        const snapshot =
            await getDoc(childRef);

        if(!snapshot.exists()){

            title.textContent =
                "Profiel niet gevonden";

            message.textContent =
                "Dit profiel bestaat niet.";

            return;

        }

        const data =
            snapshot.data();

        // -----------------------------
        // Heeft al een andere ouder?
        // -----------------------------

        if(

            data.parentUid &&

            data.parentUid !== parent.uid

        ){

            title.textContent =
                "Al gekoppeld";

            message.textContent =
                "Dit kind is al gekoppeld aan een andere ouder.";

            return;

        }

        // -----------------------------
        // Opslaan
        // -----------------------------

        await updateDoc(

            childRef,

            {

                parentVerified: true,

                parentUid: parent.uid,

                emailParent: parent.email

            }

        );

        title.textContent =
            "Gelukt!";

        message.textContent =
            "Je hebt dit kind succesvol gekoppeld aan je ouderaccount.";

    }

    catch(error){

        console.error(error);

        title.textContent =
            "Er ging iets mis";

        message.textContent =
            "Probeer het later opnieuw.";

    }

});
