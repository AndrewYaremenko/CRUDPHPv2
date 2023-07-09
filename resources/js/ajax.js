$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

$(function () {
  $(document).on('click', '#saveProduct', function (e) {
    e.preventDefault();
    let title = $('#title');
    let price = $('#price');
    let route = $('meta[name="products-store-route"]').attr('content');

    sendAjax(route, 'post', { title: title.val(), price: price.val() }, function (response) {
      resetFormAndModal('#addProductForm', '#addModal');
      loadTableData();
      toastr.success('Product is saved!', 'Success!');
    }, handleAjaxError);
  });

  $(document).on('click', '#updateProductBtn', function (e) {
    e.preventDefault();
    let id = $(this).data('id');
    let title = $(this).data('title');
    let price = $(this).data('price');

    setUpdateFields(id, title, price);
  });

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
    }, handleAjaxError);
  });

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

  $(document).on('click', '.pagination a', function (e) {
    e.preventDefault();
    let page = $(this).attr('href').split('page=')[1];
    let route = $('meta[name="products-pagination-route"]').attr('content');

    loadTableDataWithPage(route, page);
  });

  function loadTableData() {
    let currentPage = $('.pagination .active').text();
    let route = $('meta[name="products-pagination-route"]').attr('content');
    loadTableDataWithPage(route, currentPage);
  }

  function loadTableDataWithPage(route, page) {
    $.ajax({
      url: route + '?page=' + page,
      success: function (response) {
        $('.table-data').html(response);
      }
    });
  }

  function sendAjax(url, method, data, successCallback, errorCallback) {
    $.ajax({
      url,
      method,
      data,
      success: successCallback,
      error: errorCallback
    });
  }

  function resetFormAndModal(formId, modalId) {
    $(modalId).modal('hide');
    $(formId)[0].reset();
  }

  function setUpdateFields(id, title, price) {
    $('#update_id').val(id);
    $('#update_title').val(title);
    $('#update_price').val(price);
    $('#update_title-error, #update_price-error').text('');
  }

  function handleAjaxError(error) {
    let err = error.responseJSON;
    $('#title-error, #price-error, #update_title-error, #update_price-error').text('');
    $.each(err.errors, function (field, errors) {
      $('#' + field + '-error').text(errors[0]);
    });
  }
});
