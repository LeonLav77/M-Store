<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public function scopeItemInStock($query, $id)
    {
        $product = $query->where('id', $id)->first();
        return $product->stock->isInStock;
    }
    // return all in stock products
    public function scopeInStock($query)
    {
        return $query->whereHas('stock', function ($query) {
            $query->where('isInStock', true);
        });
    }
    // return all out of stock products
    public function scopeOutOfStock($query)
    {
        return $query->whereHas('stock', function ($query) {
            $query->where('isInStock', false);
        });
    }
    // returns all discounted products with discount applied
    public function scopeDiscountedAll($query)
    {
        $results = $query->where('discount_id', '!=', null)->get();
        for ($i=0; $i < count($results); $i++) {
            $results[$i]->currentPrice = $results[$i]->price - ($results[$i]->price * $results[$i]->discount->discount / 100);
        }
        return $results;
    }
    // returns all products and the discounted ones with discount applied
    public function scopeAllProductsWithDiscounts($query)
        {
            $results = $query->get();
            for ($i=0; $i < count($results); $i++) {
                if(isset($results[$i]->discount_id)) 
                {
                    $results[$i]->currentPrice = $results[$i]->price - ($results[$i]->price * $results[$i]->discount->discount / 100);
                }
                else{
                    $results[$i]->currentPrice = $results[$i]->price;
                }
            }
            return $results;
        }
    // returns a product with discount applied
    public function scopeDiscountedItem($query, $id)
    {
        $result = $query->findOrFail($id);
        if (isset($result->discount_id)) {
            $result->currentPrice = $result->price - ($result->price * $result->discount->discount / 100);
        }
        else{
            $result->currentPrice = $result->price;
        }
        return $result;
    }
    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function images()
    {
        return $this->hasMany(Image::class);
    }
    public function discount()
    {
        return $this->hasOne(Discount::class);
    }
    public function details()
    {
        return $this->hasOne(Detail::class);
    }
    public function stock()
    {
        return $this->hasOne(Stock::class);
    }
}
