const data = require("./data")

const express = require("express")
const app = express()
const matches = require('./routes/matches')
const teams = require('./routes/teams')
const players = require('./routes/players')

// app.use((req, res) => {
//     console.log("YAYYAA")
//     res.send("<h1> Hiiiii </h1>")
// })

app.use(express.json())

app.use('/matches', matches)
app.use('/teams', teams)
app.use('/player', players)


app.get('/all', (req, res) => {
    console.log(data)
    res.json({
        message: "Got all data",
        data
    })
})

app.get('/scorer/:teamName', (req, res) => {
    const teamData = data.teams
    const teamName = req.params.teamName
    const givenTeam = teamData.filter((givenTeam) => givenTeam.name === teamName)
    let topScorer = [];
    let topWicketTaker = []
    if (givenTeam.length != 0) {
        const allPlayers = givenTeam[0].players
        topScorer = allPlayers.filter((player) => player.score === Math.max(...allPlayers.map(player => player.score)))
        topWicketTaker = allPlayers.filter((player) => player.wickets === Math.max(...allPlayers.map(player => player.wickets)))
    }
    res.json({
        message: givenTeam.length != 0 ? "Here are all the teams" : "No team found",
        topScorer,
        topWicketTaker
    })
})

app.get('/today', (req, res) => {
    const date = new Date().toISOString().slice(0, 10)
    const matchForDate = (data.matches).filter((givenMatch) => givenMatch.date === date)
    res.json({
        message: matchForDate.length != 0 ? "Here are all matches for today" : "No Matches for today",
        data: matchForDate
    })

})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})