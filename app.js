var g_team1Name = "";
var g_team2Name = "";

var apiURL = "";
//AWS.config.access



/**
 * This function is called when the user submits the form for 
 * team/game information.
 */
function confirmParameters(){
    t1n = document.forms[0].team1name.value;
    city1 = city1 = document.forms[0].city1.value;
    t2n = document.forms[0].team2name.value;
    city2 = document.forms[0].city2.value;
    date = document.forms[0].date.value;
    sport = document.forms[0].sport.value;
    console.log(t1n + " " + city1 + " " + t2n + " " + city2 + " " + date + " " + sport)
    if(dateValidation(date) && inputVal(t1n) && inputVal(t2n) && inputVal(city1) && inputVal(city2)){
        g_team1Name = t1n;
        g_team2Name = t2n;
        postUserInput(t1n, city1, t2n, city2, sport, date);
        //alert(t1n + " \n" + city1 + " \n" + t2n + " \n" + city2 + " \n" + date + " \n" + sport)
    }else{
        let alertString = ""
        if(!dateValidation(date)){
            alertString = alertString + "Date missing or format incorrect \n"
        }if(!inputVal(t1n)){
            alertString = alertString + "Team 1 name missing or format incorrect \n"
        }if(!inputVal(t2n)){
            alertString = alertString + "Team 2 name missing or format incorrect \n"
        }if(!inputVal(city1)){
            alertString = alertString + "1st City name missing or format incorrect \n"
        }if(!inputVal(city2)){
            alertString = alertString + "2nd City name missing or format incorrect \n"
        }
        alert(alertString)
    }
}

/**
 * Simple checker to make sure values arent empty strings
 * @param inp input value
 * @returns whether input is empty or not
 */
function inputVal(inp){
    if(inp == ""){
        return false;
    }else{
        return true
    }
}

/**
 * Validates a date in format of yyyy/mm/dd
 * @param date date input to be checked
 * @returns whether date is correct
 */
function dateValidation(date){
    if(date == ""){
        return false;
    }
    // var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    // if(!(date_regex.test(date))){
    //     return false;
    // }
    else{
        return true;
    }
}

/**
 * Below is code that handles the POST and GET requests.
 */



/**
 * This function is used to send the user input to the specified URL.
 * IT assumes it takes the parameters in the URL.
 * @param team1name name of team 1
 * @param city1     city of team 1
 * @param team2name name of team 2
 * @param city2     city of team 2
 * @param sport     sport the two teams play
 * @param date      date of game
 */
function postUserInput(team1name, city1, team2name, city2, sport, date){

    let http = new XMLHttpRequest();
    var params = 'firstTeamName=' + team1name
                + '&secondTeamName=' + team2name
                + '&firstTeamCity=' + city1
                + '&secondTeamCity=' + city2
                + '&sportName=' + sport
                + '&gameDate=' + date

    // var params = {
    //     "firstTeamName" : team1name,
    //     "secondTeamName" : team2name,
    //     "firstTeamCity" : city1,
    //     "secondTeamCity" : city2,
    //     "sportName" : sport,
    //     "gameDate" : date
    // }

    http.open("GET", apiURL + params, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200){
            alert(http.responseText);
        }
    }
    http.send(null);
    
}

function getFinalResults(){
    let http = new XMLHttpRequest();
    http.open("GET", "https://sportssentiment.s3.amazonaws.com/teamData.json", true);
    http.setRequestHeader('Content-type', 'application/json');
    http.setRequestHeader('Access-Control-Allow-Origin', '*');

    http.onreadystatechange = function() { 
        if (http.readyState == 4 && http.status == 200){
            //callback(xmlHttp.responseText);
            //console.log("data: " + http.responseText);
            updateTeamData(http.responseText);
        }else{
            console.log(http.status);
        }
    }
    http.send(null);
}


/**
 * This helper function does the initial data parse, and sends it to the two helper
 * functions that each update the individual team cards
 * @param data raw response data.
 */
function updateTeamData(data){
    jsonData = JSON.parse(data);
    //console.log(jsonData);
    document.getElementById("totalTweets").innerHTML = "Total number of tweets analyzed :" + jsonData["totalTweets"];
    updateTeam1Results(jsonData["team1Name"], jsonData["t1Confidence"], jsonData["t1Result"]);
    updateTeam2Results(jsonData["team2Name"], jsonData["t2Confidence"], jsonData["t2Result"]);
}

/**
 * Below functions will be used when we're actually 
 * needing to get data from the website. 
 */
function updateTeam1Results(teamName, confidence, result){
    document.getElementById("team1").innerHTML = teamName + ":"
    document.getElementById("result1").innerHTML = result + ":"
    document.getElementById("confidence1").innerHTML = confidence + ":"
}

function updateTeam2Results(teamName, confidence, result){
    document.getElementById("team2").innerHTML = teamName + ":"
    document.getElementById("result2").innerHTML = result + ":"
    document.getElementById("confidence2").innerHTML = confidence + ":"
}