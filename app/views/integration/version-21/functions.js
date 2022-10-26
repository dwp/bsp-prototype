const format = require('date-fns/format')

function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function addToLog (req, type) {
  const log = req.session.data.log || []
  const page = req.params.page || 'contributions'
  if (type === 'marriage') {
    const entry = {title: 'Relationship verified', caption: ''}
    log.push(entry)
  }
  if (type === 'evidence') {
    const entry = {title: '', caption: ''}
    if (req.body.doNext === 'wait') {
      entry.title = 'Relationship checked'
      entry.caption += 'Evidence of marriage or civil partnership needed.<br />'
    }
    if (req.body.doNext === 'ask') {
      entry.title = 'Relationship checked'
      if (req.body.evidenceNeeded.length === 1) {
        entry.caption += capitalizeFirstLetter(`${req.body.evidenceNeeded[0]}`) + ` requested.`
      }
      if (req.body.evidenceNeeded.length === 2) {
        entry.caption += capitalizeFirstLetter(`${req.body.evidenceNeeded[0]}`) + ` and ${req.body.evidenceNeeded[1]} requested.`
      }
    }
    if (req.body.doNext === 'refer') {
      entry.title = 'Referred to RVU'
    }
    log.push(entry)
  }
  if (type === 'capture') {
    const details = page.split('-')
    if (details[0] === 'children') {
      const entry = {title: 'Children details entered', caption: ''}
      if (req.body.children['dependant-children'] === 'Yes') {
        entry.caption += 'Has dependent children.<br />'
      }
      if (req.body.children.pregnant === 'Yes') {
        entry.caption += 'Is pregnant.'
      }
      log.push(entry)
    } else if (details[0] === 'payment' && req.body['payment-details-provided'] === 'No') {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} missing`
      log.push({title})
    } else {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} entered`
      log.push({title})
    }
  }
  if (type === 'verify') {
    if (page === 'contributions') {
      const entry = {
        title: 'Contributions verified'
      }
      log.push(entry)
    } else {
      const details = page.split('-')
      if (page === 'child-benefit') {
        const entry = {
          title: 'Dependent children verified'
        }
        log.push(entry)
      } else {
        const title = `${capitalizeFirstLetter(details[0])} verified`
        log.push({title})
      }
    }
  }
  const set = Array.from(new Set(log))
  req.session.data.log = set
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function getTestDate () {
  return format(new Date(), 'D MMMM YYYY')
}

module.exports = {addToLog, getTestDate}
