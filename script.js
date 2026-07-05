// ======================================
// A.R.C.H.O.N. Website
// Version 2.1
// ======================================


// ======================================
// ELEMENTS
// ======================================

const boot = document.getElementById("boot");
const bootText = document.getElementById("bootText");
const enterBtn = document.getElementById("enterBtn");
const menu = document.getElementById("menu");
const missionPage = document.getElementById("missionPage");
const returnBtn = document.getElementById("returnBtn");


// ======================================
// HTML VALIDATION
// ======================================

if (!boot || !bootText || !enterBtn || !menu) {

    console.error("ARCHON ERROR: Ada elemen HTML yang tidak ditemukan.");

} else {

    // ======================================
    // SETTINGS
    // ======================================

    const bootMessages = [
        "BOOTING SYSTEM",
        "CHECKING MEMORY",
        "MEMORY CORRUPTED",
        "CONNECTING TO N.O.V.A",
        "LINK ESTABLISHED",
        "WELCOME NPC5643627"
    ];

    const typingSpeed = 160;
    const waitAfterMessage = 1200;


    // ======================================
    // INITIAL STATE
    // ======================================

    enterBtn.style.display = "none";
    menu.style.display = "none";
    missionPage.style.display = "none";


    // ======================================
    // TYPEWRITER EFFECT
    // ======================================

    function typeWriter(text, callback) {

        let index = 0;

        bootText.textContent = "";

        const typing = setInterval(() => {

            bootText.textContent += text.charAt(index);

            index++;

            if (index >= text.length) {

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

        }, typingSpeed);

    }


    // ======================================
    // BOOT SEQUENCE
    // ======================================

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


    // ======================================
    // MENU
    // ======================================

    const menuItems = [
    {
        title: "MISSION",
        action: () => openPage("mission")
    },
    {
        title: "MAIN STORY",
        action: () => alert("Coming Soon")
    },
    {
        title: "DATABASE",
        action: () => alert("Coming Soon")
    },
    {
        title: "ARCHIVE",
        action: () => alert("Coming Soon")
    },
    {
        title: "SETTINGS",
        action: () => alert("Coming Soon")
    }
];

    function showMenu() {

        boot.style.display = "none";

        menu.style.display = "flex";
        menu.innerHTML = "";

        let index = 0;

        function showNext() {

            if (index >= menuItems.length) return;

            const item = document.createElement("div");

            item.className = "menu-item";
            const currentItem = menuItems[index];

item.textContent = currentItem.title;

item.addEventListener("click", currentItem.action);

            menu.appendChild(item);

            index++;

            setTimeout(showNext, 400);

        }

        showNext();

    }

    // ======================================
// NAVIGATION ENGINE
// ======================================

const pages = [
    missionPage
];

function hideAllPages() {

    pages.forEach(page => {

        if (page) {

            page.style.display = "none";

        }

    });

}

function openPage(pageName) {

    hideAllPages();

    menu.style.display = "none";

    const page = pages[pageName];

    if(page){

        page.style.display = "flex";

    }

}

function backToMenu() {

    hideAllPages();

    menu.style.display = "flex";

}
    
    // ======================================
    // MISSION PAGE
    // ======================================

    function openMission() {

    openPage(missionPage);

    }

    function closeMission() {

    backToMenu();

    }

    // ======================================
    // BUTTON EVENTS
    // ======================================

    enterBtn.addEventListener("click", () => {

        showMenu();

    });

    if (returnBtn) {

        returnBtn.addEventListener("click", closeMission);

    }


    // ======================================
    // START SYSTEM
    // ======================================

    bootSequence();

    console.log("ARCHON SYSTEM READY");

}
