<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\CartController;

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
// All products, probably not going to be used because there is a better version
Route::get('/allProducts',[APIController::class,'getAllProducts']);
// All products, with the current price
Route::get('/allProductsWithRealPrice',[APIController::class,'getAllProductsRealPrice']);

// Specific product, probably not going to be used because there is a better function
Route::get('/productById/{id}',[APIController::class,'getProductById']);
// Specific product with its current price
Route::get('/DiscProductWithPrice/{id}',[APIController::class,'getDiscProductWithPrice']);

// All products of a category
Route::get('/productsByCategory/{category}',[APIController::class,'getProductsByCategory']);

// They return the same result, but the first one has a calculated price
// if backend gets too slow we can switch to using the second one and
// calculate the price on the frontend
Route::get('/discountedProducts',[APIController::class,'getDiscountedProducts']);
Route::get('/discountedProductsInfo',[APIController::class,'getDiscountedProductsInfo']);

Route::resource('cart', CartController::class);
