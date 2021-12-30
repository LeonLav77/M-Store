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
        if ($user->cart->productsInCart->count() <= 0) {
                return response()->json(['message' => 'No products in cart'], 400);
        }
        if ($user->orders->where('paid_at', null)->count() > 0) {
            return response()->json(['message' => 'You already have an order'], 400);
        }
            $total = 0;
            $cartItems = $user->cart->productsInCart;
            foreach ($cartItems as $cartItem) {
                $total += $cartItem->product->price * $cartItem->quantity;
            }
            $user->orders()->create([
                'cart_id' => $user->cart->id,
                'price' => $total,
            ]);
            return response()->json(['message' => 'Order created'], 200);
    }
    public function orderData(){
        $user = Auth::user();
        $intent = $user->createSetupIntent();
        $order = Order::where('user_id', $user->id)->where('paid_at', null)->first();
        if ($order) {
            return response()->json(['clientSecret' => $intent->client_secret, 'order' => $order, 'user' => $user]);
        }
        return response()->json(['error' => 'No order found']);
    }
    public function pay(request $request){
        $user = Auth::user();
        $order = $user->orders->where('paid_at', null)->first();
        if(!($order)){
            return response()->json(['error' => 'No order found']);
        }
        $payment_method = $request['payment-method'];
        try {
            $user->createOrGetStripeCustomer();
            $user->updateDefaultPaymentMethod($payment_method);
            $user->charge($order->price, $payment_method);
            // this should be done after a webhook is received
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
