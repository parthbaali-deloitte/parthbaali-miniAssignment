const express = require('express')
const router = express.Router()

const data = require("../data")

router.get('/', (req, res) => {
    const matchData = data.matches
    const { date } = req.query
    if (date) {
        const matchForDate = matchData.filter((givenMatch) => givenMatch.date === date)
        res.json({
            message: matchForDate.length != 0 ? `Found match for ${date}` : "No match for the date provided",
            data: matchForDate
        })
    }
    else {
        res.json({
            message: matchData.length != 0 ? "Here are all the matches" : "No matches",
            data: matchData
        })
    }
})

router.post('/new', (req, res) => {
    const newMatch = req.body
    data.matches.push(newMatch)
    res.json({
        message: "New match created",
        data: newMatch
    })
})

router.put('/edit/:matchId', (req, res) => {
    const selectedMatchId = req.params.matchId
    const matchData = data.matches
    const editData = req.body
    let isFound = false
    matchData.forEach((match, idx) => {
        if (match.id === parseInt(selectedMatchId)) {
            matchData[idx] = {
                ...match,
                ...editData
            }

            isFound = true
            return
        }
    })
    res.json({
        message: isFound ? "Match edited successfully" : "No Match found",
        data: isFound ? matchData : null
    })
})

router.delete('/delete/:matchId', (req, res) => {
    const selectedMatchId = req.params.matchId
    const change = (data.matches).filter((match) => match.id === parseInt(selectedMatchId))
    data.matches = (data.matches).filter((match) => match.id !== parseInt(selectedMatchId))

    res.json({
        message: change.length !== 0 ? "Deleted the match" : "No match with that id found",
        data: change.length !== 0 ? data : null
    })

})

module.exports = router