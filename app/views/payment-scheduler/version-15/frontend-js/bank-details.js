var obj = {
  France: 'bank-account-five-iban',
  'United Kingdom': 'bank-account-uk'
}
var countries = Object.keys(obj)

var substringMatcher = function (strs) {
  return function (q, cb) {
    var matches = []

    // regex used to determine if a string contains the substring `q`
    var substrRegex = new RegExp(q, 'i')

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str)
      }
    })

    if (matches.length === 1) {
      loadFields(matches[0])
    } else {
      $('#countryFields').hide()
    }

    cb(matches)
  }
}

function loadFields (text) {
  var $countryFields = $('#countryFields')

  // Hide and disable all bank fields
  $('.bank-fields-wrapper').hide()
  $countryFields.find('input').attr('disabled', true)
  $countryFields.find('textarea').attr('disabled', true)

  // Find the form for selected country and enable all of the fields
  var $form = $(document).find('[data-formId="' + obj[text] + '"]')

  if ($form.length > 0) {
    $form.find('input').attr('disabled', false)
    $form.find('textarea').attr('disabled', false)
    $countryFields.show()
    $form.show()
  }
}

$('#input-accountCountry').typeahead(
  {
    hint: true,
    highlight: true,
    minLength: 2
  },
  {
    name: 'countries',
    source: substringMatcher(countries)
  }
)

$(document).ready(function () {
  $('#input-accountCountry').val('United Kingdom')
  loadFields('United Kingdom')
})

$(document).on('click', '.tt-suggestion', function (e) {
  var text = $(e.target).text()
  loadFields(text)
})

$(document).on('focus', '#input-accountCountry', function () {
  $(this).select()
})

$(document).on('blur', '#input-accountCountry', function () {
  if ($('#countryFields:hidden') && $('.tt-suggestion').length === 1) {
    $('.tt-suggestion:first').trigger('click')
  }
})
