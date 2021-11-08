

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
    alert(t1n + " " + t2n + " " + city + " " + date + " " + sport)
}


/**
 * Below functions will be used when we're actually 
 * needing to get data from the website. 
 */
function updateTeam1Results(){

}

function updateTeam2Results(){

}