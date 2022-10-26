var throwError = throwError || $('form:first').attr('data-throwError')

$(document).on('submit', 'form', function (e) {
  var dataEntered = $('#input-accountNumber').val().length + $('#input-ibanNumber').val().length

  if (dataEntered > 0 && throwError === 'Yes') {
    e.preventDefault()
    setTimeout(function () {
      $(document).scrollTop('body', 0)
      appendErrorBanner()
      appendErrors([
        '#input-sortCode',
        '#input-accountNumber',
        '#input-bankCode',
        '#input-ibanNumber'
      ])

      editInputVal('#input-accountNumber')
      editInputVal('#input-ibanNumber')
      $('input').blur();

      throwError = 'No'
    }, 500)
  }
})

function appendErrorBanner () {
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
    '      Check the bic code and iban number - the details you have entered are not a valid combination.' +
    '    </a>' +
    '  </li>' +
    '  </ul>' +
    '</div>'
  )
}
function appendErrors (array) {
  for (var i = 0; i < array.length; i++) {
    $(array[i]).closest('.form-group').addClass('form-group-error')
    $(array[i]).closest('.form-group').find('.form-label').append(
      '<span class="error-message">' +
      '  Enter these details again' +
      '</span>'
    )
  }
}
function editInputVal (input) {
  $(input).val(function () {
    return $(this).val().replace(/.$/, 7)
  })
}
