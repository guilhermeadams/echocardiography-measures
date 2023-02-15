$(function() {
  const form = $('#edit-form');
  form.on('submit', function(event) {
    event.preventDefault();
    const id = form.data('id');
    const name = form.find('#name').val();
    const content = form.find('#content').val();
    const url = `/api/templates/${id}`;

    $.ajax({
      type: 'PUT',
      url: url,
      data: { name: name, content: content },
      success: function() {
        window.location.href = '/templates';
      },
      error: function(xhr) {
        console.error(xhr.responseText);
        alert('Failed to update template');
      }
    });
  });
});