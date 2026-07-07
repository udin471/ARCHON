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
const databasePage = document.getElementById("databasePage");
const returnBtn = document.getElementById("returnBtn");
const databaseReturnBtn = document.getElementById("databaseReturnBtn");
const mainStoryPage = document.getElementById("mainStoryPage");
const mainStoryReturnBtn = document.getElementById("mainStoryReturnBtn");
const chapterPage = document.getElementById("chapterPage");
const chapterReturnBtn = document.getElementById("chapterReturnBtn");
const chapter00Btn = document.getElementById("chapter00Btn");
const archonProfileBtn = document.getElementById("archonProfileBtn");
const archiveLoadingPage = document.getElementById("archiveLoadingPage");
const archiveLoadingText = document.getElementById("archiveLoadingText");

const archonProfilePage = document.getElementById("archonProfilePage");
const archonProfileContent = document.getElementById("archonProfileContent");
const archonProfileReturnBtn = document.getElementById("archonProfileReturnBtn");
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
    databasePage.style.display = "none";
    mainStoryPage.style.display = "none";
    chapterPage.style.display = "none";
    archiveLoadingPage.style.display = "none";
archonProfilePage.style.display = "none";
    
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

            if (menuItems[index] === "DATABASE") {

    item.addEventListener("click", openDatabase);

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
    // DATABASE PAGE
    // ======================================

function openDatabase() {

    showPage(databasePage);

}

function closeDatabase() {

    goToMenu(databasePage);

}

    // ======================================
    // ARCHON PROFILE
    // ======================================

async function openArchonLoading() {

    databasePage.style.display = "none";

    showPage(archiveLoadingPage);

    archiveLoadingText.innerHTML = "";

    await terminalArchiveSequence();

}

function openArchonProfile() {

    archiveLoadingPage.style.display = "none";

    showPage(archonProfilePage);

}

function closeArchonProfile() {

    archonProfilePage.style.display = "none";

    showPage(databasePage);

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
    // SYNCHRONIZATION ENGINE
    // ======================================

function startSynchronization() {

    chapterText.innerHTML = `
        <p>Synchronizing...</p>

        <div class="progress-container">

            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>

            <div class="progress-text" id="progressText">
                0%
            </div>

        </div>
    `;

    chapterNextBtn.style.display = "none";

    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const progressSteps = [0, 20, 45, 67, 89, 100];

    let index = 0;

    function updateProgress() {

        const value = progressSteps[index];

        progressFill.style.width = value + "%";
        progressText.textContent = value + "%";

        index++;

        if (index < progressSteps.length) {

            setTimeout(updateProgress, 900);

        } else {

            setTimeout(showBootMessages, 900);

        }

    }

    function showBootMessages() {

        const messages = [
            "Verifying Memory...",
            "Memory Integrity : OK",
            "Loading Neural Core...",
            "N.O.V.A Interface Online",
            "Restoring Tactical Database...",
            "Synchronization Success"
        ];

        let i = 0;

        function nextMessage() {

            if (i >= messages.length) {

                chapterNextBtn.style.display = "inline-block";
                chapterState = 3;

                return;

            }

            chapterText.innerHTML += `
                <p>> ${messages[i]}</p>
            `;

            i++;

            setTimeout(nextMessage, 1000);

        }

        nextMessage();

    }

    updateProgress();

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

    if (databaseReturnBtn) {

    databaseReturnBtn.addEventListener("click", closeDatabase);

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

if (archonProfileBtn) {

    archonProfileBtn.addEventListener("click", openArchonLoading);

}

if (archonProfileReturnBtn) {

    archonProfileReturnBtn.addEventListener("click", closeArchonProfile);

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

    startSynchronization();

    break;

            case 3:

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
    // ARCHIVE TERMINAL
    // ======================================

async function terminalArchiveSequence() {

    const lines = [

        { text: "Requesting Access...", delay: 700 },

        { text: "Establishing Secure Connection...", delay: 900 },

        { text: "N.O.V.A : Hello, Commander.", delay: 1200 },

        { text: "Verifying Credentials...", delay: 900 },

        { text: "Identity Confirmed.", delay: 900 },

        { text: "Access Granted.", delay: 900 }

    ];

    archiveLoadingText.innerHTML = "";

    await terminalSequence(
        archiveLoadingText,
        lines
    );

    setTimeout(() => {

        openArchonProfile();

    }, 1200);

}
    
    // ======================================
    // TERMINAL ENGINE v1.0
    // ======================================

function terminalLine(text, delay = 600) {

    return new Promise(resolve => {

        setTimeout(() => {

            chapterText.innerHTML += `
                <p>> ${text}</p>
            `;

            resolve();

        }, delay);

    });

}

async function terminalSequence(target, lines, callback = null) {

    for (const line of lines) {

        const data = typeof line === "string"
            ? { text: line, delay: 600 }
            : line;

        await new Promise(resolve => {

            setTimeout(() => {

                target.innerHTML += `
                    <p>> ${data.text}</p>
                `;

                target.scrollTop = target.scrollHeight;

                resolve();

            }, data.delay);

        });

    }

    if (callback) {

        callback();

    }

}
    
    // ======================================
    // START SYSTEM
    // ======================================
    
    bootSequence();

    console.log("ARCHON SYSTEM READY");

}
