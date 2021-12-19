<?php

namespace App\Actions;

use App\Models\Product;

use function PHPSTORM_META\type;
use Lorisleiva\Actions\Concerns\AsAction;

class CalculateCurrentPrice
{
    use AsAction;

    public function handle($products)
    {
        if($products){
            if($products instanceof \Illuminate\Pagination\LengthAwarePaginator) {
                $updatedItems = $this->determinePlural($products->getCollection());
                $products->setCollection($updatedItems);
            }else{
                $this->determinePlural($products);
            }
            return $products;
        }
        return null;
    }
    public function determinePlural($products){
        if ($products instanceof \Illuminate\Database\Eloquent\Collection || $products instanceof \Illuminate\Support\Collection) {
            foreach ($products as $product) {
                $this->calculate($product);
            }
        } else {
            $this->calculate($products);
        }
        return $products;

    }

    public function calculate($p){
        if (isset($p->discount)) {
            $p->current_price = $p->price - ($p->price * $p->discount->discount / 100);
        } else {
            $p->current_price = $p->price;
        }
    }
}
