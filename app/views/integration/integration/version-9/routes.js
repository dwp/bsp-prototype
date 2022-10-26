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
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim/1`)
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

// -----------------------------------------------------------------------------
// Capture ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/capture/${page}`, {scenario})
})
router.post('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'capture')
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
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
  const uprated = req.query.uprated
  console.log(uprated)
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  const schedule = require(`./_dummy-data/_schedule.json`)
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {scenario, d, schedule, uprated})
})

// -----------------------------------------------------------------------------
// Change rate -----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/change-rate/change-rate/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/change-rate/change-rate/change-rate`, {scenario})
})
router.post('/change-rate/change-rate/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const page = req.params.page
  if (scenario === '1' || scenario === '2') {
    return res.redirect(`/${req.feature}/${req.sprint}/confirm-details/children-details/${scenario}`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/child-benefit/${scenario}`)
  }
})

// -----------------------------------------------------------------------------
// Confirm details -------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/confirm-details/children-details/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.render(`${req.feature}/${req.sprint}/confirm-details/children-details/${scenario}`, {scenario})
})
router.post('/confirm-details/children-details/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/schedule/${scenario}?uprated=true`)
})

// -----------------------------------------------------------------------------
// Child Benefit ---------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/child-benefit/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.render(`${req.feature}/${req.sprint}/change-rate/child-benefit/child-benefit`, {scenario})
})
router.post('/child-benefit/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details/children-details/${scenario}`)
})

module.exports = router
