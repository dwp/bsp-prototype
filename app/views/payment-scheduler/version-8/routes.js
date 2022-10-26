const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/have-any-payments-been-made-manually`)
})

router.post('/have-any-payments-been-made-manually', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/have-all-payments-been-made`)
})

router.post('/have-all-payments-been-made', (req, res) => {
  if (req.body['payments-all-made'] === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/you-must-make-all-payments`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/set-up-a-payment-schedule`)
})

router.post('/set-up-a-payment-schedule', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

router.post('/confirm-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/schedule-created`)
})

router.post('/confirm-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/when-was-the-last-manual-payment-made`)
})

module.exports = router
