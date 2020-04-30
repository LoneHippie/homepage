const DOMstring = {
    searchBar: document.querySelector('.search-bar'),
    searchButton: document.getElementById('btn-search'),
    clock: document.getElementById('clock')
};

    //NAV SECTION

let searchActive; //returns true/false
const searchPreface = 'https://www.google.com/search?q=';

function arrowSelect() { //functionality for up/down arrows to select/deselect searchbar
    if (event.keyCode == 40) {
        DOMstring.searchBar.focus();
    } else if (event.keyCode == 38) {
        document.activeElement.blur();
    } 
};

function checkActive() { //checks if searchbar is active and changes searchActive to true/false
    if (document.activeElement === DOMstring.searchBar) {
        //console.log('SEARCHBAR SELECTED');
        return searchActive = true;
    } else {
        //console.log('SEARCHBAR DESELECTED');
        return searchActive = false;
    }
};

function addBtnFocus() { //adds a focus class to search button if search bar is focused. Toggles inactive class for animation purposes too
    if (searchActive == true) {
        DOMstring.searchButton.classList.add("btn-focus");
        DOMstring.searchButton.classList.remove("btn-inactive");
    } else if (searchActive == false) {
        DOMstring.searchButton.classList.remove("btn-focus");
        DOMstring.searchButton.classList.add("btn-inactive");
    }
};

function runQuery() { //will throw current search bar value string into href as a search query
    let rawString = DOMstring.searchBar.value;
    let searchString = rawString.split(' ').join('+');
    let searchQuery = searchPreface + searchString;

    //console.log(searchQuery);

    if (rawString.length === 0) {
        console.log('invalid search query')
    } else {
        window.open(searchQuery); //sets current url href to searchQuery value
        document.activeElement.blur(); //unfocus
    }
};

document.addEventListener('keydown', function(event) { //functionality for UP/DOWN, ENTER
    arrowSelect();
    checkActive();
    addBtnFocus();
    
    if (event.keyCode == 13 && searchActive == true) { //enter
        runQuery();
    }

    //console.log(searchActive);
});

document.addEventListener('click', function() { //all click functionality
    checkActive();
    addBtnFocus();

    if (event.target == DOMstring.searchButton) { //works, triggers on search button click only
        runQuery();
    }

    //console.log(searchActive);
});

    //CLOCK

setInterval(() => {
    let curHour = new Date().getHours();
    let curMin = (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes(); //will add zero before min < 10
    //let curSec = new Date().getSeconds();

    DOMstring.clock.textContent = `${curHour}:${curMin}`;
    DOMstring.clock.classList.toggle('tick');
}, 1000);
