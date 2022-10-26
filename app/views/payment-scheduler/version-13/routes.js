const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/find-a-payment-schedule`)
})

router.get('/set-up-a-payment-schedule', (req, res) => {
  res.redirect('/payment-scheduler/version-10/set-up-a-payment-schedule')
})

router.get('/find-a-payment-schedule', (req, res) => {
  const nino = req.query.nino
  res.render(`${req.feature}/${req.sprint}/find-a-payment-schedule`, {nino})
})

router.post('/change-rate', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/schedule`)
})

router.post('/change-payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/schedule`)
})

module.exports = router
