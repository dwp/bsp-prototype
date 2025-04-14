//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.get('/', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('index')
})

router.post('*', function (req, res, next) {
  console.log(req.body);
 
  if (req.body['next-page']) {
    res.redirect(req.body['next-page']);
  } else {
    next();
  }
});

router.get('/beta/r9/bereavement-support-payment/about-you1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/about-you1')
})


router.get('/beta/r9/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r9/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r9/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r9/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r9/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r9/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r9/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r9/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/start')
})

router.get('/beta/r9/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/start1')
})

router.get('/beta/r9/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r9/bereavement-support-payment/spa')
})


router.post('/beta/r9/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r9/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r9/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r9/bereavement-support-payment/country')
  }
})
router.post('/beta/r9/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r9/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r9/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r9/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r9/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r9/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r9/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r9/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r9/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r9/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
    if(req.body.aboutyou == 'Married' || req.body.aboutyou == 'Civil partnership') {
      res.redirect('./about-you1')
    } else {
      res.redirect('./about-you')
    }
  }
})


router.post('/beta/r9/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'Civil partnership') {
	  res.redirect('./cp-date')  
  } else if(req.body.getcb == 'Married') {
	 res.redirect('./marriage-date')
  } else {
    res.redirect('./check-answers-about-you')
  }
})


router.post('/beta/r9/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r9/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r9/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r9/bereavement-support-payment/about-cb', (req, res) => {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/about-cb')
})

router.get('/beta/r9/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/declaration')
})
router.get('/beta/r9/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/task-list')
})
router.get('/beta/r9/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r9/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r9/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r9/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r9/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r9/bereavement-support-payment/dod')
})
router.get('/beta/r9/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r9/bereavement-support-payment/relationship')
})

router.get('/beta/r9/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/dod')
})

router.get('/beta/r9/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r9/bereavement-support-payment/country')
})

router.get('/beta/r9/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/about-you')
})

router.get('/beta/r9/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/application-notsent')
})

router.get('/beta/r9/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r9/bereavement-support-payment/your-name')
})

router.get('/beta/r9/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/your-ni')
})

router.get('/beta/r9/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/your-postcode')
})

router.get('/beta/r9/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/your-address')
})

router.get('/beta/r9/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r9/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/marriage-date')
})

router.get('/beta/r9/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/marriage')
})

router.get('/beta/r9/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/marriage-register')
})

router.get('/beta/r9/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r9/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r9/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/marriage-type')
})

router.get('/beta/r9/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/cp-date')
})

router.get('/beta/r9/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/cp')
})

router.get('/beta/r9/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r9/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/about-child')
})


router.get('/beta/r9/bereavement-support-payment/about-cb', function (req, res) {
  res.redirect('./check-answers-about-you')
  /*  
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/about-cb')
*/
})



router.post('/beta/r9/bereavement-support-payment/about-cb-claim', (req, res) => {
  res.redirect('./check-answers-about-you')
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
 
})


router.get('/beta/r9/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r9/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r9/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/child')
})

router.get('/beta/r9/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/pregnant')
})


router.get('/beta/r9/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r9/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/about-deceased')
})

router.get('/beta/r9/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r9/bereavement-support-payment/deceased-details')
})

router.get('/beta/r9/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r9/bereavement-support-payment/deceased-death')
})

router.get('/beta/r9/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r9/bereavement-support-payment/deceased-work')
})

router.get('/beta/r9/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/ni-cons')
})


router.get('/beta/r9/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r9/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/contact-info')
})

router.get('/beta/r9/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r9/bereavement-support-payment/contact-details')
})

router.get('/beta/r9/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r9/bereavement-support-payment/contact-decision')
})


router.get('/beta/r9/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r9/bereavement-support-payment/comms-needs')
})


router.get('/beta/r9/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r9/bereavement-support-payment/comms-lang')
})


router.get('/beta/r9/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r9/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r9/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r9/bereavement-support-payment/bank-info')
})

router.get('/beta/r9/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r9/bereavement-support-payment/bank-details')
})

router.get('/beta/r9/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r9/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r9/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r9/bereavement-support-payment/identify-proof')
})

router.get('/beta/r9/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r9/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r9/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r9/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r9/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r9/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r9/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r9/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r9/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r9/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r9/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r9/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r9/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r9/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/declaration')
})

router.get('/beta/r9/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/declaration-link')
})

router.get('/beta/r9/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r9/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/check-answers')
})


router.get('/beta/r9/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/infosent')
})

router.get('/beta/r9/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/infosent1')
})

router.get('/beta/r9/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r9/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/feedback')
})

router.get('/beta/r9/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/feedback-sent')
})


router.get('/beta/r9/bereavement-support-payment/not-eligible-death-before-bsp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/not-eligible-death-before-bsp')
})


router.get('/beta/r9/bereavement-support-payment/not-eligible-late-application', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/not-eligible-late-application')
})

router.get('/beta/r9/bereavement-support-payment/apply-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/apply-not-eligible')
})

router.get('/beta/r9/bereavement-support-payment/infosent-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/infosent-ni')
})

router.get('/beta/r9/bereavement-support-payment/cookie-banner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/cookie-banner')
})

router.get('/beta/r9/bereavement-support-payment/cookie-policy', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/cookie-policy')
})

router.get('/beta/r9/bereavement-support-payment/cookie-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/cookie-details')
})


router.get('/beta/r9/bereavement-support-payment/timeout-success', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/timeout-success')
})

router.get('/beta/r9/bereavement-support-payment/your-name-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/your-name-ni')
})

router.get('/beta/r9/bereavement-support-payment/service-unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/service-unavailable')
})


router.get('/beta/r9/bereavement-support-payment/unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/unavailable')
})

router.get('/beta/r9/bereavement-support-payment/unavailable1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/unavailable1')
})

router.get('/beta/r9/bereavement-support-payment/cohabitation', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/cohabitation')
})

router.get('/beta/r9/bereavement-support-payment/not-eligible-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/not-eligible-child')
})

router.post('/beta/r9/bereavement-support-payment/cohabitationpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb == 'No') {
    
		res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Living together') {
      res.redirect('./about-child');
    } else if(req.body.getcb == 'Civil partnership') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } else if(req.body.getcb == 'Married') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } 
  
})

router.post('/beta/r9/bereavement-support-payment/relationship-not-eligiblepost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.cohabitation != 'No') {
		res.redirect('./about-child')
	  } else {
		  res.redirect('./relationship-not-eligible');
  }
  
})

router.post('/beta/r9/bereavement-support-payment/abouctchildpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.farm2 == 'farm2' && req.body.getcb == 'No') {
		res.redirect('./not-eligible-child')
	  } else if(req.body.getcb == 'Married' || req.body.getcb == 'Civil partnership' || req.body.farm2 == 'farm2') {
      res.redirect('./not-eligible-child')
    } else {
		  res.redirect('./country');
  }
  
})


router.get('/beta/r9/bereavement-support-payment/email-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/email-details')
})


router.get('/beta/r9/bereavement-support-payment/email-confirm', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/email-confirm')
})


router.get('/beta/r9/bereavement-support-payment/relationship1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r9/bereavement-support-payment/relationship1')
})


/*==========================================================================*/














router.get('/beta/r8/bereavement-support-payment/about-you1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/about-you1')
})


router.get('/beta/r8/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r8/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r8/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r8/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r8/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r8/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r8/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r8/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/start')
})

router.get('/beta/r8/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/start1')
})

router.get('/beta/r8/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r8/bereavement-support-payment/spa')
})


router.post('/beta/r8/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r8/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r8/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r8/bereavement-support-payment/country')
  }
})
router.post('/beta/r8/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r8/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r8/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r8/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r8/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r8/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r8/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r8/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r8/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r8/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
    if(req.body.aboutyou == 'Married' || req.body.aboutyou == 'Civil partnership') {
      res.redirect('./about-you1')
    } else {
      res.redirect('./about-you')
    }
  }
})


router.post('/beta/r8/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'Civil partnership') {
	  res.redirect('./cp-date')  
  } else if(req.body.getcb == 'Married') {
	 res.redirect('./marriage-date')
  } else {
    res.redirect('./check-answers-about-you')
  }
})


router.post('/beta/r8/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r8/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r8/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r8/bereavement-support-payment/about-cb', (req, res) => {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/about-cb')
})

router.get('/beta/r8/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/declaration')
})
router.get('/beta/r8/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/task-list')
})
router.get('/beta/r8/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r8/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r8/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r8/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r8/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r8/bereavement-support-payment/dod')
})
router.get('/beta/r8/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r8/bereavement-support-payment/relationship')
})

router.get('/beta/r8/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/dod')
})

router.get('/beta/r8/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r8/bereavement-support-payment/country')
})

router.get('/beta/r8/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/about-you')
})

router.get('/beta/r8/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/application-notsent')
})

router.get('/beta/r8/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r8/bereavement-support-payment/your-name')
})

router.get('/beta/r8/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/your-ni')
})

router.get('/beta/r8/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/your-postcode')
})

router.get('/beta/r8/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/your-address')
})

router.get('/beta/r8/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r8/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/marriage-date')
})

router.get('/beta/r8/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/marriage')
})

router.get('/beta/r8/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/marriage-register')
})

router.get('/beta/r8/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r8/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r8/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/marriage-type')
})

router.get('/beta/r8/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/cp-date')
})

router.get('/beta/r8/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/cp')
})

router.get('/beta/r8/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r8/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/about-child')
})


router.get('/beta/r8/bereavement-support-payment/about-cb', function (req, res) {
  res.redirect('./check-answers-about-you')
  /*  
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/about-cb')
*/
})



router.post('/beta/r8/bereavement-support-payment/about-cb-claim', (req, res) => {
  res.redirect('./check-answers-about-you')
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
 
})


router.get('/beta/r8/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r8/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r8/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/child')
})

router.get('/beta/r8/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/pregnant')
})


router.get('/beta/r8/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r8/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/about-deceased')
})

router.get('/beta/r8/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r8/bereavement-support-payment/deceased-details')
})

router.get('/beta/r8/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r8/bereavement-support-payment/deceased-death')
})

router.get('/beta/r8/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r8/bereavement-support-payment/deceased-work')
})

router.get('/beta/r8/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/ni-cons')
})


router.get('/beta/r8/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r8/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/contact-info')
})

router.get('/beta/r8/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r8/bereavement-support-payment/contact-details')
})

router.get('/beta/r8/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r8/bereavement-support-payment/contact-decision')
})


router.get('/beta/r8/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r8/bereavement-support-payment/comms-needs')
})


router.get('/beta/r8/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r8/bereavement-support-payment/comms-lang')
})


router.get('/beta/r8/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r8/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r8/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r8/bereavement-support-payment/bank-info')
})

router.get('/beta/r8/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r8/bereavement-support-payment/bank-details')
})

router.get('/beta/r8/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r8/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r8/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r8/bereavement-support-payment/identify-proof')
})

router.get('/beta/r8/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r8/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r8/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r8/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r8/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r8/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r8/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r8/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r8/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r8/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r8/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r8/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r8/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r8/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/declaration')
})

router.get('/beta/r8/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/declaration-link')
})

router.get('/beta/r8/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r8/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/check-answers')
})


router.get('/beta/r8/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/infosent')
})

router.get('/beta/r8/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/infosent1')
})

router.get('/beta/r8/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r8/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/feedback')
})

router.get('/beta/r8/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/feedback-sent')
})


router.get('/beta/r8/bereavement-support-payment/not-eligible-death-before-bsp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/not-eligible-death-before-bsp')
})


router.get('/beta/r8/bereavement-support-payment/not-eligible-late-application', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/not-eligible-late-application')
})

router.get('/beta/r8/bereavement-support-payment/apply-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/apply-not-eligible')
})

router.get('/beta/r8/bereavement-support-payment/infosent-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/infosent-ni')
})

router.get('/beta/r8/bereavement-support-payment/cookie-banner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/cookie-banner')
})

router.get('/beta/r8/bereavement-support-payment/cookie-policy', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/cookie-policy')
})

router.get('/beta/r8/bereavement-support-payment/cookie-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/cookie-details')
})


router.get('/beta/r8/bereavement-support-payment/timeout-success', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/timeout-success')
})

router.get('/beta/r8/bereavement-support-payment/your-name-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/your-name-ni')
})

router.get('/beta/r8/bereavement-support-payment/service-unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/service-unavailable')
})


router.get('/beta/r8/bereavement-support-payment/unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/unavailable')
})

router.get('/beta/r8/bereavement-support-payment/unavailable1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/unavailable1')
})

router.get('/beta/r8/bereavement-support-payment/cohabitation', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/cohabitation')
})

router.get('/beta/r8/bereavement-support-payment/not-eligible-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r8/bereavement-support-payment/not-eligible-child')
})

router.post('/beta/r8/bereavement-support-payment/cohabitationpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb == 'No') {
    
		res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Living together') {
      res.redirect('./about-child');
    } else if(req.body.getcb == 'Civil partnership') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } else if(req.body.getcb == 'Married') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } 
  
})

router.post('/beta/r8/bereavement-support-payment/relationship-not-eligiblepost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.cohabitation != 'No') {
		res.redirect('./about-child')
	  } else {
		  res.redirect('./relationship-not-eligible');
  }
  
})

router.post('/beta/r8/bereavement-support-payment/abouctchildpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.farm2 == 'farm2' && req.body.getcb == 'No') {
		res.redirect('./not-eligible-child')
	  } else if(req.body.getcb == 'Married' || req.body.getcb == 'Civil partnership' || req.body.farm2 == 'farm2') {
      res.redirect('./not-eligible-child')
    } else {
		  res.redirect('./country');
  }
  
})

/*==========================================================================*/















router.get('/beta/r7/bereavement-support-payment/about-you1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/about-you1')
})


router.get('/beta/r7/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r7/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r7/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r7/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r7/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r7/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r7/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r7/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/start')
})

router.get('/beta/r7/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/start1')
})

router.get('/beta/r7/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r7/bereavement-support-payment/spa')
})


router.post('/beta/r7/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r7/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r7/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r7/bereavement-support-payment/country')
  }
})
router.post('/beta/r7/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r7/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r7/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r7/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r7/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r7/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r7/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r7/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r7/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r7/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
    if(req.body.aboutyou == 'Married' || req.body.aboutyou == 'Civil partnership') {
      res.redirect('./about-you1')
    } else {
      res.redirect('./about-you')
    }
  }
})


router.post('/beta/r7/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'Civil partnership') {
	  res.redirect('./cp-date')  
  } else if(req.body.getcb == 'Married') {
	 res.redirect('./marriage-date')
  } else {
    res.redirect('./check-answers-about-you')
  }
})


router.post('/beta/r7/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r7/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r7/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r7/bereavement-support-payment/about-cb', (req, res) => {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/about-cb')
})

router.get('/beta/r7/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/declaration')
})
router.get('/beta/r7/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/task-list')
})
router.get('/beta/r7/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r7/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r7/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r7/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r7/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r7/bereavement-support-payment/dod')
})
router.get('/beta/r7/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r7/bereavement-support-payment/relationship')
})

router.get('/beta/r7/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/dod')
})

router.get('/beta/r7/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r7/bereavement-support-payment/country')
})

router.get('/beta/r7/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/about-you')
})

router.get('/beta/r7/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/application-notsent')
})

router.get('/beta/r7/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r7/bereavement-support-payment/your-name')
})

router.get('/beta/r7/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/your-ni')
})

router.get('/beta/r7/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/your-postcode')
})

router.get('/beta/r7/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/your-address')
})

router.get('/beta/r7/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r7/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/marriage-date')
})

router.get('/beta/r7/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/marriage')
})

router.get('/beta/r7/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/marriage-register')
})

router.get('/beta/r7/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r7/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r7/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/marriage-type')
})

router.get('/beta/r7/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/cp-date')
})

router.get('/beta/r7/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/cp')
})

router.get('/beta/r7/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r7/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/about-child')
})


router.get('/beta/r7/bereavement-support-payment/about-cb', function (req, res) {
  res.redirect('./check-answers-about-you')
  /*  
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/about-cb')
*/
})



router.post('/beta/r7/bereavement-support-payment/about-cb-claim', (req, res) => {
  res.redirect('./check-answers-about-you')
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
 
})


router.get('/beta/r7/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r7/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r7/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/child')
})

router.get('/beta/r7/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/pregnant')
})


router.get('/beta/r7/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r7/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/about-deceased')
})

router.get('/beta/r7/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r7/bereavement-support-payment/deceased-details')
})

router.get('/beta/r7/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r7/bereavement-support-payment/deceased-death')
})

router.get('/beta/r7/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r7/bereavement-support-payment/deceased-work')
})

router.get('/beta/r7/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/ni-cons')
})


router.get('/beta/r7/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r7/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/contact-info')
})

router.get('/beta/r7/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r7/bereavement-support-payment/contact-details')
})

router.get('/beta/r7/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r7/bereavement-support-payment/contact-decision')
})


router.get('/beta/r7/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r7/bereavement-support-payment/comms-needs')
})


router.get('/beta/r7/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r7/bereavement-support-payment/comms-lang')
})


router.get('/beta/r7/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r7/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r7/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r7/bereavement-support-payment/bank-info')
})

router.get('/beta/r7/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r7/bereavement-support-payment/bank-details')
})

router.get('/beta/r7/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r7/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r7/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r7/bereavement-support-payment/identify-proof')
})

router.get('/beta/r7/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r7/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r7/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r7/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r7/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r7/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r7/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r7/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r7/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r7/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r7/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r7/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r7/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r7/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/declaration')
})

router.get('/beta/r7/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/declaration-link')
})

router.get('/beta/r7/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r7/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/check-answers')
})


router.get('/beta/r7/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/infosent')
})

router.get('/beta/r7/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/infosent1')
})

router.get('/beta/r7/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r7/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/feedback')
})

router.get('/beta/r7/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/feedback-sent')
})


router.get('/beta/r7/bereavement-support-payment/not-eligible-death-before-bsp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/not-eligible-death-before-bsp')
})


router.get('/beta/r7/bereavement-support-payment/not-eligible-late-application', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/not-eligible-late-application')
})

router.get('/beta/r7/bereavement-support-payment/apply-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/apply-not-eligible')
})

router.get('/beta/r7/bereavement-support-payment/infosent-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/infosent-ni')
})

router.get('/beta/r7/bereavement-support-payment/cookie-banner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/cookie-banner')
})

router.get('/beta/r7/bereavement-support-payment/cookie-policy', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/cookie-policy')
})

router.get('/beta/r7/bereavement-support-payment/cookie-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/cookie-details')
})


router.get('/beta/r7/bereavement-support-payment/timeout-success', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/timeout-success')
})

router.get('/beta/r7/bereavement-support-payment/your-name-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/your-name-ni')
})

router.get('/beta/r7/bereavement-support-payment/service-unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/service-unavailable')
})


router.get('/beta/r7/bereavement-support-payment/unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/unavailable')
})

router.get('/beta/r7/bereavement-support-payment/unavailable1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/unavailable1')
})

router.get('/beta/r7/bereavement-support-payment/cohabitation', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/cohabitation')
})

router.get('/beta/r7/bereavement-support-payment/not-eligible-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r7/bereavement-support-payment/not-eligible-child')
})

router.post('/beta/r7/bereavement-support-payment/cohabitationpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb == 'No') {
    
		res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Living together') {
      res.redirect('./about-child');
    } else if(req.body.getcb == 'Civil partnership') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } else if(req.body.getcb == 'Married') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } 
  
})

router.post('/beta/r7/bereavement-support-payment/relationship-not-eligiblepost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.cohabitation != 'No') {
		res.redirect('./about-child')
	  } else {
		  res.redirect('./relationship-not-eligible');
  }
  
})

router.post('/beta/r7/bereavement-support-payment/abouctchildpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.farm2 == 'farm2' && req.body.getcb == 'No') {
		res.redirect('./not-eligible-child')
	  } else if(req.body.getcb == 'Married' || req.body.getcb == 'Civil partnership' || req.body.farm2 == 'farm2') {
      res.redirect('./not-eligible-child')
    } else {
		  res.redirect('./country');
  }
  
})

/*==========================================================================*/














router.get('/beta/r6/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r6/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r6/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r6/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r6/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r6/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r6/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r6/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/start')
})

router.get('/beta/r6/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/start1')
})

router.get('/beta/r6/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r6/bereavement-support-payment/spa')
})


router.post('/beta/r6/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r6/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r6/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r6/bereavement-support-payment/country')
  }
})
router.post('/beta/r6/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r6/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r6/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r6/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r6/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r6/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r6/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r6/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r6/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r6/bereavement-support-payment/about-you', (req, res) => {
  
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
    if(req.body.aboutyou == 'Married' || req.body.aboutyou == 'Civil partnership') {
      res.redirect('./about-you1')
    } else {
      res.redirect('./about-you')
    }
	  
  }
})


router.post('/beta/r6/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'Civil partnership') {
	  res.redirect('./cp-date')  
  } else if(req.body.getcb == 'Married') {
	 res.redirect('./marriage-date')
  } else {
    res.redirect('./check-answers-about-you')
  }
})


router.post('/beta/r6/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r6/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r6/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r6/bereavement-support-payment/about-cb', (req, res) => {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/about-cb')
})

router.get('/beta/r6/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/declaration')
})
router.get('/beta/r6/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/task-list')
})
router.get('/beta/r6/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r6/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r6/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r6/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r6/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r6/bereavement-support-payment/dod')
})
router.get('/beta/r6/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r6/bereavement-support-payment/relationship')
})

router.post('/beta/r6/bereavement-support-payment/relationshipcountrypost', (req, res) => {
  if(req.body.checkanswereligibility && req.body.getcb == 'No') {
    res.redirect('./relationship-not-eligible') 
  } else {
    res.redirect('./check-answers-eligibility') 
  }
    

})
router.post('/beta/r5/bereavement-support-payment/relationshipcountrypost', (req, res) => {
  if(req.body.checkanswereligibility && req.body.getcb == 'Living together') {
    res.redirect('./about-child') 
  } else if(req.body.checkanswereligibility && req.body.getcb == 'No'){
    res.redirect('./relationship-not-eligible') 
  } else {
    res.redirect('./check-answers-eligibility') 
  }
    

})

router.get('/beta/r6/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/dod')
})

router.get('/beta/r6/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r6/bereavement-support-payment/country')
})

router.get('/beta/r6/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/about-you')
})

router.get('/beta/r6/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/application-notsent')
})

router.get('/beta/r6/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r6/bereavement-support-payment/your-name')
})

router.get('/beta/r6/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/your-ni')
})

router.get('/beta/r6/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/your-postcode')
})

router.get('/beta/r6/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/your-address')
})

router.get('/beta/r6/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r6/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/marriage-date')
})

router.get('/beta/r6/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/marriage')
})

router.get('/beta/r6/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/marriage-register')
})

router.get('/beta/r6/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r6/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r6/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/marriage-type')
})

router.get('/beta/r6/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/cp-date')
})

router.get('/beta/r6/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/cp')
})

router.get('/beta/r6/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r6/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/about-child')
})


router.get('/beta/r6/bereavement-support-payment/about-cb', function (req, res) {
  res.redirect('./check-answers-about-you')
  /*  
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/about-cb')
*/
})



router.post('/beta/r6/bereavement-support-payment/about-cb-claim', (req, res) => {
  res.redirect('./check-answers-about-you')
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
 
})


router.get('/beta/r6/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r6/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r6/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/child')
})

router.get('/beta/r6/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/pregnant')
})


router.get('/beta/r6/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r6/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/about-deceased')
})

router.get('/beta/r6/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r6/bereavement-support-payment/deceased-details')
})

router.get('/beta/r6/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r6/bereavement-support-payment/deceased-death')
})

router.get('/beta/r6/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r6/bereavement-support-payment/deceased-work')
})

router.get('/beta/r6/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/ni-cons')
})


router.get('/beta/r6/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r6/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/contact-info')
})

router.get('/beta/r6/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r6/bereavement-support-payment/contact-details')
})

router.get('/beta/r6/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r6/bereavement-support-payment/contact-decision')
})


router.get('/beta/r6/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r6/bereavement-support-payment/comms-needs')
})


router.get('/beta/r6/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r6/bereavement-support-payment/comms-lang')
})


router.get('/beta/r6/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r6/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r6/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r6/bereavement-support-payment/bank-info')
})

router.get('/beta/r6/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r6/bereavement-support-payment/bank-details')
})

router.get('/beta/r6/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r6/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r6/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r6/bereavement-support-payment/identify-proof')
})

router.get('/beta/r6/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r6/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r6/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r6/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r6/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r6/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r6/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r6/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r6/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r6/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r6/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r6/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r6/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r6/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/declaration')
})

router.get('/beta/r6/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/declaration-link')
})

router.get('/beta/r6/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r6/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/check-answers')
})


router.get('/beta/r6/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent')
})

router.get('/beta/r6/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent1')
})

router.get('/beta/r6/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r6/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/feedback')
})

router.get('/beta/r6/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/feedback-sent')
})


router.get('/beta/r6/bereavement-support-payment/not-eligible-death-before-bsp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/not-eligible-death-before-bsp')
})


router.get('/beta/r6/bereavement-support-payment/not-eligible-late-application', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/not-eligible-late-application')
})

router.get('/beta/r6/bereavement-support-payment/apply-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/apply-not-eligible')
})

router.get('/beta/r6/bereavement-support-payment/infosent-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent-ni')
})

router.get('/beta/r6/bereavement-support-payment/cookie-banner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/cookie-banner')
})

router.get('/beta/r6/bereavement-support-payment/cookie-policy', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/cookie-policy')
})

router.get('/beta/r6/bereavement-support-payment/cookie-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/cookie-details')
})


router.get('/beta/r6/bereavement-support-payment/timeout-success', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/timeout-success')
})

router.get('/beta/r6/bereavement-support-payment/your-name-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/your-name-ni')
})

router.get('/beta/r6/bereavement-support-payment/infosent-ni-v1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent-ni-v1')
})

router.get('/beta/r6/bereavement-support-payment/infosent-ni-v2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent-ni-v2')
})

router.get('/beta/r6/bereavement-support-payment/infosent-ni-v3', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent-ni-v3')
})



router.get('/beta/r6/bereavement-support-payment/infosent-ni-v4', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent-ni-v4')
})




router.get('/beta/r6/bereavement-support-payment/infosent-ni-v5', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/infosent-ni-v5')
})




router.get('/beta/r6/bereavement-support-payment/service-unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/service-unavailable')
})


router.get('/beta/r6/bereavement-support-payment/unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/unavailable')
})

router.get('/beta/r6/bereavement-support-payment/unavailable1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/unavailable1')
})

router.get('/beta/r6/bereavement-support-payment/cohabitation', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/cohabitation')
})


router.get('/beta/r6/bereavement-support-payment/not-eligible-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/not-eligible-child')
})

router.post('/beta/r6/bereavement-support-payment/cohabitationpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb != 'No') {
    res.locals.cohabitation = '';
		res.redirect('./country')
	  } else {
      if(req.body.farm1 !='' || req.body.farm2 !='' || req.body.farm3 !='')  {
        res.redirect('./cohabitation');
      } else {
		  res.redirect('./relationship-not-eligible');
      }
  }
  
})

router.post('/beta/r6/bereavement-support-payment/relationship-not-eligiblepost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.cohabitation != 'No') {
    if(req.body.farm1 !='' || req.body.farm2 !='' || req.body.farm3 !='')  {
      res.redirect('./country')
    }else if(req.body.farm4 !='') {
      res.redirect('./not-eligible-child')
    } else {
      res.redirect('./about-child')
    }
	
	  } else {
		  res.redirect('./relationship-not-eligible');
  }
  
})

router.post('/beta/r6/bereavement-support-payment/abouctchildpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.farm1 == '16years' || req.body.farm2 == '16to19' || req.body.farm3 == 'farm1' || req.body.farm4 == 'farm2') {
		res.redirect('./relationship')
	  }
  
})
router.post('/beta/r6/bereavement-support-payment/countrypost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb == 'Married' || req.body.getcb == 'Civil partnership') {
		res.redirect('./country')
	  } else if(req.body.getcb == 'Living together') {
        if(req.body.child1 == '16years' || req.body.child2 == '16to19' || req.body.child3 == 'farm1') {
          res.redirect('./country')
        } else {
          res.redirect('./relationship-not-eligible')
        }
    } else{
      res.redirect('./about-relationship')
    }
  
})
router.post('/beta/r8/bereavement-support-payment/countrypost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb == 'Married' || req.body.getcb == 'Civil partnership') {
		res.redirect('./country')
	  } else if(req.body.getcb == 'Living together') {
        if(req.body.child1 == '16years' || req.body.child2 == '16to19' || req.body.child3 == 'farm1') {
          res.redirect('./country')
        } else {
          res.redirect('./relationship-not-eligible')
        }
    } else{
      res.redirect('./about-child')
    }
  
})
router.get('/beta/r6/bereavement-support-payment/about-relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/about-relationship')
})


router.get('/beta/r6/bereavement-support-payment/about-you1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/about-you1')
})

router.get('/beta/r6/bereavement-support-payment/feedback1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/feedback1')
})

router.get('/beta/r6/bereavement-support-payment/feedback-sent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/feedback-sent1')
})


router.get('/beta/r6/bereavement-support-payment/feedback2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r6/bereavement-support-payment/feedback2')
})






/*==========================================================================*/









router.get('/beta/r5/bereavement-support-payment/about-you1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/about-you1')
})


router.get('/beta/r5/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r5/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r5/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r5/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r5/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r5/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r5/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r5/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/start')
})

router.get('/beta/r5/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/start1')
})

router.get('/beta/r5/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r5/bereavement-support-payment/spa')
})


router.post('/beta/r5/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r5/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r5/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r5/bereavement-support-payment/country')
  }
})
router.post('/beta/r5/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r5/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r5/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r5/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r5/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r5/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r5/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r5/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r5/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r5/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
    if(req.body.aboutyou == 'Married' || req.body.aboutyou == 'Civil partnership') {
      res.redirect('./about-you1')
    } else {
      res.redirect('./about-you')
    }
  }
})


router.post('/beta/r5/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'Civil partnership') {
	  res.redirect('./cp-date')  
  } else if(req.body.getcb == 'Married') {
	 res.redirect('./marriage-date')
  } else {
    res.redirect('./check-answers-about-you')
  }
})


router.post('/beta/r5/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r5/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r5/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r5/bereavement-support-payment/about-cb', (req, res) => {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/about-cb')
})

router.get('/beta/r5/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/declaration')
})
router.get('/beta/r5/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/task-list')
})
router.get('/beta/r5/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r5/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r5/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r5/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r5/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r5/bereavement-support-payment/dod')
})
router.get('/beta/r5/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r5/bereavement-support-payment/relationship')
})

router.get('/beta/r5/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/dod')
})

router.get('/beta/r5/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r5/bereavement-support-payment/country')
})

router.get('/beta/r5/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/about-you')
})

router.get('/beta/r5/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/application-notsent')
})

router.get('/beta/r5/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r5/bereavement-support-payment/your-name')
})

router.get('/beta/r5/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/your-ni')
})

router.get('/beta/r5/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/your-postcode')
})

router.get('/beta/r5/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/your-address')
})

router.get('/beta/r5/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r5/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/marriage-date')
})

router.get('/beta/r5/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/marriage')
})

router.get('/beta/r5/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/marriage-register')
})

router.get('/beta/r5/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r5/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r5/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/marriage-type')
})

router.get('/beta/r5/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/cp-date')
})

router.get('/beta/r5/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/cp')
})

router.get('/beta/r5/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r5/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/about-child')
})


router.get('/beta/r5/bereavement-support-payment/about-cb', function (req, res) {
  res.redirect('./check-answers-about-you')
  /*  
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/about-cb')
*/
})



router.post('/beta/r5/bereavement-support-payment/about-cb-claim', (req, res) => {
  res.redirect('./check-answers-about-you')
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
 
})


router.get('/beta/r5/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r5/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r5/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/child')
})

router.get('/beta/r5/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/pregnant')
})


router.get('/beta/r5/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r5/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/about-deceased')
})

router.get('/beta/r5/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r5/bereavement-support-payment/deceased-details')
})

router.get('/beta/r5/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r5/bereavement-support-payment/deceased-death')
})

router.get('/beta/r5/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r5/bereavement-support-payment/deceased-work')
})

router.get('/beta/r5/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/ni-cons')
})


router.get('/beta/r5/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r5/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/contact-info')
})

router.get('/beta/r5/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r5/bereavement-support-payment/contact-details')
})

router.get('/beta/r5/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r5/bereavement-support-payment/contact-decision')
})


router.get('/beta/r5/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r5/bereavement-support-payment/comms-needs')
})


router.get('/beta/r5/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r5/bereavement-support-payment/comms-lang')
})


router.get('/beta/r5/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r5/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r5/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r5/bereavement-support-payment/bank-info')
})

router.get('/beta/r5/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r5/bereavement-support-payment/bank-details')
})

router.get('/beta/r5/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r5/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r5/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r5/bereavement-support-payment/identify-proof')
})

router.get('/beta/r5/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r5/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r5/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r5/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r5/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r5/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r5/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r5/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r5/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r5/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r5/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r5/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r5/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r5/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/declaration')
})

router.get('/beta/r5/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/declaration-link')
})

router.get('/beta/r5/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r5/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/check-answers')
})


router.get('/beta/r5/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/infosent')
})

router.get('/beta/r5/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/infosent1')
})

router.get('/beta/r5/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r5/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/feedback')
})

router.get('/beta/r5/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/feedback-sent')
})


router.get('/beta/r5/bereavement-support-payment/not-eligible-death-before-bsp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/not-eligible-death-before-bsp')
})


router.get('/beta/r5/bereavement-support-payment/not-eligible-late-application', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/not-eligible-late-application')
})

router.get('/beta/r5/bereavement-support-payment/apply-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/apply-not-eligible')
})

router.get('/beta/r5/bereavement-support-payment/infosent-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/infosent-ni')
})

router.get('/beta/r5/bereavement-support-payment/cookie-banner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/cookie-banner')
})

router.get('/beta/r5/bereavement-support-payment/cookie-policy', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/cookie-policy')
})

router.get('/beta/r5/bereavement-support-payment/cookie-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/cookie-details')
})


router.get('/beta/r5/bereavement-support-payment/timeout-success', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/timeout-success')
})

router.get('/beta/r5/bereavement-support-payment/your-name-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/your-name-ni')
})

router.get('/beta/r5/bereavement-support-payment/service-unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/service-unavailable')
})


router.get('/beta/r5/bereavement-support-payment/unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/unavailable')
})

router.get('/beta/r5/bereavement-support-payment/unavailable1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/unavailable1')
})

router.get('/beta/r5/bereavement-support-payment/cohabitation', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/cohabitation')
})

router.get('/beta/r5/bereavement-support-payment/not-eligible-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r5/bereavement-support-payment/not-eligible-child')
})

router.post('/beta/r5/bereavement-support-payment/cohabitationpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb == 'No') {
    
		res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Living together') {
      res.redirect('./about-child');
    } else if(req.body.getcb == 'Civil partnership') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } else if(req.body.getcb == 'Married') {
      res.locals.cohabitation = '';
		  res.redirect('./country');
    } 
  
})

router.post('/beta/r5/bereavement-support-payment/relationship-not-eligiblepost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.cohabitation != 'No') {
		res.redirect('./about-child')
	  } else {
		  res.redirect('./relationship-not-eligible');
  }
  
})

router.post('/beta/r5/bereavement-support-payment/abouctchildpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.farm2 == 'farm2' && req.body.getcb == 'No') {
		res.redirect('./not-eligible-child')
	  } else if(req.body.getcb == 'Married' || req.body.getcb == 'Civil partnership' || req.body.farm2 == 'farm2') {
      res.redirect('./not-eligible-child')
    } else {
		  res.redirect('./country');
  }
  
})

/*==========================================================================*/









router.get('/beta/r4/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r4/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r4/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r4/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r4/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r4/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r4/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r4/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/start')
})

router.get('/beta/r4/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/start1')
})

router.get('/beta/r4/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r4/bereavement-support-payment/spa')
})


router.post('/beta/r4/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r4/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r4/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r4/bereavement-support-payment/country')
  }
})
router.post('/beta/r4/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r4/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r4/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r4/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r4/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r4/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r4/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r4/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r4/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r4/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./about-you')
  }
})


router.post('/beta/r4/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'Civil partnership') {
	  res.redirect('./cp-date')  
  } else if(req.body.getcb == 'Married') {
	 res.redirect('./marriage-date')
  } else {
    res.redirect('./check-answers-about-you')
  }
})


router.post('/beta/r4/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r4/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r4/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r4/bereavement-support-payment/about-cb', (req, res) => {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/about-cb')
})

router.get('/beta/r4/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/declaration')
})
router.get('/beta/r4/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/task-list')
})
router.get('/beta/r4/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r4/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r4/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r4/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r4/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r4/bereavement-support-payment/dod')
})
router.get('/beta/r4/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r4/bereavement-support-payment/relationship')
})

router.get('/beta/r4/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/dod')
})

router.get('/beta/r4/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r4/bereavement-support-payment/country')
})

router.get('/beta/r4/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/about-you')
})

router.get('/beta/r4/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/application-notsent')
})

router.get('/beta/r4/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r4/bereavement-support-payment/your-name')
})

router.get('/beta/r4/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/your-ni')
})

router.get('/beta/r4/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/your-postcode')
})

router.get('/beta/r4/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/your-address')
})

router.get('/beta/r4/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r4/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/marriage-date')
})

router.get('/beta/r4/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/marriage')
})

router.get('/beta/r4/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/marriage-register')
})

router.get('/beta/r4/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r4/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r4/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/marriage-type')
})

router.get('/beta/r4/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/cp-date')
})

router.get('/beta/r4/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/cp')
})

router.get('/beta/r4/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r4/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/about-child')
})


router.get('/beta/r4/bereavement-support-payment/about-cb', function (req, res) {
  res.redirect('./check-answers-about-you')
  /*  
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/about-cb')
*/
})



router.post('/beta/r4/bereavement-support-payment/about-cb-claim', (req, res) => {
  res.redirect('./check-answers-about-you')
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
 
})


router.get('/beta/r4/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r4/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r4/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/child')
})

router.get('/beta/r4/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/pregnant')
})


router.get('/beta/r4/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r4/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/about-deceased')
})

router.get('/beta/r4/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r4/bereavement-support-payment/deceased-details')
})

router.get('/beta/r4/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r4/bereavement-support-payment/deceased-death')
})

router.get('/beta/r4/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r4/bereavement-support-payment/deceased-work')
})

router.get('/beta/r4/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/ni-cons')
})


router.get('/beta/r4/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r4/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/contact-info')
})

router.get('/beta/r4/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r4/bereavement-support-payment/contact-details')
})

router.get('/beta/r4/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r4/bereavement-support-payment/contact-decision')
})


router.get('/beta/r4/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r4/bereavement-support-payment/comms-needs')
})


router.get('/beta/r4/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r4/bereavement-support-payment/comms-lang')
})


router.get('/beta/r4/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r4/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r4/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r4/bereavement-support-payment/bank-info')
})

router.get('/beta/r4/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r4/bereavement-support-payment/bank-details')
})

router.get('/beta/r4/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r4/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r4/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r4/bereavement-support-payment/identify-proof')
})

router.get('/beta/r4/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r4/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r4/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r4/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r4/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r4/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r4/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r4/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r4/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r4/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r4/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r4/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r4/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r4/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/declaration')
})

router.get('/beta/r4/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/declaration-link')
})

router.get('/beta/r4/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r4/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/check-answers')
})


router.get('/beta/r4/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/infosent')
})

router.get('/beta/r4/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/infosent1')
})

router.get('/beta/r4/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r4/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/feedback')
})

router.get('/beta/r4/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/feedback-sent')
})


router.get('/beta/r4/bereavement-support-payment/not-eligible-death-before-bsp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/not-eligible-death-before-bsp')
})


router.get('/beta/r4/bereavement-support-payment/not-eligible-late-application', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/not-eligible-late-application')
})

router.get('/beta/r4/bereavement-support-payment/apply-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/apply-not-eligible')
})

router.get('/beta/r4/bereavement-support-payment/infosent-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/infosent-ni')
})

router.get('/beta/r4/bereavement-support-payment/cookie-banner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/cookie-banner')
})

router.get('/beta/r4/bereavement-support-payment/cookie-policy', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/cookie-policy')
})

router.get('/beta/r4/bereavement-support-payment/cookie-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/cookie-details')
})


router.get('/beta/r4/bereavement-support-payment/timeout-success', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/timeout-success')
})

router.get('/beta/r4/bereavement-support-payment/your-name-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/your-name-ni')
})

router.get('/beta/r4/bereavement-support-payment/service-unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/service-unavailable')
})


router.get('/beta/r4/bereavement-support-payment/unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/unavailable')
})

router.get('/beta/r4/bereavement-support-payment/unavailable1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/unavailable1')
})

router.get('/beta/r4/bereavement-support-payment/cohabitation', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/cohabitation')
})


router.get('/beta/r4/bereavement-support-payment/not-eligible-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r4/bereavement-support-payment/not-eligible-child')
})

router.post('/beta/r4/bereavement-support-payment/cohabitationpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.getcb != 'No') {
    res.locals.cohabitation = '';
		res.redirect('./country')
	  } else {
		  res.redirect('./cohabitation');
  }
  
})

router.post('/beta/r4/bereavement-support-payment/relationship-not-eligiblepost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.cohabitation != 'No') {
		res.redirect('./about-child')
	  } else {
		  res.redirect('./relationship-not-eligible');
  }
  
})

router.post('/beta/r4/bereavement-support-payment/abouctchildpost', function (req, res) {
  res.locals.includeServiceName = 'true'
  if(req.body.farm2 == 'farm2' && req.body.getcb == 'No') {
		res.redirect('./not-eligible-child')
	  } else if(req.body.getcb == 'Married' || req.body.getcb == 'Civil partnership' || req.body.farm2 == 'farm2') {
      res.redirect('./check-answers-about-you')
    } else {
		  res.redirect('./country');
  }
  
})

/*==========================================================================*/











router.get('/beta/r3/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r3/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r3/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r3/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r3/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r3/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r3/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r3/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/start')
})

router.get('/beta/r3/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/start1')
})

router.get('/beta/r3/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r3/bereavement-support-payment/spa')
})


router.post('/beta/r3/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r3/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r3/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r3/bereavement-support-payment/country')
  }
})
router.post('/beta/r3/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r3/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r3/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r3/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r3/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r3/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r3/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r3/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r3/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r3/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./about-you')
  }
})


router.post('/beta/r3/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'Civil partnership') {
	  res.redirect('./cp-date')  
  } else {
	  res.redirect('./marriage-date')
  }
})


router.post('/beta/r3/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r3/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r3/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r3/bereavement-support-payment/about-cb', (req, res) => {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/about-cb')
})

router.get('/beta/r3/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/declaration')
})
router.get('/beta/r3/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/task-list')
})
router.get('/beta/r3/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r3/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r3/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r3/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r3/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r3/bereavement-support-payment/dod')
})
router.get('/beta/r3/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r3/bereavement-support-payment/relationship')
})

router.get('/beta/r3/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/dod')
})

router.get('/beta/r3/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r3/bereavement-support-payment/country')
})

router.get('/beta/r3/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/about-you')
})

router.get('/beta/r3/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/application-notsent')
})

router.get('/beta/r3/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r3/bereavement-support-payment/your-name')
})

router.get('/beta/r3/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/your-ni')
})

router.get('/beta/r3/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/your-postcode')
})

router.get('/beta/r3/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/your-address')
})

router.get('/beta/r3/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r3/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/marriage-date')
})

router.get('/beta/r3/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/marriage')
})

router.get('/beta/r3/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/marriage-register')
})

router.get('/beta/r3/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r3/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r3/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/marriage-type')
})

router.get('/beta/r3/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/cp-date')
})

router.get('/beta/r3/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/cp')
})

router.get('/beta/r3/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r3/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/about-child')
})


router.get('/beta/r3/bereavement-support-payment/about-cb', function (req, res) {
  res.redirect('./check-answers-about-you')
  /*  
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/about-cb')
*/
})



router.post('/beta/r3/bereavement-support-payment/about-cb-claim', (req, res) => {
  res.redirect('./check-answers-about-you')
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
 
})


router.get('/beta/r3/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r3/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r3/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/child')
})

router.get('/beta/r3/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/pregnant')
})


router.get('/beta/r3/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r3/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/about-deceased')
})

router.get('/beta/r3/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r3/bereavement-support-payment/deceased-details')
})

router.get('/beta/r3/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r3/bereavement-support-payment/deceased-death')
})

router.get('/beta/r3/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r3/bereavement-support-payment/deceased-work')
})

router.get('/beta/r3/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/ni-cons')
})


router.get('/beta/r3/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r3/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/contact-info')
})

router.get('/beta/r3/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r3/bereavement-support-payment/contact-details')
})

router.get('/beta/r3/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r3/bereavement-support-payment/contact-decision')
})


router.get('/beta/r3/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r3/bereavement-support-payment/comms-needs')
})


router.get('/beta/r3/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r3/bereavement-support-payment/comms-lang')
})


router.get('/beta/r3/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r3/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r3/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r3/bereavement-support-payment/bank-info')
})

router.get('/beta/r3/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r3/bereavement-support-payment/bank-details')
})

router.get('/beta/r3/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r3/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r3/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r3/bereavement-support-payment/identify-proof')
})

router.get('/beta/r3/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r3/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r3/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r3/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r3/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r3/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r3/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r3/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r3/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r3/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r3/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r3/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r3/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r3/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/declaration')
})

router.get('/beta/r3/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/declaration-link')
})

router.get('/beta/r3/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r3/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/check-answers')
})


router.get('/beta/r3/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/infosent')
})

router.get('/beta/r3/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/infosent1')
})

router.get('/beta/r3/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r3/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/feedback')
})

router.get('/beta/r3/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/feedback-sent')
})


router.get('/beta/r3/bereavement-support-payment/not-eligible-death-before-bsp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/not-eligible-death-before-bsp')
})


router.get('/beta/r3/bereavement-support-payment/not-eligible-late-application', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/not-eligible-late-application')
})

router.get('/beta/r3/bereavement-support-payment/apply-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/apply-not-eligible')
})

router.get('/beta/r3/bereavement-support-payment/infosent-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/infosent-ni')
})

router.get('/beta/r3/bereavement-support-payment/cookie-banner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/cookie-banner')
})

router.get('/beta/r3/bereavement-support-payment/cookie-policy', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/cookie-policy')
})

router.get('/beta/r3/bereavement-support-payment/cookie-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/cookie-details')
})


router.get('/beta/r3/bereavement-support-payment/timeout-success', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/timeout-success')
})

router.get('/beta/r3/bereavement-support-payment/your-name-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/your-name-ni')
})

router.get('/beta/r3/bereavement-support-payment/service-unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/service-unavailable')
})


router.get('/beta/r3/bereavement-support-payment/unavailable', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/unavailable')
})

router.get('/beta/r3/bereavement-support-payment/unavailable1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r3/bereavement-support-payment/unavailable1')
})
/*==========================================================================*/



router.get('/beta/r2/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r2/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r2/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r2/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r2/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r2/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r2/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r2/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/start')
})

router.get('/beta/r2/bereavement-support-payment/start1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/start1')
})

router.get('/beta/r2/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r2/bereavement-support-payment/spa')
})


router.post('/beta/r2/bereavement-support-payment/dod', (req, res) => {
	res.redirect('./dod');
  /* if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  } */
})
router.post('/beta/r2/bereavement-support-payment/relationship', (req, res) => {
	res.redirect('./relationship')
  /* if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  } */
})
router.post('/beta/r2/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r2/bereavement-support-payment/country')
  }
})
router.post('/beta/r2/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r2/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r2/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r2/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r2/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r2/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r2/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r2/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r2/bereavement-support-payment/check-answers-eligibility', (req, res) => {
	res.redirect('./check-answers-eligibility')
  /* if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  } */
})

router.post('/beta/r2/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./about-you')
  }
})


router.post('/beta/r2/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'civil partner') {
	  res.redirect('./cp-date')  
  } else {
	  res.redirect('./marriage-date')
  }
})


router.post('/beta/r2/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r2/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r2/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r2/bereavement-support-payment/about-cb', (req, res) => {
	
  if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked') {
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){
	  res.redirect('./about-cb')
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  }else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you') 
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  }
})

router.get('/beta/r2/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/declaration')
})
router.get('/beta/r2/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/task-list')
})
router.get('/beta/r2/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r2/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r2/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r2/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r2/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r2/bereavement-support-payment/dod')
})
router.get('/beta/r2/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r2/bereavement-support-payment/relationship')
})

router.get('/beta/r2/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/dod')
})

router.get('/beta/r2/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r2/bereavement-support-payment/country')
})

router.get('/beta/r2/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/about-you')
})

router.get('/beta/r2/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/application-notsent')
})

router.get('/beta/r2/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r2/bereavement-support-payment/your-name')
})

router.get('/beta/r2/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/your-ni')
})

router.get('/beta/r2/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/your-postcode')
})

router.get('/beta/r2/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/your-address')
})

router.get('/beta/r2/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r2/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/marriage-date')
})

router.get('/beta/r2/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/marriage')
})

router.get('/beta/r2/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/marriage-register')
})

router.get('/beta/r2/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r2/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r2/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/marriage-type')
})

router.get('/beta/r2/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/cp-date')
})

router.get('/beta/r2/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/cp')
})

router.get('/beta/r2/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r2/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/about-child')
})


router.get('/beta/r2/bereavement-support-payment/about-cb', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/about-cb')
})



router.post('/beta/r2/bereavement-support-payment/about-cb-claim', (req, res) => {
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./check-answers-about-you')
  }
})



router.get('/beta/r2/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r2/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r2/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/child')
})

router.get('/beta/r2/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/pregnant')
})


router.get('/beta/r2/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r2/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/about-deceased')
})

router.get('/beta/r2/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r2/bereavement-support-payment/deceased-details')
})

router.get('/beta/r2/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r2/bereavement-support-payment/deceased-death')
})

router.get('/beta/r2/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r2/bereavement-support-payment/deceased-work')
})

router.get('/beta/r2/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/ni-cons')
})


router.get('/beta/r2/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r2/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/contact-info')
})

router.get('/beta/r2/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r2/bereavement-support-payment/contact-details')
})

router.get('/beta/r2/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r2/bereavement-support-payment/contact-decision')
})


router.get('/beta/r2/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r2/bereavement-support-payment/comms-needs')
})


router.get('/beta/r2/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r2/bereavement-support-payment/comms-lang')
})


router.get('/beta/r2/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r2/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r2/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r2/bereavement-support-payment/bank-info')
})

router.get('/beta/r2/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r2/bereavement-support-payment/bank-details')
})

router.get('/beta/r2/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r2/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r2/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r2/bereavement-support-payment/identify-proof')
})

router.get('/beta/r2/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r2/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r2/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r2/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r2/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r2/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r2/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r2/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r2/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r2/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r2/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r2/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r2/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r2/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/declaration')
})

router.get('/beta/r2/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/declaration-link')
})

router.get('/beta/r2/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r2/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/check-answers')
})


router.get('/beta/r2/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/infosent')
})

router.get('/beta/r2/bereavement-support-payment/infosent1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/infosent1')
})

router.get('/beta/r2/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/infosent-higher-rate')
})

router.get('/beta/r2/bereavement-support-payment/feedback', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/feedback')
})

router.get('/beta/r2/bereavement-support-payment/feedback-sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r2/bereavement-support-payment/feedback-sent')
})
/*==========================================================================*/




router.get('/beta/r1/bereavement-support-payment', function (req, res) {
  res.render('./integration/beta/r1/bereavement-support-payment/bereavement-support-payment')
})

router.get('/beta/r1/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/beta/r1/bereavement-support-payment/what-youll-get')
})

router.get('/beta/r1/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/beta/r1/bereavement-support-payment/how-to-claim')
})

router.get('/beta/r1/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/beta/r1/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/start')
})

router.get('/beta/r1/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r1/bereavement-support-payment/spa')
})


router.post('/beta/r1/bereavement-support-payment/dod', (req, res) => {
  if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantyear+'/'+req.body.claimantmonth+'/'+req.body.claimantday;
	  if(new Date(date) < new Date('1967/04/10')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  } else if(req.body.SPAApply == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body.SPAApply == 'Yes') {
	  res.redirect('./dod')
  }
})
router.post('/beta/r1/bereavement-support-payment/relationship', (req, res) => {
  if(req.body.claimantdaydod && req.body.claimantmonthdod && req.body.claimantyeardod) {
	  let date = req.body.claimantyeardod+'/'+req.body.claimantmonthdod+'/'+req.body.claimantdaydod;
	  if(new Date(date) < new Date('2021/03/15')) { 
		res.redirect('./dod-not-eligible')  
	  } else {
		res.redirect('./relationship')
	  }
  } else if(req.body['dod-Apply-Apply'] == 'No') {
	  res.redirect('./application-notsent')
  } else if(req.body['dod-Apply-Apply'] == 'Yes') {
	  res.redirect('./relationship')
  }
})
router.post('/beta/r1/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/beta/r1/bereavement-support-payment/country')
  }
})
router.post('/beta/r1/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./relationship-not-eligible')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else if(req.body['SE-Apply-Apply'] == 'No'){
		res.redirect('./application-notsent')
	  } else if(req.body['SE-Apply-Apply'] == 'Yes') {
		res.redirect('./country')
      } else {
		  res.redirect('./country')
	  }
})


router.get('/beta/r1/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r1/bereavement-support-payment/live-in-uk')
})

router.post('/beta/r1/bereavement-support-payment/live-in-uk', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./live-in-uk')
  }
})

router.get('/beta/r1/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r1/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/beta/r1/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r1/bereavement-support-payment/check-answers-eligibility')
})
router.post('/beta/r1/bereavement-support-payment/check-answers-eligibility', (req, res) => {
  if(req.body.uklocation == 'No') {
	  res.redirect('./live-in-uk-not-eligible')  
  } else {
	  res.redirect('./check-answers-eligibility')
  }
})

router.post('/beta/r1/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./about-you')
  }
})


router.post('/beta/r1/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'civil partner') {
	  res.redirect('./cp-date')  
  } else {
	  res.redirect('./marriage-date')
  }
})


router.post('/beta/r1/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/beta/r1/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/beta/r1/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/beta/r1/bereavement-support-payment/about-cb', (req, res) => {
	
  if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked') {
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){
	  res.redirect('./about-cb')
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  }else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you') 
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  }
})

router.get('/beta/r1/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/declaration')
})
router.get('/beta/r1/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/task-list')
})
router.get('/beta/r1/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/spa-not-eligible')
})
router.get('/beta/r1/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/country-not-eligible')
})
router.get('/beta/r1/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/dod-not-eligible')
})
router.get('/beta/r1/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/relationship-not-eligible')
})
router.get('/beta/r1/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r1/bereavement-support-payment/dod')
})
router.get('/beta/r1/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r1/bereavement-support-payment/relationship')
})

router.get('/beta/r1/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/dod')
})

router.get('/beta/r1/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/beta/r1/bereavement-support-payment/country')
})

router.get('/beta/r1/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/about-you')
})

router.get('/beta/r1/bereavement-support-payment/application-notsent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/application-notsent')
})

router.get('/beta/r1/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r1/bereavement-support-payment/your-name')
})

router.get('/beta/r1/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/your-ni')
})

router.get('/beta/r1/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/your-postcode')
})

router.get('/beta/r1/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/your-address')
})

router.get('/beta/r1/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/your-address-manual')
})

router.get('/beta/r1/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/marriage-date')
})

router.get('/beta/r1/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/marriage')
})

router.get('/beta/r1/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/marriage-register')
})

router.get('/beta/r1/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/marriage-certificate')
})

router.get('/beta/r1/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/marriage-verify')
})

router.get('/beta/r1/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/marriage-type')
})

router.get('/beta/r1/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/cp-date')
})

router.get('/beta/r1/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/cp')
})

router.get('/beta/r1/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/cp-certificate')
})

router.get('/beta/r1/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/about-child')
})


router.get('/beta/r1/bereavement-support-payment/about-cb', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/about-cb')
})



router.post('/beta/r1/bereavement-support-payment/about-cb-claim', (req, res) => {
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./about-cb-claim')
  }
})



router.get('/beta/r1/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/beta/r1/bereavement-support-payment/about-cb-claim')
})

router.get('/beta/r1/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/child')
})

router.get('/beta/r1/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/pregnant')
})


router.get('/beta/r1/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/check-answers-about-you')
})


router.get('/beta/r1/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/about-deceased')
})

router.get('/beta/r1/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r1/bereavement-support-payment/deceased-details')
})

router.get('/beta/r1/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r1/bereavement-support-payment/deceased-death')
})

router.get('/beta/r1/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/beta/r1/bereavement-support-payment/deceased-work')
})

router.get('/beta/r1/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/ni-cons')
})


router.get('/beta/r1/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/check-answers-deceased')
})


router.get('/beta/r1/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/contact-info')
})

router.get('/beta/r1/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r1/bereavement-support-payment/contact-details')
})

router.get('/beta/r1/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r1/bereavement-support-payment/contact-decision')
})


router.get('/beta/r1/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r1/bereavement-support-payment/comms-needs')
})


router.get('/beta/r1/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/beta/r1/bereavement-support-payment/comms-lang')
})


router.get('/beta/r1/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r1/bereavement-support-payment/check-answers-contact')
})

router.get('/beta/r1/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r1/bereavement-support-payment/bank-info')
})

router.get('/beta/r1/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/beta/r1/bereavement-support-payment/bank-details')
})

router.get('/beta/r1/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r1/bereavement-support-payment/check-answers-bank')
})


router.get('/beta/r1/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/beta/r1/bereavement-support-payment/identify-proof')
})

router.get('/beta/r1/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r1/bereavement-support-payment/identify-choose-2-items')
})


router.get('/beta/r1/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r1/bereavement-support-payment/your-passport-details')
})


router.get('/beta/r1/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r1/bereavement-support-payment/payslip-question-1')
})


router.get('/beta/r1/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r1/bereavement-support-payment/payslip-question-2')

})


router.get('/beta/r1/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r1/bereavement-support-payment/p60-question-1')
})


router.get('/beta/r1/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/beta/r1/bereavement-support-payment/p60-question-2')
})

router.get('/beta/r1/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/beta/r1/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/declaration')
})

router.get('/beta/r1/bereavement-support-payment/declaration-link', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/declaration-link')
})

router.get('/beta/r1/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/declaration-higher-rate')
})

router.get('/beta/r1/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/check-answers')
})


router.get('/beta/r1/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/infosent')
})

router.get('/beta/r1/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/beta/r1/bereavement-support-payment/infosent-higher-rate')
})

/*==========================================================================*/



router.get('/alpha/r2/bereavement-support-payment', function (req, res) {
  res.render('./integration/alpha/r2/bereavement-support-payment/bereavement-support-payment')
})

router.get('/alpha/r2/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/alpha/r2/bereavement-support-payment/what-youll-get')
})

router.get('/alpha/r2/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/alpha/r2/bereavement-support-payment/how-to-claim')
})

router.get('/alpha/r2/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/alpha/r2/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/start')
})

router.get('/alpha/r2/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/alpha/r2/bereavement-support-payment/spa')
})


router.post('/alpha/r2/bereavement-support-payment/dod', (req, res) => {
  if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantday+'/'+req.body.claimantmonth+'/'+req.body.claimantyear;
	  if(new Date(date) < new Date('10/04/1955')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  }
})
router.post('/alpha/r2/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/alpha/r2/bereavement-support-payment/country')
  }
})
router.post('/alpha/r2/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./child')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else {
		res.redirect('./country')
	  }
})


router.get('/alpha/r2/bereavement-support-payment/live-in-uk', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/alpha/r2/bereavement-support-payment/live-in-uk')
})

router.get('/alpha/r2/bereavement-support-payment/live-in-uk-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/alpha/r2/bereavement-support-payment/live-in-uk-not-eligible')
})


router.get('/alpha/r2/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/alpha/r2/bereavement-support-payment/check-answers-eligibility')
})


router.post('/alpha/r2/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./about-you')
  }
})

router.post('/alpha/r2/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'civil partner') {
	  res.redirect('./cp-date')  
  } else {
	  res.redirect('./marriage-date')
  }
})


router.post('/alpha/r2/bereavement-support-payment/comms-lang', (req, res) => {
  if(req.body.getcountrycb == 'Wales') {
	  res.redirect('./comms-lang')  
  } else {
	  res.redirect('./check-answers-contact')
  }
})


router.post('/alpha/r2/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/alpha/r2/bereavement-support-payment/payslip-question-1', (req, res) => {
  if(req.body.twooptions == 'p60') {
	  res.redirect('./p60-question1')  
  } else {
	  res.redirect('./payslip-question-1')
  }
})


router.post('/alpha/r2/bereavement-support-payment/about-cb', (req, res) => {
	
  if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked') {
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){
	  res.redirect('./about-cb')
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  }else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you') 
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./check-answers-about-you')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./check-answers-about-you')
	    
  }
})

router.get('/alpha/r2/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/declaration')
})
router.get('/alpha/r2/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/task-list')
})
router.get('/alpha/r2/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/spa-not-eligible')
})
router.get('/alpha/r2/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/country-not-eligible')
})
router.get('/alpha/r2/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/dod-not-eligible')
})
router.get('/alpha/r2/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/relationship-not-eligible')
})
router.get('/alpha/r2/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/alpha/r2/bereavement-support-payment/dod')
})
router.get('/alpha/r2/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/alpha/r2/bereavement-support-payment/relationship')
})

router.get('/alpha/r2/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/dod')
})

router.get('/alpha/r2/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswereligibility = req.query.checkanswereligibility;
  res.render('./integration/alpha/r2/bereavement-support-payment/country')
})

router.get('/alpha/r2/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/about-you')
})

router.get('/alpha/r2/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/alpha/r2/bereavement-support-payment/your-name')
})

router.get('/alpha/r2/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/your-ni')
})

router.get('/alpha/r2/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/your-postcode')
})

router.get('/alpha/r2/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/your-address')
})

router.get('/alpha/r2/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/your-address-manual')
})

router.get('/alpha/r2/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/marriage-date')
})

router.get('/alpha/r2/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/marriage')
})

router.get('/alpha/r2/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/marriage-register')
})

router.get('/alpha/r2/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/marriage-certificate')
})

router.get('/alpha/r2/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/marriage-verify')
})

router.get('/alpha/r2/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/marriage-type')
})

router.get('/alpha/r2/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/cp-date')
})

router.get('/alpha/r2/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/cp')
})

router.get('/alpha/r2/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/cp-certificate')
})

router.get('/alpha/r2/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/about-child')
})


router.get('/alpha/r2/bereavement-support-payment/about-cb', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/about-cb')
})



router.post('/alpha/r2/bereavement-support-payment/about-cb-claim', (req, res) => {
  if(req.body['acb'] == 'No') {
	  res.redirect('./check-answers-about-you') 
  } else {
	  res.redirect('./about-cb-claim')
  }
})



router.get('/alpha/r2/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/alpha/r2/bereavement-support-payment/about-cb-claim')
})

router.get('/alpha/r2/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/child')
})

router.get('/alpha/r2/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/pregnant')
})


router.get('/alpha/r2/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/check-answers-about-you')
})


router.get('/alpha/r2/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/about-deceased')
})

router.get('/alpha/r2/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/alpha/r2/bereavement-support-payment/deceased-details')
})

router.get('/alpha/r2/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/alpha/r2/bereavement-support-payment/deceased-death')
})

router.get('/alpha/r2/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerdeceased = req.query.checkanswerdeceased;
  res.render('./integration/alpha/r2/bereavement-support-payment/deceased-work')
})

router.get('/alpha/r2/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/ni-cons')
})


router.get('/alpha/r2/bereavement-support-payment/check-answers-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/check-answers-deceased')
})


router.get('/alpha/r2/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/contact-info')
})

router.get('/alpha/r2/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/alpha/r2/bereavement-support-payment/contact-details')
})

router.get('/alpha/r2/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/alpha/r2/bereavement-support-payment/contact-decision')
})


router.get('/alpha/r2/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/alpha/r2/bereavement-support-payment/comms-needs')
})


router.get('/alpha/r2/bereavement-support-payment/comms-lang', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswercontact = req.query.checkanswercontact;
  res.render('./integration/alpha/r2/bereavement-support-payment/comms-lang')
})


router.get('/alpha/r2/bereavement-support-payment/check-answers-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/alpha/r2/bereavement-support-payment/check-answers-contact')
})

router.get('/alpha/r2/bereavement-support-payment/bank-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/alpha/r2/bereavement-support-payment/bank-info')
})

router.get('/alpha/r2/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkanswerbank = req.query.checkanswerbank;
  res.render('./integration/alpha/r2/bereavement-support-payment/bank-details')
})

router.get('/alpha/r2/bereavement-support-payment/check-answers-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/alpha/r2/bereavement-support-payment/check-answers-bank')
})


router.get('/alpha/r2/bereavement-support-payment/identify-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/alpha/r2/bereavement-support-payment/identify-proof')
})

router.get('/alpha/r2/bereavement-support-payment/identify-choose-2-items', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/alpha/r2/bereavement-support-payment/identify-choose-2-items')
})


router.get('/alpha/r2/bereavement-support-payment/your-passport-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/alpha/r2/bereavement-support-payment/your-passport-details')
})


router.get('/alpha/r2/bereavement-support-payment/payslip-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/alpha/r2/bereavement-support-payment/payslip-question-1')
})


router.get('/alpha/r2/bereavement-support-payment/payslip-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/alpha/r2/bereavement-support-payment/payslip-question-2')

})


router.get('/alpha/r2/bereavement-support-payment/p60-question-1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/alpha/r2/bereavement-support-payment/p60-question-1')
})


router.get('/alpha/r2/bereavement-support-payment/p60-question-2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweridentity = req.query.checkansweridentity;
  res.render('./integration/alpha/r2/bereavement-support-payment/p60-question-2')
})

router.get('/alpha/r2/bereavement-support-payment/check-answers-identity-proof', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/check-answers-identity-proof')
})

router.get('/alpha/r2/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/declaration')
})

router.get('/alpha/r2/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/declaration-higher-rate')
})

router.get('/alpha/r2/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/check-answers')
})


router.get('/alpha/r2/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/infosent')
})

router.get('/alpha/r2/bereavement-support-payment/infosent-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/alpha/r2/bereavement-support-payment/infosent-higher-rate')
})

/*==========================================================================*/

router.get('/version-1/bereavement-support-payment', function (req, res) {
  res.render('./integration/version-1/bereavement-support-payment/bereavement-support-payment')
})

router.get('/version-1/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/version-1/bereavement-support-payment/what-youll-get')
})

router.get('/version-1/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/version-1/bereavement-support-payment/how-to-claim')
})

router.get('/version-1/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/version-1/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/start')
})

router.get('/version-1/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/spa')
})

router.post('/version-1/bereavement-support-payment/dod', (req, res) => {
  if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantday+'/'+req.body.claimantmonth+'/'+req.body.claimantyear;
	  if(new Date(date) < new Date('10/04/1955')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  }
})
router.post('/version-1/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/version-1/bereavement-support-payment/country')
  }
})
router.post('/version-1/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./child')
	  } else if(req.body.getcb == 'Husband' || req.body.getcb == 'Wife' || req.body.getcb == 'Civil partner'){
		res.redirect('./country')  
	  } else {
		res.redirect('./country')
	  }
 
})
router.post('/version-1/bereavement-support-payment/declaration', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./your-details')
  }
})

router.post('/version-1/bereavement-support-payment/about-you', (req, res) => {
  if(req.body.getcountrycb == 'Outside the UK') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./about-you')
  }
})

router.post('/version-1/bereavement-support-payment/marriage-date', (req, res) => {
  if(req.body.getcb == 'civil partner') {
	  res.redirect('./cp-date')  
  } else {
	  res.redirect('./marriage-date')
  }
})

router.post('/version-1/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.post('/version-1/bereavement-support-payment/about-cb', (req, res) => {
	
  if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked') {
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){
	  res.redirect('./about-cb')
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-cb')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-deceased')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')  
  }else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-deceased')  
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased') 
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')  
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-deceased')
	    
  } else if(req.body['16years'] == '16years' && req.body['16to19'] == '16to19' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == 'farm1' && req.body['farm2'] == '_unchecked'){ 
	  res.redirect('./about-deceased')
	    
  } else if(req.body['16years'] == '_unchecked' && req.body['16to19'] == '_unchecked' && req.body['farm1'] == '_unchecked' && req.body['farm2'] == 'farm2'){ 
	  res.redirect('./about-deceased')
	    
  }
})

router.get('/version-1/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/declaration')
})
router.get('/version-1/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/task-list')
})
router.get('/version-1/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/spa-not-eligible')
})
router.get('/version-1/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/country-not-eligible')
})
router.get('/version-1/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/dod-not-eligible')
})
router.get('/version-1/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/relationship-not-eligible')
})
router.get('/version-1/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/dod')
})
router.get('/version-1/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/relationship')
})

router.get('/version-1/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/dod')
})

router.get('/version-1/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/country')
})

router.get('/version-1/bereavement-support-payment/about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/about-you')
})

router.get('/version-1/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/your-name')
})

router.get('/version-1/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/your-ni')
})

router.get('/version-1/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/your-postcode')
})

router.get('/version-1/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/your-address')
})

router.get('/version-1/bereavement-support-payment/your-address-manual', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/your-address-manual')
})

router.get('/version-1/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/marriage-date')
})

router.get('/version-1/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/marriage')
})

router.get('/version-1/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/marriage-register')
})

router.get('/version-1/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/marriage-certificate')
})

router.get('/version-1/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/marriage-verify')
})

router.get('/version-1/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/marriage-type')
})

router.get('/version-1/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/cp-date')
})

router.get('/version-1/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/cp')
})

router.get('/version-1/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/cp-certificate')
})

router.get('/version-1/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/about-child')
})

router.get('/version-1/bereavement-support-payment/about-cb', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/about-cb')
})

router.get('/version-1/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/about-cb-claim')
})

router.get('/version-1/bereavement-support-payment/child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/child')
})

router.get('/version-1/bereavement-support-payment/pregnant', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/pregnant')
})

router.get('/version-1/bereavement-support-payment/about-deceased', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/about-deceased')
})

router.get('/version-1/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/deceased-details')
})

router.get('/version-1/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/deceased-death')
})

router.get('/version-1/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/deceased-work')
})

router.get('/version-1/bereavement-support-payment/ni-cons', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/ni-cons')
})

router.get('/version-1/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/bank-details')
})

router.get('/version-1/bereavement-support-payment/contact-info', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/contact-info')
})

router.get('/version-1/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/contact-details')
})

router.get('/version-1/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/contact-decision')
})


router.get('/version-1/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-1/bereavement-support-payment/comms-needs')
})

router.get('/version-1/bereavement-support-payment/check-answers', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/check-answers')
})

router.get('/version-1/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/declaration')
})

router.get('/version-1/bereavement-support-payment/declaration-higher-rate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/declaration-higher-rate')
})

router.get('/version-1/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-1/bereavement-support-payment/infosent')
})
/*==========================================================================*/
router.post('/feedback/bereavement-support-payment/question2', (req, res) => {
  if(req.body['question1'] != undefined) {
	  res.redirect('./question2')  
  } else {
	  res.redirect('./question1')
  }
})
router.post('/feedback/bereavement-support-payment/question3', (req, res) => {
  if(req.body['question2'] != undefined) {
	  res.redirect('./question3')  
  } else {
	  res.redirect('./question2')
  }
})
router.post('/feedback/bereavement-support-payment/question4', (req, res) => {
  if(req.body['question3'] != undefined) {
	  res.redirect('./question4')  
  } else {
	  res.redirect('./question3')
  }
})
router.post('/feedback/bereavement-support-payment/question5', (req, res) => {
  if(req.body['question4'] != undefined) {
	  res.redirect('./question5')  
  } else {
	  res.redirect('./question4')
  }
})
router.post('/feedback/bereavement-support-payment/question6', (req, res) => {
  if(req.body['question5'] != undefined) {
	  res.redirect('./question6')  
  } else {
	  res.redirect('./question5')
  }
})
router.post('/feedback/bereavement-support-payment/sent', (req, res) => {
  if(req.body['question6'] != undefined) {
	  res.redirect('./sent')  
  } else {
	  res.redirect('./question6')
  }
})
router.get('/feedback/bereavement-support-payment/question1', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/feedback/question1')
})

router.get('/feedback/bereavement-support-payment/question2', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/feedback/question2')
})

router.get('/feedback/bereavement-support-payment/question3', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/feedback/question3')
})

router.get('/feedback/bereavement-support-payment/question4', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/feedback/question4')
})

router.get('/feedback/bereavement-support-payment/question5', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/feedback/question5')
})

router.get('/feedback/bereavement-support-payment/question6', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/feedback/question6')
})

router.get('/feedback/bereavement-support-payment/sent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/feedback/sent')
})
/*==========================================================================*/

router.get('/version-2/bereavement-support-payment', function (req, res) {
  res.render('./integration/version-2/bereavement-support-payment/bereavement-support-payment')
})

router.get('/version-2/bereavement-support-payment/what-youll-get', function (req, res) {
  res.render('./integration/version-2/bereavement-support-payment/what-youll-get')
})

router.get('/version-2/bereavement-support-payment/how-to-claim', function (req, res) {
  res.render('./integration/version-2/bereavement-support-payment/how-to-claim')
})

router.get('/version-2/government/publications/bereavement-support-payment-claim-form', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/bereavement-support-payment-claim-form')
})

router.get('/version-2/bereavement-support-payment/start', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/start')
})

router.get('/version-2/bereavement-support-payment/spa', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/spa')
})


router.post('/version-2/bereavement-support-payment/dod', (req, res) => {
  if(req.body.claimantday && req.body.claimantmonth && req.body.claimantyear) {
	  let date = req.body.claimantday+'/'+req.body.claimantmonth+'/'+req.body.claimantyear;
	  if(new Date(date) < new Date('10/04/1967')) {
		res.redirect('./spa-not-eligible')  
	  } else {
		res.redirect('./dod')
	  }
  }
})
router.post('/version-2/bereavement-support-payment/dod', (req, res) => {
  if(req.body.getcb == 'I do not know') {
	  res.redirect('./relationship-not-eligible')  
  } else {
	  res.locals.includeDODName = req.body.getcb
	  res.render('./integration/version-2/bereavement-support-payment/country')
  }
})


router.post('/version-2/bereavement-support-payment/country', (req, res) => { 
  if(req.body.getcb == 'Someone else') {
		res.redirect('./relationship-not-eligible')  
	  } else if(req.body.getcb == 'Partner I lived with') {
		  res.redirect('./child')
	  } else if(req.body.getcb == 'husband' || req.body.getcb == 'wife'|| req.body.getcb == 'civil partner'){
		res.redirect('./country')  
	  }
 
})




router.post('/version-2/bereavement-support-payment/declaration', (req, res) => {
  if(req.body.getcountrycb == 'I do not know') {
	  res.redirect('./country-not-eligible')  
  } else {
	  res.redirect('./declaration')
  }
})
router.post('/version-2/bereavement-support-payment/task-list', (req, res) => {
  if(req.body.claimantfullname && req.body.claimantinsurancenumber) {
      res.locals.includeYourInfo = 'true'
      res.render('./integration/version-2/bereavement-support-payment/task-list')
  } else {
      res.redirect('./task-list')
  }
})


router.get('/version-2/bereavement-support-payment/declaration', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/declaration')
})
router.get('/version-2/bereavement-support-payment/task-list', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/task-list')
})
router.get('/version-2/bereavement-support-payment/spa-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/spa-not-eligible')
})
router.get('/version-2/bereavement-support-payment/country-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/country-not-eligible')
})
router.get('/version-2/bereavement-support-payment/dod-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/dod-not-eligible')
})
router.get('/version-2/bereavement-support-payment/relationship-not-eligible', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/relationship-not-eligible')
})
router.get('/version-2/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/dod')
})
router.get('/version-2/bereavement-support-payment/relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/relationship')
})

router.get('/version-2/bereavement-support-payment/dod', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/dod')
})

router.get('/version-2/bereavement-support-payment/country', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/country')
})

router.get('/version-2/bereavement-support-payment/about-child', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.aboutyou = req.query.aboutyou;
  res.render('./integration/version-2/bereavement-support-payment/about-child')
})

router.get('/version-2/bereavement-support-payment/check-answers-eligibility', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/check-answers-eligibility')
})

router.get('/version-2/bereavement-support-payment/your-name', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/your-name')
})

router.get('/version-2/bereavement-support-payment/your-ni', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/your-ni')
})
router.get('/version-2/bereavement-support-payment/about-cb', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/about-cb')
})
router.get('/version-2/bereavement-support-payment/deceased-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/deceased-details')
})
router.get('/version-2/bereavement-support-payment/deceased-death', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/deceased-death')
})
router.get('/version-2/bereavement-support-payment/deceased-work', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/deceased-work')
})
router.get('/version-2/bereavement-support-payment/about-cb-claim', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/about-cb-claim')
})
router.get('/version-2/bereavement-support-payment/your-postcode', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/your-postcode')
})

router.get('/version-2/bereavement-support-payment/your-address', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/your-address')
})
router.get('/version-2/bereavement-support-payment/check-answer-partner', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/check-answer-partner')
})
router.get('/version-2/bereavement-support-payment/check-answers-about-you', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/check-answers-about-you')
})

router.get('/version-2/bereavement-support-payment/marriage-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/version-2/bereavement-support-payment/marriage-date')
})

router.get('/version-2/bereavement-support-payment/marriage', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/version-2/bereavement-support-payment/marriage')
})

router.get('/version-2/bereavement-support-payment/marriage-register', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/version-2/bereavement-support-payment/marriage-register')
})

router.get('/version-2/bereavement-support-payment/marriage-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/version-2/bereavement-support-payment/marriage-certificate')
})

router.get('/version-2/bereavement-support-payment/marriage-verify', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/marriage-verify')
})

router.get('/version-2/bereavement-support-payment/marriage-type', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.locals.checkansweraboutyou = req.query.checkansweraboutyou;
  res.render('./integration/version-2/bereavement-support-payment/marriage-type')
})
router.get('/version-2/bereavement-support-payment/check-answer-relationship', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/check-answer-relationship')
})

router.get('/version-2/bereavement-support-payment/check-answer-children', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/check-answer-children')
})
router.get('/version-2/bereavement-support-payment/bank-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/bank-details')
})
router.get('/version-2/bereavement-support-payment/check-answer-bank', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/check-answer-bank')
})
router.get('/version-2/bereavement-support-payment/contact-details', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/contact-details')
})
router.get('/version-2/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/contact-decision')
})
router.get('/version-2/bereavement-support-payment/contact-decision', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/contact-decision')
})
router.get('/version-2/bereavement-support-payment/comms-needs', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/comms-needs')
})
router.get('/version-2/bereavement-support-payment/check-answer-contact', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/check-answer-contact')
})

router.get('/version-2/bereavement-support-payment/cp-date', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/cp-date')
})

router.get('/version-2/bereavement-support-payment/cp', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/cp')
})

router.get('/version-2/bereavement-support-payment/cp-certificate', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.locals.checkanswer = req.query.checkanswer;
  res.render('./integration/version-2/bereavement-support-payment/cp-certificate')
})
router.post('/version-2/bereavement-support-payment/marriage-register', (req, res) => {
  if(req.body['marriage-location'] == 'No') {
	  res.redirect('./marriage-certificate')  
  } else {
	  res.redirect('./marriage-register')
  }
})

router.get('/version-2/bereavement-support-payment/infosent', function (req, res) {
  res.locals.includeServiceName = 'true'
  res.render('./integration/version-2/bereavement-support-payment/infosent')
})

// New routes for live as-is journey

// router.post('/nochildren-not-eligible2-answer', function(req, res){ 
//   if ( req.body ['nochildren'] == '/no-children' ) {
//       res.redirect('/nochildren-not-eligible2');
//     } else { 
//       res.redirect('/country2');
//     } 
    
  
// });

// Run this code when a form is submitted to 'about-children-answer'
router.post('/about-children-answer', function (req, res) {

  // Make a variable and give it the value from 'howmanychildren'
  var howmanychildren = req.session.data['children']

  // Check whether the variable matches a condition
  if (howmanychildren == "None of these apply"){
    // Send user to ineligibility page
    res.redirect('/private-beta/v3/bereavement-support-payment/nochildren-not-eligible')
  } else {
    // Send user to next paget
    res.redirect('/private-beta/v3/bereavement-support-payment/country')
  }

}) 

// Run this code when a form is submitted to 'email-notifications-answer'
router.post('/email-notifications-answer', function (req, res) {

  // Make a variable and give it the value from 'typeofemail'
  var typeofemail = req.session.data['emailtype']

  // Check whether the variable matches a condition
  if (typeofemail == "no-emails"){
    // Send user to skip email input
    res.redirect('/private-beta/v3/bereavement-support-payment/comms-needs')
  } else {
    // Send user to email details
    res.redirect('/private-beta/v3/bereavement-support-payment/email-details')
  }

})

// GENERIC NEXT PAGE ELEMENT
router.post('*', function (req, res, next) {
  console.log(req.body);
  if (req.body['next-page']) {
    res.redirect(req.body['next-page']);
  } else {
    next();
  }
});


// TEST ROUTE 
router.post('/relationship-answer', function(request, response) {

  var relationship = request.session.data['relationship']
  if (relationship == "Living together"){
      response.redirect("/private-beta/v3/bereavement-support-payment/about-children")
  } else if (relationship == "Married"){
    response.redirect("/private-beta/v4/bereavement-support-payment/country")
  } else if (relationship == "Civil partnership"){
    response.redirect("/private-beta/v5/bereavement-support-payment/country")
  } else {
      response.redirect("/private-beta/v6/bereavement-support-payment/relationship-not-eligible")
  }
})

// // ROUTE FOR MARRIED to SKIP CB QUESTION 
// router.post('/child-benefit-answer', function(request, response) {

//   var children = request.session.data['children']
//   if (children.includes("I was responsible for a child under 16")){
//       response.redirect("/private-beta/v4/bereavement-support-payment/check-answers-about-you-no-cb")
//   } else if (children == "I was responsible for a child aged 16 to 19 and in full-time education or training"){
//       response.redirect("/private-beta/v4/bereavement-support-payment/check-answers-about-you-no-cb")
//   } else {
//       response.redirect("/private-beta/v4/bereavement-support-payment/check-answers-about-you-no-cb")
//   }
// })

// // ROUTE FOR CIVIL PARTNERSHIP TO SKIP CB QUESTION 
// router.post('/child-benefit-answer-cp', function(request, response) {

//   var childrencp = request.session.data['childrencp']
//   if (childrencp.includes("I was responsible for a child under 16")){
//       response.redirect("/private-beta/v5/bereavement-support-payment/check-answers-about-you-no-cb")
//   } else if (childrencp == "I was responsible for a child aged 16 to 19 and in full-time education or training"){
//       response.redirect("/private-beta/v5/bereavement-support-payment/check-answers-about-you-no-cb")
//   } else {
//       response.redirect("/private-beta/v5/bereavement-support-payment/check-answers-about-you-no-cb")
//   }
// })

// EMAIL CONFIRMATION QUESTION V8

// router.post('/email-answer', function(request, response) {

//   var emailanswer = request.session.data['emailanswer']
//   if (emailanswer == "yes"){
//       response.redirect("/private-beta/v8/bereavement-support-payment/email-confirm2")
//   } else {
//       response.redirect("/private-beta/v8/bereavement-support-payment/comms-needs")
//   }
// })

// LINK TO ALT PLUGIN

router.post('/email-answer', function(request, response) {

  var emailanswer = request.session.data['emailanswer']
  if (emailanswer == "yes"){
      response.redirect("/private-beta/v8/bereavement-support-payment/email-confirm2")
  } else {
      response.redirect("/dwp-alternative-formats-plugin/start?alternative_formats_exit_url=/private-beta/v8/bereavement-support-payment/check-answers-contact")
  }
})


// IDENTITY ANSWER

// router.post('/identity-answer', function(request, response) {

//   var identity = request.session.data['identitycheck']
//   if (identity == "Yes"){
//       response.redirect("/private-beta/v7/bereavement-support-payment/check-answers-contact")
//   } else {
//       response.redirect("/private-beta/v7/bereavement-support-payment/check-answers-contact")
//   }
// })

// COMMS ANSWER V7

router.post('/comms-answer', function(request, response) {

  var comms = request.session.data['commsneeds']
  if (comms == "yes"){
      response.redirect("/private-beta/v8/bereavement-support-payment/comms-type")
  } else {
      response.redirect("/private-beta/v8/bereavement-support-payment/check-answers-contact")
  }
})

// COMPUTER OR TABLET ANSWER IDV

router.post('/tech-answer', function(request, response) {

  var tech = request.session.data['computerortablet']
  if (tech == "Yes"){
      response.redirect("/private-beta/idv/do-you-have-smartphone")
  } else {
      response.redirect("/private-beta/idv/which-smartphone")
  }
})

// VALID PASSPORT ANSWER

router.post('/valid-passport-answer', function(request, response) {

  var passport = request.session.data['valid-passport']
  if (passport == "Yes"){
      response.redirect("/private-beta/idv/passport-symbol")
  } else {
      response.redirect("/private-beta/idv/biometric")
  }
})

// ID-TYPE ANSWER

router.post('/id-type-answer', function(request, response) {

  var idtype = request.session.data['have-photo-id']
  if (idtype == "Yes"){
      response.redirect("/private-beta/idv/computer-or-tablet")
  } else {
      response.redirect("/private-beta/idv/id-at-post-office")
  }
})

// Routes for Driving licence CRI

router.get('/who-issued-licence/answer', (req, res) => {
  // Check if there was an error
  const showErrorSummary = req.query.error === 'true';

  // Render the template with the error condition
  res.render('/page-index/driving-licence-cri/who-issued-licence.html', { showErrorSummary });
});

// Handle form submission
router.post('/who-issued-licence/answer', (req, res) => {
  // Check if a radio button is selected
  const selectedOption = req.body['issuerName'];

  if (selectedOption) {
    // If radio option is selected:
    if (selectedOption === "dvla") {
      // Send user to set up auth app
      res.redirect('/private-beta/idv/online/enter-dvla-driving-licence-details');
    } else if (selectedOption === "dva") {
      // Send user to enter passport details
      res.redirect('/private-beta/idv/online/enter-dva-driving-licence-details');
    } else if (selectedOption === "no-uk-licence") {
      // Send user to prove identity at the post office
      res.redirect('/private-beta/idv/online/manual-identity');
    }
  } else {
    // If no radio button is selected, redirect to /ineligible-next-steps/answer with error
    res.redirect('/who-issued-licence/answer?error=true');
  }
});

router.get('/ineligible-next-steps/answer', (req, res) => {
  // Check if there was an error
  const showErrorSummary = req.query.error === 'true';

  // Render the template with the error condition
  res.render('/page-index/app-cri/ineligible.html', { showErrorSummary });
});

// Handle form submission
router.post('/ineligible-next-steps/answer', (req, res) => {
  // Check if a radio button is selected
  const selectedOption = req.body['ineligible-next-steps'];

  if (selectedOption) {
    // If radio option is selected:
    if (selectedOption === "security-questions-driving-licence") {
  // Send user to...
      res.redirect('/private-beta/idv/online/who-issued-licence');
    } else if (selectedOption === "security-questions-passport") {
      // Send user to enter passport details
      res.redirect('/private-beta/idv/online/enter-passport-details');
    } else if (selectedOption === "another-way") {
      // Send user to prove identity at the post office
      res.redirect('/private-beta/idv/online/prove-identity-at-post-office');
    }
  } else {
    // If no radio button is selected, redirect to /ineligible-next-steps/answer with error
    res.redirect('/ineligible-next-steps/answer?error=true');
  }
});


// SMARTPHONE ANSWER

router.post('/smartphone-answer', function(request, response) {

  var smartphone = request.session.data['have-a-smartphone']
  if (smartphone == "I don't have either of these"){
      response.redirect("/private-beta/idv/online/manual-identity")
  } else {
      response.redirect("/private-beta/idv/valid-passport")
  }
})

// WHICH SMARTPHONE ANSWER

router.post('/which-smartphone-answer', function(request, response) {

  var whichsmartphone = request.session.data['smartphone']
  if (whichsmartphone == "Neither of these phones"){
      response.redirect("/private-beta/idv/online/manual-identity")
  } else {
      response.redirect("/private-beta/idv/valid-passport")
  }
})

// WORKING CAMERA ANSWER

router.post('/working-camera-answer', function(request, response) {

  var workingcamera = request.session.data['working-camera']
  if (workingcamera == "No"){
      response.redirect("/private-beta/idv/online/manual-identity")
  } else {
      response.redirect("/private-beta/idv/flashing-colours")
  }
})

// FLASHING COLOURS ANSWER

router.post('/flashing-colours-answer', function(request, response) {

  var flashingcolours = request.session.data['flashing-colours']
  if (flashingcolours == "No"){
      response.redirect("/private-beta/idv/online/manual-identity")
  } else {
      response.redirect("/private-beta/idv/app-version-dynamic")
  }
})

// DRIVING LICENCE ANSWER

router.post('/driving-licence-answer', function(request, response) {

  var drivinglicence = request.session.data['driving-licence']
  if (drivinglicence == "No"){
      response.redirect("/private-beta/idv/online/manual-identity")
  } else {
      response.redirect("/private-beta/idv/use-app")
  }
})

// ALT FORMATS PLUGIN

const alternativeFormatsPlugin = require("alternative-formats-plugin");

alternativeFormatsPlugin(router);

