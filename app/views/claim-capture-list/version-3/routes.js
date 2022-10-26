const express = require('express')
const {logOnPost} = require('../../../../lib/utils')
const router = new express.Router()

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
  res.render(`${req.feature}/${req.sprint}/start-a-new-claim/start-a-new-claim`)
})
router.post('/start-a-new-claim', (req, res) => {
  const scenario = req.session.data.scenario || '1'
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
  if (scenario === '1') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/allowed`)
  }
  if (scenario === '2') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/disallowed`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/set-reminder`)
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
// Functions -------------------------------------------------------------------
// -----------------------------------------------------------------------------
function addToLog (req, type) {
  const log = req.session.data.log || []
  const page = req.params.page
  if (type === 'capture') {
    const details = page.split('-')
    if (details[0] === 'payment' && req.body['payment-details-provided'] === 'No') {
      log.push(`${capitalizeFirstLetter(details[0])} ${details[1]} missing`)
    } else {
      log.push(`${capitalizeFirstLetter(details[0])} ${details[1]} entered`)
    }
  }
  if (type === 'verify') {
    const details = page.split('-')
    if (page === 'child-benefit') {
      const message = `${capitalizeFirstLetter(details[0])} ${details[1]} verified`
      log.push(message)
    } else {
      const message = `${capitalizeFirstLetter(details[0])} verified`
      log.push(message)
    }
  }
  const set = Array.from(new Set(log))
  req.session.data.log = set
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = router
