$(function() {

  $('.deleteButton').click(function(){
  
    var element = $(this).parent();

    $.ajax({
      method: 'DELETE',
      url: '/admin/beers/' + this.dataset.id,
      success: function(){
        element.remove();
      }
    });
  });
});
