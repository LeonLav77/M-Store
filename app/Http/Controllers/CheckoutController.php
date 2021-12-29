<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function createOrder(){
        $user = Auth::user();
        if ($user->cart->productsInCart->count() > 0) {
            $total = 0;
            $cartItems = $user->cart->productsInCart;
            foreach ($cartItems as $cartItem) {
                $total += $cartItem->product->price * $cartItem->quantity;
            }
            $user->orders()->create([
                'cart_id' => $user->cart->id,
                'price' => $total,
            ]);
        }
    }
    public function orderData(){
        $user = Auth::user();
        $intent = $user->createSetupIntent();
        $order = Order::where('user_id', $user->id)->where('paid_at', null)->first();
        return response()->json(['clientSecret' => $intent->client_secret, 'order' => $order, 'user' => $user]);
    }
    public function pay(request $request){
        $user = Auth::user();
        $order = $user->orders->where('paid_at', null)->first();
        dd($order);
    }
}
