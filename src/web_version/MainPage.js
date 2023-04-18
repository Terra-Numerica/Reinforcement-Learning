$(document).ready(function () {
    setLang()
    $('[data-toggle="tooltip"]').tooltip()
});

let langPicked = $('html')[0].lang;

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

    //special cases
    if(page == "interacting"){
        if(newStart){
            interact(4);
        } else if(restart){
            interact(3);
        }
    }

}

function setLang(){
    $("[translate]").each(function () {
        var key = $(this).attr("translate");
        if(langPicked == "en") {
            var value = texts[key][langPicked];
        } else if(langPicked == "fr") {
            var value = texts[key][langPicked];
        }
        $(this).html(value);
    });
}

function switchLang(){
    if(langPicked == "en") {
        langPicked = "fr";
    } else if(langPicked == "fr") {
        langPicked = "en";
    }
    setLang();
}