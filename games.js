import {

    db,
    auth,

    doc,
    getDoc,
    updateDoc,

    onAuthStateChanged

} from "./firebase.js";

const childName =
    document.getElementById("child-name");

const gamesList =
    document.getElementById("games-list");

const saveButton =
    document.getElementById("save-button");

const backButton =
    document.getElementById("back-button");

// ------------------------------------
// HIER voeg je later nieuwe spellen toe
// ------------------------------------

const AVAILABLE_GAMES = [

    {
        id:"balloons",
        name:"Ballonnen"
    },

    {
        id:"animals",
        name:"Dieren"
    },

    {
        id:"colors",
        name:"Kleuren"
    },

    {
        id:"bubbles",
        name:"Bubbels"
    },

    {
        id:"sorting",
        name:"Sorteren"
    },

    {
        id:"moles",
        name:"Mollen"
    },

    {
        id:"blocks",
        name:"Blokken"
    },

    {
        id:"cleanup",
        name:"Opruimen"
    },

    {
        id:"cleaning",
        name:"Schoonmaken"
    },

    {
        id:"memory",
        name:"Memory"
    },

    {
        id:"train",
        name:"Trein"
    },

    {
        id:"caterpillar",
        name:"Rups"
    },

    {
        id:"music",
        name:"Muziek"
    },

    {
        id:"fruit",
        name:"Fruit"
    },

    {
        id:"pattern",
        name:"Patroon"
    },

    {
        id:"cut",
        name:"Snijden"
    }

];

// ------------------------------------

let currentUser;
let childRef;

onAuthStateChanged(auth,async user=>{

    if(!user){

        window.location.href="index.html";
        return;

    }

    currentUser=user;

    loadGames();

});

async function loadGames(){

    const uid =
        sessionStorage.getItem("userId");

    childRef =
        doc(db,"users",uid);

    const snapshot =
        await getDoc(childRef);

    const data =
        snapshot.data();

    if(data.parentUid!==currentUser.uid){

        window.location.href="index.html";
        return;

    }

    childName.textContent =
        data.name || data.profileId;

    const enabledGames =
        data.games || {};

    gamesList.innerHTML="";

    AVAILABLE_GAMES.forEach(game=>{

        const checked =
            enabledGames[game.id] ?? true;

        gamesList.innerHTML +=

        `
        <label class="game-item">

            <input

                type="checkbox"

                id="${game.id}"

                ${checked ? "checked" : ""}

            >

            ${game.name}

        </label>

        `;

    });

}

saveButton.addEventListener("click",async()=>{

    const games={};

    AVAILABLE_GAMES.forEach(game=>{

        games[game.id]=

            document.getElementById(game.id).checked;

    });

    await updateDoc(

        childRef,

        {

            games:games

        }

    );

    alert("Opgeslagen!");

    window.location.href="dashboard.html";

});

backButton.addEventListener("click",()=>{

    window.location.href="dashboard.html";

});
