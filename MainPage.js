$(document).ready(function () {
    setLang()
    $('[data-toggle="tooltip"]').tooltip()
});

function updateTooltipValue(element) {
    $(element).attr('data-original-title', element.value).tooltip('show');
    $(element).siblings('span').text('\xa0' + element.value);
}

let langPicked = $('html')[0].lang;

/* Handling the sidebar menu */
function slideMenu() {
    document.getElementById("navbarTabs").style.transform = "translateX(0)";
  }

function closeMenu() {
    document.getElementById("navbarTabs").style.transform = "translateX(-100%)";
}

/**Used to switch the tabs through the navbar */
function showTab(page, event) {
    //hide all other tabs
    let tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.add("d-none");
    }

    //show the targeted tab
    let content = document.getElementById(page);
    content.classList.remove("d-none");

    //change the class of the pressed button
    var buttons = document.getElementsByClassName("nav-tab");
    for (let i = 0; i < buttons.length; i++) {
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
    if(page == "adaptation") {
        if(overallGame != null){
            window.dispatchEvent(new Event('resize'));
        }
    }

}

/**Apply the translation to the page */
function setLang() {
    $("[translation]").each(function () {
        var key = $(this).attr("translation");
        if (langPicked == "en") {
            var value = texts[key][langPicked];
        } else if (langPicked == "fr") {
            var value = texts[key][langPicked];
        }
        $(this).html(value);
    });
}

/**Switch the language */
function switchLang() {
    if (langPicked == "en") {
        langPicked = "fr";
    } else if (langPicked == "fr") {
        langPicked = "en";
    }
    setLang();
}