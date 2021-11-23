<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public function seller(){
        return $this->belongsTo(Seller::class);
    }
    public function category(){
        return $this->belongsTo(Categorie::class);
    }
    public function images(){
        return $this->hasMany(Image::class);
    }
    public function discount(){
        return $this->hasOne(Discount::class);
    }
    public function details(){
        return $this->hasOne(Detail::class);
    }
}
