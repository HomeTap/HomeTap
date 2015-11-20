$(function() {
  $('.removeFromList').on('click', function() {
    var self = $(this);
    var url = '/user/beers/queue/';
    if(window.location.pathname === '/user/favorites'){
      url = '/user/favorites/';
    }

    $.ajax(url + this.dataset.id, {
      method: 'PUT'
    }).done(function() {
      self.parent().parent().remove();
    });
  });
});


