const express = require('express')
const path = require('path')
const router = new express.Router()
const {logOnPost} = require('../../../../lib/utils')
const {getTestDate} = require('./functions')

// Log session to console on POST requests
router.use(logOnPost)

// Set path for PDF's
router.use('/load-pdf/', express.static(path.join(__dirname, './_pdf')))

router.use((req, res, next) => {
  res.locals.todayDate = getTestDate()
  next()
})

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim`)
})

// -----------------------------------------------------------------------------
// Start a new claim -----------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-a-new-claim/', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/claim-details`, {start: true})
})

// -----------------------------------------------------------------------------
// Find a claim ----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/find-a-claim/', (req, res) => {
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim/find-a-claim`, {search})
})

// -----------------------------------------------------------------------------
// Completed claims ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:scenario/:decision', (req, res) => {
  const decision = req.params.decision
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/completed-claim/${decision}`, {scenario, decision, d})
})

// -----------------------------------------------------------------------------
// Schedule --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {scenario, d})
})

// -----------------------------------------------------------------------------
// Change rate -----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/capture/change-rate/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const returnToSchedule = req.query.returnToSchedule
  res.render(`${req.feature}/${req.sprint}/capture/change-rate`, {scenario, returnToSchedule})
})
router.post('/capture/change-rate/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const returnToSchedule = req.query.returnToSchedule
  if (returnToSchedule) {
    return res.redirect(`/${req.feature}/${req.sprint}/schedule/${scenario}`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/claim/${scenario}/allowed`)
})

module.exports = router
