// =====================================
// Ioki Parent - Kind koppelen
// =====================================

import {

    db,
    auth,

    collection,
    query,
    where,
    getDocs,

    onAuthStateChanged

} from "./firebase.js";

// -------------------------------------
// Elementen
// -------------------------------------

const profileInput =
    document.getElementById("profile-id");

const connectButton =
    document.getElementById("connect-button");

const backButton =
    document.getElementById("back-button");

// -------------------------------------
// EmailJS
// -------------------------------------

emailjs.init("ShVsN09_8RGYLnUg2");

// -------------------------------------
// Ingelogde gebruiker
// -------------------------------------

let currentUser = null;

onAuthStateChanged(auth, user => {

    if(!user){

        window.location.href = "index.html";
        return;

    }

    currentUser = user;

});

// -------------------------------------
// Terug
// -------------------------------------

backButton.addEventListener("click",()=>{

    window.location.href="index.html";

});

// -------------------------------------
// Profile-ID opmaken
// -------------------------------------

profileInput.addEventListener("input",()=>{

    let value = profileInput.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g,"");

    if(value.length > 4){

        value =
            value.substring(0,4)
            +
            "-"
            +
            value.substring(4,8);

    }

    profileInput.value = value;

});

// -------------------------------------
// Enter
// -------------------------------------

profileInput.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        connectChild();

    }

});

// -------------------------------------
// Knop
// -------------------------------------

connectButton.addEventListener("click",()=>{

    connectChild();

});

// -------------------------------------
// Kind koppelen
// -------------------------------------

async function connectChild(){

    if(!currentUser){

        alert("Even wachten...");

        return;

    }

    const profileId =
        profileInput.value.trim();

    if(profileId===""){

        alert("Vul een Profile-ID in.");

        return;

    }

    connectButton.disabled = true;

    connectButton.textContent =
        "Zoeken...";

    try{

        const q = query(

            collection(db,"users"),

            where("profileId","==",profileId)

        );

        const snapshot =
            await getDocs(q);

        if(snapshot.empty){

            throw new Error(

                "Profile-ID niet gevonden."

            );

        }

        const userDoc =
            snapshot.docs[0];

        const data =
            userDoc.data();

        // -----------------------------
        // Heeft al een ouder?
        // -----------------------------

        if(

            data.parentUid &&
            data.parentUid !== currentUser.uid

        ){

            throw new Error(

                "Dit account heeft al een ouder."

            );

        }

        // -----------------------------
        // Gegevens bewaren
        // -----------------------------

        sessionStorage.setItem(

            "userId",

            userDoc.id

        );

        sessionStorage.setItem(

            "profileId",

            profileId

        );

        // -----------------------------
        // Mail versturen
        // -----------------------------

        const verificationLink =

            "https://mvanherzeele18.github.io/iokiparent/confirm.html?uid="

            +

            userDoc.id;

        await emailjs.send(

            "service_3f06gei",

            "template_j6jvfke",

            {

                to_email:
                    data.email,

                verification_link:
                    verificationLink,

                profile_id:
                    profileId

            }

        );

        // -----------------------------
        // Verify
        // -----------------------------

        window.location.href =
            "verify.html";

    }

    catch(error){

        console.error(error);

        alert(error.message);

        connectButton.disabled = false;

        connectButton.textContent =
            "Kind koppelen";

    }

}
