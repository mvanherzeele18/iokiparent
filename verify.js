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

const userId =
    sessionStorage.getItem("userId");

if(!userId){

    window.location.href =
        "index.html";

}

checkVerification();

setInterval(

    checkVerification,

    3000

);

async function checkVerification(){

    try{

        const snap =
            await getDoc(

                doc(db,"users",userId)

            );

        if(!snap.exists()){

            status.textContent =
                "Profiel bestaat niet meer.";

            return;

        }

        const data =
            snap.data();

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

            "Verbinding met Firebase mislukt.";

    }

}
