<?php

namespace App\Models;

use App\Models\WishlistItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wishlist extends Model
{
    use HasFactory;
    public $guarded = [];
    public function wishlistedItems(){
        return $this->hasMany(WishlistItem::class);
    }
}
