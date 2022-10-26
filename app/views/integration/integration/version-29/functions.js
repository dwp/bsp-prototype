const format = require('date-fns/format')

function addToLog (req, type) {
  const log = req.session.data.log || []
  const page = req.params.page
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
    const details = page.split('-')
    if (page === 'child-benefit') {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} verified`
      log.push({title})
    } else {
      const title = `${capitalizeFirstLetter(details[0])} verified`
      log.push({title})
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
