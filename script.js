const bootText = document.getElementById("bootText");
const enterBtn = document.getElementById("enterBtn");

const bootMessages = [
    "BOOTING SYSTEM",
    "CHECKING MEMORY",
    "MEMORY CORRUPTED",
    "CONNECTING TO N.O.V.A",
    "LINK ESTABLISHED",
    "WELCOME ARCHON"
];

enterBtn.style.display = "none";

let messageIndex = 0;
let dots = 0;

function showMessage(){

    if(messageIndex >= bootMessages.length){

        bootText.textContent = "SYSTEM READY";

        enterBtn.style.display = "inline-block";

        return;
    }

    let current = bootMessages[messageIndex];

    dots = 0;

    const animation = setInterval(()=>{

        dots++;

        if(dots > 3){

            clearInterval(animation);

            messageIndex++;

            setTimeout(showMessage,400);

            return;
        }

        bootText.textContent = current + ".".repeat(dots);

    },500);

}

showMessage();
