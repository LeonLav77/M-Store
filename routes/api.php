<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ExtraFortifyController;

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

// Product routes can be refactored into resource routes


Route::get('/login/github', [LoginController::class, 'loginWithGithub']);

Route::get('/login/github/callback', [LoginController::class, 'handleGithubCallback']);


// All products, probably not going to be used because there is a better version
// Route::get('/allProducts', [APIController::class,'getAllProducts']);
// All products, with the current price
Route::get('/allProducts', [APIController::class,'getAllProducts']);

// Specific product, probably not going to be used because there is a better function
// Route::get('/productById/{id}', [APIController::class,'getProductById']);
// Specific product with its current price
Route::get('/product/{id}', [APIController::class,'getProduct']);

Route::get('/relatedProducts/{id}', [APIController::class,'getRelatedProducts']);

Route::get('/sameSellerProducts/{id}', [APIController::class,'getSameSellerProducts']);

Route::get('/search', [APIController::class,'search']);

// Get all categories with their info
Route::get('/categories', [APIController::class,'getCategories']);
// All products of a category with their current price
Route::get('/productsByCategory/{categoryName}', [APIController::class,'getProductsByCategory']);

// Return discounted products
Route::get('/discountedProducts', [APIController::class,'getDiscountedProducts']);

// A search with a many options
Route::get('/complexFilterSearch', [APIController::class,'getComplexFilterSearch']);
// route for testing
Route::post('/test', [APIController::class,'test']);
//
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
    
    Route::get('/hasTFAEnabled', [ExtraFortifyController::class,'getHasTFAEnabled']);

    Route::post('/addToWishlist', [WishlistController::class,'addToWishlist']);

    Route::delete('/removeFromWishlist/{id}', [WishlistController::class,'removeFromWishlist']);

    Route::get('/wishlist', [WishlistController::class,'getWishlist']);

    Route::group(['middleware' =>'seller'],function () {
        Route::post('/becomeSeller', [SellerController::class,'becomeSeller']);
        Route::group(['prefix'=>'seller','as'=>'seller.','middleware' =>'sellerOperations'], function(){
            // Become a seller
            // another layer of middleware, isSeller
            Route::get('/info', [SellerController::class,'getSellerInfo']);
            // this already exists at /sameSellerProducts/{id}
            Route::get('/products', [SellerController::class,'getSellerProducts']);
            // Add a product to seller
            Route::post('/products', [SellerController::class,'addProduct']);
            // Remove a product from seller
            Route::delete('/product/{id}', [SellerController::class,'deleteProduct']);

            // Could be refactored into a single method
            Route::put('/product/{id}', [SellerController::class,'updateProduct']);
            // Update a products Price
            Route::put('/updateProductPrice', [SellerController::class,'updateProductPrice']);
            // Update a products Details
            Route::put('/updateProductDetails', [SellerController::class,'updateProductDetails']);
            // Update a products Stock
            Route::put('/addStock', [SellerController::class,'addStock']);
            // Remove a products Stock(ex: when a product is sold)
            Route::put('/removeStock', [SellerController::class,'removeStock']);


            // Update or Add to a products Discount
            Route::post('/addUpdateDiscount', [SellerController::class,'addUpdateDiscount']);
            // Remove a products Discount
            Route::delete('/removeDiscount/{id}', [SellerController::class,'removeDiscount']);
            });
        });
});
// {{base}}seller/productss