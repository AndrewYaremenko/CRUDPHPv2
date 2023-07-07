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

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|unique:products',
                'price' => 'required|numeric',
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
