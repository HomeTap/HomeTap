$(function() {
  $('.favoriteButton').click(function() {
    $.ajax('/user/beers/favorite/' + this.dataset.id, {
      method: 'PUT'
    });
  });

  $('.queueButton').click(function() {
    $.ajax('/user/beers/favorite/' + this.dataset.id, {
      method: 'PUT'
    });
  });
});
