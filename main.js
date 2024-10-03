import fetch from "node-fetch";

let api_url = "https://www.lucknowsupergiants.in/cricket/live/json/krlko05202023222240.json" 

async function jsonDataParsing() {
    const response = await fetch(api_url);
    const data = await response.json();
    return data

}
// console.log(jsonDataParsing())

async function getVenue() {
    const data = await jsonDataParsing();
    const venue =   data.Matchdetail.Venue.Name;
    // console.log("Venue: " + venue)
    return venue
}
const ans = await getVenue();
console.log(
    "Venue: " + ans);
// console.log("Venue: " + getVenue)



async function getHighestScore() {
    const data = await jsonDataParsing();
    let highestScore = data.Innings[0].Batsmen;
    // console.log(highestScore)
    let highScore = 0;
    for (let i = 0; i < highestScore.length; i++) 
        {
        const score = Number(highestScore[i].Runs)
        const balls = Number(highestScore[i].Balls)
        if (score > highScore) {
            highScore = score 
        }
        // console.log(highScore)
    }
    return highScore
}
const score = await getHighestScore();
console.log("Highest Score: " + score)


// const getHighestScore = jsonDataParsing().then(data => {
//     let highestScore = data.Innings[0].FallofWickets;
//     let highScore = 0;
//     for (let i = 0; i < highestScore.length; i++) {
//         if (highestScore[i].Runs > highScore) {
//             highScore = highestScore[i].Runs
//         }
//     }
//     console.log("Highest Score: " + highScore)
// })



async function getHighestWickets() {
    const data = await jsonDataParsing();
    let highestWickets = data.Innings[0].Bowlers;
    let highWickets = 0;
    for (let i = 0; i < highestWickets.length; i++) {
        const wickets = Number(highestWickets[i].Wickets)
        if (wickets > highWickets) {
            highWickets = wickets
        }
        // console.log(highWickets)
    }
    return highWickets
}


const wickets = await getHighestWickets();
console.log("Highest Wickets: " + wickets)


function getPlayers(team) {
    // console.log(team)

    // let names = [];
    // for (let key in team.Players) {
    //     // console.log(teamHomeObj.Players[i].Name_Full)
    //     // console.log(teamAwayObj.Players[i].Name_Full)
    //     let players =  team.Players[]

    //     // console.log("sdsds" + players[key])

                
    //    for (let i in players) {
        
    //     //    console.log(i)
    //     if(i.Confirm_XI)
    //         console.log("hee" + i)
                
    //             names.push(players[i.Name_Full])
    //     }
    // }
    // // console.log("name " + names)

    // return names


        let names = [];

        for (let key in team.Players) {

          let player = team.Players[key];

          if (player.Confirm_XI) {
            names.push(player.Name_Full);
          }
        }
        return names;
      
    

    
}

async function getStartingXI() {
    const data = await jsonDataParsing();
    // console.log("data+++",data.Teams)
    let teamHome = data.Matchdetail.Team_Home;
    let teamAway = data.Matchdetail.Team_Away;

    let teamHomeObj = data.Teams[teamHome]
    let teamAwayObj = data.Teams[teamAway]

    let home =   getPlayers(teamHomeObj)
    let away =  getPlayers(teamAwayObj)

    // console.log(teamHomeObj.Players)

    // for (let key in teamHomeObj.Players) {
    //     // console.log(teamHomeObj.Players[i].Name_Full)
    //     // console.log(teamAwayObj.Players[i].Name_Full)
    //     let playersHome =  teamHomeObj.Players[key]
    //     let playersAway =  teamAwayObj.Players[key]
                
        

    //    for (let i in players) {
    //         if (i == "Name_Full") {
    //             names.push(players[i])
    //         }
    //     }
    // }

    return  { home, away }




  
    // console.log("Starting XI: " +  + " " + teamAway)
}


getStartingXI().then(result => {
console.log("Home team :", result.home);
console.log("Away team ", result.away);
  });






//   6.getHighestPartnership(match) | returns names of the players with the highest partnership in an array

async function getHighestPartnershipWithNames() {
    const data = await jsonDataParsing();
    let innings = data.Innings;
    let highestPartnership = {
      runs: 0,
      batsmen: [],
    };
  
    innings.forEach((inning) => {
      if (inning.Partnerships) {
        inning.Partnerships.forEach(partnership => {
          let runs = parseInt(partnership.Runs);
          if (runs > highestPartnership.runs) {
            highestPartnership = {
              runs: runs,
              batsmen: partnership.Batsmen.map(b => b.Batsman),
            };
          }
        });
      }
    });
  
  
  
    let names = [ ];

    let teams = data.Teams
    
    for (let key in teams) {
        for (let value in teams[key]) {
            for (let prop in teams[key][value]) {
                if (prop === highestPartnership.batsmen[0] || prop === highestPartnership.batsmen[1]) {
                    names.push(teams[key][value][prop].Name_Full);
                }
            }
        }
    }

    return { runs: highestPartnership.runs, batsmen: names };

    
  }

  
  
  getHighestPartnershipWithNames().then(result => {
    console.log("Highest Partnership: " + result.runs + " runs by " + result.batsmen[0] + " and " + result.batsmen[1]);
  });



  
  


   




  


