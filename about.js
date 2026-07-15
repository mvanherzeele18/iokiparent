import {

    auth,
    onAuthStateChanged

} from "./firebase.js";

const backButton =
document.getElementById("back-button");

const gamesButton =
document.getElementById("games-button");

const supportButton =
document.getElementById("support-button");

const donateButton =
document.getElementById("donate-button");

onAuthStateChanged(auth,user=>{

    if(!user){

        window.location.href="index.html";

    }

});

backButton.addEventListener("click",()=>{

    window.location.href="dashboard.html";

});

gamesButton.addEventListener("click",()=>{

    window.open(

        "https://mvanherzeele18.github.io/iokigames/",

        "_blank"

    );

});

supportButton.addEventListener("click",()=>{

    window.open(

        "https://docs.google.com/forms/d/e/1FAIpQLSdGwtQ4zVSJop5u3Max_OO9nN5Jo0xFYAaskSFdGKM-78VB_A/viewform?usp=header",

        "_blank"

    );

});

donateButton.addEventListener("click", async () => {

    await navigator.clipboard.writeText(

        "BE88 0638 3551 0141"

    );

});
