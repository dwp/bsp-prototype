const express = require('express')
const path = require('path')
const router = new express.Router()
const {logOnPost} = require('../../../../lib/utils')
const {addToLog, getTestDate} = require('./functions')

// Log session to console on POST requests
router.use(logOnPost)

// Set path for PDF's
router.use('/load-pdf/', express.static(path.join(__dirname, './_pdf')))

router.use((req, res, next) => {
  res.locals.todayDate = getTestDate()
  next()
})

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

// -----------------------------------------------------------------------------
// Settings --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/settings', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/settings`)
})
router.post('/settings', (req, res) => {
  const scenario = req.body.scenario || '1'
  if (scenario === '3' || scenario === '4') {
    req.session.data = {
      "children": {
        "dependant-children": "No",
        "pregnant": "No"
      },
      "log": [
        {
          "title": "Children details entered",
          "caption": ""
        },
        {
          "title": "Payment details entered"
        }
      ],
      "payment-details-provided": "Yes",
      "bank-type": "bank",
      "payment": {
        "name-on-account": "",
        "sort-code": "",
        "account-number": "",
        "roll-number": ""
      },
      "death": {
        "form": "Yes"
      },
      "marriage": {
        "form": "Yes",
        "verified": "No",
        "dateOfMarriage": {
          "day": "",
          "month": "",
          "year": ""
        }
      },
      "wait": "rvu",
      "conts": {
        "enoughUK": "Yes",
        "country": ""
      }
    }
  }
  if (scenario === '3') {
    req.session.data.log.push(
      {
        "title": "Relationship checked",
        "caption": "Certificate and 194 / 195 form requested."
      },
      {
        "title": "Referred to RVU",
        "caption": ""
      }
    )
  }
  if (scenario === '4') {
    req.session.data.log.push(
      {
        "title": "Relationship checked",
        "caption": "Certificate and 194 / 195 form requested."
      }
    )
  }
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim/${scenario}`)
})

// -----------------------------------------------------------------------------
// Find a claim ----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/find-a-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim/find-a-claim`, {scenario, search, d})
})

// -----------------------------------------------------------------------------
// Start a new claim -----------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-a-new-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  res.render(`${req.feature}/${req.sprint}/capture/claim-details`, {scenario, start: true})
})
router.post('/start-a-new-claim/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})


// -----------------------------------------------------------------------------
// CIS -------------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/cis/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/cis/cis-warning`, {scenario, start: true, d})
})

// -----------------------------------------------------------------------------
// Task list -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/task-list/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/task-list/task-list`, {scenario, d})
})

// -----------------------------------------------------------------------------
// Capture ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/capture/${page}`, {scenario})
})
router.post('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'capture')
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})

// -----------------------------------------------------------------------------
// Verification ----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.post('/verify/relationship/:scenario', (req, res) => {
  const scenario = req.params.scenario
  if (req.body.marriage.verified === 'Yes') {
    addToLog(req, 'marriage')
    return res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/evidence-needed/${scenario}`)
})
router.get('/verify/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/verify/${page}`, {scenario})
})
router.post('/verify/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'verify')
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})

router.get('/evidence-needed/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.render(`${req.feature}/${req.sprint}/capture/evidence-needed`, {scenario})
})
router.post('/evidence-needed/:scenario', (req, res) => {
  const scenario = req.params.scenario
  if (req.body.doNext === 'disallow') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/are-you-sure/${scenario}`)
  }
  addToLog(req, 'evidence', req)
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})

// -----------------------------------------------------------------------------
// Confirm details -------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/confirm-details/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/confirm-details/confirm-details`, {scenario, d})
})
router.post('/confirm-details/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/allowed`)
})

// -----------------------------------------------------------------------------
// Decisions -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/decisions/are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/decisions/are-you-sure`, {scenario, d})
})
router.post('/decisions/are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/disallowed`)
})
router.get('/decisions/:scenario/:decision', (req, res) => {
  const scenario = req.params.scenario
  const decision = req.params.decision
  res.render(`${req.feature}/${req.sprint}/decisions/${decision}`, {scenario})
})

// -----------------------------------------------------------------------------
// Completed claims ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:scenario/:decision', (req, res) => {
  const decision = req.params.decision
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/completed-claim/${decision}`, {scenario, decision, d})
})

// -----------------------------------------------------------------------------
// Schedule --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  const schedule = require(`./_dummy-data/_schedule.json`)
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {scenario, d, schedule})
})

module.exports = router
