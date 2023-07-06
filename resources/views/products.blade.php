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
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                                <a href="#" class="btn btn-success"><i class="las la-pen"></i></a>
                                <a href="#" class="btn btn-danger"><i class="las la-trash"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
@endsection
