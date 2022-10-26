const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  const claimType = req.session.data.claimType || 'new'
  res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim-${claimType}/claim`)
})

router.get('/schedule-created', (req, res) => {
  req.session.data.deathVerified = ''
  req.session.data.marriageVerified = ''
  req.session.data.chbVerified = ''
  req.session.data.contsVerified = ''
  res.render(`${req.feature}/${req.sprint}/process-a-claim/schedule-created`)
})

router.post('/verify-:something', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim-${req.session.data.claimType}/claim`)
})

router.post('/set-reminder', (req, res) => {
  req.session.data.deathVerified = ''
  req.session.data.marriageVerified = ''
  req.session.data.chbVerified = ''
  req.session.data.contsVerified = ''
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

module.exports = router
