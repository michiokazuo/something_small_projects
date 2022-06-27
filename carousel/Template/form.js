document.addEventListener("DOMContentLoaded", function () {
    var nut = document.querySelectorAll("li");
    var part = document.querySelectorAll(".part1");
    var thuTu = 0;

    nut[0].classList.add("change");
    part[0].classList.add("change1");

    var thoigian = setInterval(function () {
        thuTu++;
        for (var i = 0; i < part.length; i++) {
            part[i].classList.remove("change1");
            nut[i].classList.remove("change");
        }
        part[thuTu % 3].classList.add("change1");
        nut[thuTu % 3].classList.add("change");
    }, 10000)




    for (var i = 0; i < nut.length; i++) {
        nut[i].onclick = function () {
            var bien = this.getAttribute("data-ms");
            var bienTro = document.getElementById(bien);

            clearInterval(thoigian);
            clearInterval(thoigian1);

            for (var i = 0; i < nut.length; i++) {
                // part[i].classList.remove("change1");
                nut[i].classList.remove("change");
                // if(bien == (i+1)){
                //     // bienTro.classList.add("change1");
                // }
            }
            this.classList.add("change");
            var nutkh = this;
            var viTri = 0;
            // Có thể dùng cách sau để lấy vị trí active
            for (viTri = 0; nutkh = nutkh.previousElementSibling; viTri++) { }
            // console.log(viTri);
            for (var i = 0; i < part.length; i++) {
                part[i].classList.remove("change1");
                thuTu = viTri;
            }
            part[viTri].classList.add("change1");
            var thoigian1 = setInterval(function () {
                thuTu++;
                for (var i = 0; i < part.length; i++) {
                    part[i].classList.remove("change1");
                    nut[i].classList.remove("change");
                }
                part[thuTu % 3].classList.add("change1");
                nut[thuTu % 3].classList.add("change");
            }, 10000)
        }
    }


}, false)
//Hàm setInterval(function(), x) tự động gọi những lệnh bên trong sau 1 khoảng thời gian x

// Hàm clearInterval() sẽ xóa hàm setInterval đi