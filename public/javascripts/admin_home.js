$(function() {
  $('.fulfillOrder').click(function() {
    var self = $(this);

    $.ajax({
      url: '/admin/' + this.dataset.id,
      method: 'PUT'
    }).done(function() {
      self.parent().parent().remove();
    });
  });
});
