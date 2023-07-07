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
        let route = $('meta[name="product-store-route"]').attr('content');

        $.ajax({
            url: route,
            method: 'post',
            data: { title: title.val(), price: price.val() },
            success: function (response) {
                $('#title-error').text('');
                $('#price-error').text('');
                if (response.status == 'success') {
                    $('#addModal').modal('hide');
                    $('#addProductForm')[0].reset();

                    $('.table-data').load(location.href + ' .table-data');

                }
            },
            error: function (error) {
                let err = error.responseJSON;
                $('#title-error').text('');
                $('#price-error').text('');
                $.each(err.errors, function (field, errors) {
                    $('#' + field + '-error').text(errors[0]);
                });
            }
        });
    });

    $(document).on('click', '#updateProductForm', function (e) {
        e.preventDefault();
        let id = $(this).data('id');
        let title = $(this).data('title');
        let price = $(this).data('price');

        $('#update_id').val(id);
        $('#update_title').val(title);
        $('#update_price').val(price);
    });
});
