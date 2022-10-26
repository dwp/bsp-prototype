const express = require('express')
const moment = require('moment')

const router = new express.Router()

router.get('/', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/index`, {sprint: req.sprint})
})

router.get('/find-a-payment-schedule', (req, res) => {
  const nino = req.query.nino || ''
  res.render(
    `${req.feature}/${req.sprint}/find-a-payment-schedule`, {
      sprint: req.sprint,
      nino: nino.toUpperCase()
    }
  )
})

router.get('/schedule/:id', (req, res) => {
  res.render(
    `${req.feature}/${req.sprint}/schedules/schedule${req.params.id}`, {
      sprint: req.sprint,
      todayDate: moment(new Date()).format('D MMMM YYYY'),
      previousDate: moment(new Date()).subtract(3, 'months').format('D MMMM YYYY')
    })
})

module.exports = router
