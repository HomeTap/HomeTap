$(function() {
  $('.removeQueueButton').click(function() {
    $.ajax('/user/' + this.dataset.id, {
      method: 'PUT'
    }).done(function() {

    });
  });
});
