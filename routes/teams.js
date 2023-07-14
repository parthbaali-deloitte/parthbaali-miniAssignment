const express = require('express')
const router = express.Router()

const data = require("../data")

router.get('/', (req, res) => {
    const teamData = data.teams
    res.json({
        message: teamData.length != 0 ? "Here are all the teams" : "No teams found",
        data: teamData
    })
})

router.post('/new', (req, res) => {
    const newTeam = req.body
    data.teams.push(newTeam)
    res.json({
        message: "New team created",
        data: newTeam
    })
})

router.put('/edit/:teamsId', (req, res) => {
    const selectedTeamId = req.params.teamsId
    const teamData = data.teams
    const editData = req.body
    let isFound = false
    teamData.forEach((team, idx) => {
        if (team.id === parseInt(selectedTeamId)) {
            teamData[idx] = {
                ...team,
                ...editData
            }

            isFound = true
            return
        }
    })
    res.json({
        message: isFound ? "Team edited successfully" : "No Team found",
        data: isFound ? teamData : null
    })
})

router.delete('/delete/:teamId', (req, res) => {
    const selectedTeamId = req.params.teamId
    const change = (data.teams).filter((team) => team.id === parseInt(selectedTeamId))
    data.teams = (data.teams).filter((team) => team.id !== parseInt(selectedTeamId))

    res.json({
        message: change.length !== 0 ? "Deleted the team" : "No team with that id found",
        data: change.length !== 0 ? data : null
    })

})

module.exports = router