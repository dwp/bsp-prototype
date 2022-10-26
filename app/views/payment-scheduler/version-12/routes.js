const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/have-any-payments-been-made-manually`)
})

router.get('/find-a-payment-schedule', (req, res) => {
  res.redirect('/payment-scheduler/version-11/find-a-payment-schedule')
})

router.post('/have-any-payments-been-made-manually', (req, res) => {
  if (req.body['radio-inline-group'] === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/set-up-a-payment-schedule`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/have-all-payments-been-made`)
})

router.post('/have-all-payments-been-made', (req, res) => {
  if (req.body['payments-all-made'] === 'No') {
    return res.redirect(`/${req.feature}/${req.sprint}/you-must-make-all-payments`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/set-up-a-payment-schedule`)
})

router.post('/set-up-a-payment-schedule', (req, res) => {
  if (req.body.nino === 'AB123456C') {
    return res.redirect(`/${req.feature}/${req.sprint}/duplicate-claim`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

router.post('/confirm-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/schedule-created`)
})

router.post('/confirm-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/when-was-the-last-manual-payment-made`)
})

module.exports = router
