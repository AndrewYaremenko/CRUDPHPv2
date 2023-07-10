<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Session;

class ProductController extends Controller
{
    public function index()
    {
        $currentPage = Session::get('currentPage', 1);
        $search = Session::get('search', '');

        if (!empty($search)) {
            $products = Product::where('title', 'like', '%' . $search . '%')
                ->orWhere('price', 'like', '%' . $search . '%')
                ->orderBy('id', 'desc')
                ->paginate(5, ['*'], 'page', $currentPage);

            $products->appends(['search' => $search]);
        } else {
            $products = Product::latest()->paginate(5, ['*'], 'page', $currentPage);
        }

        return view('products', compact('products'));
    }

    public function store()
    {
        try {
            $validatedData = request()->validate([
                'title' => 'required|string|unique:products',
                'price' => 'required|numeric',
            ]);

            Product::create($validatedData);

            return response()->json(['status' => 'success']);
        } catch (ValidationException $exception) {
            return response()->json(['errors' => $exception->errors()], 422);
        }
    }

    public function update(Product $product)
    {
        try {
            $validatedData = request()->validate([
                'title' => 'required|string|unique:products,title,' . request()->id,
                'price' => 'required|numeric',
            ]);

            $product->update($validatedData);

            return response()->json(['status' => 'success']);
        } catch (ValidationException $exception) {
            return response()->json(['errors' => $exception->errors()], 424);
        }
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['status' => 'success']);
    }


    public function pagination()
    {
        $search = Session::get('search', '');

        if (!empty($search)) {
            $products = Product::where('title', 'like', '%' . $search . '%')
                ->orWhere('price', 'like', '%' . $search . '%')
                ->orderBy('id', 'desc')
                ->paginate(5);
        } else {
            $products = Product::latest()->paginate(5);
        }

        $products->appends(['search' => $search]);

        Session::put('currentPage', $products->currentPage());

        return view('partials.products_table_pagination', compact('products'))->render();
    }

    public function search()
    {
        $search = request()->search;
        $page = request()->page;
    
        Session::put('search', $search);
        Session::put('currentPage', $page);
    
        $products = Product::where('title', 'like', '%' . $search . '%')
            ->orWhere('price', 'like', '%' . $search . '%')
            ->orderBy('id', 'desc')
            ->paginate(5, ['*'], 'page', $page);
    
        if ($products->count() >= 1) {
            return view('partials.products_table_pagination', compact('products'))->render();
        } else {
            return response([
                'status' => '404'
            ]);
        }
    }
    
}
