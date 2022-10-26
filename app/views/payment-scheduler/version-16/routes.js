const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/have-any-payments-been-made-manually`)
})

router.post('/have-any-payments-been-made-manually', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/offline`)
})

module.exports = router
