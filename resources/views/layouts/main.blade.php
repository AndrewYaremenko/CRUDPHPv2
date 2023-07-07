<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="product-create-route" content="{{ route('product.create') }}">
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon/icon.ico') }}">
    <title>CRUD</title>
</head>

<body>

    <div class="container">
        @yield('content')
    </div>

    @include('partials.products_add_modal')
    @include('partials.products_update_modal')
    @include('partials.products_js')
</body>

</html>
