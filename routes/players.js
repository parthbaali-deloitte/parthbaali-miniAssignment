const express = require('express')
const router = express.Router()

const data = require("../data")

router.get('/', (req, res) => {
    const teamData = data.teams
    const playerId = req.params.playerId
    let givenPlayers = [];
    teamData.forEach((givenTeam) => givenPlayers.push((givenTeam.players)))
    res.json({
        message: "Player found",
        data: givenPlayers
    })
})

router.get('/:playerId', (req, res) => {
    const teamData = data.teams
    const playerId = req.params.playerId
    let selectedPlayer;
    teamData.filter((givenTeam) => {
        (givenTeam.players).find((givenPlayer) => {
            if (givenPlayer.id === parseInt(playerId)) {
                selectedPlayer = givenPlayer
            }

        })
    })
    res.json({
        message: "Player found",
        data: selectedPlayer
    })
})

router.post('/new/:teamId', (req, res) => {
    const teamData = data.teams
    const teamId = req.params.teamId
    const newPlayer = req.body
    let isFound = false
    teamData.forEach((givenTeam) => {
        if (givenTeam.id === parseInt(teamId)) {
            givenTeam.players.push(newPlayer)
            isFound = true
        }
    })
    res.json({
        message: isFound ? "New player added" : `Team with id: ${teamId} does not exist`,
        data: isFound ? teamData : null
    })
})

router.put('/edit/:playerId', (req, res) => {
    const teamData = data.teams
    const playerId = req.params.playerId
    const editData = req.body
    let isFound = false
    teamData.forEach((givenTeam) => {
        (givenTeam.players).forEach((givenPlayer, idx) => {
            if (givenPlayer.id === parseInt(playerId)) {
                (givenTeam.players)[idx] = {
                    ...givenPlayer,
                    ...editData
                }
                isFound = true
                return
            }

        })
    })
    res.json({
        message: isFound ? "Player edited successfully" : "No such player exists",
        data: isFound ? teamData : null
    })
})

router.delete('/delete/:playerId', (req, res) => {
    const playerId = req.params.playerId
    let change = [];
    (data.teams).forEach((givenTeam) => {
        let playerNow = (givenTeam.players).find((givenPlayer) => givenPlayer.id === parseInt(playerId))
        let playerIndex = (givenTeam.players).findIndex((givenPlayer) => givenPlayer.id === parseInt(playerId))
        if (playerNow !== undefined) {
            (givenTeam.players).splice(playerIndex, 1)
            change.push(playerNow)
        }
    })

    res.json({
        message: change.length !== 0 ? "Deleted the player" : `No player with id: ${playerId} found`,
        data: change.length !== 0 ? data : null
    })

})

module.exports = router