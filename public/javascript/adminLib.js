$(function() {

  $('.deleteButton').click(function(){
<<<<<<< HEAD
    console.log('hit delete request');
    $.ajax({
      method: 'DELETE',
      url: '/admin/beers/' + this.dataset.id
=======
  
    var element = $(this).parent();

    $.ajax({
      method: 'DELETE',
      url: '/admin/beers/' + this.dataset.id,
      success: function(){
        element.remove();
      }
>>>>>>> development
    });
  });
});
