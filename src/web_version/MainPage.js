$(document).ready(function () {
    setLang()
    $('[data-toggle="tooltip"]').tooltip()
});

let langPicked = $('html')[0].lang;

/* Handling the sidebar menu */
function slideMenu() {
    document.getElementById("navbarTabs").style.transform = "translateX(0)";
  }

function closeMenu() {
    document.getElementById("navbarTabs").style.transform = "translateX(-100%)";
}

/* Used to switch the tabs through the navbar */
function showTab(page, event) {
    //hide all other tabs
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.add("d-none");
    }

    //show the targeted tab
    var content = document.getElementById(page);
    content.classList.remove("d-none");

    //change the class of the pressed button
    var buttons = document.getElementsByClassName("nav-tab");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("curr-tab");
    }
    if (event != null) {
        event.classList.add("curr-tab");
    }

    //special cases
    var backBtn = document.getElementById("back_home");
    var home = document.getElementById("home_page");
    if (page == "home_page") {
        backBtn.classList.add("invisible");
        backBtn.classList.remove("visible");
        home.classList.remove("d-none");
    } else {
        backBtn.classList.add("visible");
        backBtn.classList.remove("invisible");
        if(home != null) home.classList.add("d-none");
    }
    if (page == "interacting") {
        if (newStart) {
            interact(4);
        } else if (restart) {
            interact(3);
        }
    }
    if(page == "adaptation" && overallGame != null) {
        window.dispatchEvent(new Event('resize'));
    }

}

function setLang() {
    $("[translate]").each(function () {
        var key = $(this).attr("translate");
        if (langPicked == "en") {
            var value = texts[key][langPicked];
        } else if (langPicked == "fr") {
            var value = texts[key][langPicked];
        }
        $(this).html(value);
    });
}

function switchLang() {
    if (langPicked == "en") {
        langPicked = "fr";
    } else if (langPicked == "fr") {
        langPicked = "en";
    }
    setLang();
}