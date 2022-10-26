const express = require('express')

const router = new express.Router()

router.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(JSON.stringify(req.session.data, null, 2))
  }
  next()
})

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

router.post('/settings', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/find-a-claim`)
})

router.get('/find-a-claim', (req, res) => {
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim`, {search})
})

router.get('/start-new-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claim-date`)
})

router.post('/claim-date', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claimant-details`)
})

router.post('/claimant-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
})

router.post('/partner-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/children-details`)
})

router.post('/children-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/payment-details`)
})

router.post('/payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

router.post('/confirm-details', (req, res) => {
  if (req.session.data.dateOfClaim) {
    const day = String(req.session.data.dateOfClaim.day).padStart(2, '0')
    const month = req.session.data.dateOfClaim.month
    const year = req.session.data.dateOfClaim.year
    const date = day + month + year
    if (date === '02102017') {
      return res.redirect(`/${req.feature}/${req.sprint}/decision-disallowed/2`)
    }
    if (date === '03102017') {
      return res.redirect(`/${req.feature}/${req.sprint}/pause-claim/3`)
    }
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-allowed/1`)
})

router.get('/pause-claim/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/pause-claim`, {id: req.params.id})
})
router.post('/pause-claim/:id', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/decision-paused/${req.params.id}`)
})

router.get('/verify-marriage/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/verify-marriage-${req.params.id}`)
})

router.post('/verify-marriage/:id', (req, res) => {
  const id = req.params.id
  if (id === '4') {
    req.session.data.pausedClaims = 'No'
  }
  if (req.body.marriageVerified === 'married') {
    return res.redirect(`/${req.feature}/${req.sprint}/decision-allowed/${id}`)
  }
  if (req.body.marriageVerified === 'not-married') {
    return res.redirect(`/${req.feature}/${req.sprint}/decision-disallowed/${id}`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-paused/${id}`)
})

// Decisions
router.get('/decision-allowed/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decision-allowed`, {id: req.params.id})
})

router.get('/decision-disallowed/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decision-disallowed`, {id: req.params.id})
})

router.get('/decision-paused/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decision-paused`, {id: req.params.id})
})

module.exports = router
