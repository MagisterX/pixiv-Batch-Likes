// ==UserScript==
// @name            pixiv USER作品點讚
// @namespace       
// @version         1.0
// @description     USER作品點讚
// @author          AndyTLemon
// @match           *www.pixiv.net/users/*/*
// @grant           none
// @icon              https://www.pixiv.net/favicon.ico
// ==/UserScript==

function isShow(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'flex')
};

(async function () {
    const wait = ms => new Promise(res => setTimeout(res, ms));
    //button
    const btnLocaton = document.getElementsByClassName("sc-192ftwf-0 kWAFb")[0]
    const btnLocaton2 = document.getElementsByClassName("sc-xhhh7v-0 kYtoqc")[0]
    const btn = `<nav class="sc-192ftwf-0 kWAFb" style="justify-content: center;">
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;">點讚一頁</button>
<button class="sc-d98f2c-1 sc-192ftwf-1 ioZtRi" style="background-color: transparent;background-repeat: no-repeat; border: 2px solid #3acfff;
border-radius: 100px;cursor: pointer;overflow: hidden;outline: none;">點讚全部</button>
</nav>`;

    btnLocaton.insertAdjacentHTML("beforeend", btn);
    btnLocaton2.insertAdjacentHTML("afterend", btn);


    let arrow = document.getElementsByClassName("kKBslM");

    //back to page 1
    if (isShow(arrow[0])) {
        document.getElementsByTagName("nav")[2].getElementsByTagName("a")[1].click();
        console.log("back to page 1");
    };

    //click like
    while (true) {
        let s = document.getElementsByClassName("dxYRhf");

        for (const item of s) {
            item.closest("button").click();
            await wait(Math.random() * 1000 | 0);
        };

        if (isShow(arrow[1])) {
            arrow[1].click();
            await wait((Math.random() + 2) * 1000 | 0);
        }
        else {
            break;
        };
    };

    console.log("done")
})();
