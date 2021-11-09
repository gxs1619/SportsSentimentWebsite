

/**
 * This function is called when the user submits the form for 
 * team/game information.
 */
function confirmParameters(){
    t1n = document.forms[0].team1name.value;
    t2n = document.forms[0].team2name.value;
    city = document.forms[0].city.value;
    date = document.forms[0].date.value;
    sport = document.forms[0].sport.value;

    if(dateValidation(date) && inputVal(t1n) && inputVal(t1n) && inputVal(t1n)){
        alert(t1n + " " + t2n + " " + city + " " + date + " " + sport)
    }else{
        alert("Invalid input format")
    }
}

function inputVal(inp){
    if(inp == ""){
        return false;
    }
}

function dateValidation(date){
    if(date == ""){
        return false;
    }
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(!(date_regex.test(date))){
        return false;
    }else{
        return true;
    }
}


/**
 * Below functions will be used when we're actually 
 * needing to get data from the website. 
 */
function updateTeam1Results(){

}

function updateTeam2Results(){

}