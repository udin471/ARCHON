// ======================================
// A.R.C.H.O.N. Website
// Version 2.0
// ======================================

// ======================================
// ELEMENTS
// ======================================

const bootText = document.getElementById("bootText");
const enterBtn = document.getElementById("enterBtn");

// ======================================
// SETTINGS
// ======================================

const bootMessages = [
    "BOOTING SYSTEM",
    "CHECKING MEMORY",
    "MEMORY CORRUPTED",
    "CONNECTING TO N.O.V.A",
    "LINK ESTABLISHED",
    "WELCOME ARCHON"
];

const typingSpeed = 160; // lebih lambat, lebih tegang
const waitAfterMessage = 1200;

// ======================================
// INITIAL STATE
// ======================================

enterBtn.style.display = "none";

// ======================================
// TYPEWRITER EFFECT
// ======================================

function typeWriter(text, callback){

    let index = 0;

    bootText.textContent = "";

    const typing = setInterval(() => {

        bootText.textContent += text.charAt(index);

        index++;

        if(index >= text.length){

            clearInterval(typing);

            let dots = 0;

            const dotAnimation = setInterval(() => {
    dots++;

    bootText.textContent = text + ".".repeat(dots);

    if (dots >= 3) {
        clearInterval(dotAnimation);

        setTimeout(callback, waitAfterMessage + 600);
    }

}, 500);

        }

    },typingSpeed);

}

// ======================================
// BOOT SEQUENCE
// ======================================

let currentMessage = 0;

function bootSequence(){

    if(currentMessage >= bootMessages.length){

        bootText.textContent = "SYSTEM READY";

        enterBtn.style.display = "inline-block";

        return;

    }

    typeWriter(bootMessages[currentMessage], () => {

        currentMessage++;

        bootSequence();

    });

}

// ======================================
// START SYSTEM
// ======================================

bootSequence();

const menu = document.getElementById("menu") || document.createElement("div");
menu.id = "menu";
document.body.appendChild(menu);

const menuItems = [
    "MISSION",
    "PLACE",
    "DATABASE",
    "ARCHIVE",
    "SETTINGS"
];

function showMenu() {
    bootText.style.display = "none";
    enterBtn.style.display = "none";

    menu.innerHTML = "";

    let index = 0;

    function showNext() {
        if (index >= menuItems.length) return;

        let item = document.createElement("div");
        item.className = "menu-item";
        item.textContent = menuItems[index];

        menu.appendChild(item);

        index++;

        setTimeout(showNext, 400); // efek muncul satu-satu
    }

    showNext();
}

enterBtn.addEventListener("click", () => {
    bootText.style.display = "none";
    enterBtn.style.display = "none";
    showMenu();
});

setTimeout(() => {
    console.log("SCRIPT STILL RUNNING");
}, 3000);
