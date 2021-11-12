var g_team1Name = ""
var g_team2Name = ""

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
    console.log(t1n + " " + t2n + " " + city + " " + date + " " + sport)
    if(dateValidation(date) && inputVal(t1n) && inputVal(t2n) && inputVal(city)){
        g_team1Name = t1n
        g_team2Name = t2n
        alert(t1n + " \n" + t2n + " \n" + city + " \n" + date + " \n" + sport)
    }else{
        let alertString = ""
        if(!dateValidation(date)){
            alertString = alertString + "Date missing or format incorrect \n"
        }if(!inputVal(t1n)){
            alertString = alertString + "Team 1 name missing or format incorrect \n"
        }if(!inputVal(t2n)){
            alertString = alertString + "Team 2 name missing or format incorrect \n"
        }if(!inputVal(city)){
            alertString = alertString + "City name missing or format incorrect \n"
        }
        alert(alertString)
    }
}

function inputVal(inp){
    if(inp == ""){
        return false;
    }else{
        return true
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

var ws = new WebSocket("wss://" + window.location.href + "/gameData")

gameInput.onmessage = function(event){
    updateTeamData(event.data)
}


function updateTeamData(data){
    jsonData = JSON.parse(data)
    console.log(jsonData)
    document.getElementById("totalTweets").innerHTML = "Total number of tweets analyzed :" + jsonData["totalTweets"]
    updateTeam1Results(g_team1Name, jsonData["t1Confidence"], jsonData["t1Result"])
    updateTeam2Results(g_team2Name, jsonData["t2Confidence"], jsonData["t2Result"])
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

function updateTeam2Results(){
    document.getElementById("team2").innerHTML = teamName + ":"
    document.getElementById("result2").innerHTML = result + ":"
    document.getElementById("confidence2").innerHTML = confidence + ":"
}