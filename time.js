// =====================================
// Ioki Parent - Speeltijd
// =====================================

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

const select =
    document.getElementById("time-select");

const saveButton =
    document.getElementById("save-button");

const backButton =
    document.getElementById("back-button");

let currentUser = null;
let childRef = null;

onAuthStateChanged(auth, async user=>{

    if(!user){

        window.location.href="index.html";
        return;

    }

    currentUser = user;

    loadData();

});

async function loadData(){

    const uid =
        sessionStorage.getItem("userId");

    if(!uid){

        window.location.href="dashboard.html";
        return;

    }

    childRef =
        doc(db,"users",uid);

    const snapshot =
        await getDoc(childRef);

    if(!snapshot.exists()){

        alert("Kind niet gevonden.");
        return;

    }

    const data =
        snapshot.data();

    if(data.parentUid!==currentUser.uid){

        alert("Geen toegang.");

        window.location.href="index.html";

        return;

    }

    childName.textContent =
        data.name || data.profileId;

    select.value =
        data.dailyLimit ?? 60;

}

saveButton.addEventListener("click",async()=>{

    saveButton.disabled=true;

    await updateDoc(

        childRef,

        {

            dailyLimit:Number(select.value)

        }

    );

    alert("Speeltijd opgeslagen!");

    window.location.href="dashboard.html";

});

backButton.addEventListener("click",()=>{

    window.location.href="dashboard.html";

});
