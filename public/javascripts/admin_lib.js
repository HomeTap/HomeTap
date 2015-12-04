$(function() {
  $('.deleteButton').click(function() {
    var self = $(this);

    $.ajax({
      url: '/admin/beers/' + this.dataset.id,
      method: 'DELETE'
    }).done(function() {
      self.parent().parent().remove();
    });
  });
});
