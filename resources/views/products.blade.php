@extends('layouts.main')
@section('content')
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <h2 class="my-5 text-center">Laravel Ajax CRUD App</h2>
            <a class="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#addModal">
                Add product
            </a>
            <div class="table-data">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($products as $product)
                            <tr>
                                <th scope="row">{{ $product->id }}</th>
                                <td>{{ $product->title }}</td>
                                <td>{{ $product->price }}</td>
                                <td>
                                    <a href="#" class="btn btn-success" data-bs-toggle="modal"
                                        data-bs-target="#updateModal" data-id="{{ $product->id }}"
                                        data-title="{{ $product->title }}" data-price="{{ $product->price }}" id="updateProductForm"><i
                                            class="las la-pen"></i></a>
                                    <a href="#" class="btn btn-danger"><i class="las la-trash"></i></a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="pagination">
                    {{ $products->links() }}
                </div>
            </div>
        </div>
    </div>
@endsection
