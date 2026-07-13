// =====================================
// Ioki Parent - Confirm
// =====================================

import {

    db,

    doc,
    getDoc,
    updateDoc

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
// Bevestigen
// -------------------------------------

confirmParent();

async function confirmParent(){

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

        // ---------------------------------
        // Is er een openstaande aanvraag?
        // ---------------------------------

        if(

            !data.pendingParentUid ||

            !data.pendingParentEmail

        ){

            title.textContent =
                "Geen openstaande aanvraag";

            message.textContent =
                "Deze bevestigingslink is niet meer geldig.";

            return;

        }

        // ---------------------------------
        // Al gekoppeld?
        // ---------------------------------

        if(data.parentUid){

            title.textContent =
                "Al gekoppeld";

            message.textContent =
                "Dit kind is al gekoppeld aan een ouder.";

            return;

        }

        // ---------------------------------
        // Ouder koppelen
        // ---------------------------------

        await updateDoc(

            childRef,

            {

                parentVerified: true,

                parentUid:
                    data.pendingParentUid,

                emailParent:
                    data.pendingParentEmail,

                pendingParentUid: null,

                pendingParentEmail: null

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
