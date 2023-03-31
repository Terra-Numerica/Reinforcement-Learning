$(document).ready(function () {
    setLang()
});

let lang_picked = $('html')[0].lang;

function showTab(page, event) {
    //hide all other tabs
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.add("hidden");
    }
    //show the targeted tab
    var content = document.getElementById(page);
    content.classList.toggle("hidden");

    //change the class of the pressed button
    var buttons = document.getElementsByClassName("nav-tab");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("curr-tab");
    }
    event.classList.add("curr-tab");    
}

function setLang(){
    $("[translate]").each(function () {
        var key = $(this).attr("translate");
        if(lang_picked == "en") {
            var value = texts[key][lang_picked];
        } else if(lang_picked == "fr") {
            var value = texts[key][lang_picked];
        }
        $(this).html(value);
    });
}

function switchLang(){
    if(lang_picked == "en") {
        lang_picked = "fr";
    } else if(lang_picked == "fr") {
        lang_picked = "en";
    }
    setLang();
}