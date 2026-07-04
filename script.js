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

const typingSpeed = 120;
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

                if(dots >= 3){

                    clearInterval(dotAnimation);

                    setTimeout(callback, waitAfterMessage);

                }

            },300);

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
