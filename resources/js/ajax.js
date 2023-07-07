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
        let route = $('meta[name="product-create-route"]').attr('content');

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
});
