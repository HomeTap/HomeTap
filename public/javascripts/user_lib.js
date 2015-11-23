$(function() {
  $('.favoriteButton').click(function() {
    var self = $(this);

    $.ajax({
      url: '/user/beers/favorite/' + this.dataset.id,
      method: 'PUT'
    }).done(function() {
      if (self.text() === 'Favorite') self.text('Un-Favorite');
      else if (self.text() === 'Un-Favorite') self.text('Favorite');
    });
  });

  $('.queueButton').click(function() {
    var self = $(this);

    $.ajax({
      url: '/user/beers/queue/' + this.dataset.id,
      method: 'PUT'
    }).done(function() {
      if (self.text() === 'Add To Queue') self.text('Remove From Queue');
      else if (self.text() === 'Remove From Queue') self.text('Add To Queue');
    });
  });
});
