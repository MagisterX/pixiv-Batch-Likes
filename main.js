// ==UserScript==
// @name            pixiv USER作品點讚
// @namespace       https://github.com/AndyTLemon/pixiv_click_illustrator_like.git
// @version         1.1
// @description     USER作品點讚
// @author          AndyTLemon
// @match           *www.pixiv.net/users/*/*
// @grant           none
// @icon              https://www.pixiv.net/favicon.ico
// ==/UserScript==

const wait = ms => new Promise(res => setTimeout(res, ms));

async function btnfunction(isall) {


    let arrow = document.getElementsByClassName("kKBslM");

    //back to page 1
    if (isShow(arrow[0])) {
        document.getElementsByTagName("nav")[2].getElementsByTagName("a")[1].click();
        console.log("back to page 1");
        await wait(Math.random() * 1000 +500| 0);
    };

    //click like
    while (true) {
        let s = document.getElementsByClassName("dxYRhf");

        for (let index=0; index < s.length; index++) {
            s[0].closest("button").click();
            await wait((Math.random()+2) * 1000 | 0);
        };

        if (isShow(arrow[1]) && isall) {
            arrow[1].click();
            await wait((Math.random() + 2) * 1000 | 0);
        }
        else {
            break;
        };
    };

    console.log("done")
};
window.btnfunction = btnfunction;

function isShow(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'flex')
};

(async function () {

    //button
    const btn = `<nav class="sc-192ftwf-0 kWAFb" style="justify-content: center;">
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="btnfunction(false)">點讚一頁</button>
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;" onclick="btnfunction(true)">點讚全部</button>
</nav>`;
    await wait(5000);
    let btnLocaton = document.getElementsByClassName("sc-192ftwf-0 kWAFb")[0]
    btnLocaton.insertAdjacentHTML("beforeend", btn);
    btnLocaton = document.getElementsByClassName("sc-xhhh7v-0 kYtoqc")[0]
    btnLocaton.insertAdjacentHTML("afterend", btn);

    console.log("done");
})();
