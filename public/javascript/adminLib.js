$(function() {

  $('.deleteButton').click(function(){
    console.log('hit delete request');
    $.ajax({
      method: 'DELETE',
      url: '/admin/beers/' + this.dataset.id
    });
  });
});
