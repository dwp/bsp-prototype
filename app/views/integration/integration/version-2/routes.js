const express = require('express')
const path = require('path')
const router = new express.Router()
const {logOnPost} = require('../../../../lib/utils')
const {addToLog, getTestDate} = require('./functions')

// Log session to console on POST requests
router.use(logOnPost)

// Set path for PDF's
router.use('/load-pdf/', express.static(path.join(__dirname, './_pdf')))

router.use((req, res, next) => {
  res.locals.todayDate = getTestDate()
  next()
})

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

// -----------------------------------------------------------------------------
// Settings --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/settings', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/settings`)
})
router.post('/settings', (req, res) => {
  const scenario = req.body.scenario || '1'
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim/${scenario}`)
})

// -----------------------------------------------------------------------------
// Find a claim ----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/find-a-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim/find-a-claim`, {scenario, search, d})
})

// -----------------------------------------------------------------------------
// Start a new claim -----------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-a-new-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  res.render(`${req.feature}/${req.sprint}/capture/claim-details`, {scenario, start: true})
})
router.post('/start-a-new-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  if (scenario === '1') {
    return res.redirect(`/${req.feature}/${req.sprint}/cis/cis-warning/${scenario}`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/cis/cis-warning/${scenario}`)    
})


// -----------------------------------------------------------------------------
// CIS -------------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/cis/cis-warning/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/cis/cis-warning`, {scenario, start: true, d})
})

module.exports = router
