const {addMonths, format} = require('date-fns')
var parse = require('date-fns/parse')

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  filters.loadDummyData = (filename, feature = 'claim-capture') => {
    const data = require(`./views/${feature}/_dummy-data/${filename}.json`)
    if (data.schedule) {
      const fMonth = parse(data.schedule.payments.firstMonthly)
      const monthly = []
      let currentDate
      for (let i = 1; i < data.schedule.payments.number; i++) {
        if (i === 1) {
          currentDate = fMonth
          monthly.push(format(currentDate, 'D MMMM YYYY'))
        }
        const newDate = addMonths(currentDate, 1)
        monthly.push(format(newDate, 'D MMMM YYYY'))
        currentDate = newDate
      }
      data.schedule.payments.monthly = monthly
    }
    return data
  }

  filters.formatMonth = (month) => {
    const array = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return array[month -1]
  }

  return filters
}
