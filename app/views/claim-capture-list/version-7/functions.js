function addToLog (req, type) {
  const log = req.session.data.log || []
  const page = req.params.page
  if (type === 'capture') {
    const details = page.split('-')
    if (details[0] === 'date' || details[0] === 'claimant' || details[0] === 'partner') {
      return
    }
    if (details[0] === 'payment' && req.body['payment-details-provided'] === 'No') {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} missing`
      log.push({title})
    } else {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} entered`
      log.push({title})
    }
  }
  if (type === 'verify') {
    const details = page.split('-')
    if (page === 'child-benefit') {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} verified`
      log.push({title})
    } else {
      const title = `${capitalizeFirstLetter(details[0])} verified`
      log.push({title})
    }
  }
  if (type === 'evidence') {
    log.push({title: 'Relationship status checked', caption: 'Proof of marriage or civil partnership needed'})
  }
  const set = Array.from(new Set(log))
  req.session.data.log = set
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

module.exports = {addToLog}
