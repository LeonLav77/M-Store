<?php

namespace App\Models;

use App\Actions\CalculateCurrentPrice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $with = ['images'];
    public function scopeItemInStock($query, $id)
    {
        $product = $query->where('id', $id)->first();
        return $product->stock->isInStock;
    }

    // awfully slow
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
    public function scopeDiscounted($query)
    {
        return $query->where('discount_id', '!=', null);
    }
    
    // testing Function, to delete before production
    public function scopeNth($query, $id)
    {
        return $query->take(1)->skip($id-1)->get();
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
        return $this->hasMany(Image::class)->select(array('product_id', 'path'));
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
