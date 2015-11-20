$(function() {

  $('.deleteButton').click(function(){
    $.ajax({
      method: 'PUT',
      url: '/admin/beers/favorite/' + this.dataset.id
    });
  });
});
