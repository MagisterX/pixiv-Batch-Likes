// ==UserScript==
// @name            pixiv批量點讚
// @namespace       https://github.com/AndyTLemon/pixiv-Batch-Likes.git
// @version         1.4.1
// @description     批量作品點讚
// @author          AndyTLemon
// @match           *www.pixiv.net/*/*/*
// @grant           none
// @icon            https://www.pixiv.net/favicon.ico
// ==/UserScript==

const wait = ms => new Promise(res => setTimeout(res, ms));
let isrunning = false;
let stopnow = false;

//button
const btn = `<nav name = "ClickLikeBtnNav" class="sc-192ftwf-0 kWAFb" style="justify-content: center;">
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="btnfunction(false)">點讚一頁</button>
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="btnfunction(true)">點讚全部</button>
</nav>`;


function stopbtnfunction() {
    if (!isrunning) {
        return
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
        border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="stopbtnfunction()">停止點讚</button>`;

    const stopbtnLocation = document.getElementsByName("ClickLikeBtnNav");
    for (let item of stopbtnLocation) {
        item.insertAdjacentHTML("beforeend", stopbtn);
    };



    let arrow = document.getElementsByClassName("kKBslM");

    //back to page 1
    if (isShow(arrow[0]) && isall) {
        document.getElementsByTagName("nav")[2].getElementsByTagName("a")[1].click();
        console.log("back to page 1");
        await wait(Math.random() * 1000 + 500 | 0);
    };

    //click like
    while (true) {
        const s = document.getElementsByClassName("dxYRhf");

        for (let index = 0; index < s.length; index++) {
            s[0].closest("button").click();
            await wait((Math.random() + 2) * 1000 | 0);
            if (stopnow) {
                //del stopbtn
                for (let item of stopbtnLocation) {
                    item.lastChild.remove();
                };
                return;
            };
        };

        if (isShow(arrow[1]) && isall) {
            arrow[1].click();
            await wait((Math.random() + 2) * 1000 | 0);
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

(async function placebtn() {
    let isplace = false
    try {
        await wait(1000);
        let btnLocaton = document.getElementsByClassName("sc-192ftwf-0 kWAFb")[0];
        let btnLocaton2 = document.getElementsByClassName("sc-xhhh7v-0 kYtoqc")[0];
        console.log("trying");
        btnLocaton.insertAdjacentHTML("beforeend", btn);
        btnLocaton2.insertAdjacentHTML("afterend", btn);
        isplace = true
    } finally {
        if (!isplace) {
            placebtn();
        }
    }
})();
