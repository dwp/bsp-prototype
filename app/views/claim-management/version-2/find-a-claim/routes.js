const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/find-a-claim/search`)
})

router.get('/search', (req, res) => {
  const findNino = req.query.findNino
  res.render(`${req.feature}/${req.sprint}/find-a-claim/search`, {findNino})
})

router.post('/search', (req, res) => {
  const findNino = req.body.findNino.toUpperCase()
  if (findNino === 'AA111999A') {
    res.redirect(`/${req.feature}/${req.sprint}/find-a-claim/claim1`)
  } else if (findNino === 'BC123456E') {
    res.redirect(`/${req.feature}/${req.sprint}/find-a-claim/claim2`)
  } else {
    res.render(`${req.feature}/${req.sprint}/find-a-claim/search`, {findNino})
  }
})

module.exports = router
