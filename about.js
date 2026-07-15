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

        "JOUW_GOOGLE_FORM_LINK",

        "_blank"

    );

});
