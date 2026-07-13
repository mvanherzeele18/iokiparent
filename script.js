// =====================================
// Ioki Parent
// =====================================

const profileInput =
    document.getElementById("profile-id");

const continueButton =
    document.getElementById("continue-button");

// ---------------------------
// Verder
// ---------------------------

continueButton.addEventListener("click",()=>{

    const profileId =
        profileInput.value.trim().toUpperCase();

    if(profileId===""){

        alert("Vul eerst een Profile-ID in.");

        profileInput.focus();

        return;

    }

    // Firebase komt later

    window.location.href =
        "verify.html";

});

// ---------------------------
// Enter
// ---------------------------

profileInput.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        continueButton.click();

    }

});
