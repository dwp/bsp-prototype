const express = require('express')

const router = new express.Router()

router.use((req, res, next) => {
  res.locals.claimsToProcess = req.session.data.claimsToProcess
  next()
})

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

router.post('/settings', (req, res) => {
  req.session.data.claimsToProcess = 2
  res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/`)
})

router.get('/home', (req, res) => {
  const claimsToProcess = req.session.data.claimsToProcess
  res.render(`${req.feature}/${req.sprint}/home`, {claimsToProcess})
})

router.use('/build-a-claim', require('./build-a-claim/routes'))
router.use('/find-a-claim', require('./find-a-claim/routes'))
router.use('/process-a-claim', require('./process-a-claim/routes'))

module.exports = router
