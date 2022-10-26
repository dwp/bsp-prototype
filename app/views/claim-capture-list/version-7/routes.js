const express = require('express')
const {logOnPost} = require('../../../../lib/utils')
const router = new express.Router()
const {addToLog} = require('./functions')

// Log session to console on POST requests
router.use(logOnPost)

// Set scenario as global
router.use((req, res, next) => {
  res.locals.scenario = req.session.data.scenario || '1'
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
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim`)
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
router.get('/start-a-new-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claim-details`)
})

router.get('/claim-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/claim-details`)
})
router.post('/claim-details', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  if (scenario === '7') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/are-you-sure`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})

// -----------------------------------------------------------------------------
// Task list -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/task-list/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  const t = require(`./_dummy-data/_test.json`)
  res.render(`${req.feature}/${req.sprint}/task-list/task-list`, {d, t})
})

// -----------------------------------------------------------------------------
// Capture ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/capture/:page', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/capture/${page}`, {scenario})
})
router.post('/capture/:page', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  addToLog(req, 'capture')
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})
// ---- Evidence needed --------------------------------------------------------
router.get('/evidence-needed', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/capture/evidence-needed`, {d})
})
router.post('/evidence-needed', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  addToLog(req, 'evidence')
  if (req.body.wait === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/are-you-sure`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})
router.get('/decisions/:scenario/are-you-sure', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/decisions/are-you-sure`, {d})
})
router.post('/decisions/:scenario/are-you-sure', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/disallowed`)
})

// -----------------------------------------------------------------------------
// Verification ----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.post('/verify/relationship', (req, res, next) => {
  const scenario = req.session.data.scenario || '1'
  if (scenario === '5' || req.body.marriage.form === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/are-you-sure`)
  }
  if (scenario === '2' || scenario === '3' || scenario === '4' || req.body.marriage.verified === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/evidence-needed`)
  }
  next()
})
router.get('/verify/:page', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/verify/${page}`, {scenario})
})
router.post('/verify/:page', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  addToLog(req, 'verify')
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})

// -----------------------------------------------------------------------------
// Confirm details -------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/confirm-details/:scenario', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/confirm-details/confirm-details`, {scenario, d})
})
router.post('/confirm-details/:scenario', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  if (scenario === '5') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/disallowed`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/allowed`)
})

// -----------------------------------------------------------------------------
// Decisions -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/decisions/:scenario/:decision', (req, res) => {
  const scenario = req.params.scenario
  const decision = req.params.decision
  res.render(`${req.feature}/${req.sprint}/decisions/${decision}`, {scenario})
})

// -----------------------------------------------------------------------------
// Completed claims ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:scenario/:decision', (req, res) => {
  const decision = req.params.decision
  const scenario = req.session.data.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  const t = require(`./_dummy-data/_test.json`)
  res.render(`${req.feature}/${req.sprint}/completed-claim/${decision}`, {decision, d, t})
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

// -----------------------------------------------------------------------------
// Knockouts -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/over-spa/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  const t = require(`./_dummy-data/_test.json`)
  res.render(`${req.feature}/${req.sprint}/capture/over-spa`, {d, t})
})
router.post('/over-spa/:scenario', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  const dobIncorrect = req.body.dobCorrect === 'No'
  const dodIncorrect = req.body.dodCorrect === 'No'
  if (dobIncorrect) {
    return res.redirect(`/${req.feature}/${req.sprint}/claimant-details`)
  } else if (dodIncorrect) {
    return res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/disallowed`)
})

module.exports = router
