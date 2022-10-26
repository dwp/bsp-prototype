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
  if (scenario === '2') {
    req.session.data = 
    {
      "scenario": "2",
      /* "children": {
        "dependant-children": "No",
        "pregnant": "No"
      }, */
      "log": [
       /*  {
          "title": "Children details entered",
          "caption": ""
        },
        {
          "title": "Payment details entered"
        }, */
        {
          "title": "Death verified"
        },
		{"title": "Address entered"},
		{"title": "Communication needs entered"}/* ,
		{
		   "title": "Contributions verified"
		} */
      ],
     /*  "payment-details-provided": "Yes", */
      "bank-type": "bank",
      "payment": {
        "name-on-account": "",
        "sort-code": "",
        "account-number": "",
        "roll-number": ""
      },
      "death": {
        "form": "Yes",
        "what-evidence": [
          "CIS"
        ]
      },
      "dateOfdeath": {
        "day": "12",
        "month": "05",
        "year": "2018"
      },
      "conts": {
        /* "enough": "Yes", */
        "year": "2016"
      }
    }
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
  if(req.body.CommunicationNeeds === 'No' || req.body.CommunicationNeeds === 'Yes') {
	//res.redirect(`/${req.feature}/${req.sprint}/decisions/are-you-sure/${scenario}`)  
  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  } else if(req.body.deceased['form'] == 'Yes3'){
    res.redirect(`/${req.feature}/${req.sprint}/decisions/are-you-sure/${scenario}`)
  }else {
	res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  }
})

router.post('/verify/relationshipv2/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  console.info('relationshipv2.........', req.body);
  if(req.body.deceased['form'] == 'Yes3'){
    res.redirect(`/${req.feature}/${req.sprint}/decisions/are-you-sure/${scenario}`)
  } else if(req.body.deceased['form']  == 'Yes2'){
    if(req.body.dc1=='No' && req.body.dc2 == 'No'){
      res.redirect(`/${req.feature}/${req.sprint}/decisions/ch-are-you-sure/${scenario}`)
    } else {
      res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
    }
  }else {
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  }
  
})

router.post('/capture/children-details/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  console.info('children..........', req.body);
  if((req.body.deceased1 == 'Yes2') && (req.body.children['dependant-children'] == 'No' && req.body.children['pregnant'] == 'No')){
    res.redirect(`/${req.feature}/${req.sprint}/decisions/ch-are-you-sure/${scenario}`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  }
  
})


// -----------------------------------------------------------------------------
// Task list -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/task-list/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/task-list/task-list`, {scenario, d})
})




// router.post('/verify/child-benefit/:scenario', (req, res) => {
//   const scenario = req.params.scenario || '1'
//   addToLog(req, 'verify')
//   console.info('scenario.....', req.body)
//   if(req.body.chb['answer'] == 'Yes' || req.body.chb['answer'] == 'No' || req.body.chb['answer'] == '') {
//     res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
//   }
// })

router.post('/verify/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'verify')
  console.info('scenario.....', req.body)

  if(req.body['marriage'] != undefined && req.body.marriage['form'] == 'Yes2') {
    res.redirect(`/${req.feature}/${req.sprint}/decisions/are-you-sure/${scenario}`)
  } else if ((req.body['marriage'] != undefined && req.body.marriage['verified'] == 'Yes') || (req.body['marriage'] != undefined && req.body.marriage['verified1'] == 'Yes')) {
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  } else if(req.body['marriage'] != undefined && req.body.marriage.verified == 'No') {
    res.redirect(`/${req.feature}/${req.sprint}/capture/evidence-needed/${scenario}`)
  } else if(req.body['marriage'] != undefined && req.body.marriage.verified1 == 'No') {
    res.redirect(`/${req.feature}/${req.sprint}/capture/c-evidence-needed/${scenario}`)
  } else if((req.body['marriage'] != undefined && req.body.chb['answer'] == 'Yes') || (req.body['marriage'] != undefined && req.body.chb['answer'] == 'No') || (req.body['marriage'] != undefined && req.body.chb['answer'] == '')) {
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  } else if((req.body.relationshipmarriage != undefined && req.body.relationshipmarriage['verified'] == 'No') || (req.body.civilmarriage != undefined && req.body.civilmarriage['verified'] == 'No')){
    res.redirect(`/${req.feature}/${req.sprint}/capture/evidence-needed-relationship/${scenario}`)
  } else if((req.body.livingmarriage != undefined && req.body.livingmarriage['verified'] == 'No')){
    res.redirect(`/${req.feature}/${req.sprint}/capture/c-evidence-needed/${scenario}`)
  }else{
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  }
})

router.post('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'capture')
  console.info('scenario..............................', req.body)
  if(req.body.m1 == 'No') {
    if(req.body.disallowthecliam == 'Yes1') {
      res.redirect(`/${req.feature}/${req.sprint}/decisions/m-are-you-sure/${scenario}`)
    } 
  } else if(req.body.m2 == 'No') {
    if(req.body.disallowthecliam == 'Yes1') {
      res.redirect(`/${req.feature}/${req.sprint}/decisions/c-are-you-sure/${scenario}`)
    } 
  } else if(req.body.paymentdetailsprovided == 'Yes' || req.body.paymentdetailsprovided == 'No'){
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  } else if((req.body.children != undefined && req.body.children['dependant-children'] == 'Yes') || (req.body.children != undefined && req.body.children['dependant-children'] == 'No') || (req.body.children != undefined && req.body.children['pregnant'] == 'Yes') || (req.body.children != undefined && req.body.children['pregnant'] == 'No')  || (req.body.children != undefined && req.body.children['dependant-children'] == '') || (req.body.children != undefined && req.body.children['pregnant']  == '')){
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  } else if(req.body.disallowthecliam == 'Yes'){
    res.redirect(`/${req.feature}/${req.sprint}/decisions/m-are-you-sure/${scenario}`)
  } else if(req.body.disallowthecliam1 == 'Yes3') {
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  }
})

router.post('/decisions/m-are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/m-disallowed`)
})

router.post('/decisions/ch-are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/ch-disallowed`)
})

router.post('/decisions/c-are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${scenario}/c-disallowed`)
})

router.get('/verify/child-benefit/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/verify/child-benefit`, {scenario, d})
})
router.get('/verify/relationship-married/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/verify/relationship-married`, {scenario, d})
})
router.get('/verify/relationship-civilpartnership/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/verify/relationship-civilpartnership`, {scenario, d})
})
router.get('/verify/relationship-living/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/verify/relationship-living`, {scenario, d})
})

router.get('/decisions/m-are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/decisions/m-are-you-sure`, {scenario, d})
})
router.get('/decisions/ch-are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/decisions/ch-are-you-sure`, {scenario, d})
})
router.get('/decisions/c-are-you-sure/:scenario', (req, res) => {
  const scenario = req.params.scenario
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/decisions/c-are-you-sure`, {scenario, d})
})
// -----------------------------------------------------------------------------
// Capture ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/capture/${page}`, {scenario,d})
})
router.post('/capture/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'capture')
 res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})
router.get('/capture/edit/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/capture/${page}`, {scenario,d})
})
router.post('/capture/edit/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'capture')
 res.redirect(`/${req.feature}/${req.sprint}/capture/claimant-details-dontmatch/${scenario}`)
})
router.get('/capture/editname/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/capture/${page}`, {scenario,d})
})
router.post('/capture/editname/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'capture')
 res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
})
// -----------------------------------------------------------------------------
// Contact details ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/contact/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/contact/${page}`, {scenario})
})
router.post('/contact/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'contact')
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
// CIS -------------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/cis/cis-warning/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const d = require(`./_dummy-data/${scenario}.json`)
  res.render(`${req.feature}/${req.sprint}/cis/cis-warning`, {scenario, start: true, d})
})

router.get('/verify/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  const page = req.params.page
  addToLog(req, 'verify')
  res.render(`${req.feature}/${req.sprint}/verify/${page}`, {scenario})
})
router.post('/verify/:page/:scenario', (req, res) => {
  const scenario = req.params.scenario || '1'
  addToLog(req, 'verify')
  if(req.body.conts.enough === 'No' && req.body.conts.industrialInjury === 'No') {
	  res.redirect(`/${req.feature}/${req.sprint}/decisions/are-you-sure/${scenario}`)
  } else{
	  res.redirect(`/${req.feature}/${req.sprint}/task-list/${scenario}`)
  }
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
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {scenario, d})
})

module.exports = router
