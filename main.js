// ==UserScript==
// @name            pixiv batch like
// @namespace       https://github.com/MagisterX/pixiv-Batch-Likes.git
// @version         1.7.1
// @description     Likes all artwork on page
// @author          AndyTLemon 1.4.2; MagisterX 1.5+
// @match           *www.pixiv.net/*/*/*
// @include         *www.pixiv.net/en/*
// @grant           none
// @icon            https://www.pixiv.net/favicon.ico
// @run-at          document-end
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

    let showAllBtn = document.getElementsByClassName("kaxsjw");
    if (showAllBtn.length > 0) {
        console.log("Going to page 1");
        showAllBtn[0].click();
        await wait(3000 | 0);
       };

    const stopbtnLocation = document.getElementsByName("ClickLikeBtnNav");
    for (let item of stopbtnLocation) {
        item.insertAdjacentHTML("beforeend", stopbtn);
    };

    let arrow = document.getElementsByClassName("dDrHMO");

    //back to page 1
    if (!isFirstPage() && isall) {
        document.getElementsByTagName("nav")[2].getElementsByTagName("a")[1].click();
        console.log("back to page 1");
        await wait(3000 | 0);
    };
    const liveElements = document.getElementsByClassName("jZbNpd");
    const liveElementsHearts = document.getElementsByClassName("cHNSiM");

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
    let btn = document.querySelector(".sc-27a0ff07-0.bbkQMy span");
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
    const btnHtml = btn; // whatever btn string is
    const btn1 = document.getElementsByClassName("sc-2a9a0ec2-0 kBdFPA")[0];
    const btn2 = document.getElementsByClassName("dDrHMO")[1];
    const btnSearch = document.getElementsByClassName("sc-d50bad69-5 fWBMuU")[0];

    if (btnSearch){
        if (!btnSearch.querySelector(".kWAFb")) {
            btnSearch.insertAdjacentHTML("beforeend", btnHtml);
        }
    }

    if (btn1)
    {
        // detect existing button by marker class
        if (!btn1.querySelector(".kWAFb")) {
            btn1.insertAdjacentHTML("beforeend", btnHtml);
        }
    }

    if (!btn2) return;
    const next = btn2.nextElementSibling;
    const isBtnPlaced = next && next.classList.contains("kWAFb");

    if (!isBtnPlaced) {
        btn2.insertAdjacentHTML("afterend", btnHtml);
    }
}

function btnHideLiked() {
    let likedImages = document.getElementsByClassName("sc-87605cc5-1 lbkCkj");
    for (let img of likedImages) {

        // Old layout (li)
        let container = img.closest("li");

        // New layout (div.col-span-2)
        if (!container) {
            container = img.closest("div.col-span-2");
        }

        if (container) {
            container.style.display = "none";
        }
    }
};
window.btnHideLiked = btnHideLiked;

(async function run() {
    while(true){
        await wait(300);
        placebtn();
        //console.log("trying to render buttons");
    }
})();
