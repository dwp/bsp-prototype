const format = require('date-fns/format')

function addToLog (req, type) {
  console.info('page*********************', req.params);
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
    } else if (details[0] === 'claimant' && details[1] === 'name') {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} updated`
      log.push({title})
    } else if (details[0] === 'deceased' && details[1] === 'name') {
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} updated`
      log.push({title})
    } else {
      console.info('type..................5', type);
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} entered`
      log.push({title})
    }
  }
  if (type === 'verify') { 
    
    
    if (page === 'child-benefit') {  console.info('type..................2', type);
      const title = `${capitalizeFirstLetter(details[0])} ${details[1]} verified`
      log.push({title})
    }  else if(page == 'contributions'){  console.info('type..................', type);
      const title = `${capitalizeFirstLetter(page)} verified`
      log.push({title})
    }else {  console.info('type..................4', type);
       const details = page.split('-')
      const title = `${capitalizeFirstLetter(details[0])} verified`
      log.push({title})
    }
  }
   if (type === 'contact') {
    const details = page.split('-')
      const title = `${capitalizeFirstLetter(details[0])} ${details[1] ? details[1]: ''} entered`
      log.push({title})
  }
  const set = Array.from(new Set(log))
  req.session.data.log = set
  console.info('type..................1', set);
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function getTestDate () {
  return format(new Date(), 'D MMMM YYYY')
}

module.exports = {addToLog, getTestDate}
