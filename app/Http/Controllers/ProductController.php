<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    public function index()
    {
        return view('products');
    }

    public function create(Request $request)
    {
        try {
            $request->validate([
                'title' => 'string|required|unique:products',
                'price' => 'numeric|required',
            ], [
                'title.required' => 'Title is required',
                'title.unique' => 'Title already exists',
                'price.required' => 'Price is required',
            ]);

            $product = Product::create([
                'title' => $request->input('title'),
                'price' => $request->input('price'),
            ]);

            return response()->json(['status' => 'success']);

        } catch (ValidationException $exception) {
            $errors = $exception->errors();
            return response()->json(['errors' => $errors], 422);
        }
    }
}
