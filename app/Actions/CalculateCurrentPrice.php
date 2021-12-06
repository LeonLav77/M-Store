<?php

namespace App\Actions;

use App\Models\Product;

use function PHPSTORM_META\type;
use Lorisleiva\Actions\Concerns\AsAction;

class CalculateCurrentPrice
{
    use AsAction;

    public function handle($product)
    {
        if($product instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            $product = collect($product->items());
        }
        if ($product instanceof \Illuminate\Database\Eloquent\Collection || $product instanceof \Illuminate\Support\Collection) {
            // $product = collect($product);
            foreach ($product as $p) {
                // return $p->discount->discount;
                if (isset($p->discount)) {
                    $p->current_price = $p->price - ($p->price * $p->discount->discount / 100);
                } else {
                    $p->current_price = $p->price;
                }
            }
            return $product;
        } else {
            if (isset($product->discount)) {
                $product->current_price = $product->price - ($product->price * $product->discount->discount / 100);
            } else {
                $product->current_price = $product->price;
            }
            return $product;
        }
        return 'Error has occured';
    }
}
