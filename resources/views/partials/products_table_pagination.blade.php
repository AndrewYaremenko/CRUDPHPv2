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
                    <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal"
                        data-id="{{ $product->id }}" data-title="{{ $product->title }}"
                        data-price="{{ $product->price }}"
                        data-update-route="{{ route('products.update', ['product' => $product->id]) }}"
                        id="updateProductBtn"><i class="las la-pen"></i></a>
                    <a href="#" class="btn btn-danger" data-id="{{ $product->id }}"
                        data-update-route="{{ route('products.destroy', ['product' => $product->id]) }}"
                        id="destroyProductBtn"><i class="las la-trash"></i></a>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
<div class="pagination">
    {{ $products->appends(['page' => session('currentPage')])->links() }}
</div>

