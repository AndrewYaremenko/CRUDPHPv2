$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Set CSRF token for AJAX requests
  }
});

/**
 * Create
 */
$(function () {
  $(document).on('click', '#saveProduct', function (e) {
    e.preventDefault();
    let title = $('#title');
    let price = $('#price');
    let route = $('meta[name="product-store-route"]').attr('content'); // Get the route for storing the product

    sendAjax(route, 'post', { title: title.val(), price: price.val() }, function (response) {
      resetFormAndModal('#addProductForm', '#addModal'); // Reset the form and close the modal after successful AJAX request
      $('.table-data').load(location.href + ' .table-data'); // Refresh the table data after successful AJAX request
    }, handleAjaxError);
  });

  /**
   * Update modal
   */
  $(document).on('click', '#updateProductBtn', function (e) {
    e.preventDefault();
    let id = $(this).data('id');
    let title = $(this).data('title');
    let price = $(this).data('price');

    setUpdateFields(id, title, price);
  });

  /**
   * Update
   */
  $(document).on('click', '#updateProduct', function (e) {
    e.preventDefault();

    let title = $('#update_title').val();
    let price = $('#update_price').val();
    let id = $('#update_id').val();
    let route = $('#updateProductBtn[data-id="' + id + '"]').data('update-route'); // Get the route for updating the product

    sendAjax(route, 'PATCH', { id: id, title: title, price: price }, function (response) {
      resetFormAndModal('#updateProductForm', '#updateModal'); // Reset the form and close the modal after successful AJAX request
      $('.table-data').load(location.href + ' .table-data'); // Refresh the table data after successful AJAX request
    }, handleAjaxError);
  });


  /**
   * Destroy
   */
  $(document).on('click', '#destroyProductBtn', function (e) {
    e.preventDefault();

    let id = $(this).data('id');
    let route = $('#destroyProductBtn[data-id="' + id + '"]').data('update-route'); // Get the route for destroy the product

    if(confirm('Are you sure to delete product?')) {
      sendAjax(route, 'POST', null, function (response) {
        $('.table-data').load(location.href + ' .table-data'); // Refresh the table data after successful AJAX request
      }, null);
    }
  });

  /**
   * Other functions
   */
  function sendAjax(url, method, data, successCallback, errorCallback) {
    $.ajax({
      url: url,
      method: method,
      data: data,
      success: successCallback,
      error: errorCallback
    });
  }

  function resetFormAndModal(formId, modalId) {
    $(modalId).modal('hide'); // Close the modal
    $(formId)[0].reset(); // Reset the form
  }

  function setUpdateFields(id, title, price) {
    $('#update_id').val(id);
    $('#update_title').val(title);
    $('#update_price').val(price);
    $('#update_title-error').text(''); // Clear any error messages for the title field
    $('#update_price-error').text(''); // Clear any error messages for the price field
  }

  function handleAjaxError(error) {
    let err = error.responseJSON;
    $('#title-error, #price-error, #update_title-error, #update_price-error').text(''); // Clear any previous error messages
    $.each(err.errors, function (field, errors) {
      $('#' + field + '-error').text(errors[0]); // Display the first error message for each field
    });
  }
});
