// =====================================
// Ioki Parent
// Index
// =====================================

import {

    db,

    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc

} from "./firebase.js";

emailjs.init("ShVsN09_8RGYLnUg2");

const profileInput =
    document.getElementById("profile-id");

const continueButton =
    document.getElementById("continue-button");

// -------------------------------------
// Profile-ID opmaken
// -------------------------------------

profileInput.addEventListener("input",()=>{

    let value = profileInput.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g,"");

    if(value.length > 4){

        value =
            value.substring(0,4) +
            "-" +
            value.substring(4,8);

    }

    profileInput.value = value;

});

// -------------------------------------
// Profiel koppelen
// -------------------------------------

continueButton.addEventListener("click",searchProfile);

profileInput.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        searchProfile();

    }

});

async function searchProfile(){

    const profileId =
        profileInput.value.trim();

    if(profileId===""){

        alert("Vul een Profile-ID in.");

        profileInput.focus();

        return;

    }

    continueButton.disabled = true;

    continueButton.textContent =
        "Zoeken...";

    try{

        const q = query(

            collection(db,"users"),

            where("profileId","==",profileId)

        );

        const result =
            await getDocs(q);

        if(result.empty){

            alert("Profiel niet gevonden.");

            continueButton.disabled = false;

            continueButton.textContent =
                "Profiel koppelen";

            return;

        }

        const user =
            result.docs[0];

        const data = user.data();

        const verificationToken =
            crypto.randomUUID();
        
        sessionStorage.setItem(
            "verificationToken",
            verificationToken
        );
        
        sessionStorage.setItem(

            "userId",

            user.id

        );

        sessionStorage.setItem(

            "profileId",

            profileId

        );

        window.location.href =
            "verify.html";

    }

    catch(error){

        console.error(error);

        alert("Er is iets misgelopen.");

        continueButton.disabled = false;

        continueButton.textContent =
            "Profiel koppelen";

    }

}
