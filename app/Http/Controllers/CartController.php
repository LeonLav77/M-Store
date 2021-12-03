<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function getCart()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $cart = $user->cart;
            $cartItems = $cart->cartItems;
            return response()->json($cart);
        }
        return response()->json(['message' => 'You are not logged in']);
        $cart = Cart::where('user_id', Auth::user()->id)->first();        
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
