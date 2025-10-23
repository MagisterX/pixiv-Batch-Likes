// ==UserScript==
// @name            pixiv批量點讚
// @namespace       https://github.com/MagisterX/pixiv-Batch-Likes.git
// @version         1.6.1
// @description     批量作品點讚
// @author          AndyTLemon 1.4.2; MagisterX 1.5+
// @match           *www.pixiv.net/*/*/*
// @include         *www.pixiv.net/en/*
// @grant           none
// @icon            https://www.pixiv.net/favicon.ico
// ==/UserScript==

const wait = ms => new Promise(res => setTimeout(res, ms));
let isrunning = false;
let stopnow = false;
let isplace = false;

//button
const btn = `<nav name = "ClickLikeBtnNav" class="sc-192ftwf-0 kWAFb" style="justify-content: center;">
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="btnHideLiked()">Hide liked</button>
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="btnfunction(false)">Like a page</button>
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="btnfunction(true)">Like all</button>
</nav>`;


function stopbtnfunction() {
    if (!isrunning) {
        return;
    };
    stopnow = true;
};
window.stopbtnfunction = stopbtnfunction;


async function btnfunction(isall) {
    if (isrunning) {
        return;
    };
    isrunning = true;
    stopnow = false;

    //stopbtn
    const stopbtn = `<button name = "stopbtn" class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
        border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="stopbtnfunction()">Stop</button>`;

    let allImages = document.getElementsByClassName("jKHslz");
    if (allImages.length > 0) {
        console.log("Going to page 1");
        allImages[0].click();
        await wait(3000 | 0);
       };

    const stopbtnLocation = document.getElementsByName("ClickLikeBtnNav");
    for (let item of stopbtnLocation) {
        item.insertAdjacentHTML("beforeend", stopbtn);
    };

    let arrow = document.getElementsByClassName("gvRusp");

    //back to page 1
    if (!isFirstPage() && isall) {
        document.getElementsByTagName("nav")[2].getElementsByTagName("a")[1].click();
        console.log("back to page 1");
        await wait(3000 | 0);
    };
    const liveElements = document.getElementsByClassName("ijXKlM");
    const liveElementsHearts = document.getElementsByClassName("dwCpYj");

    while (true) {
        if (isStop(stopbtnLocation)) {
            return;
        };
        if(liveElements.length == 0){
            await wait(3000 | 0);
            continue;
        }
        const s = Array.from(liveElementsHearts); //staticarray
        let slength = s.length
        //click like
        for (let i = 0; i < slength; i++) {
            if (isStop(stopbtnLocation)) {
                return;
            };
            s[i].closest("button").click();
            await wait(1200 | 0);
        }

        if (isShow(arrow[1]) && isall) {
            arrow[1].click();
            await wait(3000 | 0);
        }
        else {
            break;
        };
    };

    //del stopbtn
    for (let item of stopbtnLocation) {
        item.lastChild.remove();
    };
    isrunning = false;
    console.log("done")
};
window.btnfunction = btnfunction;

function isShow(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'flex')
};

function isFirstPage() {
    let btn = document.querySelector(".sc-facdf6d-1.jQOXFb span");
    if (!btn) return false; // safety check
    return btn.textContent.trim() === "1";
}

function isStop(stopbtnLocation) {
    if (stopnow) {
        //del stopbtn
        for (let item of stopbtnLocation) {
            item.lastChild.remove();
        };
        isrunning = false;
        return true;
    }
    else {
        return false;
    };
};

function placebtn() {
    let btnLocaton = document.getElementsByClassName("sc-35ff1eaf-0 bSpaXW")[0];
    let btnLocaton2 = document.getElementsByClassName("gvRusp")[1];
    try {
        //console.log("trying");
        if (!isplace){
        btnLocaton.insertAdjacentHTML("beforeend", btn);
        isplace = true;
        btnLocaton2.insertAdjacentHTML("afterend", btn);
        };
    } finally {
        let btns = document.getElementsByClassName("kWAFb");
        if (btns.length == 0){
            isplace=false;
        };
        return;
    }
};

function btnHideLiked() {
    let allImages = document.getElementsByClassName("bVNeCg");
    for (let img of allImages) {
        let li = img.closest("li"); // finds nearest parent <li>
        if (li) {
            li.style.display = "none";
        }
    }
};
window.btnHideLiked = btnHideLiked;

(async function run() {
    while(true){
        await wait(1000);
        placebtn();
        console.log("trying");
    }
})();
