// Set CSRF token for AJAX requests
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

$(function () {
  // Handle click event for create product button
  $(document).on('click', '#createProductBtn', function (e) {
    e.preventDefault();
    $('#title-error, #price-error').text('');
  });

  // Handle click event for save product button
  $(document).on('click', '#saveProduct', function (e) {
    e.preventDefault();
    let title = $('#title');
    let price = $('#price');
    let route = $('meta[name="products-store-route"]').attr('content');

    sendAjax(route, 'post', { title: title.val(), price: price.val() }, function (response) {
      resetFormAndModal('#addProductForm', '#addModal');
      loadTableData();
      toastr.success('Product is saved!', 'Success!');
    }, handleAjaxSaveError);
  });

  // Handle click event for update product button
  $(document).on('click', '#updateProductBtn', function (e) {
    e.preventDefault();
    let id = $(this).data('id');
    let title = $(this).data('title');
    let price = $(this).data('price');

    setUpdateFields(id, title, price);
  });

  // Handle click event for update product button inside the modal
  $(document).on('click', '#updateProduct', function (e) {
    e.preventDefault();
    let title = $('#update_title').val();
    let price = $('#update_price').val();
    let id = $('#update_id').val();
    let route = $('#updateProductBtn[data-id="' + id + '"]').data('update-route');

    sendAjax(route, 'PATCH', { id, title, price }, function (response) {
      resetFormAndModal('#updateProductForm', '#updateModal');
      loadTableData();
      toastr.success('Product is updated!', 'Success!');
    }, handleAjaxUpdateError);
  });

  // Handle click event for destroy product button
  $(document).on('click', '#destroyProductBtn', function (e) {
    e.preventDefault();
    let id = $(this).data('id');
    let route = $('#destroyProductBtn[data-id="' + id + '"]').data('update-route');

    if (confirm('Are you sure to delete product?')) {
      sendAjax(route, 'POST', null, function (response) {
        loadTableData();
        toastr.success('Product is deleted!', 'Success!');
      }, null);
    }
  });

  // Handle click event for pagination links
  $(document).on('click', '.pagination a', function (e) {
    e.preventDefault();
    let page = $(this).attr('href').split('page=')[1];
    let route = $('meta[name="products-pagination-route"]').attr('content');

    loadTableDataWithPage(route, page);
  });

  // Handle keyup event for search input
  $(document).on('keyup', '#search', function (e) {
    e.preventDefault();

    let route = $('meta[name="products-search-route"]').attr('content');
    let search_string = $('#search').val();
    let currentPage = $('.pagination .active').text();

    sendAjax(route, 'GET', { search: search_string, page: currentPage }, function (response) {
      $('.table-data').html(response);
    });
  });

  // Load table data for the current page
  function loadTableData() {
    let currentPage = $('.pagination .active').text();
    let route = $('meta[name="products-pagination-route"]').attr('content');
    loadTableDataWithPage(route, currentPage);
  }

  // Load table data for the specified page
  function loadTableDataWithPage(route, page) {
    let search = $('#search').val();

    sendAjax(route + '?page=' + page + '&search=' + search, 'GET', null, function (response) {
      $('.table-data').html(response);

      if ($('.table-data tbody tr').length === 0 && page > 1) {
        loadTableDataWithPage(route, page - 1);
      }
    });
  }

  // Send AJAX request
  function sendAjax(url, method, data, successCallback, errorCallback) {
    $.ajax({
      url,
      method,
      data,
      success: successCallback,
      error: errorCallback
    });
  }

  // Reset form and modal
  function resetFormAndModal(formId, modalId) {
    $(modalId).modal('hide');
    $(formId)[0].reset();
  }

  // Set update fields in the modal
  function setUpdateFields(id, title, price) {
    $('#update_id').val(id);
    $('#update_title').val(title);
    $('#update_price').val(price);
    $('#update_title-error, #update_price-error').text('');
  }

  // Handle AJAX save errors
  function handleAjaxSaveError(error) {
    let err = error.responseJSON;
    $('#title-error, #price-error').text('');
    $.each(err.errors, function (field, errors) {
      $('#' + field + '-error').text(errors[0]);
    });
  }

  // Handle AJAX update errors
  function handleAjaxUpdateError(error) {
    let err = error.responseJSON;
    $('#update_title-error, #update_price-error').text('');
    $.each(err.errors, function (field, errors) {
      $('#update_' + field + '-error').text(errors[0]);
    });
  }
});