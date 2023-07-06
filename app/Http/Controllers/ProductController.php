<?php

namespace App\Http\Controllers;

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
                'title' => 'required|unique:products',
                'price' => 'required',
            ], [
                'title.required' => 'Title is required',
                'title.unique' => 'Title already exists',
                'price.required' => 'Price is required',
            ]);


            return response()->json(['success' => true]);
            
        } catch (ValidationException $exception) {
            $errors = $exception->errors();
            return response()->json(['errors' => $errors], 422);
        }
    }
}
