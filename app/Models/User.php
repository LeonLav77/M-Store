<?php

namespace App\Models;

use App\Models\ProfileImage;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use TwoFactorAuthenticatable;
    use Notifiable;
    use Billable;
    protected $with = ['profileImage'];
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
    public function profileImage()
    {
        return $this->hasOne(ProfileImage::class);
    }
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }
    public function sellerInfo()
    {
        return $this->hasOne(Seller::class);
    }
    public function wishlist()
    {
        return $this->hasOne(Wishlist::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
