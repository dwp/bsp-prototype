const express = require('express')
const {getResearchScenario, clearFormData} = require('./common/functions')

const router = new express.Router()

router.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(JSON.stringify(req.session.data, null, 2))
  }
  next()
})

// -----------------------------------------------------------------------------
// Settings --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

router.post('/settings', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/start-new-claim`)
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
// Capture a claim -------------------------------------------------------------
// -----------------------------------------------------------------------------
// Start new claim
router.get('/start-new-claim', (req, res) => {
  clearFormData(req)
  res.redirect(`/${req.feature}/${req.sprint}/claim-date`)
})

// Claim date
router.get('/claim-date', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/claim-date`)
})
router.post('/claim-date', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claimant-details`)
})

// Claimant details
router.get('/claimant-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/claimant-details`)
})
router.post('/claimant-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
})

// Partner details
router.get('/partner-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/partner-details`)
})
router.post('/partner-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/children-details`)
})

// Children details
router.get('/children-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/children-details`)
})
router.post('/children-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/payment-details`)
})

// Payment details
router.get('/payment-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/payment-details`)
})
router.post('/payment-details', (req, res) => {
  const id = req.session.data.scenario || 1
  const researchScenario = getResearchScenario(req)
  if (researchScenario) {
    return res.redirect(`/${req.feature}/${req.sprint}/confirm-details/${researchScenario}`)    
  }
  return res.redirect(`/${req.feature}/${req.sprint}/confirm-details/${id}`)
})

// Confirm details
router.get('/confirm-details/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/confirm-details`, {id: req.params.id, changeLinks: true})
})
router.post('/confirm-details/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (id === 3) {
    return res.redirect(`/${req.feature}/${req.sprint}/pause-claim/${id}`)
  }
  if (id === 2) {
    return res.redirect(`/${req.feature}/${req.sprint}/decision-disallowed/${id}`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-allowed/${id}`)
})

// Pause claim for
router.get('/pause-claim/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/pause-claim`, {id: req.params.id})
})
router.post('/pause-claim/:id', (req, res) => {
  if (req.params.id === '4') {
    req.session.data.pausedClaims = false
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-paused/${req.params.id}`)
})

// -----------------------------------------------------------------------------
// Decisions -------------------------------------------------------------------
// -----------------------------------------------------------------------------

// Allowed
router.get('/decision-allowed/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decisions/allowed`, {id: req.params.id})
})

// Disallowed
router.get('/decision-disallowed/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decisions/disallowed`, {id: req.params.id})
})

// Paused
router.get('/decision-paused/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decisions/paused`, {id: req.params.id})
})

// -----------------------------------------------------------------------------
// Tasks -----------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Verify marriage
router.get('/verify-marriage/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/tasks/verify-marriage`, {id: req.params.id})
})
router.post('/verify-marriage/:id', (req, res) => {
  const id = req.params.id
  if (req.session.data.verification) {
    if (id === '4') {
      req.session.data.pausedClaims = 'No'
    }
    if (req.body.marriageVerified === 'married') {
      req.session.data.verification['marriage-verified'] = 'Yes'
      return res.redirect(`/${req.feature}/${req.sprint}/decision-allowed/${id}`)
    }
    if (req.body.marriageVerified === 'not-married') {
      return res.redirect(`/${req.feature}/${req.sprint}/decision-disallowed/${id}`)
    }
  }
  res.redirect(`/${req.feature}/${req.sprint}/pause-claim/${id}`)
})

// -----------------------------------------------------------------------------
// View claim ------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:id/:status', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/claim/claim`, {id: req.params.id, status: req.params.status})
})

// -----------------------------------------------------------------------------
// View schedule ---------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {id: req.params.id, status: req.params.status})
})

module.exports = router
