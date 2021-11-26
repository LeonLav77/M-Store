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
        return $query->get()->filter(function ($product) {
            return $product->stock->isInStock;
        });
    }
    // returns all discounted products with discount applied
    public function scopeDiscountedAll($query)
    {
        $results = $query->where('discount_id', '!=', null)->get();
        for ($i=0; $i < count($results); $i++) {
            $results[$i]->discount_price = $results[$i]->price - ($results[$i]->price * $results[$i]->discount->discount / 100);
        }
        return $results;
    }
    // returns all discounted products
    public function scopeDiscounted($query)
    {
        return $query->where('discount_id', '!=', null);
    }
    // returns a product with discount applied
    public function scopeDiscountedItem($query, $id)
    {
        $result = $query->where('discount_id', '!=', null)->where('id', $id)->first();
        if ($result) {
            $result->discount_price = $result->price - ($result->price * $result->discount->discount / 100);
            return $result;
        }
        return null;
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
