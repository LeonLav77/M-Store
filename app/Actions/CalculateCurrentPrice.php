<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class CalculateCurrentPrice
{
    use AsAction;

    public function handle($product)
    {
        if(is_array($product)){
            $product = collect($product);
            foreach($product as $p){
                $p->current_price = $p->price * (1 - $p->discount / 100);
            }
            return $product;
        }
        return $product;
    }
}
