<?php

namespace App\Jobs;

use App\Models\Cart;
use App\Models\User;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use LaravelDaily\Invoices\Invoice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use LaravelDaily\Invoices\Classes\Buyer;
use LaravelDaily\Invoices\Classes\Party;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use LaravelDaily\Invoices\Classes\InvoiceItem;

class CreateInvoice implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $user;
    public $order;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order_id,$user_id)
    {
        $this->order_id = $order_id;
        $this->user_id = $user_id;
        $this->user = User::where('id', $this->user_id)->first();
        $this->order = Order::where('id', $this->order_id)->first();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->order->cart->productsInCart->count() <= 0) {
            return;
        }
        $customer = new Buyer([
            'name'          => $this->user->name,
            'custom_fields' => [
                'email' => $this->user->email,
            ],
        ]);
        $seller = new Party([
            'name'          => 'M-Store',
            'custom_fields' => [
                'email' => 'M-store@m-store.com',
            ],
        ]);
        $items = [];
        for ($i = 0; $i < $this->order->cart->productsInCart->count(); $i++) {
            $currentProduct = $this->order->cart->productsInCart[$i];
            $items[] = (new InvoiceItem())
            ->title($currentProduct->product->name)
            ->pricePerUnit($currentProduct->product->price)
            ->quantity($currentProduct->quantity)
            ->discountByPercent($currentProduct->product->discount->discount ?? 0);
        }       

        $invoice = Invoice::make()
        ->buyer($customer)
        ->seller($seller)
        // ->taxRate(15)
        // ->shipping(9.99)
        ->addItems($items)
        ->filename($this->order->id . '.invoice');
        // this should happen after webhook but it has to be on live
        $this->user->cart->productsInCart()->delete();
        $this->order->update([
            'delivered_at' => now(),
        ]);
        return $invoice->save();

    }
}
