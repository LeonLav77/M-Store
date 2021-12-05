<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// WCP = With Current Price
// Product routes can be refactored into resource routes


Route::get('/login/github', [LoginController::class, 'loginWithGithub']);

Route::get('/login/github/callback', [LoginController::class, 'handleGithubCallback']);


// All products, probably not going to be used because there is a better version
Route::get('/allProducts', [APIController::class,'getAllProducts']);
// All products, with the current price
Route::get('/allProductsWCP', [APIController::class,'getAllProductsRealPrice']);

// Specific product, probably not going to be used because there is a better function
Route::get('/productById/{id}', [APIController::class,'getProductById']);
// Specific product with its current price
Route::get('/productWCP/{id}', [APIController::class,'getDiscProductWithPrice']);

// Get all categories with their info
Route::get('/categories', [APIController::class,'getCategories']);
// Get all category names
Route::get('/categoryNames', [APIController::class,'getCategoryNames']);
// All products of a category
Route::get('/productsByCategory/{categoryName}', [APIController::class,'getProductsByCategory']);
// All products of a category with their current price
Route::get('/productsByCategoryWCP/{categoryName}', [APIController::class,'getProductsByCategoryWCP']);

// Return discounted products
Route::get('/discountedProducts', [APIController::class,'getDiscountedProducts']);

// Get all In stock products
Route::get('/inStockProducts', [APIController::class,'getInStockProducts']);
// Get all Out of stock products
Route::get('/OutOfStockProducts', [APIController::class,'getOutOfStockProducts']);
// See if a product is in stock
Route::get('/inStockProduct/{id}', [APIController::class,'getInStockProduct']);
// A search with a many options
Route::get('/complexFilterSearch', [APIController::class,'getComplexFilterSearch']);
// route for testing
Route::get('/test', [APIController::class,'test']);

Route::post('/checkIfLoggedIn', [APIController::class,'checkIfLoggedIn']);
Route::middleware(['loggedIn'])->group(function () {
    // Contents of your cart
    Route::get('/cart', [CartController::class,'getCart']);
    // Add an item to cart
    Route::post('/addItemToCart', [CartController::class,'addItemToCart']);
    // Remove an item from cart
    Route::delete('/itemFromCart/{id}', [CartController::class,'removeItemFromCart']);
    // Remove all items from cart
    Route::delete('/emptyCart', [CartController::class,'emptyCart']);
});
