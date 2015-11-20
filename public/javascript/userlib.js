$(function() {
  $('.favoriteButton').click(function() {
    var self = this;

    $.ajax('/user/beers/favorite/' + this.dataset.id, {
      method: 'PUT'
    }).done(function() {
      if ($(self).text() === 'Favorite') $(self).text('Un-Favorite');
      else if ($(self).text() === 'Un-Favorite') $(self).text('Favorite');
    });
  });

  $('.favoriteList').click(function(){
    var element = $(this);
    $.ajax({
      method: 'GET',
      url: '/user/beers/favorite/' + this.dataset.id,
    });
  });

  $('.queueButton').click(function() {
    $.ajax('/user/beers/favorite/' + this.dataset.id, {
      method: 'PUT'
    });
  });
});
