<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    public function productsInCart()
    {
        return $this->hasMany(CartItem::class);
    }
    public function cartUser()
    {
        return $this->belongsTo(User::class);
    }
}
