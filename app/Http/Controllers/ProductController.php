<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate(5);
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
            return response()->json(['errors' => $exception->errors()], 422);
        }
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['status' => 'success']);
    }
}
