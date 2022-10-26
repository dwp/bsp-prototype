'use-strict'

function getResearchScenario (req) {
  if (req.session.data.scenario === '4') {
    if (req.session.data.dateOfClaim) {
      const day = String(req.session.data.dateOfClaim.day).padStart(2, '0')
      const month = req.session.data.dateOfClaim.month
      const year = req.session.data.dateOfClaim.year
      const date = day + month + year
      if (date === '01102017') {
        return 1
      }
      if (date === '02102017') {
        return 2
      }
      if (date === '03102017') {
        return 3
      }
    }
    return 4
  }
  return req.session.data.scenario
}

function clearFormData (req) {
  req.session.data.dateOfClaim = {}
  req.session.data.claimant = {}
  req.session.data.partner = {}
  req.session.data.children = {}
  req.session.data.payment = {}
  req.session.data.eligibility = {}
  req.session.data.verification = {}
  req.session.data.notUsed = {}
  req.session.data.skipPaymentDetails = false
}

module.exports = {getResearchScenario, clearFormData}
