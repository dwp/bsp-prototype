const express = require('express')
const path = require('path')
const router = new express.Router()
const {logOnPost} = require('../../../../lib/utils')

// Log session to console on POST requests
router.use(logOnPost)
router.use('/pdf/', express.static(path.join(__dirname)))

module.exports = router
