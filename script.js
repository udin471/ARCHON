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
const mainStoryPage = document.getElementById("mainStoryPage");
const mainStoryReturnBtn = document.getElementById("mainStoryReturnBtn");
const chapterPage = document.getElementById("chapterPage");
const chapterReturnBtn = document.getElementById("chapterReturnBtn");
const chapter00Btn = document.getElementById("chapter00Btn");
const chapterNextBtn = document.getElementById("chapterNextBtn");
const chapterText = document.getElementById("chapterText");

// ======================================
// CHAPTER STATE
// ======================================

let chapterState = 0;

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
    mainStoryPage.style.display = "none";
    chapterPage.style.display = "none";
    
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
        "MISSION",
        "MAIN STORY",
        "DATABASE",
        "ARCHIVE",
        "SETTINGS"
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
            item.textContent = menuItems[index];

            if (menuItems[index] === "MISSION") {

                item.addEventListener("click", openMission);

            }

            if (menuItems[index] === "MAIN STORY") {

    item.addEventListener("click", openMainStory);

            }
            
            menu.appendChild(item);

            index++;

            setTimeout(showNext, 400);

        }

        showNext();

    }

   // ======================================
   // NAVIGATION SYSTEM
   // ======================================

function showPage(page) {

    menu.style.display = "none";
    page.style.display = "flex";

}

function goToMenu(currentPage) {

    currentPage.style.display = "none";

    showMenu();

}
    
    // ======================================
    // MISSION PAGE
    // ======================================

    function openMission() {

    showPage(missionPage);

    }

    function closeMission() {

    goToMenu(missionPage);

    }

     // ======================================
     // MAIN STORY PAGE
     // ======================================

function openMainStory() {

    showPage(mainStoryPage);

}

function closeMainStory() {

    goToMenu(mainStoryPage);

}

    // ======================================
    // CHAPTER PAGE
    // ======================================

function openChapter00() {

    chapterState = 0;

    showPage(chapterPage);

    chapterText.innerHTML = `
        <p>Rebooting system...</p>
    `;

    chapterNextBtn.style.display = "inline-block";
    chapterReturnBtn.style.display = "none";

}

function closeChapter00() {

    chapterPage.style.display = "none";
    showPage(mainStoryPage);

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

    if (mainStoryReturnBtn) {

    mainStoryReturnBtn.addEventListener("click", closeMainStory);

    }

    if (chapter00Btn) {

    console.log("CHAPTER BUTTON FOUND");

    chapter00Btn.addEventListener("click", () => {

        console.log("CHAPTER CLICKED");

        openChapter00();

    });

    }

if (chapterReturnBtn) {

    chapterReturnBtn.addEventListener("click", closeChapter00);

}

    if (chapterNextBtn) {

    chapterNextBtn.addEventListener("click", () => {

        switch (chapterState) {

            case 0:

                chapterText.innerHTML = `
                    <p>Initializing core...</p>
                `;

                chapterState++;
                break;

            case 1:

                chapterText.innerHTML = `
                    <p>Synchronizing...</p>
                `;

                chapterState++;
                break;

            case 2:

                chapterText.innerHTML = `
                    <p>Welcome ARCHON</p>
                `;

                chapterNextBtn.style.display = "none";
                chapterReturnBtn.style.display = "inline-block";

                chapterState++;
                break;

        }

    });

    }
    
    // ======================================
    // START SYSTEM
    // ======================================
    
    bootSequence();

    console.log("ARCHON SYSTEM READY");

}
