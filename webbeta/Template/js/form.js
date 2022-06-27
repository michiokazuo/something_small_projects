document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('.parallax-window').parallax({ imageSrc: 'http://mauweb.thietkewebbeta.com/khogiaodien/food01/wp-content/uploads/2019/08/italian-food-background-1.jpg' });
    });

    var item1 = document.querySelectorAll("header .bottom .right .nav .nav-item .nav-link");
    var button1 = document.querySelector("header .bottom  .btn");
    var hide = document.querySelector(".menuhide");
    var cover = document.querySelector(".cover");
    var buttonclose = document.querySelector(".close");
    var body = document.querySelector("body");
    var header = document.querySelector("header .bottom");
    var returnTop = document.querySelector("#top-link");
    var status1 = 1;
    var status2 = 1;

    for (var i = 0; i < item1.length; i++) {
        item1[i].onclick = function () {
            for (var i = 0; i < item1.length; i++) {
                item1[i].classList.remove("actived");
                item1[i].classList.add("text-secondary");
            }
            this.classList.remove("text-secondary");
            this.classList.add("actived");
        }
    }

    button1.onclick = () => {
        hide.classList.add("change1");
        cover.classList.add("show");
        buttonclose.classList.add("show");
        body.classList.add("overflow");
    }

    cover.onclick = () => {
        hide.classList.remove("change1");
        cover.classList.remove("show");
        buttonclose.classList.remove("show");
        body.classList.remove("overflow");
    }

    buttonclose.onclick = () => {
        hide.classList.remove("change1");
        cover.classList.remove("show");
        buttonclose.classList.remove("show");
        body.classList.remove("overflow");
    }

    window.addEventListener("scroll", function () {
        if (status1 === 1 && window.pageYOffset >= 160) {
            header.classList.add("change2");
            status1 = 0;
        } else if (status1 === 0 && window.pageYOffset < 160) {
            header.classList.remove("change2");
            status1 = 1;
        }
    })
    window.addEventListener("scroll", function () {
        if (status2 === 1 && window.pageYOffset > 0) {
            returnTop.classList.add("change3");
            status2 = 0;
        } else if (status2 === 0 && window.pageYOffset < 160) {
            returnTop.classList.remove("change3");
            status2 = 1;
        }
    })

    if (status1 === 1 && window.pageYOffset >= 160) {
        header.classList.add("change2");
        status1 = 0;
    }
    if (status2 === 1 && window.pageYOffset > 0) {
        returnTop.classList.add("change3");
        status2 = 0;
    }

}, false)