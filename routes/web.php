<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProductController::class, 'index'])->name('products');
Route::post('/', [ProductController::class, 'store'])->name('products.store');
Route::patch('/{product}', [ProductController::class, 'update'])->name('products.update');
Route::post('/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
Route::get('/pagination', [ProductController::class, 'pagination'])->name('products.pagination');
