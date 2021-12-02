<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{

    public function getCart()
    {
        $products = Cart::first()->productsInCart;
        return response()->json($products);
    }

    public function addItemToCart(){
            CartItem::insert(
                [
                    'cart_id' => 1,
                    'product_id' => 1,
                    'quantity' => 1,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]
            );
            return response()->json(['success' => 'Item added to cart']);
        }
}
