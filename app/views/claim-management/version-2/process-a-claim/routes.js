const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

router.get('/new-claim', (req, res) => {
  if (req.session.data.claimsToProcess === 2) {
    res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim/2`)
  } else if (req.session.data.claimsToProcess === 1) {
    res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim/1`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/home`)
  }
})

router.get('/claim/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/process-a-claim/claim${req.params.id}`)
})

router.post('/claim:id/:verified', (req, res) => {
  req.session.data.claimsToProcess--
  if (req.params.verified === 'verified') {
    res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/schedule-created`)
  } if (req.params.verified === 'reject') {
    res.redirect(`/${req.feature}/${req.sprint}/home`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/to-do-list`)
  }
})

router.get('/verify-:thing/:id', (req, res) => {
  const id = req.params.id
  res.render(`${req.feature}/${req.sprint}/process-a-claim/verify-${req.params.thing}`, {id})
})

router.post('/verify-:thing/:id', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim${req.params.id}`)
})

router.get('/schedule-created', (req, res) => {
  req.session.data.deathVerified = ''
  req.session.data.marriageVerified = ''
  req.session.data.chbVerified = ''
  req.session.data.contsVerified = ''
  res.render(`${req.feature}/${req.sprint}/process-a-claim/schedule-created`)
})

router.post('/set-reminder', (req, res) => {
  req.session.data.deathVerified = ''
  req.session.data.marriageVerified = ''
  req.session.data.chbVerified = ''
  req.session.data.contsVerified = ''
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

module.exports = router
