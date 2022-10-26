const format = require('date-fns/format')

function addToLog (req, type) {
  const log = req.session.data.log || []
  const page = req.params.page
  if (type === 'capture') {
    const details = page.split('-')
    const title = `${capitalizeFirstLetter(details[0])} ${details[1]} changed`
    log.push({title})
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
