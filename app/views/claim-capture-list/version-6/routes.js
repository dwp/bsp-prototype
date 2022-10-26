const express = require('express')
const {logOnPost} = require('../../../../lib/utils')
const router = new express.Router()
const {addToLog} = require('./functions')

// Log session to console on POST requests
router.use(logOnPost)

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
router.get('/find-a-claim', (req, res) => {
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim/find-a-claim`, {search})
})

// -----------------------------------------------------------------------------
// Start a new claim -----------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-a-new-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claimant-details`)
})
// ---- Claimant details -------------------------------------------------------
router.get('/claimant-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/start-a-new-claim/claimant-details`)
})
router.post('/claimant-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
})
// ---- Partner details -------------------------------------------------------
router.get('/partner-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/start-a-new-claim/partner-details`)
})
router.post('/partner-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/date-of-claim`)
})
// ---- Date of claim ----------------------------------------------------------
router.get('/date-of-claim', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/start-a-new-claim/date-of-claim`)
})
router.post('/date-of-claim', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  // if (scenario === '2') {
  //   return res.redirect(`/${req.feature}/${req.sprint}/over-spa/${scenario}`)
  // }
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})

// -----------------------------------------------------------------------------
// Task list -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/task-list/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.render(`${req.feature}/${req.sprint}/task-list/task-list`, {scenario})
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
  res.render(`${req.feature}/${req.sprint}/capture/evidence-needed`, {scenario})
})
router.post('/evidence-needed', (req, res) => {
  const scenario = req.session.data.scenario || '1'
  addToLog(req, 'evidence')
  if (req.body.wait === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/are-you-sure`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
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
  res.render(`${req.feature}/${req.sprint}/confirm-details/confirm-details`, {scenario})
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
  const scenario = req.params.scenario
  const decision = req.params.decision
  res.render(`${req.feature}/${req.sprint}/completed-claim/${decision}`, {scenario, decision})
})

// -----------------------------------------------------------------------------
// Schedule --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {scenario})
})

// -----------------------------------------------------------------------------
// Knockouts -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/over-spa/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.render(`${req.feature}/${req.sprint}/capture/over-spa`, {scenario})
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
