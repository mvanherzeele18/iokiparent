// =====================================
// Ioki Parent
// Index
// =====================================

import {

    db,

    collection,
    query,
    where,
    getDocs

} from "./firebase.js";

const profileInput =
    document.getElementById("profile-id");

const continueButton =
    document.getElementById("continue-button");

// -------------------------------------
// EmailJS starten
// -------------------------------------

emailjs.init("ShVsN09_8RGYLnUg2");

// -------------------------------------
// Profile-ID opmaken
// -------------------------------------

profileInput.addEventListener("input", () => {

    let value = profileInput.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");

    if (value.length > 4) {

        value =
            value.substring(0, 4) +
            "-" +
            value.substring(4, 8);

    }

    profileInput.value = value;

});

// -------------------------------------
// Enter
// -------------------------------------

profileInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        searchProfile();

    }

});

// -------------------------------------
// Knop
// -------------------------------------

continueButton.addEventListener("click", () => {

    searchProfile();

});

// -------------------------------------
// Profiel zoeken
// -------------------------------------

async function searchProfile() {

    const profileId =
        profileInput.value.trim();

    if (profileId === "") {

        alert("Vul een Profile-ID in.");

        profileInput.focus();

        return;

    }

    continueButton.disabled = true;

    continueButton.textContent =
        "Zoeken...";

    try {

        const q = query(

            collection(db, "users"),

            where("profileId", "==", profileId)

        );

        const result =
            await getDocs(q);

        if (result.empty) {

            alert("Profiel niet gevonden.");

            continueButton.disabled = false;

            continueButton.textContent =
                "Profiel koppelen";

            return;

        }

        const user =
            result.docs[0];

        const data =
            user.data();

        // ---------------------------------
        // Gegevens bewaren
        // ---------------------------------

        sessionStorage.setItem(
            "userId",
            user.id
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
        // Bevestigingslink
        // ---------------------------------

        const verificationLink =

            "https://mvanherzeele18.github.io/iokigames/confirm.html?uid="

            +

            user.id;

        // ---------------------------------
        // E-mail versturen
        // ---------------------------------

        await emailjs.send(

            "service_3f06gei",

            "template_j6jvfke",

            {

                to_email: data.email,

                verification_link: verificationLink,

                profile_id: profileId

            }

        );

        // ---------------------------------
        // Naar verify
        // ---------------------------------

        window.location.href =

            "verify.html";

    }

    catch(error){

        console.error(error);

        alert(

            "Er is iets misgelopen.\n\n"

            +

            error.message

        );

        continueButton.disabled = false;

        continueButton.textContent =

            "Profiel koppelen";

    }

}
