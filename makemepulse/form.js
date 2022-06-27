$(window).on("load", function () {
    $('.preloading').delay(1000).fadeIn('fast');
    $(".load .circle1").delay(3000).fadeIn('fast');
    $(".load #counter").delay(3500).fadeIn('fast', function () {
        var counter = document.getElementById('counter').getContext('2d');
        var no = 0; // Starting Point
        var pointToFill = 4.72;  //Point from where you want to fill the circle
        var cw = counter.canvas.width; //Return canvas width
        var ch = counter.canvas.height;//Return canvas height
        var diff;   // find the different between current value (no) and trageted value (100)
        function fillCounter() {
            diff = ((no / 100) * Math.PI * 2 * 10);
            counter.clearRect(0, 0, cw, ch);   // Clear canvas every time when function is call
            counter.lineWidth = 3;     // size of stroke
            counter.fillStyle = '#171640';     // color that you want to fill in counter/circle
            counter.strokeStyle = '#6dc0d9';    // Stroke Color
            counter.font = "25px monospace";    //set font size and face
            counter.beginPath();
            counter.arc(167, 168.5, 166.5, pointToFill, diff / 10 + pointToFill);    //arc(x,y,radius,start,stop)
            counter.stroke();   // to fill stroke
            if (no >= 100) {
                clearTimeout(fill);     //fill is a variable that call the function fillcounter()
            }
            no++;
        }
        var fill = setInterval(fillCounter, 10);
    });
    $(".load .circle1").delay(4000).fadeOut('fast');
    $(".load #counter1").delay(5000).fadeIn('slow', function () {
        var counter = document.getElementById('counter1').getContext('2d');
        var no = 0; // Starting Point
        var pointToFill = 4.72;  //Point from where you want to fill the circle
        var cw = counter.canvas.width;//Return canvas width
        var ch = counter.canvas.height;//Return canvas height
        var diff;   // find the different between current value (no) and trageted value (100)
        function fillCounter() {
            diff = ((no / 100) * Math.PI * 2 * 10);
            counter.clearRect(0, 0, cw, ch);   // Clear canvas every time when function is call
            counter.lineWidth = 15;     // size of stroke
            counter.strokeStyle = '#171640';    // Stroke Color
            counter.font = "25px monospace";    //set font size and face
            counter.beginPath();
            counter.arc(167.5, 168.5, 165, pointToFill, diff / 10 + pointToFill);    //arc(x,y,radius,start,stop)
            counter.stroke();   // to fill stroke
            if (no >= 100) {
                clearTimeout(fill);     //fill is a variable that call the function fillcounter()
            }
            no++;
        }
        var fill = setInterval(fillCounter, 10);//now call the function
    });
    $(".load #counter1, .load #counter").delay(5000).fadeOut('fast');
    $('main#main').delay(7500).fadeIn('fast');
    $('.border').delay(8500).fadeIn("slow");
    $('.preloading').delay(8500).fadeOut('slow');
    $('main#main .content').delay(8000).fadeIn('fast', function () {
        var part = $("main#main .content .product .part img");
        var partcontent = $("main#main .content .product .part .infor");
        var partcontenthide = $("main#main .content .product .part .infor-hide");

        window.addEventListener("scroll", function () {
            for (var i = 0; i < part.length; i++) {
                if (window.pageYOffset > ($(part[i]).offset().top - 400)) {
                    $(part[i]).addClass("right");
                    $(partcontent[i]).addClass("up");
                    $(partcontenthide[i]).addClass("display");
                }
            }
        })
    });
});
$(document).ready(function () {
    TweenMax.from(".load .cover", 1, { width: 0, delay: 2 });
    TweenMax.to(".load .cover", 1, { y: -20, opacity: 0, delay: 7 });
    TweenMax.fromTo("main#main .content .headermain .navigation-fixed", 1, { y: 30, opacity: 0, delay: 10 }, { y: 0, opacity: 1, delay: 10 });
    TweenMax.from("main#main .content main#maincontent .menucontent .intro .left, main#main .content .headermain .arrow-down-content .circle-arrow, main#main .content main#maincontent .menucontent .intro .right", 0.5, { y: -20, opacity: 0, delay: 11 });
    var undelist = $('main#main .content .headermain .navigation-fixed .right ul li');
    var text = $('main#main .content .headermain .intro p');
    var texthide = document.querySelectorAll('.texthide');
    var countfor = 0;

    for (var i = 0; i < undelist.length; i++) {
        $(undelist[i]).hover(function () {
            $(this).find(".under").css({ "animation": "toright 0.5s forwards", "opacity": "1" })
        }, function () {
            $(this).find(".under").css({ "animation": "toleft 0.5s forwards" })
        }
        );
    }

    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < $(text[i]).children().length; j++) {
            TweenMax.fromTo($(text[i]).children().eq(j), 0.2, { y: 5, opacity: 0, delay: 10 + j * 0.1 + i * 0.4 }, { y: 0, opacity: 1, delay: 10 + j * 0.1 + i * 0.4 });
        }
    }
    var time = setInterval(function () {
        texthide[countfor % 7].classList.remove('show-up');
        texthide[(countfor + 1) % 7].classList.add('show-up');
        if (countfor === 7) {
            countfor = 0;
        }
        countfor++;
    }, 3000);
});