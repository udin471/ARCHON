// ======================================
// A.R.C.H.O.N. SYSTEM v2.1 FIXED
// ======================================

// ELEMENTS
const boot = document.getElementById("boot");
const bootText = document.getElementById("bootText");
const enterBtn = document.getElementById("enterBtn");
const menu = document.getElementById("menu");
const missionPage = document.getElementById("missionPage");
const returnBtn = document.getElementById("returnBtn");
const missionTerminal = document.getElementById("missionTerminal");

// SAFETY CHECK
if (!boot || !bootText || !enterBtn || !menu) {
    console.error("ARCHON ERROR: Missing core elements");
}

// ======================
// SETTINGS
// ======================
const bootMessages = [
    "BOOTING SYSTEM",
    "CHECKING MEMORY",
    "MEMORY CORRUPTED",
    "CONNECTING TO N.O.V.A",
    "LINK ESTABLISHED",
    "WELCOME ARCHON"
];

const typingSpeed = 120;
const waitAfterMessage = 800;

// ======================
// INITIAL STATE
// ======================
enterBtn.style.display = "none";
menu.style.display = "none";
missionPage.style.display = "none";

// ======================
// TYPEWRITER
// ======================
function typeWriter(text, callback) {
    let i = 0;
    bootText.textContent = "";

    const interval = setInterval(() => {
        bootText.textContent += text.charAt(i);
        i++;

        if (i >= text.length) {
            clearInterval(interval);

            setTimeout(() => {
                callback && callback();
            }, waitAfterMessage);
        }
    }, typingSpeed);
}

// ======================
// BOOT SEQUENCE
// ======================
let currentMessage = 0;

function bootSequence() {
    if (currentMessage >= bootMessages.length) {
        bootText.textContent = "SYSTEM READY";
        enterBtn.style.display = "inline-block";
        return;
    }

    typeWriter(bootMessages[currentMessage], () => {
        currentMessage++;
        bootSequence();
    });
}

// ======================
// MENU SYSTEM
// ======================
const menuItems = [
    "MISSION",
    "PLACE",
    "DATABASE",
    "ARCHIVE",
    "SETTINGS"
];

function showMenu() {
    boot.style.display = "none";
    menu.style.display = "flex";
    menu.innerHTML = "";

    let i = 0;

    function spawnItem() {
        if (i >= menuItems.length) return;

        const item = document.createElement("div");
        item.className = "menu-item";
        item.textContent = menuItems[i];

        if (menuItems[i] === "MISSION") {
            item.addEventListener("click", openMission);
        }

        menu.appendChild(item);
        i++;

        setTimeout(spawnItem, 300);
    }

    spawnItem();
}

// ======================
// TERMINAL ENGINE
// ======================
function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function typeLine(element, text, speed = 30) {
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await delay(speed);
    }
}

async function terminalPrint(lines) {
    if (!missionTerminal) return;

    missionTerminal.innerHTML = "";

    for (const line of lines) {
        const p = document.createElement("p");
        missionTerminal.appendChild(p);

        if (line === "") {
            await delay(200);
            continue;
        }

        await typeLine(p, line);
        await delay(250);
    }
}

// ======================
// MISSION PAGE
// ======================
async function openMission() {
    menu.style.display = "none";
    missionPage.style.display = "flex";

    const lines = [
        "> INITIALIZING MISSION TERMINAL...",
        "> ACCESS GRANTED",
        "> N.O.V.A ONLINE",
        "",
        "Commander...",
        "",
        "Scanning mission database...",
        "",
        "No active mission found.",
        "",
        "Awaiting deployment..."
    ];

    await terminalPrint(lines);
}

function closeMission() {
    missionPage.style.display = "none";
    menu.style.display = "flex";
}

// ======================
// EVENTS
// ======================
enterBtn.addEventListener("click", showMenu);

if (returnBtn) {
    returnBtn.addEventListener("click", closeMission);
}

// ======================
// START
// ======================
bootSequence();

console.log("ARCHON SYSTEM READY");
