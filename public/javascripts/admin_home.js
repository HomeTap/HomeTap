$(function() {

  $('.fulfillOrder').click(function() {
    var self = $(this);
    $.ajax({
      method: 'PUT',
      url: '/admin/' + this.dataset.id
    }).done(function() {
      self.parent().parent().remove();
    });
  });
});
