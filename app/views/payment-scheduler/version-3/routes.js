const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/have-any-payments-been-made-manually`)
})

router.post('/have-any-payments-been-made-manually', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/set-up-a-payment-schedule`)
})

router.post('/set-up-a-payment-schedule', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

router.post('/set-up-payment-schedule', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

router.post('/confirm-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/which-payments-have-been-made-manually`)
})

router.post('/which-payments-have-been-made-manually', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/schedule-created`)
})

module.exports = router
