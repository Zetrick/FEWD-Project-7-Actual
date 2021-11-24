/* eslint-disable no-unused-vars */

// DOM Elements
let alert_banner = document.getElementById("alerts");
let traffic_chart_ul = document.querySelector(".traffic-chart-nav");
let user_field = document.querySelector("#user-field");
let message_field = document.querySelector("#message-field");
let btn_send_message = document.querySelector("#send");
let notification_bell = document.querySelector(".notification-header .svg-wrapper");
let notification_list = document.querySelector(".notification-list");

update_notification_count();
restore_local_storage_settings();

//title [string]
//message [string]
//type [string] (current acceptable values are 'alert' and 'confirm')
//color [string] (current acceptable values are 'red' and 'purple')
//cancel_btn_text [string]
//accept_btn_text [string]
function show_popup(title, message, type, color, cancel_btn_text = "Close", accept_btn_text = "Ok") {
    janelaPopUp.abre("popup", "p" + " " + color + ' ' + type, title, message,
        cancel_logic, accept_logic, cancel_btn_text, accept_btn_text);
}

//Func called when 'cancel' button is pressed on alert dialog
function cancel_logic() {
    janelaPopUp.fecha("popup");
}

//Func called when 'accept' button is pressed on alert dialog
//This only happens when they're resetting their Settings
function accept_logic() {
    localStorage.clear();

    //Reset Toggle Buttons to 'OFF' position
    let toggle_buttons = document.querySelectorAll(".toggle-switch-container input");
    for (let i = 0; i < toggle_buttons.length; ++i) {
        toggle_buttons[i].checked = false;
    }

    //Select 0 Index on TimeZone dropdown menu
    document.querySelector("#timezone").selectedIndex = 0;
    janelaPopUp.fecha("popup");
}

function restore_local_storage_settings() {
    // document.querySelector("#profile-visibility-state").checked = localStorage.profile_visibility_state;
    document.querySelector("#timezone").selectedIndex = localStorage.timezone_state;
    document.querySelector("#email-notification-state").checked = localStorage.send_email_notification_state === 'true' ? true : false;
    document.querySelector("#profile-visibility-state").checked = localStorage.profile_visibility_state === 'true' ? true : false;
}

function update_notification_count() {
    let notification_count = document.querySelectorAll(".close-notification").length;
    if (notification_count > 0)
        document.querySelector(".notification-dot").textContent = notification_count;
    else {
        document.querySelector(".notification-dot").textContent = "";
    }

    return notification_count;
}

//Auto Complete Array
const user_names = ["Dale Byrd", "Dan Oliver", "Dawn Wood", "Victoria Chambers"];
autocomplete(document.querySelector("#user-field"), user_names);

//Auto Complete Functionality
//Author: Unknown
//From: https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

notification_list.addEventListener('click', (event) => {

    if (event.target.classList.contains("close-notification")) {
        event.target.parentNode.remove();
    }

    update_notification_count();
});

// Alert Banner Logic
alert_banner.innerHTML =
    `
        <div class="alert-banner">
        <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
        to complete</p>
        <p class="alert-banner-close">X</p>
        </div>
    `;

alert_banner.addEventListener('click', (event) => {
    if (event.target.classList.contains("alert-banner-close")) {
        alert_banner.style = "animation: whisk-away .5s ease-in forwards;"
        setTimeout(() => {
            alert_banner.style.display = "none"
        }, 500);
    }
});

// Notification Bell Wiggle
notification_bell.addEventListener('mouseenter', (event) => {
    notification_bell.querySelector("svg").classList = "";
    setTimeout(() => {
        notification_bell.querySelector("svg").classList.add("wiggle-animate");
    }, 1);
});

// Notification Bell Click
notification_bell.addEventListener('click', (event) => {

    let ul = notification_list.querySelector("ul");

    if (ul.style.display === '' && update_notification_count() !== 0)
        ul.style.display = 'block';
    else
        ul.style.display = '';
});

function update_chart_data(incoming_data) {
    traffic_chart.data.datasets[0].data = incoming_data.datasets[0].data;
    traffic_chart.data.labels = incoming_data.labels;
    traffic_chart.update();
}

//Traffic Data Set Selector Logic
traffic_chart_ul.addEventListener('click', (event) => {
    //Remove the '.selected' class from all ul elements in ul
    for (let i = 0; i < traffic_chart_ul.childElementCount; ++i) {
        traffic_chart_ul.children[i].classList = '';
    }

    event.target.classList.add("selected");
    if (event.target.textContent.toUpperCase().includes("HOURLY")) {
        update_chart_data(hourly_line_data);
    } else if (event.target.textContent.toUpperCase().includes("DAILY")) {
        update_chart_data(daily_line_data);
    } else if (event.target.textContent.toUpperCase().includes("WEEKLY")) {
        update_chart_data(weekly_line_data);
    } else if (event.target.textContent.toUpperCase().includes("MONTHLY")) {
        update_chart_data(monthly_line_data);
    } else {
        alert("Should never see this! 12345");
    }
});

// Send Message Logic
btn_send_message.addEventListener('click', (event) => {

    //Stop the button from refreshing the page
    event.preventDefault();

    if (user_field.value === "" && message_field.value === "") {
        show_popup("Incomplete Form Field", "Please fill out user and message fields before sending", "alert", "red");
    } else if (user_field.value === "") {
        show_popup("Incomplete Form Fields", "Please fill out user field before sending", "alert", "red");
    } else if (message_field.value === "") {
        show_popup("Incomplete Form Fields", "Please fill out message field before sending", "alert", "red");
    } else {
        show_popup("Sent!", `Message successfully sent to: ${user_field.value}`, "alert", "purple");
        user_field.value = '';
        message_field.value = '';
    }
});

//Save Button Logic
document.querySelector("#save").addEventListener('click', (event) => {
    //Save toggle button states
    localStorage.send_email_notification_state = document.querySelector("#email-notification-state").checked;
    localStorage.profile_visibility_state = document.querySelector("#profile-visibility-state").checked;

    //Save Timezone Selection
    localStorage.timezone_state = document.querySelector("#timezone").selectedIndex;
    show_popup("Saved", "Settings Saved!", "alert", "purple");
});

//Cancel Button Logic
document.querySelector("#cancel").addEventListener('click', (event) => {
    show_popup("Clear Settings?", "This will reset all settings to default. Are you sure?",
        "confirm", "red", "Cancel", "Reset");
});