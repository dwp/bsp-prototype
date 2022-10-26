
$(document).on('submit', 'form', function (e) {
  var day = $('#input-dateOfDeath-day').val()
  var month = $('#input-dateOfDeath-month').val()
  var year = $('#input-dateOfDeath-year').val()
  var dataEntered = day.length + month.length + year.length
  var throwError = validateDate(day, month, year)

  if (dataEntered > 0 && throwError === 'Invalid') {
    e.preventDefault()
    setTimeout(function () {
      $(document).scrollTop('body', 0)
      appendErrorBanner()
      appendErrors([
        '#input-dateOfDeath-day'
      ])

      $('input').blur();

      throwError = 'No'
    }, 500)
  }
})
function validateDate(day, month, year) {
  var stringDate = year + '-' + month + '-' + day
  var date = new Date(stringDate)
  var cutOff = new Date('2017-04-06')

  if (date < cutOff) {
    return 'Invalid'
  }
  return 'Valid'
}
function appendErrorBanner() {
  $('main:first').prepend(
    '<div class="error-summary" role="group" aria-labelledby="error-summary-heading-example-1" tabindex="-1">' +
    '  <h1 class="heading-medium error-summary-heading" id="error-summary-heading-example-1">' +
    '    There\'s a problem' +
    '  </h1>' +
    '  <p>' +
    '    Check your form. You must:' +
    '  </p>' +
    '  <ul class="error-summary-list">' +
    '    <li>' +
    '    <a href="#validate">' +
    '      Check the date of death - the details entered mean the claimant can not get Bereavement Support Payment.' +
    '    </a>' +
    '  </li>' +
    '  </ul>' +
    '</div>'
  )
}
function appendErrors(array) {
  for (var i = 0; i < array.length; i++) {
    $(array[i]).closest('fieldset').closest('.form-group').addClass('form-group-error')
    $(array[i]).closest('.form-date').find('input').addClass('form-control-error')
    $(array[i]).closest('fieldset').find('legend').append(
      '<span class="error-message">' +
      '  Enter these details again' +
      '</span>'
    )
  }
}
