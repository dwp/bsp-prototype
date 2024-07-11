/* global $ */

//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  window.GOVUKFrontend.initAll()
  })

function nextPageBasedOnSelection($radioObject) {
  if (nextPageRoutes) {
    for (let index = 0; index < Object.keys(nextPageRoutes).length; index++) {
      var checkboxValue = $radioObject.val()
      if (nextPageRoutes[checkboxValue] != undefined) {
        var nextPageField = null
        if ($('#next-page').length) {
          nextPageField = $('#next-page')
        } else {
          nextPageField = $('<input type="hidden" id="next-page" name="next-page">')
          $('form').append(nextPageField)
        }
        nextPageField.val(nextPageRoutes[checkboxValue])
        console.log('Next page destination has been set as "' + nextPageRoutes[checkboxValue] + '"')
        break
      } else {
        $('#next-page').remove()
      }
    }
  }
 }
    
  $('input[type=radio]').on('change', function() {
    try { 
      $('input[type=radio]:checked').each(function() {
        nextPageBasedOnSelection($(this))
      })
    } catch (e) {}
  })

