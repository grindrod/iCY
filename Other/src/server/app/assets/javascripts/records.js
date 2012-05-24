history = history || {pushState: function() {
  console.log('[shim] history.pushState(', arguments, ')')
}};

$(document).on('ajax:beforeSend', function(e, xhr, settings) {
  /* return if this isn't from the 'list_scenarios' form */ 
  if( !(e.hasOwnProperty('target')
      && e.target.hasOwnProperty('id')
      && e.target.id === 'list_records') )
    return true;
  var url = settings.url.replace('?', '.csv?');
  $('#list_records a').text(url).prop('href', url)
    .css('opacity', 0).animate({opacity: 1});
  history.pushState({url: settings.url}, "results", settings.url);
});

$(document).on('ajax:complete', function(e, xhr) {
  /* return if this isn't from the 'list_scenarios' form */ 
  if( !(e.hasOwnProperty('target')
      && e.target.hasOwnProperty('id')
      && e.target.id === 'list_records') )
    return true;
  $('#search_results > tbody').html(xhr.responseText);
});