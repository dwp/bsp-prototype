const express = require('express')
const path = require('path')
const router = new express.Router()
const {logOnPost} = require('../../../../lib/utils')

// Log session to console on POST requests
router.use(logOnPost)
router.use('/load-pdf/', express.static(path.join(__dirname, '../version-15/_pdf')))

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
  res.render(`${req.feature}/${req.sprint}/find-a-claim/find-a-claim`, {search, d})
})

// -----------------------------------------------------------------------------
// Start a new claim -----------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-a-new-claim/', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim/${scenario}`)
})
router.get('/start-a-new-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/claim-details/${scenario}`)
})

router.get('/claim-details/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.render(`${req.feature}/${req.sprint}/capture/claim-details`, {scenario})
})
router.post('/claim-details/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/duplicate-claim/${scenario}`)
})
// Duplicate claim -------------------------------------------------------------
router.post('/duplicate-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario
  if (req.body.duplicate.ninoCorrect === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/claim-details/${scenario}`)
  }
  if (scenario === '2' || scenario === '3') {
    return res.redirect(`/${req.feature}/${req.sprint}/duplicate-error/${scenario}`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})

// -----------------------------------------------------------------------------
// Duplicate claim -------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/duplicate-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  const d2 = require(`./_dummy-data/scenarios.json`)
  res.render(`${req.feature}/${req.sprint}/duplicate-claim/duplicate-claim`, {scenario, d, d2})
})

router.get('/duplicate-error/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  res.render(`${req.feature}/${req.sprint}/duplicate-claim/duplicate-error`, {scenario})
})

// -----------------------------------------------------------------------------
// Task list -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/task-list/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  const d2 = require(`./_dummy-data/scenarios.json`)
  const t = require(`./_dummy-data/_test.json`)
  res.render(`${req.feature}/${req.sprint}/task-list/task-list`, {scenario, d, t, d2})
})

// -----------------------------------------------------------------------------
// Completed claims ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:scenario/:decision', (req, res) => {
  const decision = req.params.decision
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  const t = require(`./_dummy-data/_test.json`)
  res.render(`${req.feature}/${req.sprint}/completed-claim/${decision}`, {scenario, decision, d, t})
})

// -----------------------------------------------------------------------------
// Schedule --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  const schedule = require(`./_dummy-data/_schedule.json`)
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {d, schedule})
})

module.exports = router
