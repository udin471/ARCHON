const bootText = document.querySelector("#boot p");

let dots = 0;

setInterval(() => {
    dots++;

    if (dots > 3) {
        dots = 0;
    }

    bootText.textContent = "INITIALIZING" + ".".repeat(dots);
}, 500);
