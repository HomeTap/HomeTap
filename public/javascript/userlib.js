$(function() {

  $('.favoriteButton').click(function(){
    $.ajax('/user/beers/favorite/' + this.dataset.id, {
      method: 'PUT',
      data: {this.dataset.fav}
    }).done();
  });


});
