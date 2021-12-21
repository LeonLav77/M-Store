<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Prunable;

class Discount extends Model
{
    use HasFactory;
    use Prunable;
    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function prunable()
    {
        return static::where('expiryDate', '<=', now());
    }
}
