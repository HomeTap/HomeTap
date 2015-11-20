$(function() {

  $('.deleteButton').click(function(){
    var element = $(this);

    $.ajax({
      method: 'DELETE',
      url: '/admin/beers/' + this.dataset.id,
      success: function(){
        element.parent().parent().remove();
      }
    });
  });
});