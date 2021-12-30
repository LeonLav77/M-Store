<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Jobs\CreateInvoice;
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
            // $user->cart->productsInCart()->delete();
            // treba da poslije se vidi sta je unutra
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
        $order = $user->orders->first();
        // ->where('paid_at', null)
        $payment_method = $request['payment-method'];
        try {
            $user->createOrGetStripeCustomer();
            $user->updateDefaultPaymentMethod($payment_method);
            $user->charge($order->price, $payment_method);
            $order->update([
                'paid_at' => now(),
            ]);
            dispatch(new CreateInvoice($order->id, $user->id));
            return response()->redirectTo('/');
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
