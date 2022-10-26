$(document).on('click', '.p-tabs li', function () {
  var showId = $(this).attr('id')
  $('.p-tabs li').each(function () {
    var hideId = $(this).attr('id')
    $(this).removeClass('current')
    $('#' + hideId + '-content').addClass('hidden')
  })
  $('#' + showId).addClass('current')
  $('#' + showId + '-content').removeClass('hidden')
})
