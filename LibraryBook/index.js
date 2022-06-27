/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách, cho biết thư viện này có hàng trăm giá sách khác nhau, sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới, một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, sách B quá 3 ngày -> tổng 5 ngày
 */

var fs = require('fs');
var readlineSync = require('readline-sync');

var dataBook = JSON.parse(fs.readFileSync('data/databook.json', { encoding: "utf8" }));
var dataUser = JSON.parse(fs.readFileSync('data/datauser.json', { encoding: "utf8" }));

function librarySystem() {
    dataUser = dataUser.sort(function (a, b) {
        if (deleteSign(a.fullname).toLowerCase().charCodeAt(0) - deleteSign(b.fullname).toLowerCase().charCodeAt(0) === 0) {
            var acode = 0;
            for (var i = 0; i < a.fullname.length; i++) {
                acode += a.fullname.charCodeAt(i);
            }

            var bcode = 0;
            for (var i = 0; i < b.fullname.length; i++) {
                bcode += b.fullname.charCodeAt(i);
            }

            return acode - bcode;
        } else {
            return deleteSign(a.fullname).toLowerCase().charCodeAt(0) - deleteSign(b.fullname).toLowerCase().charCodeAt(0);
        }
    });

    if (Object.keys(dataUser).length === 0) {
        console.log("CONGRATULATION: You are the first person to enter the library system!!!");
        console.log("Please create an new account!!!");
        signUp();
    } else {
        console.log("Welcome here!!!");
        console.log("1. Sign in.");
        console.log("2. Sign up.");
        console.log("3. Save & Exit.");

        do {
            var choose = readlineSync.question("Your choosen: ");

            switch (choose) {
                case "1": console.log("Log into the system: ");
                    signIn();
                    break;
                case "2": console.log("Creat a new account: ");
                    signUp();
                    break;
                case "3": break;
                default: console.log("Please enter the correct selection!!!");
                    break;
            }
        } while (choose !== "1" && choose !== "2" && choose !== "3");
    }
}

function signIn() {
    do {
        var username = readlineSync.question("Username: ");

        if (username === '') {
            console.log("Please enter your username agian.");
        } else {
            var userActive = dataUser.find(function (x) {
                return x.username === username;
            });

            if (userActive === undefined) {
                console.log("Incorrect username.");
                console.log("Please enter your username agian.");
            }
        }
    } while (username === '' || userActive === undefined);

    do {
        var password = readlineSync.question("Password: ");

        if (userActive.password !== password) {
            console.log("Incorrect password.");
            console.log("Please enter your password agian.");
        }
    } while (userActive.password !== password);

    accessUser(userActive);
}

function signUp() {
    var numberacc = Object.keys(dataUser).length;

    do {
        var username = readlineSync.question("Username: ");

        if (username === '') {
            console.log("Please enter your username agian.");
        }
    } while (username === '');

    do {
        var password = readlineSync.question("Password(6 -> 12 characters): ");

        if (password.length < 6 || password.length > 12) {
            console.log("Please enter your password again (6 -> 12 characters).");
        }
    } while (password.length < 6 || password.length > 12);

    do {
        var retypepassword = readlineSync.question("Retype password: ");

        if (retypepassword !== password) {
            console.log("Please enter your retype-password again.");
        }
    } while (retypepassword !== password);

    do {
        var fullname = readlineSync.question("Fullname: ");

        if (fullname === '') {
            console.log("Please enter your full name agian.");
        }
    } while (fullname === '');

    dataUser[numberacc] = {};
    dataUser[numberacc].fullname = fullname;
    dataUser[numberacc].username = username;
    dataUser[numberacc].password = password;

    console.log("Creating...");

    fs.writeFileSync('./datauser.json', JSON.stringify(dataUser));

    console.log("Completed.");

    accessUser(dataUser[numberacc]);
}

function accessUser(user) {
    console.log("Hello", user.fullname + "!.", "I'm the library system!!! Can I help you?");
    console.log("1. Check the borrowed books.");
    console.log("2. Find the book");
    console.log("3. Save & Sign out.");

    do {
        var choose = readlineSync.question("Your choosen: ");

        switch (choose) {
            case "1": console.log("Check the borrowed books: ");
                checkBooks(user);
                break;
            case "2": console.log("Find the book: ");
                findBook(user);
                break;
            case "3": librarySystem();
                break;
            default: console.log("Please enter the correct selection!!!");
                break;
        }
    } while (choose !== "1" && choose !== "2" && choose !== "3");
}

function checkBooks(user) {
    var numberActive = 0;
    var user = dataUser.find(function (x) {
        numberActive++;
        return x.name === user.name;
    })
    if (Object.keys(user).length === 3) {
        console.log("You haven't borrowed any books!!!");
        console.log("You can:");
        console.log("1. Find the book");
        console.log("2. Save & Sign out.");

        do {
            var choose = readlineSync.question("Your choosen: ");

            switch (choose) {
                case "1": console.log("Find the book: ");
                    findBook(user);
                    break;
                case "2": librarySystem();
                    break;
                default: console.log("Please enter the correct selection!!!");
                    break;
            }
        } while (choose !== "1" && choose !== "2");
    } else {
        var today = new Date();
        today = new Date(today.getTime() + 7 * 60 * 60 * 1000);
        var timeExpire = 0;

        for (var i of user.books) {
            if (i.status === "Gave the book") {
                continue;
            }
            if (diff(today, i.endday) < 0) {
                timeExpire += diff(today, i.endday);
                i.status = "Overdue " + (-diff(today, i.endday)) + " days.";
            } else {
                i.status = "Valid " + (diff(today, i.endday)) + " days.";
            }
        }

        if (timeExpire !== 0) {
            console.log("Total number of days past due: " + (-timeExpire));
        }
        console.log(user.books);

        console.log("You can: ");
        console.log("1. Give book back.");
        console.log("2. Find the book.");
        console.log("3. Save & Sign out.");

        do {
            var choose = readlineSync.question("Your choosen: ");

            switch (choose) {
                case "1": console.log("Give back book: ");
                    console.log("You can choose poisition of book")
                    do {
                        var choose1 = readlineSync.question("Your choosen: ");
                        if (choose1 === '' || parseInt(choose1) <= 0 || parseInt(choose1) > Object.keys(user.books).length) {
                            console.log("No number you choose!! Let's choose again!");
                        } else {
                            user.books[parseInt(choose1) - 1].status = "Gave the book";
                            fs.writeFileSync('./datauser.json', JSON.stringify(dataUser));
                        }
                    } while (choose1 === '' || parseInt(choose1) <= 0 || parseInt(choose1) > Object.keys(user.books).length);

                    accessUser(user);
                    break;
                case "1": console.log("Find the book: ");
                    findBook(user);
                    break;
                case "3": librarySystem();
                    break;
                default: console.log("Please enter the correct selection!!!");
                    break;
            }
        } while (choose !== "1" && choose !== "2" && choose !== "3");

    }
}

function findBook(user) {
    var orderActive;
    var keywordsum = "";
    var keyword = "";

    do {
        keyword = readlineSync.question("Keyword for finding the book: " + keywordsum);
        keywordsum += keyword;

        if (keywordsum === '') {
            console.log("Let's write right the keyword!!!");
            findBook(user);
        }

        var lookfor = dataBook.filter(function (x) {
            return deleteSign(x.name).toUpperCase().indexOf(deleteSign(keywordsum).toUpperCase()) >= 0 || deleteSign(x.id).toUpperCase().indexOf(deleteSign(keywordsum).toUpperCase()) >= 0 || deleteSign(x.author).toUpperCase().indexOf(deleteSign(keywordsum).toUpperCase()) >= 0;
        });

        console.log(lookfor);

        if (Object.keys(lookfor).length > 1) {
            console.log("You can: ");
            console.log("1. Continue to fill keyword.");
            console.log("2. Choose order of that table.");
            console.log("3. Choose id of the book of that table you want.");

            do {
                var choose = readlineSync.question("Your choosen: ");
                switch (choose) {
                    case "1": break;
                    case "2": var orderChoosen = 0;

                        var lookforFirst = lookfor.find(function (x) {
                            orderChoosen++;
                            return deleteSign(x.name).toUpperCase().indexOf(deleteSign(keywordsum).toUpperCase()) >= 0 || deleteSign(x.id).toUpperCase().indexOf(deleteSign(keywordsum).toUpperCase()) >= 0 || deleteSign(x.author).toUpperCase().indexOf(deleteSign(keywordsum).toUpperCase()) >= 0;
                        });

                        do {
                            var numb = readlineSync.question("You choose the number line: ");

                            if (parseInt(numb) <= 0 || parseInt(numb) > parseInt(numb) > Object.keys(lookfor).length) {
                                console.log("No line you choose!! Let's choose again!");
                            } else {
                                lookfor = [lookfor[orderChoosen - 2 + parseInt(numb)]];

                                console.log("Your choosen:", lookfor);
                            }
                        } while (parseInt(numb) <= 0 || parseInt(numb) > parseInt(numb) > Object.keys(lookfor).length);
                        break;
                    case "3": do {
                        var idChoosen = readlineSync.question("You choose id: ");

                        lookfor = lookfor.find(function (x) {
                            return x.id === idChoosen;
                        });

                        if (lookfor === undefined) {
                            console.log("No id you choose!! Let's choose again!");
                        } else {
                            lookfor = [lookfor];
                            console.log("Your choosen:", lookfor);
                        }
                    } while (lookfor === undefined);
                        break;
                    default: console.log("Please enter the correct selection!!!");
                        break;
                }
            } while (choose !== "1" && choose !== "2" && choose !== "3");
        }
    } while (Object.keys(lookfor).length !== 0 && Object.keys(lookfor).length !== 1);


    if (Object.keys(lookfor).length === 0) {
        console.log("Not found");
        findBook(user);
    } else {
        console.log("1. Borrow book.");
        console.log("2. Choose another book.");
        console.log("3. Save & Sign out.");

        do {
            var choose = readlineSync.question("Your choosen: ");
            switch (choose) {
                case "1": var startday = new Date();
                    startday = new Date(startday.getTime() + 7 * 60 * 60 * 1000);
                    console.log("Borrow date :", startday);

                    do {
                        var endday = readlineSync.question("Return date(XXXX/YY/ZZ XX:YY): ");
                        if (endday === '' || diff(startday, endday) <= 0) {
                            console.log("Please enter the correct time!!!")
                        }
                    } while (endday === '' || diff(startday, endday) <= 0);

                    if (Object.keys(user).length === 3) {
                        user.books = [];
                        var order = 0;
                    } else {
                        var order = Object.keys(user.books).length;
                    }

                    lookfor[0].startday = JSON.stringify(startday);
                    lookfor[0].endday = endday;
                    lookfor[0].status = "valid " + diff(startday, endday) + " days";
                    user.books[order] = lookfor[0];

                    fs.writeFileSync('./datauser.json', JSON.stringify(dataUser));

                    console.log("Already borrowed!!!")
                    accessUser(user);
                    break;
                case "2": findBook(user);
                    break;
                case "3": librarySystem();
                    break;
                default: console.log("Please enter the correct selection!!!");
                    break;
            }
        } while (choose !== "1" && choose !== "2" && choose !== "3");
    }
}

function diff(fromDate, toDate) {
    var fromDate1 = new Date(fromDate);
    var toDate1 = new Date(toDate);
    return ((toDate1.getTime() - fromDate1.getTime()) / (24 * 60 * 60 * 1000)).toFixed(1);
}

function deleteSign(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

librarySystem();