<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Actions\CalculateCurrentPrice;

class CartController extends Controller
{
    public function getCart()
    {
            $user = Auth::user();
            $cartItems = $user->cart->productsInCart;
            return response()->json(CalculateCurrentPrice::run($cartItems));
    }

    public function addItemToCart(request $request)
    {
        $user = Auth::user();
        if ($user) {
            $cart = $user->cart;
            $product_id = $request->product_id;
            $cartItem = CartItem::where('cart_id', $cart->id)->where('product_id', $product_id)->first();
            if ($cartItem) {
                if ($cartItem->quantity > 10) {
                    return response()->json(['message' => 'You can not add more than 10 same items to cart']);
                }
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            return response()->json(['message' => 'Item was already added to cart','Current number ' => $cartItem->quantity]);
            
            }
        }
        CartItem::insert(
            [
                    'cart_id' => $user->cart->id,
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]
        );
        return response()->json(['success' => 'Item added to cart']);
    }
    public function removeItemFromCart($product_id)
    {
        $user = Auth::user();
            $cart = $user->cart;
            $cartItem = CartItem::where('cart_id', $cart->id)->where('product_id', $product_id)->delete();
            if($cartItem){
                return response()->json(['message' => 'Item was removed from cart']);
            }
            return response()->json(['success' => 'Item not found in cart']);
    }
    public function emptyCart(){
        $user = Auth::user();
        $cart = $user->cart;
        $cartItems = CartItem::where('cart_id', $cart->id)->delete();
        if($cartItems){
            return response()->json(['message' => 'Cart was emptied']);
        }
        return response()->json(['success' => 'Cart is empty']);
    }
    
}
// need to make a specialized request for products
// also need to make a check for quantity in cart, probably a service
